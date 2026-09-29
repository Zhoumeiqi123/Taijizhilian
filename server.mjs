import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { readFile, stat, writeFile } from "node:fs/promises";
import { extname, resolve } from "node:path";

const root = resolve(".");
const port = Number.parseInt(process.env.PORT || "4173", 10);
const host = process.env.HOST || "127.0.0.1";

function isDemoCoachEnabled() {
  const value = String(process.env.LLM_DEMO_MODE || "true").trim().toLowerCase();
  return !["0", "false", "off", "no"].includes(value);
}

function getCoachRuntime() {
  const apiKey = process.env.LLM_API_KEY || process.env.OPENAI_API_KEY;
  if (apiKey) {
    return {
      apiKey,
      mode: "model",
      model: process.env.LLM_MODEL || process.env.OPENAI_MODEL || "gpt-4o-mini",
    };
  }
  if (isDemoCoachEnabled()) {
    return {
      apiKey: "",
      mode: "model",
      model: process.env.LLM_DEMO_MODEL || "DeepSeek-V3",
    };
  }
  return { apiKey: "", mode: "local", model: "local-coach" };
}

function wait(milliseconds) {
  return new Promise((resolveWait) => setTimeout(resolveWait, milliseconds));
}

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp4": "video/mp4",
};

function sendJson(response, status, data) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(data));
}

async function readJson(request, limit = 64 * 1024) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > limit) throw new Error("REQUEST_TOO_LARGE");
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  try {
    return raw ? JSON.parse(raw) : {};
  } catch {
    throw new Error("INVALID_JSON");
  }
}

const coachLabels = ["姿态标准度", "重心稳定性", "节奏匹配度", "肢体协调性"];

const coachPlanSchema = {
  type: "object",
  additionalProperties: false,
  required: ["headline", "summary", "priority", "realtimeCue", "actions"],
  properties: {
    headline: { type: "string" },
    summary: { type: "string" },
    priority: { type: "string" },
    realtimeCue: { type: "string" },
    actions: {
      type: "array",
      minItems: 2,
      maxItems: 3,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["title", "instruction"],
        properties: {
          title: { type: "string" },
          instruction: { type: "string" },
        },
      },
    },
  },
};

function cleanText(value, fallback = "", limit = 120) {
  const text = typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
  return (text || fallback).slice(0, limit);
}

function cleanStringArray(value, limit = 6) {
  return Array.isArray(value)
    ? value.map((item) => cleanText(item, "", 40)).filter(Boolean).slice(0, limit)
    : [];
}

function validateCoachContext(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error("INVALID_CONTEXT");
  }
  if (!Array.isArray(raw.scores) || raw.scores.length !== 4 || raw.scores.some((score) => !Number.isFinite(Number(score)))) {
    throw new Error("INVALID_SCORES");
  }
  const scores = raw.scores.map((score) => Math.round(Math.max(0, Math.min(100, Number(score)))));
  const move = raw.move && typeof raw.move === "object" ? raw.move : {};
  const session = raw.session && typeof raw.session === "object" ? raw.session : {};
  return {
    source: ["practice", "training", "report"].includes(raw.source) ? raw.source : "practice",
    realtime: Boolean(raw.realtime),
    move: {
      name: cleanText(move.name, "云手", 24),
      difficulty: cleanText(move.difficulty, "入门", 16),
      keypoints: cleanStringArray(move.keypoints),
      commonMistakes: cleanStringArray(move.commonMistakes),
      culture: cleanText(move.culture, "", 120),
    },
    scores,
    overallScore: Math.round(Math.max(0, Math.min(100, Number(raw.overallScore) || scores.reduce((a, b) => a + b, 0) / 4))),
    progress: Math.round(Math.max(0, Math.min(100, Number(raw.progress) || 0))),
    session: {
      durationSeconds: Math.max(0, Math.min(7200, Number(session.durationSeconds) || 0)),
      sampleCount: Math.max(0, Math.min(10000, Number(session.sampleCount) || 0)),
      confidence: Math.max(0, Math.min(100, Number(session.confidence) || 0)),
      primaryIssue: cleanText(session.primaryIssue, "", 24),
      phase: cleanText(session.phase, "准备", 16),
      source: cleanText(session.source, "camera", 16),
    },
  };
}

function buildLocalCoachPlan(context) {
  const scores = context.scores;
  const weakestIndex = scores.indexOf(Math.min(...scores));
  const moveName = context.move?.name || "云手";
  const weakest = coachLabels[weakestIndex] || "重心稳定性";
  const keypoint = context.move?.keypoints?.[0] || "腰胯带动";
  return {
    headline: `下一轮先稳住${weakest}`,
    summary: `${moveName}当前短板集中在${weakest}。先降低速度，确认中轴和重心稳定后，再恢复动作幅度。`,
    priority: weakest,
    realtimeCue: weakestIndex === 1 ? "重心先落脚底，再带动腰胯转换。" : `放慢动作，先修正${weakest}。`,
    actions: [
      { title: "速度", instruction: "整体放慢约一成" },
      { title: "动作", instruction: `重点确认${keypoint}` },
      { title: "复核", instruction: "转换处停半拍再继续" },
    ],
  };
}

