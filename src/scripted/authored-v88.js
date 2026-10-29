/* Exact final manuscript. Headings are chapters; each nonempty authored line is a screen. */
(()=>{
 for(const [key,pages]of Object.entries(AUTHORED88)){
  const chapter=LONG_CHAPTERS[key],old=chapter.pages;
  chapter.pages=pages.map((p,i)=>({...old[Math.min(i,old.length-1)],...p,authoredLines88:true}));
 }
 for(const key of ['home','ocean'])for(const p of LONG_CHAPTERS[key].pages)p.authoredLines88=true;
 const previous=scenePageLines;
 scenePageLines=function(key,index,choices={}){
  if(!AUTHORED88[key])return previous(key,index,choices);
  const lines=LONG_CHAPTERS[key].pages[index].lines;
  return key==='intro'?lines.map(t=>introNameText(t,campaign?.profile)):lines;
 };
 if(campaign&&campaign.authoredRevision88!==true){const s=campaign.sceneChapter;if(s&&AUTHORED88[s.key]){s.index=Math.min(s.index,LONG_CHAPTERS[s.key].pages.length-1);s.readingPart=0;s.readingPage=null;}campaign.authoredRevision88=true;scriptSave();}
if(campaign&&campaign.introFinalRevision94!==true){const session=campaign.sceneChapter;if(session?.key==='intro'){session.readingPart=0;session.readingPage=null;}campaign.introFinalRevision94=true;scriptSave();}
if(campaign&&!campaign.threeFinal96){const s=campaign.sceneChapter;if(s&&['intro','earlyStore','earlyRain'].includes(s.key)){s.index=Math.min(s.index,LONG_CHAPTERS[s.key].pages.length-1);s.readingPart=0;s.readingPage=null;}campaign.threeFinal96=true;scriptSave();}
})();
