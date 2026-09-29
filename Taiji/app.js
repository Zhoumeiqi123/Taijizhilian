const moves = [
  {
    id: "qishi",
    name: "起势",
    difficulty: "入门",
    keypoints: ["身体中正", "气息沉稳", "双臂缓起"],
    mistakes: ["肩部紧张", "手臂过快", "重心前倾"],
    culture: "松静自然、以意导形",
    unlock: "松静自然",
    tip: "起势阶段保持肩颈放松，双臂缓慢上提，重心落在两脚之间。",
  },
  {
    id: "yunshou",
    name: "云手",
    difficulty: "基础",
    keypoints: ["腰胯带动", "左右转换", "圆活连贯"],
    mistakes: ["只动手不转腰", "重心不清", "手臂僵直"],
    culture: "圆活连贯、虚实相生",
    unlock: "虚实相生",
    tip: "云手阶段让腰胯先转，手臂随身体运行，左右重心要有清晰交接。",
  },
  {
    id: "danbian",
    name: "单鞭",
    difficulty: "进阶",
    keypoints: ["开合有度", "上下协调", "支撑稳定"],
    mistakes: ["手脚不同步", "下肢支撑弱", "身体侧倾"],
    culture: "刚柔并济、开合有度",
    unlock: "刚柔并济",
    tip: "单鞭注意开合节奏，前手伸展时下肢支撑要稳，膝盖方向跟脚尖一致。",
  },
  {
    id: "baihe",
    name: "白鹤亮翅",
    difficulty: "进阶",
    keypoints: ["姿态舒展", "虚实分明", "动静相宜"],
    mistakes: ["上肢过高", "身体后仰", "步法不稳"],
    culture: "轻灵舒展、动静相宜",
    unlock: "动静相宜",
    tip: "白鹤亮翅保持胸背舒展，上下手形成对拉，身体不要后仰。",
  },
  {
    id: "shoushi",
    name: "收势",
    difficulty: "入门",
    keypoints: ["调息归元", "动作完整", "节奏收束"],
    mistakes: ["结束过快", "气息散乱", "手臂下落失控"],
    culture: "由动入静、归于中和",
    unlock: "归于中和",
    tip: "收势时让手臂自然下落，呼吸随动作回收，节奏不要突然中断。",
  },
];

const scoreLabels = ["姿态标准度", "重心稳定性", "节奏匹配度", "肢体协调性"];
const scoreFixTips = [
  "把肩肘放松，先对齐头、肩、胯的中轴，再追求动作幅度。",
  "放慢左右转换，先让重心到脚底，再带动腰胯和手臂运行。",
  "跟着标准视频的起、承、转、合走，转身处停留半拍会更稳。",
  "观察手、胯、膝是否同向，避免只摆手不转腰。",
];
const poseConnections = [
  [11, 12],
  [11, 13],
  [13, 15],
  [12, 14],
  [14, 16],
  [11, 23],
  [12, 24],
  [23, 24],
  [23, 25],
  [25, 27],
  [24, 26],
  [26, 28],
  [27, 31],
  [28, 32],
];
const visiblePoseLandmarks = [0, 11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28];
const standardPoseKeyMap = {
  head: 0,
  lShoulder: 11,
  rShoulder: 12,
  lElbow: 13,
  rElbow: 14,
  lWrist: 15,
  rWrist: 16,
  lHip: 23,
  rHip: 24,
  lKnee: 25,
  rKnee: 26,
  lAnkle: 27,
  rAnkle: 28,
  lFoot: 31,
  rFoot: 32,
};
const calibrationPointLabels = {
  head: "头",
  lShoulder: "左肩",
  rShoulder: "右肩",
  lElbow: "左肘",
  rElbow: "右肘",
  lWrist: "左腕",
  rWrist: "右腕",
  lHip: "左髋",
  rHip: "右髋",
  lKnee: "左膝",
  rKnee: "右膝",
  lAnkle: "左踝",
  rAnkle: "右踝",
};
const calibrationPointKeys = Object.keys(calibrationPointLabels);

const yunshouStandardFrames = [
  {
    t: 0,
    p: {
      head: [0.48, 0.24],
      lShoulder: [0.42, 0.36],
      rShoulder: [0.55, 0.36],
      lElbow: [0.34, 0.33],
      rElbow: [0.59, 0.43],
      lWrist: [0.26, 0.34],
      rWrist: [0.67, 0.47],
      lHip: [0.39, 0.56],
      rHip: [0.53, 0.56],
      lKnee: [0.31, 0.71],
      rKnee: [0.62, 0.71],
      lAnkle: [0.22, 0.88],
      rAnkle: [0.72, 0.88],
      lFoot: [0.2, 0.9],
      rFoot: [0.74, 0.9],
    },
  },
  {
    t: 0.18,
    p: {
      head: [0.49, 0.24],
      lShoulder: [0.43, 0.36],
      rShoulder: [0.56, 0.36],
      lElbow: [0.41, 0.36],
      rElbow: [0.57, 0.39],
      lWrist: [0.49, 0.34],
      rWrist: [0.55, 0.46],
      lHip: [0.41, 0.56],
      rHip: [0.54, 0.56],
      lKnee: [0.32, 0.71],
      rKnee: [0.62, 0.7],
      lAnkle: [0.23, 0.88],
      rAnkle: [0.71, 0.88],
      lFoot: [0.21, 0.9],
      rFoot: [0.73, 0.9],
    },
  },
  {
    t: 0.34,
    p: {
      head: [0.5, 0.24],
      lShoulder: [0.44, 0.36],
      rShoulder: [0.57, 0.36],
      lElbow: [0.52, 0.36],
      rElbow: [0.59, 0.39],
      lWrist: [0.64, 0.35],
      rWrist: [0.54, 0.48],
      lHip: [0.43, 0.56],
      rHip: [0.56, 0.56],
      lKnee: [0.34, 0.71],
      rKnee: [0.64, 0.7],
      lAnkle: [0.24, 0.88],
      rAnkle: [0.72, 0.88],
      lFoot: [0.22, 0.9],
      rFoot: [0.74, 0.9],
    },
  },
  {
    t: 0.5,
    p: {
      head: [0.51, 0.25],
      lShoulder: [0.45, 0.37],
      rShoulder: [0.58, 0.37],
      lElbow: [0.6, 0.39],
      rElbow: [0.56, 0.43],
      lWrist: [0.72, 0.42],
      rWrist: [0.48, 0.5],
      lHip: [0.45, 0.57],
      rHip: [0.57, 0.57],
      lKnee: [0.36, 0.72],
      rKnee: [0.65, 0.71],
      lAnkle: [0.25, 0.88],
      rAnkle: [0.73, 0.88],
      lFoot: [0.23, 0.9],
      rFoot: [0.75, 0.9],
    },
  },
  {
    t: 0.68,
    p: {
      head: [0.49, 0.24],
      lShoulder: [0.43, 0.36],
      rShoulder: [0.56, 0.36],
      lElbow: [0.47, 0.4],
      rElbow: [0.49, 0.39],
      lWrist: [0.56, 0.47],
      rWrist: [0.39, 0.36],
      lHip: [0.42, 0.56],
      rHip: [0.55, 0.56],
      lKnee: [0.33, 0.71],
      rKnee: [0.63, 0.7],
      lAnkle: [0.23, 0.88],
      rAnkle: [0.72, 0.88],
      lFoot: [0.21, 0.9],
      rFoot: [0.74, 0.9],
    },
  },
  {
    t: 0.84,
    p: {
      head: [0.48, 0.24],
      lShoulder: [0.42, 0.36],
      rShoulder: [0.55, 0.36],
      lElbow: [0.36, 0.38],
      rElbow: [0.42, 0.38],
      lWrist: [0.28, 0.44],
      rWrist: [0.33, 0.35],
      lHip: [0.4, 0.56],
      rHip: [0.53, 0.56],
      lKnee: [0.32, 0.71],
      rKnee: [0.62, 0.71],
      lAnkle: [0.22, 0.88],
      rAnkle: [0.72, 0.88],
      lFoot: [0.2, 0.9],
      rFoot: [0.74, 0.9],
    },
  },
  {
    t: 1,
    p: {
      head: [0.48, 0.24],
      lShoulder: [0.42, 0.36],
      rShoulder: [0.55, 0.36],
      lElbow: [0.34, 0.33],
      rElbow: [0.59, 0.43],
      lWrist: [0.26, 0.34],
      rWrist: [0.67, 0.47],
      lHip: [0.39, 0.56],
      rHip: [0.53, 0.56],
      lKnee: [0.31, 0.71],
      rKnee: [0.62, 0.71],
      lAnkle: [0.22, 0.88],
      rAnkle: [0.72, 0.88],
      lFoot: [0.2, 0.9],
      rFoot: [0.74, 0.9],
    },
  },
];

const standardFeatureTemplates = {
  qishi: { armSpan: 1.1, wristBalance: 0.1, kneeAngle: 165, alignment: 0.05, motion: 0.006 },
  yunshou: { armSpan: 2.25, wristBalance: 0.32, kneeAngle: 150, alignment: 0.1, motion: 0.012 },
  danbian: { armSpan: 2.55, wristBalance: 0.24, kneeAngle: 145, alignment: 0.11, motion: 0.01 },
  baihe: { armSpan: 1.8, wristBalance: 0.72, kneeAngle: 152, alignment: 0.08, motion: 0.008 },
  shoushi: { armSpan: 0.95, wristBalance: 0.08, kneeAngle: 166, alignment: 0.05, motion: 0.005 },
};
const cultureCards = {
  陈家沟: {
    title: "陈家沟太极文化",
    text: "太极拳源流与中正安舒的训练观念相连，适合从起势和云手进入研学。",
    tags: ["太极拳源流", "陈氏太极", "虚实相生"],
  },
  少林寺: {
    title: "登封少林武术",
    text: "少林武术重身法、功法和精神传承，可与太极的刚柔观形成对照学习。",
    tags: ["少林功夫", "禅武合一", "中原武术"],
  },
  河洛文化: {
    title: "洛阳河洛文化",
    text: "河洛文化中的阴阳变化、礼乐秩序与太极拳的圆转开合有天然关联。",
    tags: ["河洛文明", "阴阳变化", "礼乐气象"],
  },
  开封民俗: {
    title: "开封宋代体育民俗",
    text: "宋代城市生活中的体育、游艺和民俗活动，为武术文化传播提供生活场景。",
    tags: ["宋韵民俗", "体育游艺", "城市文化"],
  },
  郑州数字文旅: {
    title: "郑州数字文旅",
    text: "数字展厅、互动大屏和 Web 体验可让中原武术进入校园、研学与文旅空间。",
    tags: ["数字文旅", "互动展陈", "研学路线"],
  },
};

const attacks = [
  {
    name: "掤劲来势",
    target: "肩肘",
    hint: "保持结构支撑，优先稳住肩肘框架。",
    culture: "掤劲讲究圆撑不塌，先有结构再谈变化。",
  },
  {
    name: "捋劲牵引",
    target: "手腕",
    hint: "顺势引化，手腕方向要轻柔转换。",
    culture: "捋劲不是硬拉，是借对方来力转出空处。",
  },
  {
    name: "挤劲压入",
    target: "胸前",
    hint: "守住中轴，胸前保持空间。",
    culture: "挤劲考验中线稳定，身法不可散乱。",
  },
  {
    name: "按劲下压",
    target: "腰胯",
    hint: "重心后移，腰胯先稳再化。",
    culture: "按劲应对的关键是重心控制和沉着转换。",
  },
  {
    name: "云手转换",
    target: "腰胯",
    hint: "左右转换由腰胯带动。",
    culture: "云手体现虚实相生，身体带手，手随身行。",
  },
];

const pushDifficulties = {
  beginner: {
    label: "入门",
    duration: 4600,
    minDuration: 3000,
    roundStep: 90,
    comboStep: 35,
    reveal: "always",
    scoreScale: 1,
  },
  standard: {
    label: "标准",
    duration: 3900,
    minDuration: 2400,
    roundStep: 120,
    comboStep: 50,
    reveal: "late",
    scoreScale: 1.15,
  },
  challenge: {
    label: "挑战",
    duration: 3200,
    minDuration: 1900,
    roundStep: 145,
    comboStep: 65,
    reveal: "never",
    scoreScale: 1.35,
  },
};

const moveDetails = {
  qishi: {
    goal: "建立中正身形和呼吸节奏，为后续动作定下速度。",
    phases: ["两脚平开", "松肩沉肘", "双臂缓起", "气沉丹田"],
    practice: "建议慢练 6 次，每次起落不少于 8 秒。",
    focus: "头顶虚领，肩颈松开，手臂不要抢在呼吸前面。",
  },
  yunshou: {
    goal: "用腰胯带动双臂运行，形成左右重心清晰转换。",
    phases: ["左移重心", "腰胯先转", "双手云转", "收脚翻掌"],
    practice: "建议配合标准视频完成 3 轮，每轮重点看腰胯和手臂同步。",
    focus: "不要只摆手，先让身体带动，再让手臂随身运行。",
  },
  danbian: {
    goal: "训练开合、定势和下肢支撑，让动作有展开感。",
    phases: ["合抱蓄势", "转腰开步", "前手推出", "后手成钩"],
    practice: "建议先分解上肢和步法，再合成完整动作。",
    focus: "膝盖方向跟脚尖一致，前手伸展时身体不要前栽。",
  },
  baihe: {
    goal: "训练上下分合和虚实变化，让动作轻灵舒展。",
    phases: ["重心后坐", "上手提架", "下手护按", "虚步定势"],
    practice: "建议在镜头前保持全身入镜，重点观察上手高度。",
    focus: "胸背舒展但不要后仰，虚步要轻，支撑脚要稳。",
  },
  shoushi: {
    goal: "把动作节奏收束回静态，完成呼吸和重心归整。",
    phases: ["双手回收", "掌心下按", "重心归中", "自然站定"],
    practice: "建议每次训练后做 3 次收势，形成完整闭环。",
    focus: "速度不要突然变快，手臂自然下落，呼吸同步回收。",
  },
};

const cultureDetails = {
  陈家沟: {
    task: "完成云手跟练后解锁太极拳源流卡。",
    route: "焦作温县 - 陈氏太极拳发源地",
    value: "对应平台里的姿态标准度和虚实转换训练。",
  },
  少林寺: {
    task: "完成单鞭或推手对练后解锁刚柔对照卡。",
    route: "登封嵩山 - 少林功夫文化区",
    value: "用于解释刚柔并济、动静转换和中线稳定。",
  },
  河洛文化: {
    task: "完成起势和收势后解锁阴阳变化卡。",
    route: "洛阳 - 河洛文化核心区域",
    value: "帮助把太极圆、阴阳、开合等概念可视化。",
  },
  开封民俗: {
    task: "完成课程学习后解锁宋韵体育民俗卡。",
    route: "开封 - 宋韵民俗体验节点",
    value: "用于研学讲解中的文化拓展和课堂讨论。",
  },
  郑州数字文旅: {
    task: "生成训练报告后解锁数字文旅应用卡。",
    route: "郑州 - 数字展陈与校园研学",
    value: "对应本项目的 AI 评测、数字小人和训练报告展示。",
  },
};

const state = {
  selectedMove: moves[1],
  scores: [88, 82, 85, 89],
  progress: 42,
  runningPractice: false,
  practiceTick: 0,
  unlocked: new Set(["陈家沟"]),
  push: {
    score: 0,
    combo: 0,
    total: 0,
    success: 0,
    round: 1,
    maxRounds: 8,
    mode: "beginner",
    sessionActive: false,
    finished: false,
    current: null,
    active: false,
    startedAt: 0,
    duration: 3800,
    logs: [],
    lastReaction: 0,
    bestReaction: null,
    reactionTotal: 0,
    reactionSamples: 0,
    nextTimer: null,
  },
  avatarActive: false,
  pose: {
    landmarker: null,
    loading: false,
    ready: false,
    live: false,
    lastVideoTime: -1,
    lastLandmarks: null,
    lastScoreAt: 0,
    history: [],
    streams: {
      user: { lastVideoTime: -1, landmarks: null, smoothed: null },
      standard: { lastVideoTime: -1, landmarks: null, smoothed: null },
    },
  },
  standard: {
    lastFeatures: null,
    lastLandmarks: null,
    history: [],
    motion: null,
    centerSway: null,
    ready: false,
    phaseOffset: 0,
    cycleSeconds: 28.434,
    actionStartRatio: 0,
    actionEndRatio: 0.78,
    alignX: -0.12,
    alignY: 0.02,
    scaleX: 0.82,
    scaleY: 0.98,
    calibratedFrames: null,
  },
  calibration: {
    active: false,
    frameIndex: 0,
    draggingKey: null,
    selectedKey: "head",
    frames: null,
    videoRect: null,
  },
  audio: {
    context: null,
    timer: null,
    playing: false,
    mode: null,
    bpm: 56,
  },
  coach: {
    voiceEnabled: true,
    liveEnabled: true,
    available: true,
    model: "DeepSeek-V3",
    lastTip: "",
    lastTipAt: 0,
    lastSpokenText: "",
    lastSpokenAt: 0,
    modelInFlight: false,
    modelAbortController: null,
    modelRequestId: 0,
    lastModelAt: 0,
    lastModelReceivedAt: 0,
    lastModelSignature: "",
    lastModelCue: "",
    modelFailureCount: 0,
    analysisIntervalMs: 5000,
    minModelSamples: 4,
  },
  training: {
    active: false,
    started: false,
    source: "camera",
    objectUrl: null,
    elapsedMs: 0,
    lastFrameAt: 0,
    lastUiAt: 0,
    sampleCount: 0,
    confidence: 0,
    scoreSamples: [],
    issueCounts: [0, 0, 0, 0],
    phase: "准备",
    coachTab: "realtime",
    summary: null,
  },
};

const pageNames = {
  overview: "太极智练",
  practice: "AI 太极跟练评测",
  pushhands: "虚拟推手反应训练",
  avatar: "我的太极数字小人",
  courses: "太极招式课程",
  culture: "中原武术文化地图",
  report: "训练报告中心",
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const canvases = {
  hero: $("#heroCanvas"),
  practice: $("#practiceCanvas"),
  standard: $("#standardCanvas"),
  training: $("#trainingCanvas"),
  trainingStandard: $("#trainingStandardCanvas"),
  push: $("#pushCanvas"),
  avatar: $("#avatarCanvas"),
  radar: $("#radarCanvas"),
  trend: $("#trendCanvas"),
};

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

let animationFrame = 0;
let toastTimer = 0;

function fitCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  const width = Math.max(320, Math.floor(rect.width * scale));
  const height = Math.max(260, Math.floor(rect.height * scale));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  const ctx = canvas.getContext("2d");
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  return { ctx, width: rect.width, height: rect.height };
}

function toast(message) {
  const node = $("#toast");
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove("show"), 2600);
}

function showPage(id, updateUrl = true) {
  const pageId = pageNames[id] ? id : "overview";
  $$("[data-panel]").forEach((panel) => {
    panel.classList.toggle("active-page", panel.id === pageId);
  });
  $$(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.section === pageId);
  });
  $(".sidebar").classList.remove("open");
  const title = $(".topbar h1");
  if (title) title.textContent = pageNames[pageId];
  const activePanel = document.getElementById(pageId);
  requestAnimationFrame(() => {
    activePanel?.querySelectorAll(".reveal-item").forEach((item) => item.classList.add("is-visible"));
  });
  if (updateUrl) history.pushState({ page: pageId }, "", `#${pageId}`);
  window.scrollTo({ top: 0, behavior: "auto" });
  if (pageId === "report") {
    drawRadar();
    drawTrend();
  }
}

