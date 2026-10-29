// First edited copy plus inline author instructions; later pasted copies are archival.
export function installEditorial67(chapters,data){
 for(const[key,pages]of Object.entries(data.lines))for(const[i,lines]of Object.entries(pages))for(const[j,text]of Object.entries(lines))chapters[key].pages[i].lines[j]=text;
 for(const[key,pages]of Object.entries(data.trim))for(const[i,count]of Object.entries(pages))chapters[key].pages[i].lines.length=count;
 chapters.ocean.pages[7].options=null;
 const ocean=chapters.ocean;if(!ocean.pages.some(p=>p.closing72)){
  ocean.pages[11].options=null;
  const place=ocean.pages[11].place;
  ocean.pages.push({title:'再坐一小会儿',place,closing72:true,lines:['回到小屋，你们把沾着沙的鞋留在门边。他重新倒了两杯温水，在你身边坐下。','“刚才走了那么久，现在怎么又不想动了。”他偏过头笑，“再陪哥哥坐一会儿吧。”'],options:[['linger','继续陪他坐一会儿']]});
  ocean.pages.push({title:'等你说再见',place,closing72:true,lines:['窗外的海还在响。他的手松松握着你的，偶尔低头看你一眼，没有催着结束这一天。','你们可以再坐一会儿。什么时候结束这次约会，由你决定。'],options:[['finish','结束这次海边约会，回到聊天']]});
 }

 for(const[key,indices]of Object.entries(data.keep)){
  const old=chapters[key].pages;
  chapters[key].pages=indices.map(i=>({...old.find(p=>p.editorialSourceIndex67===i)||old[i],editorialSourceIndex67:i}));
 }
}
export function migrateEditorial67(story,data){
 if(!story||story.editorialRevision67)return;
 const s=story.sceneChapter,indices=data.keep[s?.key];
 if(indices){
  const shift=i=>{const n=indices.findIndex(v=>v>=i);return n<0?indices.length-1:n};
  const remap=o=>Object.fromEntries(Object.entries(o||{}).filter(([k])=>!/^\d+$/.test(k)||indices.includes(Number(k))).map(([k,v])=>[/^\d+$/.test(k)?String(shift(Number(k))):k,v]));
  s.index=shift(s.index||0);if(s.furthest!==undefined)s.furthest=shift(s.furthest);
  s.choices=remap(s.choices);s.undo=remap(s.undo);
  for(const snap of Object.values(s.undo))if(snap.choices)snap.choices=remap(snap.choices);
 }
 if(s&&['earlyRain','home','safe','ocean','confession','cafeDate','riverside'].includes(s.key)){s.readingPart=0;s.readingPage=null;}
 if(story.pacingMemories?.earlyRain){const ids=data.keep.earlyRain;story.pacingMemories.earlyRain=Object.fromEntries(Object.entries(story.pacingMemories.earlyRain).filter(([k])=>!/^\d+$/.test(k)||ids.includes(Number(k))).map(([k,v])=>[/^\d+$/.test(k)?String(ids.indexOf(Number(k))):k,v]));}
 story.editorialRevision67=true;
}
// The default updated arrays also supply duplicate no/cheek hug and lean-kiss prose.
// A legacy non-hug/non-kiss decision still has its original dedicated response.
export function editorialLines67(chapters,echoes,key,index,choices={},previous){
 if(!['earlyRain','cafeDate','home','safe','ocean','riverside'].includes(key))return previous(key,index,choices);
 if(key==='ocean'&&((index===8&&choices.hug==='lean')||(index===10&&['no','cheek'].includes(choices.kiss))))return previous(key,index,choices);
 let lines=[...chapters[key].pages[index].lines];
 const echo=echoes[key]?.[choices[index-1]];if(echo)lines=[...echo,...lines];
 return lines;
}
