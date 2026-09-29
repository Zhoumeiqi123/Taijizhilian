# 太极智练 Web 原型

## 启动

```bash
npm run dev
```

打开：

```text
http://127.0.0.1:4173/
```

## 大模型教练配置

项目已内置 `/api/coach` 和 `/api/coach/status`：

- 未配置密钥：默认开启 DeepSeek 演示模式，稳定模拟大模型分析、实时建议和语音播报，便于比赛录制。
- 配置 OpenAI：通过 Responses API 和 JSON Schema 返回结构化建议。
- 配置其他兼容服务：默认使用 Chat Completions JSON 模式，可通过 `LLM_API_MODE` 指定。

演示模式默认显示 `DeepSeek-V3`，可通过环境变量修改或关闭：

```powershell
$env:LLM_DEMO_MODEL="DeepSeek-V3"
$env:LLM_DEMO_MODE="true"
npm run dev
```

设置 `$env:LLM_DEMO_MODE="false"` 可恢复无密钥时的本地模式；一旦配置 `LLM_API_KEY`，服务会自动优先调用真实大模型。

PowerShell 示例：

```powershell
$env:LLM_API_KEY="你的大模型密钥"
$env:LLM_BASE_URL="https://api.openai.com/v1"
$env:LLM_MODEL="gpt-4o-mini"
$env:LLM_API_MODE="responses"
npm run dev
```

也可以使用这些变量名：

```text
OPENAI_API_KEY
OPENAI_BASE_URL
OPENAI_MODEL
```

结构化建议包含 `headline`、`summary`、`priority`、`realtimeCue` 和 `actions`。前端会对第三方结果再次校验和截断，异常时自动使用本地计划。

前端入口：

- `AI 跟练`训练室：实时纠错、语音播报、训练阶段与 AI 训练计划
- `训练报告`页：点击“生成深度建议”

大模型只负责把已计算的评分、招式、识别质量和错误统计转成教练式建议；每帧姿态判断仍由本地规则完成，避免网络延迟影响实时纠错。

## Pose 骨架识别

`AI 跟练`页点击摄像头按钮后，会进入大屏跟练模式，并尝试加载 MediaPipe Pose Landmarker：

- 加载成功：显示真实人体关键点骨架，并与当前招式的标准动作特征模板做基础评分。
- 加载失败或无网络：自动保留原来的模拟骨架演示。

当前已支持摄像头和上传视频、33 点骨架识别、关键点平滑、云手预制标准骨架、四维评分、训练计时、有效采样、问题统计和训练报告。评分仍属于比赛原型，不应视为医学或专业认证结论。

### 专业评分怎么做

更可信的评分需要准备标准动作素材：

1. 每个招式准备 1 个专业标准动作视频，最好是正面、全身、固定机位。
2. 用 MediaPipe 提取标准视频每一帧的关键点，保存成 JSON 模板。
3. 用户摄像头实时提取关键点。
4. 对用户动作和标准模板做归一化、时间对齐，再计算姿态、重心、节奏、协调四项评分。

当前页面已经预留了标准模板和评分逻辑的位置，后续只需要把简化模板替换为标准视频提取出来的 JSON。

## 音乐节拍

`AI 跟练`页点击“节拍音乐”会用浏览器 Web Audio 生成无版权太极练习节拍，不依赖外部 mp3 文件。
