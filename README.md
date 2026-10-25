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