function averageScore() {
  return Math.round(state.scores.reduce((sum, value) => sum + value, 0) / state.scores.length);
}

function getScoreDiagnosis(scores = state.scores) {
  const weakestIndex = scores.indexOf(Math.min(...scores));
  return {
    index: weakestIndex,
    label: scoreLabels[weakestIndex],
    score: scores[weakestIndex],
    tip: scoreFixTips[weakestIndex],
  };
}

function buildPracticeCoachTip(prefix = "") {
  const diagnosis = getScoreDiagnosis();
  const keypoint = state.selectedMove.keypoints[0] || "腰胯带动";
  return `${prefix}${state.selectedMove.name}当前短板是${diagnosis.label}（${diagnosis.score}分）。${diagnosis.tip} 下一轮重点看“${keypoint}”。`;
}

const realtimeCoachTips = [
  "放松肩肘，先把头、肩、胯对齐。",
  "重心先落到脚底，再带动腰胯转换。",
  "跟标准视频慢半拍，转身处先停稳。",
  "别只摆手，用腰胯带动手臂运行。",
];

function buildRealtimeCoachTip(prefix = "") {
  const diagnosis = getScoreDiagnosis();
  const level = diagnosis.score < 76 ? "偏低" : diagnosis.score < 86 ? "略弱" : "还可提升";
  const tip = realtimeCoachTips[diagnosis.index] || diagnosis.tip;
  return `${prefix}${diagnosis.label}${level}，${tip}`;
}

function compactCoachText(text, limit = 54) {
  const clean = String(text || "")
    .replace(/\s+/g, " ")
    .replace(/本地建议模式[:：]?/g, "")
    .replace(/原型演示数据[:：]?/g, "")
    .trim();
  const firstSentence = clean.split(/[。！？!?；;]/).find(Boolean) || clean;
  return firstSentence.length > limit ? `${firstSentence.slice(0, limit - 1)}…` : firstSentence;
}

