WITH YOU v51 — 2026-10-27

Scope: requested chat wording, mandatory IG event, missing authored Threads NPC recovery.

- a-snack meet reply now exactly 你好，那一份我留着。
- a-life care label removes 糗事攒着; removes the two associated joke replies.
- Both intro-days choices lead to spark before a-music; both spark choices rejoin a-music, then piano and cafe. Already-heard piano saves rejoin r-invite.
- Old saves waiting at a-music/r-invite after intro-days recover spark. Old saves already midway through piano recover it after a-next-morning. No progress reset or replay of piano.
- NPC recovery checks actual post IDs rather than trusting stale npcBatches. Restart clears batch and hot-discussion flags. The 37 authored texts are unchanged; missing posts regenerate, existing IDs remain intact, no duplicate posts.
- All media files, scene prose, styles, and Threads NPC metrics remain unchanged.

Verified: node --test tests/release-v51.test.mjs tests/editorial-v50.test.mjs (8 passed); compile; build; artifact ESM/default.fetch validation.
No claim of browser or device playthrough.
