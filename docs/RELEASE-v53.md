WITH YOU v53 — 2026-10-27

Fix unstarted/empty-node state being mislabeled as completed in the cross-app story guide and desktop. Completion now requires a valid ending that was actually delivered; ready profiles show 故事尚未开始. Story menu and daily scheduling/entry use the same state check.

User-requested restart semantics: confirmed 重新开始故事 now clears all localStorage and sessionStorage for the Site origin, including phone state, legacy phone state, story, previous-story backup, UI preferences, session keys, imported photos/music and all app data. Stop requests/media/camera; block save() and scriptSave() during reset; reload to defaults. Other open tabs respond to the clear event by disabling persistence and reloading. No automatic reset during release or startup. Reset confirmation and help text now describe the full clear; server configuration is untouched.

Storage audit: source uses localStorage and sessionStorage; no IndexedDB, CacheStorage or Service Worker persistence. Browser HTTP cache holds published assets, not saved game data.

Validation: 15 passed across restart-status-v53, intro-v52, editorial-v50 and release-v51. Includes actual guide/launcher functions in VM, confirmed/cancelled reset storage checks, old-tab reload handling, existing mandatory IG/Threads behavior and authored intro. Compile/build/artifact validation passed. No device playthrough claimed.
