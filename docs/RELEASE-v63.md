# v63

Story hints are always enabled: remove the UI toggle, click handler and guide-removal hook; clear legacy opt-outs without resetting progress. Rain uses three photos in consecutive blocks (pages 1–4, 5–8, 9–12), retaining manual reading and all text/media elsewhere. Relevant checks: 11 regression tests plus legacy hint migration test pass; build and artifact validation pass. No device visual playthrough performed.

IG correction: both intro-days choices route directly to spark, and the actual choice handler delivers and pumps the IG notice synchronously. Legacy pending music is preserved for after the explanation rather than bypassing the comment. Actual choice-handler VM checks cover both replies and the IG→KKT→Threads ordering; 14 focused checks pass.
