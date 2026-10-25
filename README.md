# WITH YOU · 女朋友的手机

Fan-made fictional BTS phone experience. Existing Sites project: retained. Original GitHub history is retained; see the continuation branch and CODEX_HANDOFF.md. Data remains browser-local.

## Build and checks

Node.js 22+, no package dependencies. `npm run build` compiles HTML, CSS, browser code, catalogue, images, video and audio into a portable Worker ESM bundle. `npm test` covers eight API cases including shared DeepSeek server credentials, provider errors and quota handling. `npm run dev -- --port 3000` runs local preview.

Source is in `src/`; edit that directory, then run `node scripts/compile.mjs`. Do not edit generated `worker/index.js`. Deployment output is `dist/server/index.js`.

## Chat: required server configuration

Set runtime Secret `DEEPSEEK_API_KEY` once. Optional `DEEPSEEK_MODEL` defaults to `deepseek-chat`. Redeploy after configuring hosted environment secrets. A valid existing key can be reused if it is not revoked and has sufficient balance. Never put it in source, frontend code, a public file or the hosting manifest.

Visitors do not need keys when the server key is configured. `/api/config` returns readiness, never the key. The Settings temporary key field is for the operator's per-tab testing only, not shared configuration. DeepSeek is paid per usage from the owner's existing balance. There is no automatic recharge. The server applies a per-isolate burst limit, not a durable budget guarantee. A public shared key can incur costs; keep an account balance appropriate to the intended budget.

The current hosted Site has a working owner-saved DeepSeek configuration and anonymous inference has been verified; backend tests use mocks. On a fresh deployment without a Secret, users receive an explicit setup-required message and no fabricated fallback reply. The default text model is not promised to understand images; photos can be shared, but a text-only provider receives an explicit image-unavailable marker instead of falsely claiming to see them.

## Phone features

- Two horizontally scrollable home pages with a fixed four-app Dock, page controls and real Seoul clock widget.
- Official-source app icon image assets; provenance in `assets/icon-sources.json`. Calendar remains dynamically rendered. Phone and BTS news glyphs are custom.
- Native-style Settings, Messages, Notes, Contacts, Photos, Calendar, Safari and Clock layouts. KakaoTalk has its own blue/yellow interface. This is an imitation, not a complete iOS operating system.
- Local nickname, Chinese/Korean/English chat language, four-digit game passcode, wallpaper, appearance, important memories and backups.
- Optional notification sounds, volume, local sound imports, home-screen notification banners and unread badges. Preview notifications are clearly labelled and not injected as chat replies. Default short KakaoTalk sound sample was obtained from `https://soundinstants.com/sound/kakaotalk` / `https://storage.soundinstants.com/kakaotalk.mp3`, a third-party sample, not an official Kakao-distributed download. Browser interaction is required before audio can play.
- Original project `images/videos/111.mp4` is restored as the looping camera scene, with local snapshots to the photo library. No physical camera permission is requested.
- Photo viewer has swipe, next/previous controls and sharing to a chosen KakaoTalk member.
- Browser-origin localStorage, explicit memory and JSON backup/restore. Old Netlify storage cannot migrate automatically across origins. Game passcode is not encryption.

## Spotify

`src/catalog.json` includes 37 album/release versions and 422 Spotify track records verified on 2026-10-24 from official Spotify public embeds. Album links were discovered from a public index and validated against Spotify. This is a broad, checked directory, not a guarantee of every regional release, remix or CD-exclusive track. Album artwork remains hosted by Spotify. The full official artist directory is linked.

Only the official Spotify embed handles playback; no music files are downloaded, hosted or proxied. Playback may be a preview or a full track depending on Spotify's account, region and authorization. The official player was observed playing a preview during browser QA, including while a different simulated app was open. Premium/full-track playback was not tested.

The persistent top mini-player, queue, next/previous, pause, seek and repeat controls use the official iframe API and reflect its events. Browser autoplay restrictions and Spotify restrictions still apply. Spotify's SDK requires eval; that permission is scoped to `/spotify-bridge`, rather than enabled on the main page. Only same-origin validated postMessages are accepted by the bridge. The main document retains a stricter CSP. The embed is not destroyed when navigating between simulated apps.

## Public sources and external links

Public reporting is now indexed from English/Korean RSS headlines, cached in R2 for 15 minutes, and included in chat. It is best-effort media coverage, not a complete authenticated IG/Weverse post sync; the app also includes official links and manual background entries. It does not fabricate news or track private locations. Sources that prohibit framing open in new browser tabs.

Setup and connection instructions are also in Settings → 接入指南. The source is portable to Cloudflare Workers free tier using `wrangler.jsonc`; hosted infrastructure limits and DeepSeek billing are independent. No unlimited-free guarantee.

## Owner configuration page (v3.1)

Open `/admin` and sign in with the ChatGPT account that owns this Site. Verified platform identity headers and server-only `ADMIN_OWNER_EMAIL` authorize configuration reads and writes. A password-form input validates the DeepSeek key against the provider before saving. The provider key is sealed using AES-256-GCM with a random IV and fixed context; only ciphertext is persisted in the private R2 `BUCKET` binding. The encryption root is a native Sites runtime Secret `CONFIG_ENCRYPTION_KEY`; neither it nor the owner identity is in the source bundle. The main chat API reads and decrypts this server configuration, so saves apply to visitors without another deployment. `DEEPSEEK_API_KEY` environment fallback is retained for traditional deployments. Keys are never returned by the configuration APIs and the form clears after a successful save. Cross-origin writes, unauthenticated users and non-owner accounts are rejected. No plaintext key is sent to GitHub or stored in browser persistence by the owner form.

