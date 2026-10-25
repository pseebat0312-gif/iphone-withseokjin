# WITH YOU: continuation guide

Existing public Site: https://with-seokjin-phone.sacredzebra262144.chatgpt.site/
Original repository: pseebat0312-gif/iphone-withseokjin. This branch contains the current modular source. Original main is preserved for review.

## Run

Node 22+, no npm dependencies. `npm run build`, `npm test`, `npm run dev -- --port 3000`. Edit `src/`, not generated `worker/index.js`; the compiler creates it. `scripts/build.sh` prepares the Sites Worker artifact.

## Working features

- Public, anonymous shared DeepSeek chat; owner's encrypted key remains only in the current Site's private R2. No keys are in this repository. Moving to a different host requires setting runtime secrets again.
- Flexible provider reply parsing, multi-turn history, natural multiple bubbles without a five-bubble limit; 4096 output tokens is a finite provider budget. Gemini compatibility retained.
- Jin default wallpaper from the supplied photo; existing custom wallpaper preserved. Native app history, fixed outer viewport and upward dismissal remain.
- Two home pages, IG and Weverse public HTTPS links. Installed native-app routing depends on OS universal-link handling; webpages may open instead.
- Original bighit and 松州银行 SMS restored, read-only SMS UI separate from member chats.
- Simulated SSG-inspired luxury/Apple shopping, fictional card checkout, local orders, SMS and banner. No payment service and no real transactions.
- Opt-in random fictional exposure events, comments, a local reply, and a contextual Jin proactive API message. Never posts to real social media. Story samples are a prototype, not the final agreed script.
- Jin idle proactive chat enabled by default, can disable in Display settings. Runs only while page is foreground and unlocked; about 3 minutes inactivity. Game closed => no push.
- Music shows cover/equalizer in Dynamic Island; tap to open existing Spotify controls. Playback permission remains Spotify's.
- Owner-only `/api/admin/balance` queries official DeepSeek balance. Open `/admin` polls every 60 seconds and warns at CNY <=0.50. USD is never mis-compared with CNY. No closed-page/background alert yet.
- Public reporting RSS index tries English/Korean BTS Instagram/Weverse coverage, 15-minute R2 cache. Sends sourced dated HEADLINES to chat, not full articles. May fail, omit posts, or lag. News failure is explicit and never blocks ordinary chat. Not a first-party post mirror and not independent verification.

## Still to discuss / implement

- Full Chinese/Korean/English interface translation. Current setting controls AI chat only; UI is primarily Chinese.
- Actual incoming/outgoing voice calls, speech recognition and streaming Korean/Chinese subtitles are not connected. Use an authorized generic Korean TTS voice or a consenting performer; do not scrape or clone a real person's voice without permission. Browser speechSynthesis voices vary by device and are not a guaranteed service.
- Final branching romance script: choose daily-life/drama ratio, relationship backstory, exposure pacing, and whether friends/company know. Keep real public activity separate from fictional private activity.
- Closed-page background notifications and owner low-balance alerts need a real scheduled runtime + notification channel. No monitoring task has been scheduled by this source alone.
- Free hosting without chatgpt.site needs a separate Cloudflare account/custom domain; the current hostname has not changed.
- Exact native iOS behavior, guaranteed iPhone hardware vibration, all official songs as MP3, all IG/WVS posts instantly, or unlimited free inference are not implemented promises.

## Deployment / security

Current Sites project identity is preserved in `.openai/hosting.json`. `ADMIN_OWNER_EMAIL` and 32-byte base64 `CONFIG_ENCRYPTION_KEY` are runtime secrets. `BUCKET` is private R2. Owner identity headers are trusted only behind Sites authentication. **On another host, remove or replace the admin identity scheme with verified authentication; do not trust client-provided headers.** Alternatively configure DeepSeek by server environment and disable the owner web route there.

Tests cover admin identity, encryption and tampering, same-origin config writes, shared anonymous chat, provider error handling, flexible and truncated replies, multi-turn continuation, owner-only balance threshold, and sourced RSS filtering. Real-device Safari responsiveness and true hardware vibration are unverified.
