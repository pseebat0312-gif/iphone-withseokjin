WITH YOU v55 — 2026-10-27

Remove Jin-authored Instagram posts, including the two default seed posts and legacy IG entries that the renderer treated as Jin because author was absent. Existing local saves are cleaned on startup; related notices referring only to deleted posts are removed. IG feed also filters any future Jin/implicit-Jin post. Script synchronization blocks Jin posts and resolves omitted authors using the originating node actor so another character's posts are not misattributed to Jin. Player posts, Jin's accidental public comment/deletion events, KKT, X, and Threads remain intact.

19 relevant tests passed; compile/build/artifact validation passed. No device playthrough claimed.