function speakCoachTip(text, force = false) {
  if (!state.coach.voiceEnabled || !("speechSynthesis" in window)) return;
  const now = performance.now();
  const shortText = compactCoachText(text, 36);
  if (!shortText) return;
  if (!force && (shortText === state.coach.lastSpokenText || now - state.coach.lastSpokenAt < 4600)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(shortText);
  utterance.lang = "zh-CN";
  utterance.rate = 1.18;
  utterance.pitch = 1;
  utterance.volume = 0.86;
  const voice = window.speechSynthesis.getVoices().find((item) => /zh|Chinese|中文/i.test(item.lang + item.name));
  if (voice) utterance.voice = voice;
  state.coach.lastSpokenText = shortText;
  state.coach.lastSpokenAt = now;
  window.speechSynthesis.speak(utterance);
}

function setLiveCoachStatus(text, status = "idle") {
  const node = $("#trainingLiveCoachState");
  if (!node) return;
  node.textContent = text;
  node.dataset.state = status;
}

function syncCoachControls() {
  const voiceButton = $("#trainingVoiceButton");
  if (voiceButton) {
    voiceButton.textContent = state.coach.voiceEnabled ? "语音已开" : "语音已关";
    voiceButton.classList.toggle("active", state.coach.voiceEnabled);
    voiceButton.setAttribute("aria-pressed", String(state.coach.voiceEnabled));
  }
  const liveButton = $("#trainingRealtimeCoachButton");
  if (liveButton) {
    liveButton.textContent = state.coach.liveEnabled ? "实时 AI 已开" : "实时 AI 已关";
    liveButton.classList.toggle("active", state.coach.liveEnabled);
    liveButton.setAttribute("aria-pressed", String(state.coach.liveEnabled));
  }
}

function cancelLiveCoachRequest(statusText = "实时分析已暂停") {
  if (state.coach.modelAbortController) state.coach.modelAbortController.abort();
  state.coach.modelAbortController = null;
  state.coach.modelInFlight = false;
  state.coach.modelRequestId += 1;
  if (state.training.active) setLiveCoachStatus(statusText, "idle");
}

function updateRealtimeCoachTip(source = "training", prefix = "") {
  const now = performance.now();
  if (now - state.coach.lastTipAt < 760) return state.coach.lastTip;
  const tip = buildRealtimeCoachTip(prefix);
  const hasFreshModelCue = Boolean(
    state.coach.available &&
      state.coach.liveEnabled &&
      state.coach.lastModelCue &&
      now - state.coach.lastModelReceivedAt < state.coach.analysisIntervalMs * 1.25
  );
  const displayedTip = hasFreshModelCue ? state.coach.lastModelCue : tip;
  state.coach.lastTip = displayedTip;
  state.coach.lastTipAt = now;

  if (source === "training") {
    $("#trainingCoachTip").textContent = displayedTip;
    $("#trainingCoachMode").textContent = state.coach.modelInFlight
      ? `${state.coach.model} · 正在分析`
      : state.coach.available && state.coach.liveEnabled
        ? `${state.coach.model} · 实时指导`
        : "本地规则实时建议";
    if (!state.coach.modelInFlight && !hasFreshModelCue) $("#trainingAiCoachText").textContent = tip;
    queueCoachEnhancement("training");
  } else {
    $("#coachTip").textContent = tip;
  }

  if (!state.coach.available || !state.coach.liveEnabled) speakCoachTip(tip);
  return displayedTip;
}

function toggleCoachVoice() {
  state.coach.voiceEnabled = !state.coach.voiceEnabled;
  syncCoachControls();
  if (state.coach.voiceEnabled) {
    speakCoachTip(state.coach.lastTip || buildRealtimeCoachTip(), true);
    toast("实时短句语音已开启");
  } else {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    toast("语音播报已关闭");
  }
}

function toggleRealtimeCoach() {
  state.coach.liveEnabled = !state.coach.liveEnabled;
  syncCoachControls();
  if (state.coach.liveEnabled) {
    state.coach.lastModelAt = 0;
    state.coach.lastModelSignature = "";
    setLiveCoachStatus(
      state.coach.available ? "等待稳定动作，随后自动分析" : "未连接模型，暂用本地实时纠错",
      state.coach.available ? "ready" : "fallback"
    );
    toast("大模型实时指导已开启");
  } else {
    cancelLiveCoachRequest("大模型实时指导已关闭");
    toast("大模型实时指导已关闭");
  }
}

const trainingPhaseDefinitions = [
  { max: 8, label: "准备", detail: "确认全身入镜" },
  { max: 30, label: "起势", detail: "建立中轴与呼吸" },
  { max: 68, label: "转换", detail: "腰胯带动双手" },
  { max: 92, label: "连贯", detail: "稳定重心与节奏" },
  { max: 101, label: "收势", detail: "动作放松归中" },
];

function getTrainingPhase(progress = state.progress) {
  return trainingPhaseDefinitions.find((item) => progress <= item.max) || trainingPhaseDefinitions.at(-1);
}

function formatTrainingTime(milliseconds) {
  const seconds = Math.max(0, Math.floor(milliseconds / 1000));
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function resetTrainingSessionData() {
  cancelLiveCoachRequest("等待训练开始");
  Object.assign(state.training, {
    started: false,
    elapsedMs: 0,
    lastFrameAt: 0,
    lastUiAt: 0,
    sampleCount: 0,
    confidence: 0,
    scoreSamples: [],
    issueCounts: [0, 0, 0, 0],
    phase: "准备",
    coachTab: "realtime",
    summary: null,
  });
  Object.assign(state.coach, {
    lastTip: "",
    lastTipAt: 0,
    lastSpokenText: "",
    lastSpokenAt: 0,
    lastModelAt: 0,
    lastModelReceivedAt: 0,
    lastModelSignature: "",
    lastModelCue: "",
    modelFailureCount: 0,
  });
  setTrainingCoachTab("realtime");
  syncCoachControls();
  updateTrainingSessionUI(true);
}

function buildTrainingCueItems() {
  if (!state.training.sampleCount) {
    return [
      { label: "准备提示", text: "头、肩、胯保持在画面内" },
      { label: "评分条件", text: "稳定识别后自动开始采样" },
    ];
  }
  return state.training.issueCounts
    .map((count, index) => ({ count, index }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 2)
    .map(({ count, index }) => ({
      label: `${scoreLabels[index]} · ${count}次`,
      text: compactCoachText(scoreFixTips[index], 22),
    }));
}

function updateTrainingSessionUI(force = false) {
  if (!$("#trainingQuality")) return;
  const phase = state.training.started ? getTrainingPhase() : trainingPhaseDefinitions[0];
  state.training.phase = phase.label;
  const hasPose = Boolean(state.pose.lastLandmarks);
  const quality = !state.pose.live
    ? "等待输入"
    : !hasPose
      ? "寻找人体"
      : state.training.confidence >= 88
        ? "稳定"
        : state.training.confidence >= 72
          ? "可评分"
          : "需调整";
  $("#trainingQuality").textContent = quality;
  $("#trainingConfidence").textContent = hasPose ? `关键点 ${state.training.confidence}%` : "关键点 --";
  $("#trainingPhase").textContent = phase.label;
  $("#trainingPhaseDetail").textContent = phase.detail;
  $("#trainingTimer").textContent = formatTrainingTime(state.training.elapsedMs);
  $("#trainingSampleCount").textContent = `${state.training.sampleCount} 次有效采样`;
  const cueList = $("#trainingCueList");
  if (cueList && (force || state.training.sampleCount % 3 === 0)) {
    cueList.replaceChildren(
      ...buildTrainingCueItems().map((item) => {
        const row = document.createElement("div");
        const label = document.createElement("span");
        const text = document.createElement("strong");
        label.textContent = item.label;
        text.textContent = item.text;
        row.append(label, text);
        return row;
      })
    );
  }
  const reportButton = $("#trainingReportButton");
  if (reportButton) reportButton.disabled = !state.training.started;
}

function updateTrainingSessionClock(now = performance.now()) {
  if (!state.training.active) return;
  if (state.runningPractice) {
    if (state.training.lastFrameAt) {
      state.training.elapsedMs += Math.min(1000, Math.max(0, now - state.training.lastFrameAt));
    }
    state.training.lastFrameAt = now;
  } else {
    state.training.lastFrameAt = 0;
  }
  if (now - state.training.lastUiAt >= 480) {
    state.training.lastUiAt = now;
    updateTrainingSessionUI();
  }
}

function recordTrainingSample(features, scores) {
  if (!state.runningPractice || !features || !Array.isArray(scores)) return;
  state.training.confidence = Math.round(Math.max(0, Math.min(1, features.visibility || 0)) * 100);
  state.training.sampleCount += 1;
  state.training.scoreSamples.push(scores.slice(0, 4));
  if (state.training.scoreSamples.length > 180) state.training.scoreSamples.shift();
  const weakestIndex = scores.indexOf(Math.min(...scores));
  state.training.issueCounts[weakestIndex] += 1;
  updateTrainingSessionUI();
}

function buildTrainingSessionSummary() {
  const samples = state.training.scoreSamples;
  const averageScores = samples.length
    ? scoreLabels.map((_, index) =>
        Math.round(samples.reduce((sum, sample) => sum + (sample[index] || 0), 0) / samples.length)
      )
    : state.scores.slice();
  const issueIndex = state.training.issueCounts.indexOf(Math.max(...state.training.issueCounts));
  return {
    durationSeconds: Math.round(state.training.elapsedMs / 1000),
    sampleCount: state.training.sampleCount,
    confidence: state.training.confidence,
    averageScores,
    overallScore: Math.round(averageScores.reduce((sum, score) => sum + score, 0) / averageScores.length),
    primaryIssue: scoreLabels[issueIndex] || scoreLabels[0],
    phase: state.training.phase,
    source: state.training.source,
  };
}

function setTrainingCoachTab(tab) {
  const selected = tab === "plan" ? "plan" : "realtime";
  state.training.coachTab = selected;
  $$('[data-coach-tab]').forEach((button) => {
    const active = button.dataset.coachTab === selected;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  $$('[data-coach-panel]').forEach((panel) => {
    const active = panel.dataset.coachPanel === selected;
    panel.classList.toggle("active", active);
    panel.hidden = !active;
  });
}

function buildLocalCoachPlan(context) {
  const weakestIndex = context.scores.indexOf(Math.min(...context.scores));
  const weakest = scoreLabels[weakestIndex] || "重心稳定性";
  const keypoint = context.move.keypoints[0] || "腰胯带动";
  return {
    headline: `下一轮先稳住${weakest}`,
    summary: `${context.move.name}当前优先修正${weakest}，先降低速度，再恢复动作幅度。`,
    priority: weakest,
    realtimeCue: compactCoachText(scoreFixTips[weakestIndex], 28),
    actions: [
      { title: "速度", instruction: "整体放慢约一成" },
      { title: "动作", instruction: `重点确认${keypoint}` },
      { title: "检查", instruction: "转换处停半拍再继续" },
    ],
  };
}

function normalizeCoachPlan(plan, context) {
  const fallback = buildLocalCoachPlan(context);
  if (!plan || typeof plan !== "object") return fallback;
  const safeText = (value, fallbackText, limit) => {
    const text = typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
    return (text || fallbackText).slice(0, limit);
  };
  const actions = Array.isArray(plan.actions)
    ? plan.actions
        .filter((item) => item && typeof item === "object")
        .slice(0, 3)
        .map((item, index) => ({
          title: safeText(item.title, fallback.actions[index]?.title || `步骤${index + 1}`, 12),
          instruction: safeText(item.instruction, fallback.actions[index]?.instruction || "保持动作稳定", 32),
        }))
    : fallback.actions;
  return {
    headline: safeText(plan.headline, fallback.headline, 32),
    summary: safeText(plan.summary, fallback.summary, 96),
    priority: safeText(plan.priority, fallback.priority, 18),
    realtimeCue: safeText(plan.realtimeCue, fallback.realtimeCue, 36),
    actions: actions.length ? actions : fallback.actions,
  };
}

function renderTrainingCoachPlan(plan, context = buildCoachContext("training")) {
  const safePlan = normalizeCoachPlan(plan, context);
  $("#trainingAiHeadline").textContent = safePlan.headline;
  $("#trainingAiCoachText").textContent = safePlan.summary;
  const actionList = $("#trainingAiActions");
  actionList.replaceChildren(
    ...safePlan.actions.map((item) => {
      const row = document.createElement("div");
      const label = document.createElement("span");
      const text = document.createElement("strong");
      label.textContent = item.title;
      text.textContent = item.instruction;
      row.append(label, text);
      return row;
    })
  );
  return safePlan;
}

async function refreshCoachAvailability() {
  try {
    const response = await fetch("/api/coach/status", { cache: "no-store" });
    if (!response.ok) throw new Error(`接口状态 ${response.status}`);
    const data = await response.json();
    state.coach.available = data.mode === "model";
    state.coach.model = data.model || "local-coach";
  } catch (error) {
    state.coach.available = false;
    state.coach.model = "local-coach";
  }
  const label = state.coach.available ? `${state.coach.model} · 实时教练` : "本地规则教练";
  if ($("#trainingCoachMode") && !state.coach.modelInFlight) $("#trainingCoachMode").textContent = label;
  if ($("#coachMode")) $("#coachMode").textContent = label;
  if (state.training.active) {
    setLiveCoachStatus(
      state.coach.available
        ? state.coach.liveEnabled
          ? "已连接模型，稳定后约 5 秒更新"
          : "模型已连接，实时指导未开启"
        : "未连接模型，暂用本地实时纠错",
      state.coach.available ? "ready" : "fallback"
    );
  }
  syncCoachControls();
}

function setRingScore(selector, value) {
  const node = $(selector);
  if (!node) return;
  node.style.setProperty("--score", value);
  const strong = node.querySelector("strong");
  if (strong) strong.textContent = value;
}

function drawSoftGrid(ctx, width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 46) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 46) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawVideoCover(ctx, video, width, height) {
  const videoWidth = video.videoWidth || 16;
  const videoHeight = video.videoHeight || 9;
  const scale = Math.max(width / videoWidth, height / videoHeight);
  const drawWidth = videoWidth * scale;
  const drawHeight = videoHeight * scale;
  const x = (width - drawWidth) / 2;
  const y = (height - drawHeight) / 2;
  ctx.drawImage(video, x, y, drawWidth, drawHeight);
}

function drawVideoContain(ctx, video, width, height) {
  const videoWidth = video.videoWidth || 16;
  const videoHeight = video.videoHeight || 9;
  const scale = Math.min(width / videoWidth, height / videoHeight);
  const drawWidth = videoWidth * scale;
  const drawHeight = videoHeight * scale;
  const x = (width - drawWidth) / 2;
  const y = (height - drawHeight) / 2;
  ctx.drawImage(video, x, y, drawWidth, drawHeight);
  return { x, y, width: drawWidth, height: drawHeight };
}

function getVideoContainRect(video, width, height) {
  const videoWidth = video.videoWidth || 16;
  const videoHeight = video.videoHeight || 9;
  const scale = Math.min(width / videoWidth, height / videoHeight);
  const drawWidth = videoWidth * scale;
  const drawHeight = videoHeight * scale;
  return {
    x: (width - drawWidth) / 2,
    y: (height - drawHeight) / 2,
    width: drawWidth,
    height: drawHeight,
  };
}

const standardVideoDisplayCrop = Object.freeze({
  x: 0.12,
  y: 0.055,
  width: 0.76,
  height: 0.86,
});

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function resolveVideoCrop(crop) {
  const source = crop || { x: 0, y: 0, width: 1, height: 1 };
  const x = clamp(source.x ?? 0, 0, 0.94);
  const y = clamp(source.y ?? 0, 0, 0.94);
  return {
    x,
    y,
    width: clamp(source.width ?? 1, 0.2, 1 - x),
    height: clamp(source.height ?? 1, 0.2, 1 - y),
  };
}

function getVideoContainCroppedRect(video, width, height, crop = null) {
  const videoWidth = video.videoWidth || 16;
  const videoHeight = video.videoHeight || 9;
  const safeCrop = resolveVideoCrop(crop);
  const sourceWidth = videoWidth * safeCrop.width;
  const sourceHeight = videoHeight * safeCrop.height;
  const scale = Math.min(width / sourceWidth, height / sourceHeight);
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  return {
    x: (width - drawWidth) / 2,
    y: (height - drawHeight) / 2,
    width: drawWidth,
    height: drawHeight,
    crop: safeCrop,
    sourceX: videoWidth * safeCrop.x,
    sourceY: videoHeight * safeCrop.y,
    sourceWidth,
    sourceHeight,
  };
}

function drawVideoContainCropped(ctx, video, width, height, crop = null) {
  const rect = getVideoContainCroppedRect(video, width, height, crop);
  ctx.drawImage(
    video,
    rect.sourceX,
    rect.sourceY,
    rect.sourceWidth,
    rect.sourceHeight,
    rect.x,
    rect.y,
    rect.width,
    rect.height
  );
  return rect;
}

function pointToCropDisplay(point, crop) {
  return [(point[0] - crop.x) / crop.width, (point[1] - crop.y) / crop.height];
}

function pointFromCropDisplay(point, crop) {
  return [crop.x + point[0] * crop.width, crop.y + point[1] * crop.height];
}

function poseToCropDisplay(pose, crop) {
  return Object.fromEntries(Object.entries(pose).map(([key, point]) => [key, pointToCropDisplay(point, crop)]));
}

function landmarksToCropDisplay(landmarks, crop) {
  return landmarks.map((landmark) => ({
    ...landmark,
    x: (landmark.x - crop.x) / crop.width,
    y: (landmark.y - crop.y) / crop.height,
  }));
}

function keepStandardVideoInActionWindow(video) {
  if (!video || !Number.isFinite(video.duration) || video.duration <= 0.5) return;
  const start = video.duration * state.standard.actionStartRatio;
  const end = video.duration * state.standard.actionEndRatio;
  if (video.currentTime >= end || video.currentTime < start - 0.15) {
    try {
      video.currentTime = start;
    } catch (error) {
      // Seeking may fail before metadata settles; the next draw tick will retry.
    }
  }
}

function maskStandardVideoWatermarks(ctx, rect) {
  ctx.save();
  ctx.fillStyle = "rgba(17, 25, 20, 0.62)";
  ctx.fillRect(rect.x, rect.y + rect.height * 0.9, rect.width, rect.height * 0.1);

  const gradient = ctx.createLinearGradient(0, rect.y + rect.height * 0.8, 0, rect.y + rect.height);
  gradient.addColorStop(0, "rgba(17,25,20,0)");
  gradient.addColorStop(1, "rgba(17,25,20,0.66)");
  ctx.fillStyle = gradient;
  ctx.fillRect(rect.x, rect.y + rect.height * 0.78, rect.width, rect.height * 0.22);
  ctx.restore();
}

function skeletonPoints(width, height, t, pose = "cloud") {
  const cx = width * 0.5;
  const cy = height * 0.52;
  const sway = Math.sin(t) * 22;
  const breath = Math.sin(t * 1.7) * 7;
  const reach = pose === "push" ? 64 : 44;
  const low = pose === "avatar" ? 18 : 0;
  return {
    head: [cx + sway * 0.18, cy - 160 + breath * 0.4],
    neck: [cx + sway * 0.14, cy - 105],
    chest: [cx + sway * 0.1, cy - 52 + breath],
    waist: [cx, cy + 28],
    lShoulder: [cx - 54, cy - 96 + breath],
    rShoulder: [cx + 54, cy - 96 - breath],
    lElbow: [cx - 104 - Math.cos(t) * 16, cy - 48 + Math.sin(t) * 22],
    rElbow: [cx + 105 + Math.sin(t) * reach, cy - 52 + Math.cos(t) * 20],
    lWrist: [cx - 144 - Math.cos(t) * 34, cy + 6 + Math.sin(t) * 38],
    rWrist: [cx + 156 + Math.sin(t) * reach, cy - 6 + Math.cos(t) * 34],
    lHip: [cx - 42, cy + 40],
    rHip: [cx + 42, cy + 40],
    lKnee: [cx - 94 - Math.sin(t) * 12, cy + 136 + low],
    rKnee: [cx + 88 + Math.cos(t) * 11, cy + 126 - low],
    lAnkle: [cx - 148 - Math.sin(t) * 22, cy + 218],
    rAnkle: [cx + 134 + Math.cos(t) * 18, cy + 218],
  };
}

function drawSkeleton(ctx, points, options = {}) {
  const bones = [
    ["head", "neck"],
    ["neck", "lShoulder"],
    ["neck", "rShoulder"],
    ["lShoulder", "lElbow"],
    ["lElbow", "lWrist"],
    ["rShoulder", "rElbow"],
    ["rElbow", "rWrist"],
    ["neck", "chest"],
    ["chest", "waist"],
    ["waist", "lHip"],
    ["waist", "rHip"],
    ["lHip", "lKnee"],
    ["lKnee", "lAnkle"],
    ["rHip", "rKnee"],
    ["rKnee", "rAnkle"],
  ];
  const line = options.line || "rgba(255,255,255,0.86)";
  const dot = options.dot || "#f7c762";

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.shadowColor = options.shadow || "rgba(194,154,70,0.28)";
  ctx.shadowBlur = options.blur || 16;
  bones.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(points[a][0], points[a][1]);
    ctx.lineTo(points[b][0], points[b][1]);
    ctx.strokeStyle = line;
    ctx.lineWidth = options.lineWidth || 6;
    ctx.stroke();
  });

  Object.values(points).forEach(([x, y], index) => {
    const isHead = index === 0;
    ctx.beginPath();
    ctx.fillStyle = isHead ? options.head || "#ffffff" : dot;
    ctx.arc(x, y, isHead ? options.headRadius || 16 : options.dotRadius || 7, 0, Math.PI * 2);
    ctx.fill();
    if (isHead && options.headStroke) {
      ctx.lineWidth = options.headStrokeWidth || 2;
      ctx.strokeStyle = options.headStroke;
      ctx.stroke();
    }
  });
  ctx.restore();
}

function pushMidpoint(a, b) {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

function scalePushPoints(points, width, height) {
  const compactStage = width <= 520;
  const scale = compactStage ? 0.9 : Math.min(1.28, Math.max(1, height / 820));
  const offsetY = compactStage ? Math.min(68, height * 0.11) : 0;
  if (scale === 1 && offsetY === 0) return points;
  const pivotX = width * 0.5;
  const pivotY = height * 0.55;
  return Object.fromEntries(
    Object.entries(points).map(([key, [x, y]]) => [
      key,
      [pivotX + (x - pivotX) * scale, pivotY + (y - pivotY) * scale + offsetY],
    ])
  );
}

function drawPushBodyVolume(ctx, points, width, height, t) {
  const bodySegments = [
    ["neck", "lShoulder"],
    ["neck", "rShoulder"],
    ["lShoulder", "lElbow"],
    ["lElbow", "lWrist"],
    ["rShoulder", "rElbow"],
    ["rElbow", "rWrist"],
    ["lHip", "lKnee"],
    ["lKnee", "lAnkle"],
    ["rHip", "rKnee"],
    ["rKnee", "rAnkle"],
  ];
  const floorY = Math.min(height - 46, Math.max(points.lAnkle[1], points.rAnkle[1]) + 38);
  const bodyGradient = ctx.createLinearGradient(0, points.head[1], 0, floorY);
  bodyGradient.addColorStop(0, "rgba(49, 78, 61, 0.92)");
  bodyGradient.addColorStop(0.58, "rgba(20, 43, 31, 0.94)");
  bodyGradient.addColorStop(1, "rgba(8, 24, 17, 0.96)");

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const stageShadow = ctx.createRadialGradient(width * 0.5, floorY, 8, width * 0.5, floorY, width * 0.27);
  stageShadow.addColorStop(0, "rgba(215, 183, 103, 0.2)");
  stageShadow.addColorStop(0.42, "rgba(215, 183, 103, 0.08)");
  stageShadow.addColorStop(1, "rgba(215, 183, 103, 0)");
  ctx.fillStyle = stageShadow;
  ctx.beginPath();
  ctx.ellipse(width * 0.5, floorY, width * 0.25, 28, 0, 0, Math.PI * 2);
  ctx.fill();

  [points.lAnkle, points.rAnkle].forEach(([x, y], index) => {
    const pulse = 0.82 + Math.sin(t * 1.6 + index * Math.PI) * 0.12;
    const pressure = ctx.createRadialGradient(x, y + 7, 2, x, y + 7, 42);
    pressure.addColorStop(0, `rgba(240, 199, 102, ${0.32 * pulse})`);
    pressure.addColorStop(0.38, `rgba(215, 183, 103, ${0.13 * pulse})`);
    pressure.addColorStop(1, "rgba(215, 183, 103, 0)");
    ctx.fillStyle = pressure;
    ctx.beginPath();
    ctx.ellipse(x, y + 9, 42, 14, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  bodySegments.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(points[a][0], points[a][1]);
    ctx.lineTo(points[b][0], points[b][1]);
    ctx.strokeStyle = "rgba(215, 183, 103, 0.22)";
    ctx.lineWidth = 24;
    ctx.stroke();
    ctx.strokeStyle = bodyGradient;
    ctx.lineWidth = 16;
    ctx.stroke();
  });

  const torsoGradient = ctx.createLinearGradient(points.chest[0], points.neck[1], points.waist[0], points.waist[1] + 36);
  torsoGradient.addColorStop(0, "rgba(54, 84, 65, 0.94)");
  torsoGradient.addColorStop(1, "rgba(10, 29, 20, 0.96)");
  ctx.beginPath();
  ctx.moveTo(points.lShoulder[0], points.lShoulder[1]);
  ctx.quadraticCurveTo(points.chest[0] - 62, points.chest[1], points.lHip[0], points.lHip[1]);
  ctx.quadraticCurveTo(points.waist[0], points.waist[1] + 22, points.rHip[0], points.rHip[1]);
  ctx.quadraticCurveTo(points.chest[0] + 62, points.chest[1], points.rShoulder[0], points.rShoulder[1]);
  ctx.quadraticCurveTo(points.neck[0], points.neck[1] + 18, points.lShoulder[0], points.lShoulder[1]);
  ctx.closePath();
  ctx.fillStyle = torsoGradient;
  ctx.fill();
  ctx.strokeStyle = "rgba(215, 183, 103, 0.48)";
  ctx.lineWidth = 1.6;
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 250, 232, 0.14)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(points.chest[0] - 44, points.chest[1] + 2);
  ctx.quadraticCurveTo(points.chest[0], points.chest[1] + 18, points.chest[0] + 44, points.chest[1] + 2);
  ctx.stroke();

  ctx.fillStyle = "rgba(215, 183, 103, 0.12)";
  ctx.strokeStyle = "rgba(215, 183, 103, 0.46)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.arc(points.waist[0], points.waist[1], 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function getPushTargetPoint(points, target) {
  const targets = {
    "肩肘": pushMidpoint(points.rShoulder, points.rElbow),
    "手腕": points.rWrist,
    "胸前": points.chest,
    "腰胯": points.waist,
    "脚步": pushMidpoint(points.lAnkle, points.rAnkle),
  };
  return targets[target] || points.chest;
}

function positionPushHotspots(points, width, height) {
  const placements = {
    "肩肘": { point: pushMidpoint(points.rShoulder, points.rElbow), dx: 28, dy: -34 },
    "手腕": { point: points.rWrist, dx: 22, dy: -16 },
    "胸前": { point: points.chest, dx: -106, dy: -18 },
    "腰胯": { point: points.waist, dx: -108, dy: 16 },
    "脚步": { point: points.lAnkle, dx: -32, dy: 30 },
  };
  $$(".push-avatar .hotspot").forEach((button) => {
    const placement = placements[button.dataset.hotspot];
    if (!placement) return;
    const x = Math.max(12, Math.min(width - 90, placement.point[0] + placement.dx));
    const y = Math.max(12, Math.min(height - 54, placement.point[1] + placement.dy));
    button.style.left = `${Math.round(x)}px`;
    button.style.top = `${Math.round(y)}px`;
  });
}

function drawPushTelemetry(ctx, points, width, height, t) {
  const center = points.waist;
  const floorY = Math.min(height - 46, Math.max(points.lAnkle[1], points.rAnkle[1]) + 38);
  ctx.save();
  ctx.lineCap = "round";

  const flowGradient = ctx.createLinearGradient(points.lWrist[0], points.lWrist[1], points.rWrist[0], points.rWrist[1]);
  flowGradient.addColorStop(0, "rgba(215, 183, 103, 0.08)");
  flowGradient.addColorStop(0.5, "rgba(244, 207, 119, 0.72)");
  flowGradient.addColorStop(1, "rgba(215, 183, 103, 0.12)");
  ctx.strokeStyle = flowGradient;
  ctx.lineWidth = 2.4;
  ctx.setLineDash([13, 14]);
  ctx.lineDashOffset = -t * 18;
  ctx.shadowColor = "rgba(215, 183, 103, 0.32)";
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.moveTo(points.lWrist[0], points.lWrist[1]);
  ctx.bezierCurveTo(
    points.chest[0] - 98,
    points.chest[1] - 72,
    points.chest[0] - 82,
    points.waist[1] + 24,
    center[0],
    center[1]
  );
  ctx.bezierCurveTo(
    points.waist[0] + 86,
    points.waist[1] + 58,
    points.rWrist[0] - 88,
    points.rWrist[1] + 56,
    points.rWrist[0],
    points.rWrist[1]
  );
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.setLineDash([4, 8]);
  ctx.strokeStyle = "rgba(215, 183, 103, 0.34)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(center[0], center[1]);
  ctx.lineTo(center[0], floorY);
  ctx.stroke();
  ctx.setLineDash([]);

  const balancePulse = 20 + Math.sin(t * 1.4) * 3;
  ctx.strokeStyle = "rgba(240, 199, 102, 0.72)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(center[0], center[1], balancePulse, -0.4, Math.PI * 1.62);
  ctx.stroke();
  ctx.fillStyle = "#f0c766";
  ctx.beginPath();
  ctx.arc(center[0], center[1], 4.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(215, 183, 103, 0.42)";
  ctx.beginPath();
  ctx.arc(points.head[0], points.head[1], 28, -0.55 + Math.sin(t) * 0.08, Math.PI * 1.35);
  ctx.stroke();

  const elapsed = state.push.active ? performance.now() - state.push.startedAt : 0;
  const betweenRounds = Boolean(state.push.current && state.push.sessionActive && !state.push.active);
  const showTarget = Boolean(
    state.push.current && ((state.push.active && shouldRevealPushTarget(elapsed)) || betweenRounds)
  );
  if (showTarget) {
    const target = getPushTargetPoint(points, state.push.current.target);
    const stage = $(".push-stage");
    const tone = stage?.classList.contains("push-success")
      ? "112, 190, 145"
      : stage?.classList.contains("push-miss")
        ? "211, 103, 83"
        : "240, 199, 102";
    const pulse = 18 + (Math.sin(t * 3.4) + 1) * 5;
    ctx.strokeStyle = `rgba(${tone}, 0.9)`;
    ctx.lineWidth = 2;
    ctx.shadowColor = `rgba(${tone}, 0.48)`;
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(target[0], target[1], pulse, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 0.42;
    ctx.beginPath();
    ctx.arc(target[0], target[1], pulse + 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.moveTo(points.chest[0], points.chest[1]);
    ctx.quadraticCurveTo((points.chest[0] + target[0]) / 2, target[1] - 30, target[0], target[1]);
    ctx.strokeStyle = `rgba(${tone}, 0.56)`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.restore();
}

function landmarkPoint(landmark, width, height, mirror = true) {
  const x = mirror ? 1 - landmark.x : landmark.x;
  return [x * width, landmark.y * height];
}

function drawPoseLandmarks(ctx, landmarks, width, height, options = {}) {
  const mirror = options.mirror ?? true;
  const dotIndexes = options.showAllPoints ? landmarks.map((_, index) => index) : visiblePoseLandmarks;
  const lineColor = options.line || "rgba(255,255,255,0.92)";
  const dotColor = options.dot || "#d4a64b";
  const headColor = options.head || "#ffffff";
  const shadowColor = options.shadow || "rgba(212, 166, 75, 0.32)";
  const lineWidth = options.lineWidth || 5;
  const dotRadius = options.dotRadius || 5;
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = 12;
  poseConnections.forEach(([start, end]) => {
    const a = landmarks[start];
    const b = landmarks[end];
    if (!a || !b) return;
    const visibility = Math.min(a.visibility ?? 1, b.visibility ?? 1);
    if (visibility < 0.36) return;
    const [ax, ay] = landmarkPoint(a, width, height, mirror);
    const [bx, by] = landmarkPoint(b, width, height, mirror);
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  });

  dotIndexes.forEach((index) => {
    const landmark = landmarks[index];
    if (!landmark) return;
    if ((landmark.visibility ?? 1) < 0.32) return;
    const [x, y] = landmarkPoint(landmark, width, height, mirror);
    ctx.beginPath();
    ctx.fillStyle = index === 0 ? headColor : dotColor;
    ctx.arc(x, y, index === 0 ? dotRadius + 1.8 : dotRadius, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function midpoint(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function angle(a, b, c) {
  const ab = { x: a.x - b.x, y: a.y - b.y };
  const cb = { x: c.x - b.x, y: c.y - b.y };
  const dot = ab.x * cb.x + ab.y * cb.y;
  const mag = Math.hypot(ab.x, ab.y) * Math.hypot(cb.x, cb.y);
  if (!mag) return 180;
  return (Math.acos(Math.max(-1, Math.min(1, dot / mag))) * 180) / Math.PI;
}

function extractPoseFeatures(landmarks) {
  const lShoulder = landmarks[11];
  const rShoulder = landmarks[12];
  const lWrist = landmarks[15];
  const rWrist = landmarks[16];
  const lHip = landmarks[23];
  const rHip = landmarks[24];
  const lKnee = landmarks[25];
  const rKnee = landmarks[26];
  const lAnkle = landmarks[27];
  const rAnkle = landmarks[28];
  if (![lShoulder, rShoulder, lWrist, rWrist, lHip, rHip, lKnee, rKnee, lAnkle, rAnkle].every(Boolean)) return null;

  const shoulders = midpoint(lShoulder, rShoulder);
  const hips = midpoint(lHip, rHip);
  const shoulderWidth = Math.max(0.001, distance(lShoulder, rShoulder));
  const torso = Math.max(0.001, distance(shoulders, hips));
  const kneeAngle = (angle(lHip, lKnee, lAnkle) + angle(rHip, rKnee, rAnkle)) / 2;
  const visibility =
    [lShoulder, rShoulder, lWrist, rWrist, lHip, rHip, lKnee, rKnee, lAnkle, rAnkle].reduce(
      (sum, item) => sum + (item.visibility ?? 1),
      0
    ) / 10;

  return {
    armSpan: distance(lWrist, rWrist) / shoulderWidth,
    wristBalance: Math.abs(lWrist.y - rWrist.y) / torso,
    kneeAngle,
    alignment: Math.abs(shoulders.x - hips.x) / shoulderWidth,
    centerX: hips.x,
    centerY: hips.y,
    visibility,
  };
}

function scoreFeature(value, target, tolerance) {
  return Math.max(55, Math.min(99, Math.round(100 - (Math.abs(value - target) / tolerance) * 34)));
}

function smoothLandmarks(current, previous, alpha = 0.42) {
  if (!previous || previous.length !== current.length) return current.map((item) => ({ ...item }));
  return current.map((item, index) => {
    const last = previous[index];
    if (!last) return { ...item };
    return {
      ...item,
      x: last.x * (1 - alpha) + item.x * alpha,
      y: last.y * (1 - alpha) + item.y * alpha,
      z: (last.z ?? 0) * (1 - alpha) + (item.z ?? 0) * alpha,
      visibility: item.visibility ?? last.visibility ?? 1,
    };
  });
}

function interpolate(a, b, amount) {
  return a + (b - a) * amount;
}

function getYunshouTemplateProgress(video) {
  if (video && Number.isFinite(video.duration) && video.duration > 0.5) {
    const start = video.duration * state.standard.actionStartRatio;
    const end = video.duration * state.standard.actionEndRatio;
    const span = Math.max(1, end - start);
    const progress = (video.currentTime + state.standard.phaseOffset - start) / span;
    return Math.max(0, Math.min(1, progress));
  }
  return ((performance.now() / 1000) % 8) / 8;
}

function getBakedYunshouLandmarks(video) {
  const progress = getYunshouTemplateProgress(video);
  const frames = state.standard.calibratedFrames || [
    {
      t: 0,
      p: {
        head: [0.56, 0.28],
        lShoulder: [0.49, 0.41],
        rShoulder: [0.62, 0.41],
        lElbow: [0.39, 0.38],
        rElbow: [0.68, 0.34],
        lWrist: [0.3, 0.34],
        rWrist: [0.76, 0.27],
        lHip: [0.45, 0.6],
        rHip: [0.58, 0.6],
        lKnee: [0.37, 0.74],
        rKnee: [0.66, 0.74],
        lAnkle: [0.25, 0.9],
        rAnkle: [0.77, 0.9],
        lFoot: [0.22, 0.91],
        rFoot: [0.8, 0.91],
      },
    },
    {
      t: 0.18,
      p: {
        head: [0.56, 0.28],
        lShoulder: [0.49, 0.41],
        rShoulder: [0.62, 0.41],
        lElbow: [0.46, 0.41],
        rElbow: [0.62, 0.38],
        lWrist: [0.56, 0.38],
        rWrist: [0.58, 0.49],
        lHip: [0.46, 0.6],
        rHip: [0.59, 0.6],
        lKnee: [0.38, 0.74],
        rKnee: [0.67, 0.74],
        lAnkle: [0.26, 0.9],
        rAnkle: [0.77, 0.9],
        lFoot: [0.23, 0.91],
        rFoot: [0.8, 0.91],
      },
    },
    {
      t: 0.34,
      p: {
        head: [0.57, 0.28],
        lShoulder: [0.5, 0.41],
        rShoulder: [0.63, 0.41],
        lElbow: [0.61, 0.4],
        rElbow: [0.59, 0.45],
        lWrist: [0.73, 0.36],
        rWrist: [0.51, 0.53],
        lHip: [0.47, 0.6],
        rHip: [0.6, 0.6],
        lKnee: [0.39, 0.75],
        rKnee: [0.68, 0.75],
        lAnkle: [0.27, 0.9],
        rAnkle: [0.78, 0.9],
        lFoot: [0.24, 0.91],
        rFoot: [0.81, 0.91],
      },
    },
    {
      t: 0.5,
      p: {
        head: [0.57, 0.29],
        lShoulder: [0.5, 0.42],
        rShoulder: [0.63, 0.42],
        lElbow: [0.68, 0.39],
        rElbow: [0.55, 0.48],
        lWrist: [0.78, 0.42],
        rWrist: [0.47, 0.56],
        lHip: [0.47, 0.61],
        rHip: [0.6, 0.61],
        lKnee: [0.39, 0.75],
        rKnee: [0.68, 0.75],
        lAnkle: [0.27, 0.9],
        rAnkle: [0.78, 0.9],
        lFoot: [0.24, 0.91],
        rFoot: [0.81, 0.91],
      },
    },
    {
      t: 0.68,
      p: {
        head: [0.56, 0.28],
        lShoulder: [0.49, 0.41],
        rShoulder: [0.62, 0.41],
        lElbow: [0.55, 0.46],
        rElbow: [0.48, 0.39],
        lWrist: [0.61, 0.55],
        rWrist: [0.37, 0.35],
        lHip: [0.46, 0.6],
        rHip: [0.59, 0.6],
        lKnee: [0.38, 0.74],
        rKnee: [0.67, 0.74],
        lAnkle: [0.26, 0.9],
        rAnkle: [0.77, 0.9],
        lFoot: [0.23, 0.91],
        rFoot: [0.8, 0.91],
      },
    },
    {
      t: 0.84,
      p: {
        head: [0.55, 0.28],
        lShoulder: [0.48, 0.41],
        rShoulder: [0.61, 0.41],
        lElbow: [0.42, 0.42],
        rElbow: [0.39, 0.36],
        lWrist: [0.33, 0.48],
        rWrist: [0.28, 0.34],
        lHip: [0.45, 0.6],
        rHip: [0.58, 0.6],
        lKnee: [0.37, 0.74],
        rKnee: [0.66, 0.74],
        lAnkle: [0.25, 0.9],
        rAnkle: [0.77, 0.9],
        lFoot: [0.22, 0.91],
        rFoot: [0.8, 0.91],
      },
    },
    {
      t: 1,
      p: {
        head: [0.56, 0.28],
        lShoulder: [0.49, 0.41],
        rShoulder: [0.62, 0.41],
        lElbow: [0.39, 0.38],
        rElbow: [0.68, 0.34],
        lWrist: [0.3, 0.34],
        rWrist: [0.76, 0.27],
        lHip: [0.45, 0.6],
        rHip: [0.58, 0.6],
        lKnee: [0.37, 0.74],
        rKnee: [0.66, 0.74],
        lAnkle: [0.25, 0.9],
        rAnkle: [0.77, 0.9],
        lFoot: [0.22, 0.91],
        rFoot: [0.8, 0.91],
      },
    },
  ];

  let previous = frames[0];
  let next = frames[frames.length - 1];
  for (let index = 1; index < frames.length; index += 1) {
    if (progress <= frames[index].t) {
      previous = frames[index - 1];
      next = frames[index];
      break;
    }
  }

  const span = Math.max(0.001, next.t - previous.t);
  const rawAmount = Math.max(0, Math.min(1, (progress - previous.t) / span));
  const amount = rawAmount * rawAmount * (3 - 2 * rawAmount);
  const landmarks = Array.from({ length: 33 }, () => ({ x: 0, y: 0, z: 0, visibility: 0 }));
  Object.entries(standardPoseKeyMap).forEach(([key, index]) => {
    const a = previous.p[key];
    const b = next.p[key] || a;
    if (!a || !b) return;
    let x = interpolate(a[0], b[0], amount);
    let y = interpolate(a[1], b[1], amount);
    const phase = progress * Math.PI * 2;
    const weight = Math.sin(phase);
    const settle = Math.sin(phase * 2);
    if (["head", "lShoulder", "rShoulder"].includes(key)) {
      x += weight * 0.01;
      y += Math.abs(settle) * 0.006;
    }
    if (["lHip", "rHip"].includes(key)) {
      x += weight * 0.025;
      y += Math.abs(settle) * 0.012;
    }
    if (key === "lKnee") {
      x += weight * 0.026;
      y += Math.max(0, weight) * 0.035 + Math.max(0, -weight) * 0.01;
    }
    if (key === "rKnee") {
      x += weight * 0.026;
      y += Math.max(0, -weight) * 0.035 + Math.max(0, weight) * 0.01;
    }
    if (key === "lAnkle" || key === "lFoot") {
      x += weight * 0.006;
      y += Math.max(0, weight) * 0.006;
    }
    if (key === "rAnkle" || key === "rFoot") {
      x += weight * 0.006;
      y += Math.max(0, -weight) * 0.006;
    }
    const useGlobalAlign = !state.standard.calibratedFrames;
    landmarks[index] = {
      x: useGlobalAlign ? 0.5 + (x - 0.5) * state.standard.scaleX + state.standard.alignX : x,
      y: useGlobalAlign ? 0.5 + (y - 0.5) * state.standard.scaleY + state.standard.alignY : y,
      z: 0,
      visibility: 0.98,
    };
  });
  return landmarks;
}

function updateStandardReference(features, landmarks) {
  const history = state.standard.history;
  history.push({ x: features.centerX, y: features.centerY, time: performance.now() });
  if (history.length > 36) history.shift();

  state.standard.lastFeatures = features;
  state.standard.lastLandmarks = landmarks;
  state.standard.ready = true;
  if (history.length > 1) {
    state.standard.motion = distance(history[history.length - 1], history[history.length - 2]);
  }
  if (history.length > 8) {
    state.standard.centerSway = Math.max(...history.map((item) => item.x)) - Math.min(...history.map((item) => item.x));
  }
}

function getReferenceTemplate() {
  const fallback = standardFeatureTemplates[state.selectedMove.id] || standardFeatureTemplates.yunshou;
  if (state.selectedMove.id !== "yunshou" || !state.standard.lastFeatures) return fallback;
  return {
    ...fallback,
    ...state.standard.lastFeatures,
    motion: state.standard.motion || fallback.motion,
    centerSway: state.standard.centerSway || 0.06,
  };
}

function scoreLivePose(features) {
  const template = getReferenceTemplate();
  const history = state.pose.history;
  history.push({ x: features.centerX, y: features.centerY, time: performance.now() });
  if (history.length > 36) history.shift();

  const centerSway =
    history.length > 8
      ? Math.max(...history.map((item) => item.x)) - Math.min(...history.map((item) => item.x))
      : 0.02;
  const motion =
    history.length > 1
      ? distance(history[history.length - 1], history[history.length - 2])
      : template.motion;

  const posture = Math.round((scoreFeature(features.armSpan, template.armSpan, 1.5) + features.visibility * 100) / 2);
  const targetSway = template.centerSway || 0.06;
  const stability = Math.max(
    58,
    Math.min(98, Math.round(98 - Math.abs(centerSway - targetSway) * 260 - Math.abs(features.alignment - template.alignment) * 90))
  );
  const rhythm = scoreFeature(motion, template.motion, 0.035);
  const coordination = Math.round(
    (scoreFeature(features.wristBalance, template.wristBalance, 0.55) +
      scoreFeature(features.kneeAngle, template.kneeAngle, 34) +
      scoreFeature(features.alignment, template.alignment, 0.28)) /
      3
  );
  return [posture, stability, rhythm, coordination];
}

async function ensurePoseModel() {
  if (state.pose.ready || state.pose.loading) return;
  state.pose.loading = true;
  $("#poseState").textContent = "Pose 模型加载中";
  try {
    const vision = await import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14");
    const fileset = await vision.FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
    );
    const modelBase = "https://storage.googleapis.com/mediapipe-models/pose_landmarker";
    const models = [
      `${modelBase}/pose_landmarker_full/float16/latest/pose_landmarker_full.task`,
      `${modelBase}/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task`,
    ];
    let lastError = null;
    for (const modelAssetPath of models) {
      try {
        state.pose.landmarker = await vision.PoseLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath },
          runningMode: "VIDEO",
          numPoses: 1,
          minPoseDetectionConfidence: 0.55,
          minPosePresenceConfidence: 0.55,
          minTrackingConfidence: 0.55,
        });
        lastError = null;
        break;
      } catch (error) {
        lastError = error;
      }
    }
    if (!state.pose.landmarker) throw lastError || new Error("Pose model failed");
    state.pose.ready = true;
    $("#poseState").textContent = "Pose 实时识别";
  } catch (error) {
    state.pose.ready = false;
    $("#poseState").textContent = "Pose 加载失败，使用模拟骨架";
    toast("Pose 模型暂未加载成功，已保留模拟跟练");
  } finally {
    state.pose.loading = false;
  }
}

function detectLivePose(video, streamKey = "user") {
  if (!state.pose.ready || !state.pose.landmarker || video.readyState < 2) return null;
  const stream = state.pose.streams[streamKey] || state.pose.streams.user;
  if (video.currentTime === stream.lastVideoTime) return stream.landmarks;
  stream.lastVideoTime = video.currentTime;
  try {
    const result = state.pose.landmarker.detectForVideo(video, performance.now());
    const landmarks = result.landmarks && result.landmarks[0];
    stream.smoothed = landmarks ? smoothLandmarks(landmarks, stream.smoothed, streamKey === "standard" ? 0.34 : 0.46) : null;
    stream.landmarks = stream.smoothed;
    if (streamKey === "user") {
      state.pose.lastVideoTime = video.currentTime;
      state.pose.lastLandmarks = stream.landmarks;
    }
    return stream.landmarks;
  } catch (error) {
    $("#poseState").textContent = "Pose 识别暂停";
    return stream.landmarks;
  }
}

function drawInkArc(ctx, width, height, t) {
  ctx.save();
  ctx.translate(width * 0.5, height * 0.52);
  ctx.rotate(Math.sin(t * 0.35) * 0.18);
  for (let i = 0; i < 18; i += 1) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${i % 3 ? "21,25,20" : "194,139,50"}, ${0.24 - i * 0.01})`;
    ctx.lineWidth = 16 - i * 0.52;
    ctx.arc(0, 0, 120 + i * 13, -1.12 + i * 0.04, 1.28 + i * 0.035);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCaptureStage(ctx, width, height, t, options = {}) {
  const centerX = options.centerX || width * 0.5;
  const centerY = options.centerY || height * 0.48;
  const horizon = options.horizon || height * 0.66;
  const floorBottom = height * 0.98;
  const intensity = options.intensity || 1;

  ctx.save();
  const base = ctx.createLinearGradient(0, 0, width, height);
  base.addColorStop(0, "#07100d");
  base.addColorStop(0.48, "#101711");
  base.addColorStop(1, "#241d10");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  const centerGlow = ctx.createRadialGradient(centerX, centerY, 8, centerX, centerY, width * 0.46);
  centerGlow.addColorStop(0, `rgba(221, 178, 79, ${0.32 * intensity})`);
  centerGlow.addColorStop(0.34, `rgba(52, 82, 65, ${0.28 * intensity})`);
  centerGlow.addColorStop(1, "rgba(7, 16, 13, 0)");
  ctx.fillStyle = centerGlow;
  ctx.fillRect(0, 0, width, height);

  const inkGlow = ctx.createRadialGradient(width * 0.28, height * 0.26, 20, width * 0.28, height * 0.26, width * 0.36);
  inkGlow.addColorStop(0, `rgba(255, 250, 232, ${0.1 * intensity})`);
  inkGlow.addColorStop(1, "rgba(255, 250, 232, 0)");
  ctx.fillStyle = inkGlow;
  ctx.fillRect(0, 0, width, height);

  ctx.lineCap = "round";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 10; i += 1) {
    const p = i / 10;
    const y = horizon + Math.pow(p, 1.75) * (floorBottom - horizon);
    const spread = width * (0.08 + p * 0.2);
    ctx.beginPath();
    ctx.moveTo(width * 0.18 - spread, y);
    ctx.lineTo(width * 0.82 + spread, y);
    ctx.strokeStyle = `rgba(215, 183, 103, ${(0.045 + p * 0.075) * intensity})`;
    ctx.stroke();
  }

  for (let i = -10; i <= 10; i += 1) {
    const bottomX = centerX + i * width * 0.07;
    ctx.beginPath();
    ctx.moveTo(centerX, horizon);
    ctx.lineTo(bottomX, floorBottom);
    ctx.strokeStyle = `rgba(215, 183, 103, ${(i === 0 ? 0.2 : 0.075) * intensity})`;
    ctx.stroke();
  }

  ctx.strokeStyle = `rgba(215, 183, 103, ${0.18 * intensity})`;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, width * 0.2, height * 0.24, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `rgba(255, 250, 232, ${0.09 * intensity})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(centerX, centerY, Math.min(width, height) * 0.28, -0.25 + Math.sin(t * 0.45) * 0.08, Math.PI * 1.44);
  ctx.stroke();

  ctx.strokeStyle = `rgba(215, 183, 103, ${0.24 * intensity})`;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(centerX, height * 0.18);
  ctx.lineTo(centerX, height * 0.82);
  ctx.stroke();

  for (let i = 0; i < 32; i += 1) {
    const phase = t * 0.18 + i * 1.7;
    const x = width * (0.14 + ((i * 37) % 72) / 100) + Math.sin(phase) * 3;
    const y = height * (0.16 + ((i * 19) % 56) / 100) + Math.cos(phase) * 2;
    ctx.fillStyle = `rgba(215, 183, 103, ${(0.05 + (i % 4) * 0.018) * intensity})`;
    ctx.beginPath();
    ctx.arc(x, y, 1.3 + (i % 3) * 0.35, 0, Math.PI * 2);
    ctx.fill();
  }

  const vignette = ctx.createRadialGradient(centerX, centerY, width * 0.22, centerX, centerY, width * 0.62);
  vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
  vignette.addColorStop(1, `rgba(0, 0, 0, ${0.34 * intensity})`);
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function drawHero(t) {
  if (!canvases.hero || canvases.hero.dataset.staticCover === "true") {
    return;
  }
  const { ctx, width, height } = fitCanvas(canvases.hero);
  ctx.clearRect(0, 0, width, height);
  drawInkArc(ctx, width, height, t);
  const points = skeletonPoints(width, height, t, "cloud");
  drawSkeleton(ctx, points, { lineWidth: 5, line: "rgba(255,255,255,0.9)", dot: "#d9a84b" });

  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.42)";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 12]);
  ctx.beginPath();
  ctx.ellipse(width * 0.5, height * 0.55, 210, 132, Math.sin(t) * 0.1, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawPractice(t) {
  const { ctx, width, height } = fitCanvas(canvases.practice);
  ctx.clearRect(0, 0, width, height);

  const video = $("#cameraVideo");
  const isLive = $(".camera-frame").classList.contains("live");

  if (!isLive) {
    drawCaptureStage(ctx, width, height, t);
    const standard = skeletonPoints(width * 0.46, height, t + 0.45, "cloud");
    const shifted = Object.fromEntries(
      Object.entries(standard).map(([key, [x, y]]) => [key, [x + width * 0.19, y]])
    );
    drawSkeleton(ctx, shifted, {
      lineWidth: 4,
      line: "rgba(215,183,103,0.56)",
      dot: "rgba(255,250,232,0.86)",
      shadow: "rgba(215,183,103,0.3)",
      blur: 10,
    });

    const user = skeletonPoints(width, height, t + state.practiceTick * 0.08, "cloud");
    drawSkeleton(ctx, user, {
      lineWidth: 6,
      line: "rgba(255,250,232,0.9)",
      dot: "#d9a84b",
      shadow: "rgba(215,183,103,0.5)",
      blur: 18,
    });

    ctx.save();
    ctx.strokeStyle = "rgba(212,166,75,0.42)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let i = 0; i < 42; i += 1) {
      const x = width * 0.5 + Math.sin(t - i * 0.14) * (74 + i * 0.7);
      const y = height * 0.52 + Math.cos(t - i * 0.14) * (42 + i * 0.42);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
    return;
  }

  const liveLandmarks = detectLivePose(video, "user");
  if (liveLandmarks) {
    drawPoseLandmarks(ctx, liveLandmarks, width, height, {
      mirror: state.training.source !== "upload",
    });
    const features = extractPoseFeatures(liveLandmarks);
    if (features && performance.now() - state.pose.lastScoreAt > 480) {
      state.scores = scoreLivePose(features);
      state.pose.lastScoreAt = performance.now();
      $("#poseState").textContent = "Pose 正在识别";
      updateRealtimeCoachTip("practice", "Pose 正在识别：");
      updateScores();
    }
    return;
  }

  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.82)";
  ctx.font = "18px Microsoft YaHei, Arial";
  ctx.fillText("等待 Pose 识别，请后退一步保持全身入镜", 28, height - 32);
  ctx.restore();
}

function drawStandard(t) {
  if (!canvases.standard) return;
  drawStandardCanvas(canvases.standard, t);
}

function drawStandardCanvas(canvas, t) {
  if (!canvas) return;
  const { ctx, width, height } = fitCanvas(canvas);
  ctx.clearRect(0, 0, width, height);

  const standardVideo = $("#standardVideo");
  const useVideoStandard = state.selectedMove.id === "yunshou" && standardVideo && standardVideo.readyState >= 2;
  if (useVideoStandard) {
    keepStandardVideoInActionWindow(standardVideo);
    ctx.fillStyle = "#111914";
    ctx.fillRect(0, 0, width, height);
    const videoRect = drawVideoContainCropped(ctx, standardVideo, width, height, standardVideoDisplayCrop);
    ctx.fillStyle = "rgba(16, 23, 18, 0.34)";
    ctx.fillRect(videoRect.x, videoRect.y, videoRect.width, videoRect.height);
    maskStandardVideoWatermarks(ctx, videoRect);
    drawSoftGrid(ctx, width, height);

    const standardLandmarks = getBakedYunshouLandmarks(standardVideo);
    if (standardLandmarks) {
      const displayLandmarks = landmarksToCropDisplay(standardLandmarks, videoRect.crop);
      ctx.save();
      ctx.translate(videoRect.x, videoRect.y);
      ctx.beginPath();
      ctx.rect(0, 0, videoRect.width, videoRect.height);
      ctx.clip();
      drawPoseLandmarks(ctx, displayLandmarks, videoRect.width, videoRect.height, {
        mirror: false,
        line: "rgba(246,232,196,0.94)",
        dot: "#f0bb4c",
        head: "#ffffff",
        shadow: "rgba(240,187,76,0.36)",
        lineWidth: 4,
        dotRadius: 5,
      });
      ctx.restore();
      const features = extractPoseFeatures(standardLandmarks);
      if (features) updateStandardReference(features, standardLandmarks);
      ctx.save();
      ctx.fillStyle = "rgba(255,255,255,0.88)";
      ctx.font = "13px Microsoft YaHei, Arial";
      ctx.fillText("预制标准骨架", videoRect.x + 14, videoRect.y + 24);
      ctx.restore();
    } else {
      ctx.save();
      ctx.fillStyle = "rgba(255,255,255,0.86)";
      ctx.font = "16px Microsoft YaHei, Arial";
      ctx.fillText("正在提取云手标准骨架", 18, height - 24);
      ctx.restore();
    }
    return;
  }

  drawCaptureStage(ctx, width, height, t, { intensity: 0.88 });
  const points = skeletonPoints(width, height * 0.86, t + 0.35, "cloud");
  const shifted = Object.fromEntries(
    Object.entries(points).map(([key, [x, y]]) => [key, [x, y + height * 0.06]])
  );
  drawSkeleton(ctx, shifted, {
    lineWidth: 4,
    line: "rgba(255,255,255,0.88)",
    dot: "#d9a84b",
    shadow: "rgba(194,139,50,0.24)",
    blur: 10,
  });

  ctx.save();
  ctx.strokeStyle = "rgba(194,154,70,0.36)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(width * 0.5, height * 0.56, width * 0.24, height * 0.18, Math.sin(t) * 0.1, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawTraining(t) {
  if (!state.training.active || !canvases.training) return;
  const { ctx, width, height } = fitCanvas(canvases.training);
  ctx.clearRect(0, 0, width, height);

  const video = $("#trainingVideo");
  const hasTrainingInput = Boolean(video?.srcObject || state.training.objectUrl || video?.currentSrc);
  const hasPlayableFrame = hasTrainingInput && state.pose.live && video.readyState >= 2;
  if (!hasPlayableFrame) {
    drawCaptureStage(ctx, width, height, t);
    $("#trainingPoseState").textContent = "等待输入";
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.86)";
    ctx.font = "20px Microsoft YaHei, Arial";
    const waitingText =
      state.training.source === "upload" ? "等待练习视频载入，或重新上传视频" : "等待摄像头画面，请先允许摄像头权限";
    ctx.fillText(waitingText, 32, height - 36);
    ctx.restore();
    return;
  }

  const liveLandmarks = detectLivePose(video, "user");
  if (liveLandmarks) {
    drawPoseLandmarks(ctx, liveLandmarks, width, height, { mirror: true });
    const features = extractPoseFeatures(liveLandmarks);
    if (features) {
      state.training.confidence = Math.round(Math.max(0, Math.min(1, features.visibility || 0)) * 100);
      updateTrainingSessionUI();
    }
    if (!state.runningPractice) {
      $("#trainingPoseState").textContent = "Pose 预识别";
      $("#trainingCoachTip").textContent = "骨架已识别，可以开始训练。";
      return;
    }
    if (features && performance.now() - state.pose.lastScoreAt > 480) {
      state.scores = scoreLivePose(features);
      state.pose.lastScoreAt = performance.now();
      recordTrainingSample(features, state.scores);
      $("#trainingPoseState").textContent = "Pose 正在识别";
      updateRealtimeCoachTip("training");
      updateScores();
    }
    return;
  }

  $("#trainingPoseState").textContent = state.pose.ready ? "等待人体入镜" : "Pose 加载中";
}

function drawPush(t) {
  const { ctx, width, height } = fitCanvas(canvases.push);
  ctx.clearRect(0, 0, width, height);
  drawCaptureStage(ctx, width, height, t + 1.4);
  const points = scalePushPoints(skeletonPoints(width, height, t * 1.2, "push"), width, height);
  drawPushBodyVolume(ctx, points, width, height, t);
  drawSkeleton(ctx, points, {
    lineWidth: 3.4,
    line: "rgba(255,250,232,0.74)",
    dot: "#e6b24a",
    dotRadius: 5.4,
    head: "#0d1913",
    headRadius: 20,
    headStroke: "rgba(244, 207, 119, 0.92)",
    headStrokeWidth: 2.2,
    shadow: "rgba(215,183,103,0.36)",
    blur: 12,
  });
  drawPushTelemetry(ctx, points, width, height, t);
  positionPushHotspots(points, width, height);
}

function drawAvatar(t) {
  const { ctx, width, height } = fitCanvas(canvases.avatar);
  ctx.clearRect(0, 0, width, height);
  drawCaptureStage(ctx, width, height, t);
  const points = skeletonPoints(width, height, t, "avatar");
  drawSkeleton(ctx, points, {
    lineWidth: 5.4,
    line: "rgba(255,250,232,0.9)",
    dot: "#d9a84b",
    shadow: "rgba(215,183,103,0.5)",
    blur: 22,
  });

  ctx.save();
  ctx.strokeStyle = "rgba(215,183,103,0.56)";
  ctx.lineWidth = 2.8;
  ctx.shadowColor = "rgba(215,183,103,0.28)";
  ctx.shadowBlur = 12;
  ctx.beginPath();
  for (let i = 0; i < 80; i += 1) {
    const x = width * 0.5 + Math.sin(t - i * 0.07) * (90 + i * 0.36);
    const y = height * 0.49 + Math.cos(t * 0.9 - i * 0.08) * (48 + i * 0.22);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

function drawRadar() {
  const { ctx, width, height } = fitCanvas(canvases.radar);
  ctx.clearRect(0, 0, width, height);
  const cx = width / 2;
  const cy = height / 2 + 8;
  const radius = Math.min(width, height) * 0.32;
  ctx.save();
  ctx.strokeStyle = "#dfe6df";
  ctx.fillStyle = "#68736f";
  ctx.font = "14px Microsoft YaHei, Arial";
  for (let level = 1; level <= 4; level += 1) {
    ctx.beginPath();
    scoreLabels.forEach((_, index) => {
      const angle = -Math.PI / 2 + (index * Math.PI * 2) / scoreLabels.length;
      const r = (radius * level) / 4;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.stroke();
  }
  scoreLabels.forEach((label, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / scoreLabels.length;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
    ctx.stroke();
    ctx.fillText(label, cx + Math.cos(angle) * (radius + 18) - 36, cy + Math.sin(angle) * (radius + 18) + 5);
  });
  ctx.beginPath();
  state.scores.forEach((score, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / state.scores.length;
    const r = radius * (score / 100);
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(194,154,70,0.18)";
  ctx.strokeStyle = "#151914";
  ctx.lineWidth = 3;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawTrend() {
  const { ctx, width, height } = fitCanvas(canvases.trend);
  ctx.clearRect(0, 0, width, height);
  const pad = 44;
  const values = [74, 78, 76, 82, 85, averageScore()];
  ctx.save();
  ctx.strokeStyle = "#dfe6df";
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i += 1) {
    const y = pad + ((height - pad * 2) / 4) * i;
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(width - pad, y);
    ctx.stroke();
  }
  ctx.beginPath();
  values.forEach((value, index) => {
    const x = pad + ((width - pad * 2) / (values.length - 1)) * index;
    const y = height - pad - ((value - 60) / 40) * (height - pad * 2);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = "#b95042";
  ctx.lineWidth = 4;
  ctx.stroke();
  values.forEach((value, index) => {
    const x = pad + ((width - pad * 2) / (values.length - 1)) * index;
    const y = height - pad - ((value - 60) / 40) * (height - pad * 2);
    ctx.beginPath();
    ctx.fillStyle = index === values.length - 1 ? "#151914" : "#ffffff";
    ctx.strokeStyle = "#b95042";
    ctx.lineWidth = 3;
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });
  ctx.fillStyle = "#68736f";
  ctx.font = "14px Microsoft YaHei, Arial";
  ["周一", "周二", "周三", "周四", "周五", "本次"].forEach((label, index) => {
    const x = pad + ((width - pad * 2) / 5) * index;
    ctx.fillText(label, x - 14, height - 14);
  });
  ctx.restore();
}

function renderMoveTabs() {
  const tabs = $("#moveTabs");
  tabs.innerHTML = moves
    .map(
      (move) =>
        `<button class="tab-button ${move.id === state.selectedMove.id ? "active" : ""}" type="button" data-move="${move.id}">${move.name}</button>`
    )
    .join("");
}

function renderScoreBars() {
  const node = $("#scoreBars");
  node.innerHTML = scoreLabels
    .map((label, index) => {
      const score = state.scores[index];
      return `
        <div class="bar-row">
          <div class="bar-meta"><span>${label}</span><strong>${score}</strong></div>
          <div class="bar-track"><span style="width:${score}%"></span></div>
        </div>
      `;
    })
    .join("");
}

function renderCourses() {
  $("#courseGrid").innerHTML = moves
    .map((move, index) => {
      const detail = moveDetails[move.id];
      return `
        <article class="course-card refined-course">
          <div class="course-topline">
            <span class="card-kicker">第 ${index + 1} 式 · ${move.difficulty}</span>
            <strong>${String(index + 1).padStart(2, "0")}</strong>
          </div>
          <h3>${move.name}</h3>
          <p>${detail?.goal || move.culture}</p>
          <div class="course-phase-list">
            ${(detail?.phases || move.keypoints)
              .map((item, phaseIndex) => `<span><em>${phaseIndex + 1}</em>${item}</span>`)
              .join("")}
          </div>
          <div class="course-focus">
            <strong>训练提示</strong>
            <p>${detail?.focus || move.tip}</p>
          </div>
          <div class="course-tags">
            ${move.keypoints.map((item) => `<span>${item}</span>`).join("")}
          </div>
          <button class="ghost-button" type="button" data-course="${move.id}">进入跟练</button>
        </article>
      `;
    })
    .join("");
}

function renderUnlocked() {
  const list = $("#unlockList");
  list.innerHTML = Array.from(state.unlocked)
    .map((name) => `<span class="pill">${name}</span>`)
    .join("");
  $$(".map-node").forEach((node) => {
    if (state.unlocked.has(node.dataset.culture)) node.classList.add("unlocked");
  });
}

function renderSuggestions() {
  const score = averageScore();
  const suggestions = [
    {
      title: "重心转换",
      body: score > 88 ? "左右转换稳定，可继续增加动作连贯性训练。" : "先降低动作速度，把重心从左脚到右脚的交接做清楚。",
    },
    {
      title: "腰胯带动",
      body: state.selectedMove.id === "yunshou" ? "云手以腰胯带手，避免只摆动手臂。" : "保持中轴稳定，让上肢动作跟随身体运行。",
    },
    {
      title: "节奏控制",
      body: "每个动作保留起、承、转、合的层次，结束处不要突然停顿。",
    },
  ];
  $("#suggestionList").innerHTML = suggestions
    .map(
      (item) => `
        <div class="suggestion-item">
          <strong>${item.title}</strong>
          <p>${item.body}</p>
        </div>
      `
    )
    .join("");
}

function renderReportDetails() {
  const weakestIndex = state.scores.indexOf(Math.min(...state.scores));
  const strongestIndex = state.scores.indexOf(Math.max(...state.scores));
  const unlockedCount = state.unlocked.size;
  const weakestLabel = scoreLabels[weakestIndex];
  const strongestLabel = scoreLabels[strongestIndex];
  const detailNode = $("#reportDetailGrid");
  if (!detailNode) return;
  detailNode.innerHTML = `
    <div><span>最低分项</span><strong>${weakestLabel}</strong></div>
    <div><span>优势能力</span><strong>${strongestLabel}</strong></div>
    <div><span>文化解锁</span><strong>${unlockedCount} 张</strong></div>
    <div><span>下轮重点</span><strong>${state.selectedMove.keypoints[0]}</strong></div>
  `;
  const radarInsight = $("#radarInsight");
  const trendInsight = $("#trendInsight");
  const reportNextAction = $("#reportNextAction");
  if (radarInsight) radarInsight.textContent = `${strongestLabel}表现突出`;
  if (trendInsight) trendInsight.textContent = averageScore() >= 86 ? "本次训练进入稳定提升区间" : "本次训练仍需放慢节奏";
  if (reportNextAction) reportNextAction.textContent = `${state.selectedMove.name}：加强${state.selectedMove.keypoints[0]}`;
}

function updateScores() {
  const avg = averageScore();
  $("#practiceScore").textContent = avg;
  $("#heroScore").textContent = avg;
  $("#sidebarScore").textContent = avg;
  $("#reportScore").textContent = avg;
  setRingScore("#scoreRing", avg);
  setRingScore("#reportRing", avg);
  renderScoreBars();
  renderReportDetails();
  drawRadar();
  drawTrend();
}

function updatePracticeUI() {
  const useLocalStandardVideo = state.selectedMove.id === "yunshou";
  $("#coachTip").textContent = buildPracticeCoachTip();
  $("#standardMoveName").textContent = `${state.selectedMove.name}模板`;
  $("#standardCue").textContent = state.selectedMove.keypoints.join("，") + "。";
  $("#trainingTitle").textContent = `${state.selectedMove.name}跟练`;
  $("#trainingStandardMoveName").textContent = useLocalStandardVideo ? `${state.selectedMove.name}标准视频` : `${state.selectedMove.name}模板`;
  $("#trainingStandardCue").textContent = useLocalStandardVideo
    ? "标准视频使用预制骨架模板，不再实时识别，评分会更稳定。"
    : state.selectedMove.keypoints.join("，") + "。";
  if (!state.runningPractice) {
    $("#trainingCoachTip").textContent = "保持全身入镜，开始训练后自动分析动作。";
  }
  $("#practiceProgress").style.width = `${state.progress}%`;
  $("#practiceProgressText").textContent = `${state.progress}%`;
  $("#trainingProgress").style.width = `${state.progress}%`;
  $("#trainingProgressText").textContent = `${state.progress}%`;
  renderMoveTabs();
  updateScores();
}

function selectMove(id) {
  const next = moves.find((move) => move.id === id);
  if (!next) return;
  state.selectedMove = next;
  state.progress = Math.max(18, Math.min(72, state.progress + 4));
  state.unlocked.add(next.unlock);
  resetStandardReference();
  if (state.training.active) {
    if (state.runningPractice) playStandardVideo(true);
    else prepareStandardVideo(true);
  }
  updatePracticeUI();
  renderUnlocked();
  toast(`已切换至${next.name}`);
}

function tickPractice() {
  if (!state.runningPractice) return;
  state.practiceTick += 1;
  state.progress = Math.min(100, state.progress + 2);
  if (!state.pose.lastLandmarks) {
    state.scores = state.scores.map((score, index) => {
      const wave = Math.round(Math.sin(state.practiceTick * 0.6 + index) * 3);
      return Math.max(68, Math.min(96, score + wave + (Math.random() > 0.5 ? 1 : -1)));
    });
  }
  if (state.progress >= 100) {
    state.runningPractice = false;
    state.training.lastFrameAt = 0;
    cancelLiveCoachRequest("训练完成，正在生成训练计划");
    state.training.summary = buildTrainingSessionSummary();
    state.unlocked.add(state.selectedMove.unlock);
    $("#trainingPauseButton").textContent = "训练完成";
    renderTrainingCoachPlan(buildLocalCoachPlan(buildCoachContext("training")));
    setTrainingCoachTab("realtime");
    requestCoachAdvice("training");
    toast(`${state.selectedMove.name}训练完成，已生成文化解锁`);
    renderUnlocked();
  }
  updatePracticeUI();
  updateTrainingSessionUI();
  setTimeout(tickPractice, 900);
}

function setFocusMode(enabled) {
  $(".practice-board").classList.toggle("focus-mode", enabled);
}

function resetStandardReference() {
  state.standard.lastFeatures = null;
  state.standard.lastLandmarks = null;
  state.standard.history = [];
  state.standard.motion = null;
  state.standard.centerSway = null;
  state.standard.ready = false;
  state.pose.streams.standard.lastVideoTime = -1;
  state.pose.streams.standard.landmarks = null;
  state.pose.streams.standard.smoothed = null;
}

function prepareStandardVideo(reset = false) {
  const video = $("#standardVideo");
  if (!video) return;
  video.pause();
  setStandardVideoAudio(false);
  if (reset) {
    resetStandardReference();
    try {
      video.currentTime = 0;
    } catch (error) {
      // Some browsers delay seeking until metadata is available.
    }
  }
}

function playStandardVideo(reset = false) {
  const video = $("#standardVideo");
  if (!video) return;
  video.loop = false;
  if (state.selectedMove.id !== "yunshou") {
    video.pause();
    if (state.audio.mode === "standard") stopMusic(false);
    resetStandardReference();
    return;
  }
  video.volume = state.audio.mode === "standard" && state.audio.playing ? 0.48 : 0;
  video.muted = !(state.audio.mode === "standard" && state.audio.playing);
  if (reset) {
    resetStandardReference();
    try {
      video.currentTime = 0;
    } catch (error) {
      // Some browsers delay seeking until metadata is available.
    }
  }
  video.play().catch(() => {
    $("#trainingCoachTip").textContent = "标准视频已载入，点击页面后会继续播放并提取骨架。";
  });
}

function adjustStandardSync(delta) {
  state.standard.phaseOffset += delta;
  resetStandardReference();
  const direction = delta > 0 ? "提前" : "延后";
  toast(`标准骨架已${direction} ${Math.abs(delta).toFixed(1)} 秒`);
}

function adjustStandardSpeed(delta) {
  const change = delta > 0 ? -0.015 : 0.015;
  state.standard.actionEndRatio = Math.max(0.72, Math.min(1, state.standard.actionEndRatio + change));
  resetStandardReference();
  toast(`标准骨架映射到视频 ${Math.round(state.standard.actionEndRatio * 100)}%`);
}

function moveStandardSkeleton(dx, dy) {
  state.standard.alignX += dx;
  state.standard.alignY += dy;
  resetStandardReference();
  toast("标准骨架位置已微调");
}

function scaleStandardSkeleton(delta) {
  state.standard.scaleX = Math.max(0.68, Math.min(1.12, state.standard.scaleX + delta));
  state.standard.scaleY = Math.max(0.82, Math.min(1.14, state.standard.scaleY + delta * 0.7));
  resetStandardReference();
  toast(`标准骨架缩放 ${Math.round(state.standard.scaleX * 100)}%`);
}

function cloneFrames(frames) {
  return frames.map((frame) => ({
    t: frame.t,
    p: Object.fromEntries(Object.entries(frame.p).map(([key, value]) => [key, [...value]])),
  }));
}

const calibrationFrameTimes = Array.from({ length: 21 }, (_, index) => Number((index / 20).toFixed(2)));
const standardCalibrationVersion = 2;

function poseAtFromFrames(frames, time) {
  if (!frames?.length) return {};
  let previous = frames[0];
  let next = frames[frames.length - 1];
  for (let index = 1; index < frames.length; index += 1) {
    if (time <= frames[index].t) {
      previous = frames[index - 1];
      next = frames[index];
      break;
    }
  }
  const span = Math.max(0.001, next.t - previous.t);
  const amount = Math.max(0, Math.min(1, (time - previous.t) / span));
  const keys = new Set([...Object.keys(previous.p || {}), ...Object.keys(next.p || {})]);
  return Object.fromEntries(
    Array.from(keys).map((key) => {
      const a = previous.p[key] || next.p[key];
      const b = next.p[key] || a;
      return [key, [interpolate(a[0], b[0], amount), interpolate(a[1], b[1], amount)]];
    })
  );
}

function normalizeCalibrationFrames(frames, options = {}) {
  if (!Array.isArray(frames) || frames.length === 0) return null;
  const sorted = cloneFrames(frames).sort((a, b) => a.t - b.t);
  const usable =
    options.dropLegacyTail && sorted.length >= calibrationFrameTimes.length
      ? sorted.slice(0, Math.max(3, sorted.length - 2))
      : sorted;
  const retimed =
    options.dropLegacyTail && usable.length > 1
      ? usable.map((frame, index) => ({ ...frame, t: index / (usable.length - 1) }))
      : usable;
  if (!options.dropLegacyTail && retimed.length >= calibrationFrameTimes.length) return retimed;
  return calibrationFrameTimes.map((time) => ({ t: time, p: poseAtFromFrames(retimed, time) }));
}

function poseFromLandmarks(landmarks) {
  return Object.fromEntries(
    Object.entries(standardPoseKeyMap)
      .filter(([key]) => calibrationPointKeys.includes(key) || key.endsWith("Foot"))
      .map(([key, index]) => [key, [landmarks[index].x, landmarks[index].y]])
  );
}

function landmarksFromPose(pose) {
  const landmarks = Array.from({ length: 33 }, () => ({ x: 0, y: 0, z: 0, visibility: 0 }));
  Object.entries(standardPoseKeyMap).forEach(([key, index]) => {
    const point = pose[key];
    if (!point) return;
    landmarks[index] = { x: point[0], y: point[1], z: 0, visibility: 0.98 };
  });
  return landmarks;
}

function seedCalibrationFrames() {
  const normalizedSaved = normalizeCalibrationFrames(state.standard.calibratedFrames);
  if (normalizedSaved) return normalizedSaved;
  const savedFrames = state.standard.calibratedFrames;
  state.standard.calibratedFrames = null;
  const fakeVideo = { duration: state.standard.cycleSeconds, currentTime: 0 };
  const start = fakeVideo.duration * state.standard.actionStartRatio;
  const end = fakeVideo.duration * state.standard.actionEndRatio;
  const frames = calibrationFrameTimes.map((time) => {
    fakeVideo.currentTime = start - state.standard.phaseOffset + time * (end - start);
    return { t: time, p: poseFromLandmarks(getBakedYunshouLandmarks(fakeVideo)) };
  });
  state.standard.calibratedFrames = savedFrames;
  return frames;
}

function setCalibrationFrame(index) {
  state.calibration.frameIndex = Math.max(0, Math.min(state.calibration.frames.length - 1, index));
  const video = $("#calibrationVideo");
  const frame = state.calibration.frames[state.calibration.frameIndex];
  const duration = video.duration || state.standard.cycleSeconds;
  const start = duration * state.standard.actionStartRatio;
  const end = duration * state.standard.actionEndRatio;
  const target = Math.max(0, start - state.standard.phaseOffset + frame.t * (end - start));
  if (Number.isFinite(target)) video.currentTime = Math.min(video.duration || target, target);
  renderCalibrationControls();
  requestAnimationFrame(drawCalibrationCanvas);
}

function renderCalibrationControls() {
  $("#calibrationFrames").innerHTML = state.calibration.frames
    .map(
      (frame, index) =>
        `<button class="${index === state.calibration.frameIndex ? "active" : ""}" type="button" data-calibration-frame="${index}">帧 ${index + 1}</button>`
    )
    .join("");
  $("#calibrationPointList").innerHTML = calibrationPointKeys
    .map(
      (key) =>
        `<button class="${key === state.calibration.selectedKey ? "active" : ""}" type="button" data-calibration-point="${key}">${calibrationPointLabels[key]}</button>`
    )
    .join("");
}

function drawCalibrationCanvas() {
  if (!state.calibration.active) return;
  const canvas = $("#calibrationCanvas");
  const video = $("#calibrationVideo");
  const { ctx, width, height } = fitCanvas(canvas);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#111914";
  ctx.fillRect(0, 0, width, height);
  const videoRect =
    video.readyState >= 2
      ? drawVideoContainCropped(ctx, video, width, height, standardVideoDisplayCrop)
      : getVideoContainCroppedRect(video, width, height, standardVideoDisplayCrop);
  state.calibration.videoRect = videoRect;
  ctx.fillStyle = "rgba(16,23,18,0.24)";
  ctx.fillRect(videoRect.x, videoRect.y, videoRect.width, videoRect.height);
  drawSoftGrid(ctx, width, height);

  const frame = state.calibration.frames[state.calibration.frameIndex];
  const displayPose = poseToCropDisplay(frame.p, videoRect.crop);
  const landmarks = landmarksFromPose(displayPose);
  ctx.save();
  ctx.translate(videoRect.x, videoRect.y);
  ctx.beginPath();
  ctx.rect(0, 0, videoRect.width, videoRect.height);
  ctx.clip();
  drawPoseLandmarks(ctx, landmarks, videoRect.width, videoRect.height, {
    mirror: false,
    line: "rgba(246,232,196,0.94)",
    dot: "#f0bb4c",
    head: "#ffffff",
    shadow: "rgba(240,187,76,0.36)",
    lineWidth: 5,
    dotRadius: 6,
  });
  ctx.restore();

  calibrationPointKeys.forEach((key) => {
    const point = frame.p[key];
    if (!point) return;
    const [displayX, displayY] = pointToCropDisplay(point, videoRect.crop);
    const x = videoRect.x + displayX * videoRect.width;
    const y = videoRect.y + displayY * videoRect.height;
    ctx.beginPath();
    ctx.fillStyle = key === state.calibration.selectedKey ? "#151914" : "rgba(255,255,255,0.92)";
    ctx.strokeStyle = "#f0bb4c";
    ctx.lineWidth = 3;
    ctx.arc(x, y, key === state.calibration.selectedKey ? 10 : 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = "12px Microsoft YaHei, Arial";
    ctx.fillText(calibrationPointLabels[key], x + 10, y - 8);
  });
}

function canvasEventPoint(event) {
  const canvas = $("#calibrationCanvas");
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (canvas.width / rect.width),
    y: (event.clientY - rect.top) * (canvas.height / rect.height),
  };
}

function nearestCalibrationKey(point) {
  const frame = state.calibration.frames[state.calibration.frameIndex];
  const rect = state.calibration.videoRect;
  if (!frame || !rect) return null;
  let best = null;
  let bestDistance = 72;
  calibrationPointKeys.forEach((key) => {
    const value = frame.p[key];
    if (!value) return;
    const [displayX, displayY] = pointToCropDisplay(value, rect.crop || resolveVideoCrop(null));
    const x = rect.x + displayX * rect.width;
    const y = rect.y + displayY * rect.height;
    const label = calibrationPointLabels[key] || "";
    const labelHit =
      point.x >= x + 6 &&
      point.x <= x + 28 + label.length * 14 &&
      point.y >= y - 30 &&
      point.y <= y + 8;
    const d = labelHit ? 0 : Math.hypot(point.x - x, point.y - y);
    if (d < bestDistance) {
      bestDistance = d;
      best = key;
    }
  });
  return best;
}

function updateCalibrationPoint(event) {
  const rect = state.calibration.videoRect;
  const frame = state.calibration.frames[state.calibration.frameIndex];
  if (!rect || !frame || !state.calibration.draggingKey) return;
  const point = canvasEventPoint(event);
  const local = [(point.x - rect.x) / rect.width, (point.y - rect.y) / rect.height];
  const [sourceX, sourceY] = pointFromCropDisplay(local, rect.crop || resolveVideoCrop(null));
  const x = Math.max(-0.18, Math.min(1.18, sourceX));
  const y = Math.max(-0.08, Math.min(1.12, sourceY));
  frame.p[state.calibration.draggingKey] = [x, y];
  state.calibration.selectedKey = state.calibration.draggingKey;
  drawCalibrationCanvas();
  renderCalibrationControls();
}

function openCalibration() {
  state.calibration.active = true;
  state.calibration.frames = seedCalibrationFrames();
  state.calibration.frameIndex = 0;
  state.calibration.selectedKey = "head";
  $("#calibrationOverlay").classList.add("active");
  $("#calibrationOverlay").setAttribute("aria-hidden", "false");
  document.body.classList.add("calibrating-active");
  const video = $("#calibrationVideo");
  video.pause();
  video.addEventListener("loadedmetadata", () => setCalibrationFrame(0), { once: true });
  if (video.readyState >= 1) setCalibrationFrame(0);
  else video.load();
  renderCalibrationControls();
  requestAnimationFrame(drawCalibrationCanvas);
}

function closeCalibration() {
  state.calibration.active = false;
  state.calibration.draggingKey = null;
  $("#calibrationOverlay").classList.remove("active");
  $("#calibrationOverlay").setAttribute("aria-hidden", "true");
  document.body.classList.remove("calibrating-active");
}

async function saveCalibration() {
  const frames = cloneFrames(state.calibration.frames);
  state.standard.calibratedFrames = normalizeCalibrationFrames(frames);
  resetStandardReference();
  const payload = {
    move: "yunshou",
    schemaVersion: standardCalibrationVersion,
    actionStartRatio: state.standard.actionStartRatio,
    actionEndRatio: state.standard.actionEndRatio,
    frames: state.standard.calibratedFrames,
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem("yunshou-standard-calibration", JSON.stringify(payload));
  fetch("/api/standard/yunshou", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
  closeCalibration();
  toast("标准骨架已保存并应用");
}

async function loadSavedCalibration() {
  try {
    const local = localStorage.getItem("yunshou-standard-calibration");
    if (local) {
      const data = JSON.parse(local);
      if (Array.isArray(data.frames)) {
        const dropLegacyTail = (data.schemaVersion || 0) < standardCalibrationVersion;
        state.standard.calibratedFrames = normalizeCalibrationFrames(data.frames, {
          dropLegacyTail,
        });
        if (dropLegacyTail) {
          localStorage.setItem(
            "yunshou-standard-calibration",
            JSON.stringify({
              ...data,
              schemaVersion: standardCalibrationVersion,
              actionStartRatio: state.standard.actionStartRatio,
              actionEndRatio: state.standard.actionEndRatio,
              frames: state.standard.calibratedFrames,
            })
          );
        }
      }
    }
    const response = await fetch("/api/standard/yunshou", { cache: "no-store" });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.frames)) {
        state.standard.calibratedFrames = normalizeCalibrationFrames(data.frames, {
          dropLegacyTail: (data.schemaVersion || 0) < standardCalibrationVersion,
        });
        localStorage.setItem(
          "yunshou-standard-calibration",
          JSON.stringify({
            ...data,
            schemaVersion: standardCalibrationVersion,
            actionStartRatio: state.standard.actionStartRatio,
            actionEndRatio: state.standard.actionEndRatio,
            frames: state.standard.calibratedFrames,
          })
        );
      }
    }
  } catch (error) {
    // Local storage is enough for the browser demo when the save API is unavailable.
  }
}

function openTrainingOverlay(source) {
  state.training.active = true;
  state.training.source = source;
  state.progress = 0;
  resetTrainingSessionData();
  state.runningPractice = false;
  state.pose.live = false;
  state.pose.history = [];
  state.pose.lastLandmarks = null;
  state.pose.streams.user.lastVideoTime = -1;
  state.pose.streams.user.landmarks = null;
  state.pose.streams.user.smoothed = null;
  state.pose.streams.user.smoothed = null;
  $("#trainingOverlay").classList.add("active");
  $("#trainingOverlay").setAttribute("aria-hidden", "false");
  document.body.classList.add("training-active");
  $("#trainingSource").textContent = source === "upload" ? "上传视频模式" : "摄像头模式";
  $("#trainingCameraState").textContent = source === "upload" ? "等待视频载入" : "等待摄像头授权";
  $("#trainingPoseState").textContent = "等待输入";
  $("#trainingPauseButton").textContent = "开始训练";
  syncCoachControls();
  setLiveCoachStatus("等待训练开始", "idle");
  updatePracticeUI();
  renderTrainingCoachPlan(buildLocalCoachPlan(buildCoachContext("training")));
  refreshCoachAvailability();
  prepareStandardVideo(true);
}

function closeTrainingOverlay() {
  cancelLiveCoachRequest("实时分析已结束");
  state.training.active = false;
  state.training.started = false;
  state.training.lastFrameAt = 0;
  state.runningPractice = false;
  $("#trainingOverlay").classList.remove("active");
  $("#trainingOverlay").setAttribute("aria-hidden", "true");
  document.body.classList.remove("training-active");
  $("#trainingPauseButton").textContent = "开始训练";
  const video = $("#trainingVideo");
  if (video.srcObject) {
    video.srcObject.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
  }
  if (state.training.objectUrl) {
    URL.revokeObjectURL(state.training.objectUrl);
    state.training.objectUrl = null;
  }
  video.removeAttribute("src");
  video.load();
  video.parentElement.classList.remove("upload-mode");
  const standardVideo = $("#standardVideo");
  if (standardVideo) standardVideo.pause();
  stopMusic(false);
  $("#trainingCameraState").textContent = "等待输入";
  $("#trainingPoseState").textContent = "Pose 未启动";
  state.pose.lastLandmarks = null;
  state.pose.history = [];
  state.pose.streams.user.lastVideoTime = -1;
  state.pose.streams.user.landmarks = null;
  state.pose.live = false;
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

function playBeat() {
  const ctx = state.audio.context;
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = 220;
  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.24);
}

function setMusicButtons(active, mode = "standard") {
  const label = active ? "暂停音乐" : mode === "beat" ? "节拍音乐" : "背景音乐";
  const musicButton = $("#musicButton");
  const trainingMusicButton = $("#trainingMusicButton");
  if (musicButton) musicButton.textContent = label;
  if (trainingMusicButton) trainingMusicButton.textContent = label;
}

function setStandardVideoAudio(enabled) {
  const video = $("#standardVideo");
  if (!video) return;
  video.volume = enabled ? 0.48 : 0;
  video.muted = !enabled;
}

function stopMusic(showToast = true) {
  if (state.audio.timer) {
    clearInterval(state.audio.timer);
    state.audio.timer = null;
  }
  const previousMode = state.audio.mode || "standard";
  state.audio.playing = false;
  state.audio.mode = null;
  setStandardVideoAudio(false);
  setMusicButtons(false, previousMode);
  if (showToast) toast(previousMode === "beat" ? "节拍已暂停" : "背景音乐已暂停");
}

async function toggleMusic() {
  if (state.audio.playing) {
    stopMusic();
    return;
  }

  const standardVideo = $("#standardVideo");
  if (state.selectedMove.id === "yunshou" && standardVideo) {
    state.audio.playing = true;
    state.audio.mode = "standard";
    setStandardVideoAudio(true);
    setMusicButtons(true, "standard");
    try {
      await standardVideo.play();
      toast("云手标准视频背景音乐已开启");
    } catch (error) {
      stopMusic(false);
      toast("请先点击开始跟练，再开启背景音乐");
    }
    return;
  }

  if (!state.audio.context) {
    state.audio.context = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (state.audio.context.state === "suspended") {
    await state.audio.context.resume();
  }

  const interval = Math.round(60000 / state.audio.bpm);
  playBeat();
  state.audio.timer = setInterval(playBeat, interval);
  state.audio.playing = true;
  state.audio.mode = "beat";
  setMusicButtons(true, "beat");
  toast("太极节拍已开启");
}

async function openCamera() {
  const video = $("#trainingVideo");
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    toast("当前浏览器不支持摄像头调用");
    return false;
  }
  try {
    openTrainingOverlay("camera");
    video.loop = false;
    video.removeAttribute("src");
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
    await video.play();
    $("#trainingVideo").parentElement.classList.remove("upload-mode");
    state.pose.live = true;
    $("#trainingCameraState").textContent = "摄像头跟练";
    $("#trainingPoseState").textContent = "输入已就绪";
    toast("摄像头已开启");
    ensurePoseModel();
    return true;
  } catch (error) {
    closeTrainingOverlay();
    toast("摄像头未开启");
    return false;
  }
}

async function openUploadTraining(file) {
  if (!file) return false;
  openTrainingOverlay("upload");
  const video = $("#trainingVideo");
  try {
    if (video.srcObject) {
      video.srcObject.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
    }
    if (state.training.objectUrl) URL.revokeObjectURL(state.training.objectUrl);
    state.training.objectUrl = URL.createObjectURL(file);
    video.src = state.training.objectUrl;
    video.loop = true;
    video.muted = true;
    video.parentElement.classList.add("upload-mode");
    await video.play();
    state.pose.live = true;
    $("#trainingCameraState").textContent = file.name;
    $("#trainingPoseState").textContent = "输入已就绪";
    ensurePoseModel();
    toast("视频跟练已开启");
    return true;
  } catch (error) {
    closeTrainingOverlay();
    toast("视频无法播放，请换一个文件");
    return false;
  }
}

function makeReport() {
  const session = buildTrainingSessionSummary();
  state.training.summary = session;
  if (session.sampleCount) {
    state.scores = session.averageScores.slice();
  }
  const avg = session.sampleCount ? session.overallScore : averageScore();
  const lowestIndex = state.scores.indexOf(Math.min(...state.scores));
  const durationText = session.durationSeconds ? `，有效训练 ${formatTrainingTime(session.durationSeconds * 1000)}` : "";
  const sampleText = session.sampleCount ? `，完成 ${session.sampleCount} 次姿态采样` : "";
  $("#reportSummary").textContent = `本次${state.selectedMove.name}综合评分为 ${avg} 分${durationText}${sampleText}。主要短板是${scoreLabels[lowestIndex]}，下一轮重点练习${state.selectedMove.keypoints[0]}。`;
  state.unlocked.add("郑州数字文旅");
  renderUnlocked();
  renderSuggestions();
  renderReportDetails();
  if (state.training.active) closeTrainingOverlay();
  showPage("report");
  toast("训练报告已更新");
}

function buildCoachContext(source) {
  const scoreDetail = Object.fromEntries(scoreLabels.map((label, index) => [label, state.scores[index]]));
  const session = state.training.summary || buildTrainingSessionSummary();
  return {
    source,
    move: {
      name: state.selectedMove.name,
      difficulty: state.selectedMove.difficulty,
      keypoints: state.selectedMove.keypoints,
      commonMistakes: state.selectedMove.mistakes,
      culture: state.selectedMove.culture,
    },
    scores: state.scores,
    scoreDetail,
    overallScore: averageScore(),
    progress: state.progress,
    session,
    pushHands: {
      score: state.push.score,
      combo: state.push.combo,
      successRate: state.push.total ? Math.round((state.push.success / state.push.total) * 100) : 0,
      currentAttack: state.push.current?.name || "未开始",
    },
    unlockedCards: Array.from(state.unlocked),
    note: "当前是比赛原型数据，姿态评分为前端演示逻辑，建议需要避免表述为真实医学或专业诊断。",
  };
}

function localCoachText(context) {
  const weakestIndex = context.scores.indexOf(Math.min(...context.scores));
  const weakest = scoreLabels[weakestIndex] || "重心稳定性";
  const moveName = context.move.name;
  const keypoint = context.move.keypoints[0] || "腰胯带动";
  return `本次${moveName}综合评分为 ${context.overallScore} 分，主要短板是${weakest}。建议先降低动作速度，确认重心转换后再带动手臂运行。\n\n下一轮重点练习“${keypoint}”：每次转换时停留半拍，观察肩、胯、膝是否同向协调。\n\nAI 教练会结合后续动作采样持续更新纠偏重点。`;
}

function buildRealtimeCoachContext() {
  const context = buildCoachContext("training");
  const recentSamples = state.training.scoreSamples.slice(-24);
  if (!recentSamples.length) return { ...context, realtime: true };
  const scores = scoreLabels.map((_, index) =>
    Math.round(recentSamples.reduce((sum, sample) => sum + Number(sample[index] || 0), 0) / recentSamples.length)
  );
  const weakestIndex = scores.indexOf(Math.min(...scores));
  return {
    ...context,
    realtime: true,
    scores,
    scoreDetail: Object.fromEntries(scoreLabels.map((label, index) => [label, scores[index]])),
    overallScore: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length),
    session: {
      ...context.session,
      sampleCount: state.training.sampleCount,
      confidence: state.training.confidence,
      primaryIssue: scoreLabels[weakestIndex],
      phase: state.training.phase,
    },
  };
}

function queueCoachEnhancement(source = "training", force = false) {
  if (
    source !== "training" ||
    !state.training.active ||
    !state.runningPractice ||
    !state.coach.liveEnabled ||
    !state.coach.available
  ) {
    return;
  }

  if (
    state.training.sampleCount === 0 ||
    (!force && state.training.sampleCount < state.coach.minModelSamples) ||
    state.training.confidence < 70
  ) {
    setLiveCoachStatus("正在积累稳定动作样本", "ready");
    return;
  }

  const now = performance.now();
  const context = buildRealtimeCoachContext();
  const signature = `${state.selectedMove.id}:${state.training.phase}:${context.scores
    .map((score) => Math.round(score / 3) * 3)
    .join("-")}`;
  const elapsed = now - state.coach.lastModelAt;
  const repeatedTooSoon = signature === state.coach.lastModelSignature && elapsed < state.coach.analysisIntervalMs * 2;
  if (!force && (state.coach.modelInFlight || elapsed < state.coach.analysisIntervalMs || repeatedTooSoon)) return;
  if (state.coach.modelInFlight) cancelLiveCoachRequest("正在重新分析当前动作");

  const controller = new AbortController();
  const requestId = ++state.coach.modelRequestId;
  const timeoutId = window.setTimeout(() => controller.abort(), 10000);
  state.coach.modelAbortController = controller;
  state.coach.modelInFlight = true;
  state.coach.lastModelAt = now;
  state.coach.lastModelSignature = signature;
  $("#trainingCoachMode").textContent = `${state.coach.model} · 正在分析`;
  setLiveCoachStatus(`分析最近 ${Math.min(24, state.training.scoreSamples.length)} 次采样`, "thinking");

  fetch("/api/coach", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(context),
    signal: controller.signal,
  })
    .then((response) => {
      if (!response.ok) throw new Error(`接口状态 ${response.status}`);
      return response.json();
    })
    .then((data) => {
      if (requestId !== state.coach.modelRequestId || !state.training.active) return;
      const plan = renderTrainingCoachPlan(data.plan, context);
      const realtimeCue = compactCoachText(plan.realtimeCue || data.advice, 36);
      if (data.mode !== "model" || !realtimeCue) throw new Error(data.error || "模型未返回有效建议");
      state.coach.modelFailureCount = 0;
      state.coach.lastModelCue = realtimeCue;
      state.coach.lastModelReceivedAt = performance.now();
      state.coach.lastTip = realtimeCue;
      state.coach.lastTipAt = performance.now();
      $("#trainingCoachMode").textContent = `${data.model || state.coach.model} · 实时指导`;
      $("#trainingCoachTip").textContent = realtimeCue;
      setLiveCoachStatus("AI 建议已更新，继续观察动作", "ready");
      speakCoachTip(realtimeCue, true);
    })
    .catch((error) => {
      if (requestId !== state.coach.modelRequestId || error.name === "AbortError") return;
      state.coach.modelFailureCount += 1;
      const fallbackTip = buildRealtimeCoachTip();
      $("#trainingCoachMode").textContent = "模型暂不可用 · 本地兜底";
      $("#trainingCoachTip").textContent = fallbackTip;
      setLiveCoachStatus(
        state.coach.modelFailureCount >= 2 ? "模型连接异常，继续使用本地纠错" : "本轮请求失败，稍后自动重试",
        "fallback"
      );
      speakCoachTip(fallbackTip, true);
    })
    .finally(() => {
      window.clearTimeout(timeoutId);
      if (requestId !== state.coach.modelRequestId) return;
      state.coach.modelAbortController = null;
      state.coach.modelInFlight = false;
    });
}

function setCoachResult(source, mode, text, plan = null, context = buildCoachContext(source)) {
  const modeLabel = mode === "model" ? "大模型训练建议" : mode === "fallback" ? "模型异常 · 本地兜底" : "本地规则教练";
  if (source === "report") {
    $("#reportCoachMode").textContent = modeLabel;
    $("#reportCoachText").textContent = text;
  } else if (source === "training") {
    $("#trainingCoachMode").textContent = modeLabel;
    renderTrainingCoachPlan(plan || buildLocalCoachPlan(context), context);
  } else {
    $("#coachMode").textContent = modeLabel;
    $("#aiCoachText").textContent = text;
  }
}

async function requestCoachAdvice(source = "practice") {
  const button = source === "report" ? $("#askReportCoach") : state.training.active ? $("#trainingAskCoach") : $("#askCoach");
  const context = buildCoachContext(source);
  const localPlan = buildLocalCoachPlan(context);
  if (!button) return;
  button.disabled = true;
  button.textContent = "AI 分析中";
  setCoachResult(source, state.coach.available ? "model" : "local", localCoachText(context), localPlan, context);
  if (source === "training") {
    const realtimeTip = buildRealtimeCoachTip();
    $("#trainingCoachTip").textContent = realtimeTip;
    speakCoachTip(realtimeTip, true);
    setTrainingCoachTab("realtime");
  }

  try {
    const response = await fetch("/api/coach", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(context),
    });
    if (!response.ok) throw new Error(`接口状态 ${response.status}`);
    const data = await response.json();
    setCoachResult(source, data.mode || "local", data.advice || localCoachText(context), data.plan || localPlan, context);
    toast(data.mode === "model" ? "大模型建议已生成" : "本地 AI 建议已生成");
  } catch (error) {
    setCoachResult(source, "fallback", localCoachText(context), localPlan, context);
    toast("大模型接口暂不可用，已使用本地建议");
  } finally {
    button.disabled = false;
    button.textContent = source === "report" ? "生成深度建议" : source === "training" ? "立即分析" : "生成建议";
  }
}

function nextAttack() {
  const attack = attacks[Math.floor(Math.random() * attacks.length)];
  state.push.current = attack;
  state.push.active = true;
  state.push.startedAt = performance.now();
  $("#roundName").textContent = `第 ${state.push.round} 回合`;
  $("#attackName").textContent = attack.name;
  $("#attackHint").textContent = attack.hint;
  $("#pushFeedback").textContent = "观察来势，选择对应部位完成化解。";
  $("#pushTimer").style.width = "100%";
}

function updatePushStats() {
  $("#pushScore").textContent = state.push.score;
  $("#comboCount").textContent = state.push.combo;
  $("#pushRate").textContent = `${state.push.total ? Math.round((state.push.success / state.push.total) * 100) : 0}%`;
}

function handleHotspot(part) {
  if (!state.push.active || !state.push.current) {
    toast("先开始对练");
    return;
  }
  const elapsed = performance.now() - state.push.startedAt;
  const onTime = elapsed <= state.push.duration;
  const correct = part === state.push.current.target && onTime;
  state.push.total += 1;
  if (correct) {
    state.push.success += 1;
    state.push.combo += 1;
    state.push.score += 12 + state.push.combo * 2;
    state.unlocked.add("借力化力");
    $("#pushFeedback").textContent = `化解成功。${state.push.current.culture}`;
  } else {
    state.push.combo = 0;
    $("#pushFeedback").textContent = `化解失败。正确应对为${state.push.current.target}，先稳结构再转换。`;
  }
  state.push.active = false;
  state.push.round += 1;
  updatePushStats();
  renderUnlocked();
  setTimeout(nextAttack, 1200);
}

function updatePushTimer(now) {
  if (!state.push.active) return;
  const elapsed = now - state.push.startedAt;
  const pct = Math.max(0, 100 - (elapsed / state.push.duration) * 100);
  $("#pushTimer").style.width = `${pct}%`;
  if (pct <= 0) {
    state.push.active = false;
    state.push.total += 1;
    state.push.combo = 0;
    $("#pushFeedback").textContent = `反应超时。${state.push.current.target}是本轮关键部位。`;
    state.push.round += 1;
    updatePushStats();
    setTimeout(nextAttack, 1100);
  }
}

function updateCultureCard(name) {
  const card = cultureCards[name];
  if (!card) return;
  $("#cultureCard").innerHTML = `
    <span class="card-kicker">研学节点</span>
    <h3>${card.title}</h3>
    <p>${card.text}</p>
    <div class="culture-tags">
      ${card.tags.map((tag) => `<span>${tag}</span>`).join("")}
    </div>
  `;
  state.unlocked.add(name);
  renderUnlocked();
}

function generateAvatar() {
  state.avatarActive = true;
  const keypoints = 88 + Math.floor(Math.random() * 9);
  const smooth = 82 + Math.floor(Math.random() * 12);
  const score = 80 + Math.floor(Math.random() * 14);
  $("#avatarKeypoints").textContent = `${keypoints}%`;
  $("#avatarSmooth").textContent = `${smooth}%`;
  $("#avatarScore").textContent = score;
  state.unlocked.add("动作轨迹");
  renderUnlocked();
  toast("数字小人已生成");
}

function currentPushDifficulty() {
  return pushDifficulties[state.push.mode] || pushDifficulties.beginner;
}

function clearPushNextTimer() {
  if (state.push.nextTimer) {
    clearTimeout(state.push.nextTimer);
    state.push.nextTimer = null;
  }
}

function updatePushSessionUi() {
  const completed = Math.min(Math.max(state.push.round - 1, 0), state.push.maxRounds);
  const progress = $("#pushRoundProgress");
  const best = $("#bestReaction");
  const startButton = $("#startPush");
  if (progress) progress.textContent = `${completed} / ${state.push.maxRounds}`;
  if (best) best.textContent = state.push.bestReaction == null ? "--" : `${state.push.bestReaction.toFixed(2)}s`;
  $$("[data-push-difficulty]").forEach((button) => {
    const selected = button.dataset.pushDifficulty === state.push.mode;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
    button.disabled = state.push.sessionActive;
  });
  if (startButton) startButton.disabled = state.push.sessionActive;
}

function setPushDifficulty(mode) {
  if (!pushDifficulties[mode]) return;
  if (state.push.sessionActive) {
    toast("本局结束后可切换难度");
    return;
  }
  state.push.mode = mode;
  updatePushSessionUi();
  if (!state.push.sessionActive && !state.push.active) {
    const difficulty = currentPushDifficulty();
    $("#pushFeedback").textContent = `${difficulty.label}模式已就绪。点击开始后完成 ${state.push.maxRounds} 回合听劲判断。`;
  }
}

function resetPushSession() {
  clearPushNextTimer();
  const mode = state.push.mode;
  Object.assign(state.push, {
    score: 0,
    combo: 0,
    total: 0,
    success: 0,
    round: 1,
    maxRounds: 8,
    mode,
    sessionActive: true,
    finished: false,
    current: null,
    active: false,
    startedAt: 0,
    duration: currentPushDifficulty().duration,
    logs: [],
    lastReaction: 0,
    bestReaction: null,
    reactionTotal: 0,
    reactionSamples: 0,
    nextTimer: null,
  });
  $("#lastReaction").textContent = "--";
  $("#pushTarget").textContent = "等待开始";
  $("#pushCountdown").textContent = "--";
  $("#roundName").textContent = `第 1 / ${state.push.maxRounds} 回合`;
  $("#attackName").textContent = "等待出招";
  $("#attackHint").textContent = "观察来势，判断力点，选择化解部位。";
  $("#startPush").textContent = "对练进行中";
  $("#pushFeedback").textContent = "本局开始。先看招式名称和来势提示，再点击对应部位。";
  $("#pushTimer").style.width = "100%";
  $("#pushTimer").parentElement?.classList.remove("danger");
  updatePushResult("听劲准备");
  setPushGameState("", null);
  updatePushStats();
  updatePushSessionUi();
  renderPushLog();
}

function pushRoundDuration() {
  const difficulty = currentPushDifficulty();
  return Math.max(
    difficulty.minDuration,
    difficulty.duration - Math.min(state.push.round, 14) * difficulty.roundStep - state.push.combo * difficulty.comboStep
  );
}

function shouldRevealPushTarget(elapsed = 0) {
  const difficulty = currentPushDifficulty();
  if (difficulty.reveal === "always") return true;
  if (difficulty.reveal === "never") return false;
  return elapsed / Math.max(state.push.duration, 1) >= 0.52;
}

function updatePushTargetReveal(elapsed = 0) {
  if (!state.push.current) return;
  const difficulty = currentPushDifficulty();
  const revealed = shouldRevealPushTarget(elapsed);
  $("#pushTarget").textContent = revealed
    ? state.push.current.target
    : difficulty.reveal === "never"
      ? "自行判断"
      : "听劲判断";
  setPushGameState("active", revealed ? state.push.current.target : null);
  updatePushTactics(state.push.current, revealed);
}

function gradePushReaction(elapsed, duration) {
  const ratio = elapsed / Math.max(duration, 1);
  if (ratio <= 0.32) return { label: "快", bonus: 8, note: "抢到先机" };
  if (ratio <= 0.62) return { label: "稳", bonus: 5, note: "判断稳定" };
  return { label: "迟", bonus: 1, note: "反应偏慢" };
}

function recordPushReaction(elapsed) {
  const seconds = elapsed / 1000;
  state.push.bestReaction = state.push.bestReaction == null ? seconds : Math.min(state.push.bestReaction, seconds);
  state.push.reactionTotal += seconds;
  state.push.reactionSamples += 1;
}

function schedulePushNext(delay = 1100) {
  clearPushNextTimer();
  state.push.nextTimer = setTimeout(() => {
    state.push.nextTimer = null;
    if (!state.push.sessionActive) return;
    if (state.push.round > state.push.maxRounds) {
      finishPushSession();
    } else {
      nextAttack();
    }
  }, delay);
}

function finishPushSession() {
  clearPushNextTimer();
  state.push.active = false;
  state.push.sessionActive = false;
  state.push.finished = true;
  const rate = state.push.total ? Math.round((state.push.success / state.push.total) * 100) : 0;
  const avg =
    state.push.reactionSamples > 0 ? `${(state.push.reactionTotal / state.push.reactionSamples).toFixed(2)}s` : "--";
  const advice =
    rate >= 80
      ? "判断很稳，可以提高到下一档难度。"
      : rate >= 55
        ? "继续练习腰胯和手腕的来势区分。"
        : "先用入门模式熟悉五个化解部位。";
  $("#pushFeedback").textContent = `本局完成：命中 ${state.push.success}/${state.push.total}，平均反应 ${avg}，成功率 ${rate}%。${advice}`;
  $("#startPush").textContent = "再练一局";
  $("#pushTarget").textContent = "本局完成";
  $("#pushCountdown").textContent = "--";
  $("#pushTimer").style.width = "0%";
  $("#pushTimer").parentElement?.classList.remove("danger");
  updatePushResult("本局完成");
  setPushGameState("", null);
  updatePushSessionUi();
  renderPushLog();
}

function renderPushLog() {
  const node = $("#pushLog");
  if (!node) return;
  if (!state.push.logs.length) {
    node.innerHTML = `<span>回合记录</span><p>开始对练后，这里会记录每一次化解结果。</p>`;
    return;
  }
  node.innerHTML = `
    <span>回合记录</span>
    ${state.push.logs
      .slice(0, 4)
      .map(
        (item) => `
          <p class="${item.ok ? "success" : "miss"}">
            <strong>${item.round}</strong>${item.text}<em>${item.time}</em>
          </p>
        `
      )
      .join("")}
  `;
}

function updatePushTactics(attack, revealed = shouldRevealPushTarget(0)) {
  if (!attack) return;
  const difficulty = currentPushDifficulty();
  $("#pushIntent").textContent = attack.name;
  $("#pushDefense").textContent = revealed
    ? `守 ${attack.target}`
    : difficulty.reveal === "never"
      ? "自行判断"
      : "后半程提示";
  $("#pushBreath").textContent = revealed
    ? attack.target === "腰胯"
      ? "沉胯后化"
      : "松肩听劲"
    : "松肩沉胯";
}

function setPushGameState(status, targetPart) {
  const stage = $(".push-stage");
  if (stage) {
    stage.classList.remove("push-active", "push-success", "push-miss");
    if (status) stage.classList.add(`push-${status}`);
  }
  $$(".hotspot").forEach((button) => {
    button.classList.remove("target", "hit", "miss");
    button.classList.toggle("target", Boolean(targetPart && button.dataset.hotspot === targetPart));
  });
}

function updatePushResult(text, type = "") {
  const badge = $("#pushResultBadge");
  const result = $("#lastPushResult");
  if (badge) {
    badge.textContent = text;
    badge.classList.remove("success", "miss");
    if (type) badge.classList.add(type);
  }
  if (result) result.textContent = text;
}

nextAttack = function () {
  const attack = attacks[Math.floor(Math.random() * attacks.length)];
  state.push.duration = Math.max(2400, 4300 - Math.min(state.push.round, 14) * 120 - state.push.combo * 50);
  state.push.current = attack;
  state.push.active = true;
  state.push.startedAt = performance.now();
  $("#roundName").textContent = `第 ${state.push.round} 回合`;
  $("#attackName").textContent = attack.name;
  $("#attackHint").textContent = attack.hint;
  $("#pushFeedback").textContent = `观察来势，在倒计时内点击“${attack.target}”完成化解。`;
  $("#pushTimer").style.width = "100%";
  $("#pushTimer").parentElement?.classList.remove("danger");
  $("#pushTarget").textContent = attack.target;
  $("#pushCountdown").textContent = `${(state.push.duration / 1000).toFixed(1)}s`;
  $("#lastReaction").textContent = "--";
  $("#startPush").textContent = "对练进行中";
  setPushGameState("active", attack.target);
  updatePushResult("听劲中");
  updatePushTactics(attack);
};

handleHotspot = function (part) {
  if (!state.push.active || !state.push.current) {
    toast("先开始对练");
    return;
  }
  const elapsed = performance.now() - state.push.startedAt;
  const onTime = elapsed <= state.push.duration;
  const correct = part === state.push.current.target && onTime;
  const reaction = `${(elapsed / 1000).toFixed(2)}s`;
  const clicked = $(`.hotspot[data-hotspot="${part}"]`);
  const target = state.push.current.target;
  state.push.total += 1;
  if (correct) {
    state.push.success += 1;
    state.push.combo += 1;
    state.push.score += 12 + state.push.combo * 2;
    state.unlocked.add("借力化力");
    $("#pushFeedback").textContent = `化解成功，反应 ${reaction}。${state.push.current.culture}`;
    setPushGameState("success", target);
    if (clicked) clicked.classList.add("hit");
    updatePushResult("命中", "success");
    state.push.logs.unshift({
      ok: true,
      round: `第 ${state.push.round} 回合`,
      text: `命中 ${part}，连击 +${state.push.combo}`,
      time: reaction,
    });
  } else {
    state.push.combo = 0;
    $("#pushFeedback").textContent = `化解失败，反应 ${reaction}。正确应对为 ${state.push.current.target}，先稳结构再转换。`;
    setPushGameState("miss", target);
    if (clicked) clicked.classList.add("miss");
    updatePushResult("偏差", "miss");
    state.push.logs.unshift({
      ok: false,
      round: `第 ${state.push.round} 回合`,
      text: `应对偏差，正确部位 ${state.push.current.target}`,
      time: reaction,
    });
  }
  $("#lastReaction").textContent = reaction;
  state.push.active = false;
  state.push.round += 1;
  updatePushStats();
  renderPushLog();
  renderUnlocked();
  setTimeout(nextAttack, 1200);
};

updatePushTimer = function (now) {
  if (!state.push.active) return;
  const elapsed = now - state.push.startedAt;
  const pct = Math.max(0, 100 - (elapsed / state.push.duration) * 100);
  $("#pushTimer").style.width = `${pct}%`;
  $("#pushCountdown").textContent = `${Math.max(0, (state.push.duration - elapsed) / 1000).toFixed(1)}s`;
  $("#pushTimer").parentElement?.classList.toggle("danger", pct <= 35);
  if (pct <= 0) {
    state.push.active = false;
    state.push.total += 1;
    state.push.combo = 0;
    $("#pushFeedback").textContent = `反应超时。${state.push.current.target} 是本轮关键部位。`;
    $("#lastReaction").textContent = "超时";
    setPushGameState("miss", state.push.current.target);
    updatePushResult("超时", "miss");
    state.push.logs.unshift({
      ok: false,
      round: `第 ${state.push.round} 回合`,
      text: `反应超时，关键部位 ${state.push.current.target}`,
      time: "超时",
    });
    state.push.round += 1;
    updatePushStats();
    renderPushLog();
    setTimeout(nextAttack, 1100);
  }
};

nextAttack = function () {
  if (!state.push.sessionActive) state.push.sessionActive = true;
  if (state.push.round > state.push.maxRounds) {
    finishPushSession();
    return;
  }

  const previous = state.push.current;
  const pool = attacks.length > 1 ? attacks.filter((attack) => attack.name !== previous?.name) : attacks;
  const attack = pool[Math.floor(Math.random() * pool.length)];
  const difficulty = currentPushDifficulty();
  state.push.duration = pushRoundDuration();
  state.push.current = attack;
  state.push.active = true;
  state.push.finished = false;
  state.push.startedAt = performance.now();

  $("#roundName").textContent = `第 ${state.push.round} / ${state.push.maxRounds} 回合`;
  $("#attackName").textContent = attack.name;
  $("#attackHint").textContent = attack.hint;
  $("#pushFeedback").textContent =
    difficulty.reveal === "always"
      ? `观察来势，在倒计时内点击“${attack.target}”完成化解。`
      : difficulty.reveal === "late"
        ? "先判断来势，后半程会给出化解点提示。"
        : "挑战模式不直接给答案，只根据来势和提示判断化解点。";
  $("#pushTimer").style.width = "100%";
  $("#pushTimer").parentElement?.classList.remove("danger");
  $("#pushCountdown").textContent = `${(state.push.duration / 1000).toFixed(1)}s`;
  $("#lastReaction").textContent = "--";
  $("#startPush").textContent = "对练进行中";
  updatePushTargetReveal(0);
  updatePushResult("听劲中");
  updatePushTactics(attack);
  updatePushSessionUi();
};

handleHotspot = function (part) {
  if (!state.push.active || !state.push.current) {
    toast("先开始对练");
    return;
  }

  const elapsed = performance.now() - state.push.startedAt;
  const onTime = elapsed <= state.push.duration;
  const correct = part === state.push.current.target && onTime;
  const reactionSeconds = elapsed / 1000;
  const reaction = `${reactionSeconds.toFixed(2)}s`;
  const grade = gradePushReaction(elapsed, state.push.duration);
  const clicked = $(`.hotspot[data-hotspot="${part}"]`);
  const target = state.push.current.target;
  const difficulty = currentPushDifficulty();

  state.push.total += 1;
  if (correct) {
    state.push.success += 1;
    state.push.combo += 1;
    recordPushReaction(elapsed);
    const scoreGain = Math.round((12 + grade.bonus + state.push.combo * 2) * difficulty.scoreScale);
    state.push.score += scoreGain;
    state.unlocked.add("借力化力");
    $("#pushFeedback").textContent = `化解成功，反应 ${reaction}（${grade.label}）。${grade.note}，本轮 +${scoreGain}。${state.push.current.culture}`;
    setPushGameState("success", target);
    if (clicked) clicked.classList.add("hit");
    updatePushResult("命中", "success");
    state.push.logs.unshift({
      ok: true,
      round: `第 ${state.push.round} 回合`,
      text: `命中 ${part}，${grade.label}，连击 +${state.push.combo}`,
      time: reaction,
    });
  } else {
    state.push.combo = 0;
    $("#pushFeedback").textContent = `化解偏差，反应 ${reaction}。你点击了 ${part}，正确应对为 ${target}，先稳结构再转换。`;
    setPushGameState("miss", target);
    if (clicked) clicked.classList.add("miss");
    updatePushResult("偏差", "miss");
    state.push.logs.unshift({
      ok: false,
      round: `第 ${state.push.round} 回合`,
      text: `点击 ${part}，正确部位 ${target}`,
      time: reaction,
    });
  }

  $("#lastReaction").textContent = reaction;
  state.push.active = false;
  state.push.round += 1;
  updatePushStats();
  updatePushSessionUi();
  renderPushLog();
  renderUnlocked();
  schedulePushNext(state.push.round > state.push.maxRounds ? 900 : 1250);
};

updatePushTimer = function (now) {
  if (!state.push.active || !state.push.current) return;
  const elapsed = now - state.push.startedAt;
  const pct = Math.max(0, 100 - (elapsed / state.push.duration) * 100);
  $("#pushTimer").style.width = `${pct}%`;
  $("#pushCountdown").textContent = `${Math.max(0, (state.push.duration - elapsed) / 1000).toFixed(1)}s`;
  $("#pushTimer").parentElement?.classList.toggle("danger", pct <= 35);
  updatePushTargetReveal(elapsed);

  if (pct <= 0) {
    state.push.active = false;
    state.push.total += 1;
    state.push.combo = 0;
    $("#pushFeedback").textContent = `反应超时。${state.push.current.target} 是本轮关键部位，下一轮先看重心和来势方向。`;
    $("#lastReaction").textContent = "超时";
    setPushGameState("miss", state.push.current.target);
    updatePushResult("超时", "miss");
    state.push.logs.unshift({
      ok: false,
      round: `第 ${state.push.round} 回合`,
      text: `反应超时，关键部位 ${state.push.current.target}`,
      time: "超时",
    });
    state.push.round += 1;
    updatePushStats();
    updatePushSessionUi();
    renderPushLog();
    schedulePushNext(state.push.round > state.push.maxRounds ? 900 : 1100);
  }
};

updateCultureCard = function (name) {
  const base = cultureCards[name];
  const detail = cultureDetails[name];
  if (!base && !detail) return;
  $("#cultureCard").innerHTML = `
    <span class="card-kicker">研学节点</span>
    <h3>${base?.title || name}</h3>
    <p>${base?.text || detail.value}</p>
    <div class="culture-detail-list">
      <div><span>研学任务</span><strong>${detail?.task || "完成一次跟练后解锁文化卡。"}</strong></div>
      <div><span>路线节点</span><strong>${detail?.route || "中原武术文化研学节点"}</strong></div>
      <div><span>项目关联</span><strong>${detail?.value || "关联动作评测、课程学习和训练报告。"}</strong></div>
    </div>
    <div class="culture-tags">
      ${(base?.tags || ["中原文化", "武术研学", "数字文旅"]).map((tag) => `<span>${tag}</span>`).join("")}
    </div>
  `;
  state.unlocked.add(name);
  renderUnlocked();
};

function renderAvatarProcess(activeIndex = 0) {
  const node = $("#avatarProcess");
  if (!node) return;
  Array.from(node.children).forEach((item, index) => {
    item.classList.toggle("active", index <= activeIndex);
  });
}

generateAvatar = function () {
  state.avatarActive = true;
  const keypoints = 88 + Math.floor(Math.random() * 9);
  const smooth = 82 + Math.floor(Math.random() * 12);
  const score = 80 + Math.floor(Math.random() * 14);
  $("#avatarKeypoints").textContent = `${keypoints}%`;
  $("#avatarSmooth").textContent = `${smooth}%`;
  $("#avatarScore").textContent = score;
  $("#avatarCaption").textContent = `已生成 ${state.selectedMove.name} 动作轨迹：关键点完整度 ${keypoints}%，轨迹平滑度 ${smooth}%，可用于展示个人练习节奏。`;
  renderAvatarProcess(3);
  state.unlocked.add("动作轨迹");
  renderUnlocked();
  toast("数字小人已生成");
};

function bindEvents() {
  document.addEventListener("click", (event) => {
    const navLink = event.target.closest(".nav-link[data-section]");
    if (navLink) {
      event.preventDefault();
      showPage(navLink.dataset.section);
      return;
    }

    const brand = event.target.closest(".brand");
    if (brand) {
      event.preventDefault();
      showPage("overview");
      return;
    }

    const jump = event.target.closest("[data-jump]");
    if (jump) {
      event.preventDefault();
      showPage(jump.dataset.jump);
      return;
    }

    const moveButton = event.target.closest("[data-move]");
    if (moveButton) selectMove(moveButton.dataset.move);

    const courseButton = event.target.closest("[data-course]");
    if (courseButton) {
      selectMove(courseButton.dataset.course);
      showPage("practice");
    }

    const hotspot = event.target.closest("[data-hotspot]");
    if (hotspot) handleHotspot(hotspot.dataset.hotspot);

    const pushDifficulty = event.target.closest("[data-push-difficulty]");
    if (pushDifficulty) {
      setPushDifficulty(pushDifficulty.dataset.pushDifficulty);
      return;
    }

    const coachTab = event.target.closest("[data-coach-tab]");
    if (coachTab) {
      setTrainingCoachTab(coachTab.dataset.coachTab);
      return;
    }

    const culture = event.target.closest("[data-culture]");
    if (culture) updateCultureCard(culture.dataset.culture);
  });

  $("#startPractice").addEventListener("click", async () => {
    if (state.runningPractice) {
      toast("跟练正在进行");
      return;
    }
    if (state.progress >= 100) state.progress = 8;
    const opened = await openCamera();
    if (!opened) return;
    toast("摄像头已就绪，点击“开始训练”后开始评分");
  });

  $("#pausePractice").addEventListener("click", () => {
    state.runningPractice = false;
    toast("跟练已暂停");
  });

  $("#makeReport").addEventListener("click", makeReport);
  $("#askCoach").addEventListener("click", () => requestCoachAdvice("practice"));
  $("#askReportCoach").addEventListener("click", () => requestCoachAdvice("report"));
  $("#cameraButton").addEventListener("click", async () => {
    const opened = await openCamera();
    if (!opened) return;
    if (state.progress >= 100) state.progress = 8;
    toast("摄像头已就绪，点击“开始训练”后开始评分");
  });
  $("#uploadPracticeButton").addEventListener("click", () => $("#practiceVideoUpload").click());
  $("#practiceVideoUpload").addEventListener("change", async (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (state.progress >= 100) state.progress = 8;
      const opened = await openUploadTraining(file);
      if (opened) {
        toast("视频已就绪，点击“开始训练”后开始评分");
      }
    }
    event.target.value = "";
  });
  $("#exitFocus").addEventListener("click", closeTrainingOverlay);
  $("#exitTraining").addEventListener("click", closeTrainingOverlay);
  $("#musicButton").addEventListener("click", toggleMusic);
  $("#trainingMusicButton").addEventListener("click", toggleMusic);
  $("#trainingPauseButton").addEventListener("click", () => {
    if (state.training.started && state.progress >= 100) {
      state.progress = 0;
      resetTrainingSessionData();
    }
    if (!state.training.started || !state.runningPractice) {
      const video = $("#trainingVideo");
      const hasInput = Boolean(video?.srcObject || state.training.objectUrl || video?.currentSrc);
      if (!hasInput || video.readyState < 2) {
        toast("请先打开摄像头或上传视频");
        return;
      }
      if (state.progress >= 100) state.progress = 8;
      const firstStart = !state.training.started;
      state.training.started = true;
      state.runningPractice = true;
      state.training.lastFrameAt = performance.now();
      $("#trainingPauseButton").textContent = "暂停训练";
      setLiveCoachStatus(
        state.coach.available && state.coach.liveEnabled ? "正在积累稳定动作样本" : "使用本地规则实时纠错",
        state.coach.available && state.coach.liveEnabled ? "ready" : "fallback"
      );
      if (firstStart && state.coach.voiceEnabled) {
        state.coach.lastTip = "AI 教练已启动，请保持全身入镜";
        speakCoachTip(state.coach.lastTip, true);
      }
      updateTrainingSessionUI(true);
      if (firstStart && state.selectedMove.id === "yunshou") {
        state.audio.playing = true;
        state.audio.mode = "standard";
        setStandardVideoAudio(true);
        setMusicButtons(true, "standard");
      }
      playStandardVideo(firstStart);
      ensurePoseModel();
      tickPractice();
      toast(firstStart ? `${state.selectedMove.name} AI 训练开始` : "AI 训练继续");
      return;
    }

    state.runningPractice = false;
    state.training.lastFrameAt = 0;
    cancelLiveCoachRequest("训练已暂停，实时分析同步暂停");
    $("#trainingPauseButton").textContent = "继续训练";
    updateTrainingSessionUI(true);
    const standardVideo = $("#standardVideo");
    if (standardVideo) standardVideo.pause();
    toast("训练已暂停");
  });
  $("#trainingReportButton").addEventListener("click", makeReport);
  $("#trainingVoiceButton").addEventListener("click", toggleCoachVoice);
  $("#trainingRealtimeCoachButton").addEventListener("click", toggleRealtimeCoach);
  $("#trainingAskCoach").addEventListener("click", () => {
    if (state.runningPractice && state.coach.available && state.coach.liveEnabled) {
      queueCoachEnhancement("training", true);
      toast("正在分析最近一段动作");
      return;
    }
    requestCoachAdvice("training");
  });
  $("#standardDelay").addEventListener("click", () => adjustStandardSync(-0.25));
  $("#standardAdvance").addEventListener("click", () => adjustStandardSync(0.25));
  $("#standardSlower").addEventListener("click", () => adjustStandardSpeed(0.18));
  $("#standardFaster").addEventListener("click", () => adjustStandardSpeed(-0.18));
  $("#standardLeft").addEventListener("click", () => moveStandardSkeleton(-0.025, 0));
  $("#standardRight").addEventListener("click", () => moveStandardSkeleton(0.025, 0));
  $("#standardSmaller").addEventListener("click", () => scaleStandardSkeleton(-0.04));
  $("#standardBigger").addEventListener("click", () => scaleStandardSkeleton(0.04));
  $("#openCalibration").addEventListener("click", openCalibration);
  $("#openCalibrationQuick").addEventListener("click", openCalibration);
  $("#closeCalibration").addEventListener("click", closeCalibration);
  $("#saveCalibration").addEventListener("click", saveCalibration);
  $("#resetCalibration").addEventListener("click", () => {
    state.standard.calibratedFrames = null;
    state.calibration.frames = seedCalibrationFrames();
    setCalibrationFrame(0);
    toast("已恢复自动初稿");
  });
  $("#calibrationFrames").addEventListener("click", (event) => {
    const button = event.target.closest("[data-calibration-frame]");
    if (button) setCalibrationFrame(Number(button.dataset.calibrationFrame));
  });
  $("#calibrationPointList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-calibration-point]");
    if (!button) return;
    state.calibration.selectedKey = button.dataset.calibrationPoint;
    renderCalibrationControls();
    drawCalibrationCanvas();
  });
  $("#calibrationCanvas").addEventListener("pointerdown", (event) => {
    const key = nearestCalibrationKey(canvasEventPoint(event)) || state.calibration.selectedKey || "head";
    state.calibration.draggingKey = key;
    state.calibration.selectedKey = key;
    $("#calibrationCanvas").classList.add("dragging");
    $("#calibrationCanvas").setPointerCapture(event.pointerId);
    updateCalibrationPoint(event);
  });
  $("#calibrationCanvas").addEventListener("pointermove", (event) => {
    if (state.calibration.draggingKey) updateCalibrationPoint(event);
  });
  $("#calibrationCanvas").addEventListener("pointerup", (event) => {
    state.calibration.draggingKey = null;
    $("#calibrationCanvas").classList.remove("dragging");
    $("#calibrationCanvas").releasePointerCapture(event.pointerId);
  });
  $("#calibrationVideo").addEventListener("seeked", drawCalibrationCanvas);

  $("#startPush").addEventListener("click", () => {
    if (state.push.sessionActive || state.push.active) return;
    resetPushSession();
    nextAttack();
    toast("推手对练开始");
  });

  $("#videoUpload").addEventListener("change", (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    $("#uploadName").textContent = file.name;
    const preview = $("#uploadPreview");
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
  });

  $("#generateAvatar").addEventListener("click", generateAvatar);

  $("#menuButton").addEventListener("click", () => {
    $(".sidebar").classList.toggle("open");
  });

  $$(".nav-link").forEach((link) => {
    link.addEventListener("click", () => $(".sidebar").classList.remove("open"));
  });

  window.addEventListener("popstate", () => {
    showPage((location.hash || "#overview").slice(1), false);
  });
}

function observeSections() {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      $$(".nav-link").forEach((link) => {
        link.classList.toggle("active", link.dataset.section === visible.target.id);
      });
    },
    { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.4, 0.8] }
  );
  $$("[data-panel]").forEach((panel) => observer.observe(panel));
}

function initRevealMotion() {
  const revealItems = [
    ...$$(".overview-section"),
    ...$$(".feature-card"),
    ...$$(".dashboard-card"),
    ...$$(".training-loop span"),
    ...$$(".module-visual-strip"),
    ...$$(".practice-entry-grid article"),
    ...$$(".push-dojo div"),
    ...$$(".avatar-insight-grid div"),
    ...$$(".course-card"),
    ...$$(".culture-card"),
    ...$$(".chart-panel"),
    ...$$(".suggestion-list"),
  ];
  if (!revealItems.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  revealItems.forEach((item, index) => {
    item.classList.add("reveal-item");
    item.style.transitionDelay = reduceMotion ? "0ms" : `${Math.min(index % 8, 5) * 55}ms`;
    if (reduceMotion) item.classList.add("is-visible");
  });
  if (reduceMotion) return;

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );
  revealItems.forEach((item) => revealObserver.observe(item));
}

function animate(now) {
  const t = now / 900;
  updateTrainingSessionClock(now);
  drawHero(t);
  drawPractice(t);
  drawStandard(t);
  drawTraining(t);
  if (state.training.active) drawStandardCanvas(canvases.trainingStandard, t);
  drawPush(t);
  drawAvatar(t * (state.avatarActive ? 1.24 : 0.7));
  updatePushTimer(now);
  animationFrame = requestAnimationFrame(animate);
}

function init() {
  loadSavedCalibration();
  renderMoveTabs();
  renderCourses();
  renderUnlocked();
  renderSuggestions();
  renderReportDetails();
  renderPushLog();
  renderAvatarProcess(0);
  updateCultureCard("陈家沟");
  updatePracticeUI();
  updatePushSessionUi();
  updateTrainingSessionUI(true);
  refreshCoachAvailability();
  bindEvents();
  initRevealMotion();
  showPage((location.hash || "#overview").slice(1), false);
  requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
  animationFrame = requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  updateScores();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) cancelAnimationFrame(animationFrame);
  else animationFrame = requestAnimationFrame(animate);
});

window.taijiApp = {
  ensurePoseModel,
  setFocusMode,
  getPoseStatus: () => ({
    ready: state.pose.ready,
    loading: state.pose.loading,
    live: state.pose.live,
    hasLandmarks: Boolean(state.pose.lastLandmarks),
  }),
};

init();
