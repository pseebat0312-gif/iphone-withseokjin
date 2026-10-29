# 公开表达参考与音乐场景改版

这些是编剧对公开访谈的写作提炼，不宣称知道成员真实私下性格或恋爱方式。游戏中的恋爱、暗恋和私人事件仍为架空。用户的每位联系人自定义偏好保留；服务器始终加入相应成员的基础表达指引。

| 成员 | 写作方向 | 官方参考 |
| --- | --- | --- |
| 金硕珍 | 幽默、自嘲与认真关心并存，少客服式调情 | https://magazine.weverse.io/article/view/1148?lang=en |
| RM | 思考、具体审美观察、坦率与自嘲，不总讲道理 | https://magazine.weverse.io/article/view/62?lang=en |
| SUGA | 克制务实、干幽默，谈创作能热情展开 | https://magazine.weverse.io/article/view/96?lang=en |
| j-hope | 有感染力，也认真细致、尊重分寸与创造 | https://magazine.weverse.io/article/view/1308?lang=en |
| Jimin | 亲和诚恳、让人自在，也表达自己的需要 | https://magazine.weverse.io/article/view/690?lang=en |
| V | 松弛、有具体审美联想、会开熟人玩笑 | https://magazine.weverse.io/article/view/212?lang=en |
| Jung Kook | 随意直接、好奇、真实表达，对作品有细节追求 | https://magazine.weverse.io/article/view/825?lang=en |

只让 Jin 发送额外定时 AI 主动消息，客户端与服务器双重限制；其他联系人的预设主线消息不删除。

钢琴与柾国场景改成以音乐时间为主时钟的自动短句呈现。原歌曲、录音起始偏移、总演出时长、原句文字与剧情节点不变；视觉字幕重新分成短句并按文字长度分配展示时点，不是歌曲歌词转写。每次一小句，暂停、回看、上一句、从头播放、收起文字可用；曲终后才显示离开按钮。钢琴保留介绍后点击开始。

柾国段使用本次五张图，按八个音乐段落循环轮换；原图完整保留，部署副本缩小以适应现有 Worker 体积限制。没有改动音乐。

Chrome/Safari 差异不能只凭现象断定原因。本次减少连续演出 DOM 重绘，只有句子/照片变化时更新画面，进度条单独刷新；低内存/少核心设备减轻玻璃模糊。没有做浏览器品牌硬分支，不改变 Safari 原有流畅交互。真机兼容仍需实际验证。
