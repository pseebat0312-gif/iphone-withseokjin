export function hasFinishedOcean66(story){return Boolean(story?.longSeen?.includes('ocean:main')||story?.done?.includes('r-sea-photo'))}
export function installSeaRoute66(nodes){
 const base={act:8,line:'A',actor:'jin',app:'kkt',requires:[],events:[],key:true};
 nodes['r-sea-quiet']={...base,id:'r-sea-quiet',messages:['好，我陪你。','想聊什么就说，不想说也可以，就这么待会儿。','海边不急，咱们下周再去。'],choices:[{id:'chat',label:'那你陪我聊会儿天吧',next:['r-sea-nextweek'],effects:{seaDeferred:true},reply:['嗯，我听着。今天不赶时间。']},{id:'quiet',label:'靠着你待一会儿就好',next:['r-sea-nextweek'],effects:{seaDeferred:true},reply:['好，过来一点。']}]};
 nodes['r-sea-nextweek']={...base,id:'r-sea-nextweek',messages:['一周后。','周日我空出来了，还记得咱们约的海边吗？','我来接你。'],choices:[{id:'go',label:'记得！我们出发吧',next:['r-sea-arrive'],effects:{seaDate:true},reply:[]},{id:'slow',label:'好，这次想和你慢慢看海',next:['r-sea-arrive'],effects:{seaDate:true},reply:[]}]};
 for(const c of nodes['r-jk-after']?.choices||[])if(c.id==='talk')c.next=['r-sea-quiet'];
 for(const c of nodes['r-sea-invite']?.choices||[])if(c.id==='home'){c.label='今天想静一静，你陪我聊会儿，下周再看海';c.next=['r-sea-quiet'];}
 const legacy=nodes['r-sea-home'];if(legacy){legacy.app='kkt';delete legacy.scene;delete legacy.music;legacy.events=[];legacy.messages=['好，今天先陪你。','海边我们下周再去。'];for(const c of legacy.choices)c.next=['r-sea-nextweek'];}
}
export function repairSeaRoute66(story){
 if(!story||story.seaRouteRevision===66)return;
 story.seaRouteRevision=66;if(hasFinishedOcean66(story))return;
 const queue=story.queue||[],late=queue.some(id=>['r-tae-close','r-jk-close','r-finale'].includes(id)),ended=story.checkpoint?.id==='r-finale';
 if(ended||late){if(ended)story.seaEndingRestore66=structuredClone(story.checkpoint);else story.seaReturnQueue66=[...queue];story.checkpoint=null;story.queue=['r-sea-nextweek'];}
 else if(queue.includes('r-sea-home')){story.queue=queue.map(id=>id==='r-sea-home'?'r-sea-quiet':id);}
 else if(queue.includes('r-sea-invite')&&story.choices?.some(c=>c.node==='r-jk-after'&&c.choice==='talk')){story.queue=queue.map(id=>id==='r-sea-invite'?'r-sea-quiet':id);}
 if(story.sceneChapter?.active&&story.sceneChapter.node==='r-sea-home')story.sceneChapter.active=false;
}
export function finishRecoveredOcean66(story){
 if(!hasFinishedOcean66(story))return false;
 if(story.seaEndingRestore66){story.checkpoint=story.seaEndingRestore66;delete story.seaEndingRestore66;story.queue=[];delete story.dailyActive;return true;}
 if(story.seaReturnQueue66){story.queue=story.seaReturnQueue66;delete story.seaReturnQueue66;return true;}
 return false;
}
