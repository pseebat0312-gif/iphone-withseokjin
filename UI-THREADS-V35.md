# v35 Fullscreen scenes and Threads

- Original scene images/SVGs now fill the scene; scoped glass panels and white prose keep contrast, with opacity fallback. All original scene text, IDs, music files, timing and playback code retained.
- Seven supplied Jin originals retained as assets/story/jin-album-{1..7}.jpg. Added read-only album entries without editing uploads or save keys. Delivery copies are WebP, 600x900 maximum, q62 to fit existing Worker limit.
- Official Threads mark extracted from the icon diagram supplied by Meta Brand Resource Center https://www.meta.com/brand/resources/threads/ (retrieved 2026-10-26); clear-space diagram labels removed; logo proportions retained.
- Threads has separate local posts/replies/likes/follows/reposts/quotes, profile/search/activity routes. Drafts live in src/scripted/threads-data.mjs, unlocked by existing delivered nodes. Interactions logged in additive campaign.threadsActions and state.threads. Existing X untouched.
- Drafts are review material, not the user's final authored story. No live Threads service/real account connected. NPC replies are authored drafts, not a live AI service.
- Seven tests for photo/persona/cinema, 32 targeted scene/chat/story tests and 3 new Threads tests passed. Preview confirmed new icon, discussion/reply and 16-photo album. Real-device Safari/Android not available for this turn.