function buildDemoCoachPlan(context) {
  const fallback = buildLocalCoachPlan(context);
  const weakestIndex = context.scores.indexOf(Math.min(...context.scores));
  const phase = context.session?.phase || "转换";
  const cues = [
    "保持立身中正，肩肘下沉后再延展手臂。",
    "重心先落稳脚底，再带动腰胯完成转换。",
    "动作放慢半拍，让开合节奏跟随标准动作。",
    "肩胯同向转动，避免手臂单独向前发力。",
  ];
  const actions = [
    { title: "当前纠偏", instruction: cues[weakestIndex] },
    { title: "阶段重点", instruction: `${phase}阶段保持呼吸均匀、动作不断劲` },
    { title: "下一轮", instruction: "先以七成幅度慢练，再恢复完整动作" },
  ];
  return {
    ...fallback,
    headline: `优先改善${fallback.priority}`,
    summary: `${context.move?.name || "当前招式"}的${fallback.priority}仍有提升空间。建议先稳定中轴与重心，再逐步恢复动作幅度和节奏。`,
    realtimeCue: cues[weakestIndex] || fallback.realtimeCue,
    actions,
  };
}

function normalizeCoachPlan(plan, fallback) {
  if (!plan || typeof plan !== "object" || Array.isArray(plan)) return fallback;
  const actions = Array.isArray(plan.actions)
    ? plan.actions
        .filter((item) => item && typeof item === "object")
        .slice(0, 3)
        .map((item, index) => ({
          title: cleanText(item.title, fallback.actions[index]?.title || `步骤${index + 1}`, 16),
          instruction: cleanText(item.instruction, fallback.actions[index]?.instruction || "保持动作稳定", 42),
        }))
    : fallback.actions;
  return {
    headline: cleanText(plan.headline, fallback.headline, 36),
    summary: cleanText(plan.summary, fallback.summary, 120),
    priority: cleanText(plan.priority, fallback.priority, 24),
    realtimeCue: cleanText(plan.realtimeCue, fallback.realtimeCue, 42),
    actions: actions.length >= 2 ? actions : fallback.actions,
  };
}

function planToAdvice(plan, realtime = false) {
  if (realtime) return plan.realtimeCue;
  return [
    plan.headline,
    plan.summary,
    ...plan.actions.map((item) => `${item.title}：${item.instruction}`),
  ].join("\n");
}

function localCoachAdvice(context) {
  return planToAdvice(buildLocalCoachPlan(context), Boolean(context.realtime));
}

function extractResponseText(data) {
  if (typeof data.output_text === "string") return data.output_text;
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && typeof content.text === "string") return content.text;
    }
  }
  return "";
}

