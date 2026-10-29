(()=>{applyEditorialV50(NODES,LONG_CHAPTERS,EDITORIAL_V50,AUTHORED_TRUTH);for(const[key,versions]of Object.entries(EDITORIAL_V50.sweetDialogue))versions.forEach((lines,v)=>lines.forEach((line,i)=>{const p=SWEET_DATES[key]?.[v]?.pages[i];if(p)p.lines[p.lines.length-1]=line}));if(campaign){reviseSavedChat(campaign,NODES);refreshAuthoredMessages(campaign,NODES);scriptSave()}})();

(()=>{const previous=scenePageLines;scenePageLines=function(key,index,choices){if(key==='intro')return LONG_CHAPTERS.intro.pages[index]?.lines.map(t=>introNameText(t,campaign?.profile));return previous(key,index,choices)};if(campaign&&campaign.introTextRevision!==52){const s=campaign.sceneChapter;if(s?.key==='intro'){if(s.index>8)s.index--;s.index=Math.min(s.index,LONG_CHAPTERS.intro.pages.length-1);s.readingPart=0;}campaign.introTextRevision=52;scriptSave()}})();

(()=>{const previous=scenePageLines;scenePageLines=function(key,index,choices){if(key==='earlyStore')return LONG_CHAPTERS.earlyStore.pages[index]?.lines;return previous(key,index,choices)};if(campaign){migrateStoreReading(campaign,LONG_CHAPTERS.earlyStore.pages.length);scriptSave()}})();

if(removeContextlessCallback(campaign,state)){save();scriptSave()}

(()=>{installConfessionV61(LONG_CHAPTERS,SCENE_CHOICE_ECHO);const previous=scenePageLines;scenePageLines=function(key,index,choices){return key==='confession'?confessionLinesV61(LONG_CHAPTERS,SCENE_CHOICE_ECHO,index,choices):previous(key,index,choices)};if(campaign&&campaign.confessionTextRevision!==61){if(campaign.sceneChapter?.key==='confession'){campaign.sceneChapter.readingPart=0;campaign.sceneChapter.readingPage=null;}campaign.confessionTextRevision=61;scriptSave()}})();

(()=>{installCinemaTerraceV62(NODES,LONG_CHAPTERS);const previous=scenePageLines;scenePageLines=function(key,index,choices){return CINEMA_TERRACE_V62.pages[key]?LONG_CHAPTERS[key].pages[index]?.lines:previous(key,index,choices)};if(campaign){migrateCinemaTerraceV62(campaign);reviseSavedChat(campaign,NODES);refreshAuthoredMessages(campaign,NODES);scriptSave()}})();
