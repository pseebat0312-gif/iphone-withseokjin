# 自己改台词，从这里开始

最方便的文件：`src/dialogue-overrides.json`。

- `messages`：角色说出的每一个气泡/场景对白。只改双引号里的文字，至少保留两条。
- `choices`：玩家看到的回复文字。左边的选项编号不要改；右边可以自由改。
- 节点编号不要改，也不用碰剧情变量。JSON 不支持注释；保留逗号和引号。
- `src/scripted/romance-data.mjs`：完整事件、场景、前后关联。想改剧情走向再编辑这里。
- `src/companion-server.mjs` 的 `COMPANION_STYLE`：DeepSeek 的默认性格约束。网站里“调整聊天风格”可以直接驯化这一轮对话，不需要改代码。
- `src/scripted/hybrid-ui.js` 的 `COUPLE_MOMENTS`：可重复拥抱、亲吻、咖啡馆、海边的固定对白。

改完运行 `npm run build`；自动检查会指出未知编号或空台词。`npm test` 验证主线引用与关键回归。把完整源码压缩包发回来即可继续更新，不需要把密钥写进文件。

数据：自由聊天保存在当前浏览器，只发当前联系人历史和已知情境给模型。NPC 不会读你的整个相册、其他联系人私聊或现实位置。场景和社交内容均为架空作品。