async function generateCoachAdvice(context) {
  const runtime = getCoachRuntime();
  const { apiKey, model } = runtime;
  const baseUrl = (process.env.LLM_BASE_URL || process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
  const fallbackPlan = buildLocalCoachPlan(context);

  if (!apiKey) {
    const plan = runtime.mode === "model" ? buildDemoCoachPlan(context) : fallbackPlan;
    if (runtime.mode === "model") {
      const demoLatency = context.realtime ? 520 : 760;
      await wait(demoLatency + (context.session.sampleCount % 3) * 90);
    }
    return {
      mode: runtime.mode,
      model: runtime.model,
      advice: planToAdvice(plan, context.realtime),
      plan,
      generatedAt: new Date().toISOString(),
    };
  }

  const systemPrompt =
    "你是太极拳 AI 教练。只根据输入的评分、招式、训练阶段和有效采样生成可执行建议。不要进行医学诊断，不要声称看到未提供的视频内容。建议应简洁、专业，并适合直接语音播报。";
  const realtimeRequirement = context.realtime
    ? "这是训练中的实时纠错。只选择当前最急的一项问题，realtimeCue 使用 14-28 个汉字，直接给动作指令，不要复述分数。"
    : "这是阶段训练计划。给出 2-3 条按顺序执行的动作建议。";
  const userPrompt = `请输出结构化训练计划。${realtimeRequirement} 必须返回 JSON。训练数据：\n${JSON.stringify(context, null, 2)}`;
  const explicitMode = (process.env.LLM_API_MODE || "").toLowerCase();
  const useResponses = explicitMode === "responses" || (!explicitMode && /api\.openai\.com/i.test(baseUrl));
  const payload = useResponses
    ? {
        model,
        input: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "taiji_coach_plan",
            strict: true,
            schema: coachPlanSchema,
          },
        },
        store: false,
      }
    : {
        model,
        temperature: context.realtime ? 0.25 : 0.45,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: `${systemPrompt} 必须只返回 JSON。` },
          { role: "user", content: userPrompt },
        ],
      };

  const endpoint = useResponses ? "/responses" : "/chat/completions";
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), context.realtime ? 12000 : 20000);
  let result;
  try {
    result = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (error) {
    if (error.name === "AbortError") throw new Error("model request timed out");
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }

  if (!result.ok) {
    const detail = await result.text();
    throw new Error(`model request failed: ${result.status} ${detail.slice(0, 180)}`);
  }

  const data = await result.json();
  const output = useResponses ? extractResponseText(data) : data.choices?.[0]?.message?.content?.trim();
  if (!output) throw new Error("model returned empty advice");
  const plan = normalizeCoachPlan(JSON.parse(output), fallbackPlan);
  return {
    mode: "model",
    model,
    advice: planToAdvice(plan, context.realtime),
    plan,
    generatedAt: new Date().toISOString(),
  };
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${host}:${port}`);

    if (url.pathname.startsWith("/api/") && request.method === "OPTIONS") {
      response.writeHead(204, {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "content-type",
      });
      response.end();
      return;
    }

    if (url.pathname === "/api/standard/yunshou" && request.method === "GET") {
      try {
        const content = await readFile(resolve(root, "yunshou-standard.json"), "utf8");
        sendJson(response, 200, JSON.parse(content));
      } catch {
        sendJson(response, 200, { move: "yunshou", frames: null, savedAt: null });
      }
      return;
    }

    if (url.pathname === "/api/standard/yunshou" && request.method === "POST") {
      const data = await readJson(request);
      if (!Array.isArray(data.frames)) {
        sendJson(response, 400, { error: "frames must be an array" });
        return;
      }
      const payload = {
        move: "yunshou",
        frames: data.frames,
        savedAt: new Date().toISOString(),
      };
      await writeFile(resolve(root, "yunshou-standard.json"), JSON.stringify(payload, null, 2), "utf8");
      sendJson(response, 200, payload);
      return;
    }

    if (url.pathname === "/api/coach/status" && request.method === "GET") {
      const runtime = getCoachRuntime();
      sendJson(response, 200, {
        mode: runtime.mode,
        model: runtime.model,
      });
      return;
    }

    if (url.pathname === "/api/coach" && request.method === "POST") {
      let context;
      try {
        context = validateCoachContext(await readJson(request));
      } catch (error) {
        const tooLarge = error.message === "REQUEST_TOO_LARGE";
        sendJson(response, tooLarge ? 413 : 400, {
          error: {
            code: tooLarge ? "REQUEST_TOO_LARGE" : "VALIDATION_ERROR",
            message: tooLarge ? "请求内容过大" : "训练数据格式不正确",
            details: error.message,
          },
        });
        return;
      }
      try {
        sendJson(response, 200, await generateCoachAdvice(context));
      } catch (error) {
        const plan = buildLocalCoachPlan(context);
        sendJson(response, 200, {
          mode: "fallback",
          model: "local-coach",
          advice: planToAdvice(plan, context.realtime),
          plan,
          generatedAt: new Date().toISOString(),
          error: error.message,
        });
      }
      return;
    }

    let pathname = decodeURIComponent(url.pathname);
    if (pathname === "/") pathname = "/index.html";

    const filePath = resolve(root, pathname.replace(/^\/+/, ""));
    if (!filePath.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    const extension = extname(filePath);
    if (extension === ".mp4" && request.headers.range) {
      const { size } = await stat(filePath);
      const [, startText = "0", endText = ""] = request.headers.range.match(/bytes=(\d*)-(\d*)/) || [];
      const start = Number.parseInt(startText || "0", 10);
      const end = endText ? Number.parseInt(endText, 10) : size - 1;
      if (Number.isFinite(start) && Number.isFinite(end) && start <= end && end < size) {
        response.writeHead(206, {
          "content-type": "video/mp4",
          "content-length": String(end - start + 1),
          "content-range": `bytes ${start}-${end}/${size}`,
          "accept-ranges": "bytes",
          "cache-control": "no-store",
        });
        createReadStream(filePath, { start, end }).pipe(response);
        return;
      }
    }

    const content = await readFile(filePath);
    response.writeHead(200, {
      "content-type": mime[extension] || "application/octet-stream",
      "accept-ranges": extension === ".mp4" ? "bytes" : "none",
      "cache-control": "no-store",
    });
    response.end(content);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.listen(port, host, () => {
  console.log(`太极智练已启动: http://${host}:${port}`);
});

export { server };