Security and mocked integration tests now total 13. The current Site already has a saved, verified owner key. New hosts require their own configuration. Invalid keys do not overwrite working configuration. Authenticated platform headers are trusted only at Sites dispatch; direct deployments elsewhere must supply their own verified owner identity boundary.

## Interaction pass (v3.2)

The public phone remains anonymous; ChatGPT sign-in is required only for `/admin`. The phone document is fixed to the visual viewport, with independent scrolling inside apps and keyboard-aware sizing. Desktop phone scale adapts to available height. All app screens have a top-left back control; route history restores the preceding page and scroll position. Export/import actions do not create navigable history entries.

Sheets, control center, photo viewer, notification banners and floating music controls support upward dismissal. Scrollable sheet content remains scrollable; use the visible top grip to dismiss without interfering with lists. Mouse dragging and touch gestures share the same threshold, and post-drag clicks are suppressed to prevent accidental button activation. Hiding the mini-player preserves playback; tapping the Dynamic Island reveals it again. Press, route and sheet animations respect the device's reduced-motion preference. Optional haptics use the standard Vibration API only where supported; iPhone/WebKit hardware vibration is not promised. Album cover URLs were repaired using the already-verified Spotify metadata's visualIdentity image sources.

Browser QA verified real route-back behavior, a fixed outer document, upward dismissal of a sheet and control center, native album cover loading and the haptics setting. Physical vibration and iPhone hardware smoothness have not been tested on a real device. The hosting domain has not changed; removing `chatgpt.site` requires a custom domain or a separate host/account and is not a title change.

## Current foundation pass

See `CODEX_HANDOFF.md` for current feature status, remaining work, build instructions and hosting boundaries. The main interface is Chinese; the language preference controls chat only.

## 虚构 X、秘密恋爱与音频增量（2026-10-25）

在 `codex/with-you-foundation` 原有界面上继续开发，未重新创建网站。原购物、订单、银行短信、聊天、Spotify、相册、备忘录、官方 Instagram / Weverse 链接均保留。上传的源码 ZIP 与本次开发前分支的 51 个文件完全一致。

- 第二页「提及」替换为本地虚构 X：推荐/关注、搜索与趋势、个人主页、关注、通知、私信、发帖、评论、点赞、转发、引用、@；支持静音/屏蔽。旧提及帖子、评论和玩家回复迁移保留。账号不连接真实 X，NPC 互动是有节流的本地上下文规则模拟，不是实时真人或实时 AI 社区。快速连续发帖会分批回应。
- Instagram / Weverse 保留原有官方入口，同时新增明确标记的游戏动态；动态可主动分享到虚构 X，配图可保存至相册，相册照片也能分享到 X。不会替玩家自动公开私人照片或恋情。
- 设置或 Jin 聊天中打开「人物与故事」，填写成年角色身份、选择从零认识或已有交集。已有恋人聊天保留关系。聊天表达推动相识、暧昧、心意、秘密恋爱与 Happy Ending；拒绝不当同意，结局后可继续聊天。关系识别是本地规则，AI 对话继续使用原 DeepSeek/Gemini 接口和多轮历史；不是保证理解所有自然语言的剧情导演。显式偏好、边界、近期剧情和私人购物记忆加入后续上下文。
- 原创本地合成配乐可选开启，按日常/甜蜜/紧张氛围切换，支持音量、静音、淡入淡出；语音播放时降低配乐，Spotify 正在播放时停下配乐。锁屏或后台暂停。没有新增未经授权的商业歌曲。
- 每条角色消息提供点按韩语语音，包含韩语字幕和原文。新增服务端 `TTS_API_KEY`（OpenAI 通用 Onyx 声线，不克隆真人），并复用 DeepSeek 翻译选中的实际消息。两项均按服务用量计费；未配置时明确报错，不伪造语音，不自动生成。现有站长后台只管理 DeepSeek，不管理 TTS；TTS 密钥应通过托管平台 Secret 配置。

数据仍使用原 `withyou-v2` localStorage，世界状态包含在原 JSON 导出/恢复中；支持旧备份恢复和重置。新增长期偏好也属于个人浏览器数据，请勿把自己的备份提交到仓库。游戏短信依旧只读。

本地运行：Node 22+，`npm run build`、`npm test`、`npm run dev -- --port 3000`。无需 npm 依赖。开发服务器只向 Worker 传入进程中的 `DEEPSEEK_API_KEY`、`DEEPSEEK_MODEL`、`TTS_API_KEY`；不会自动读取 `.env`。使用托管 Secret 或安全注入，不将密钥写到前端、GitHub 或聊天中。

验证：29 项 Node 测试（外部模型/语音使用模拟），桌面与移动视口浏览器检查覆盖 X 互动、动态联动、购物→短信、聊天多气泡、旧记录迁移、备份/恢复/重置、配乐与缺少语音服务提示。真实韩语音质与原站在线模型调用尚未在此开发环境验证；需要密钥和真实服务。真实 iPhone 音频/Safari 也需实机检查。

GitHub 更新不会自动更新原 `chatgpt.site` 网站。发布时保留 `.openai/hosting.json`，由原 Sites 项目部署构建输出，并保留原私有 R2/站长配置；不能通过源码取出原站密钥。环境设置发布也不等于网站部署。

