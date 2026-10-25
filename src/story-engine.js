/* Context-driven story orchestration. One job at a time, saved locally, no silent resets. */
let directorBusy=false,directorAgain=false,directorTimer=null,openingOffered=false,openingShown=false,socialBusy=new Set();
state.romance.engine=state.romance.engine||{version:2,summary:'',focus:'',error:'',lastAttempt:0,lastReflect:0,episodes:[],paused:false};
const engine=()=>state.romance.engine||(state.romance.engine={version:2,summary:'',focus:'',error:'',lastAttempt:0,lastReflect:0,episodes:[],paused:false});
function storyReady(){return state.romance.configured&&!state.romance.paused&&!engine().paused&&document.visibilityState==='visible'&&!['lock','passcode'].includes(page)}
function directorHistory(){return state.chats.jin.filter(m=>!state.romance.storyStartAt||m.at>=state.romance.storyStartAt).slice(-18).map(m=>({role:m.role,text:m.text.slice(0,1800)}))}
function currentStoryContext(){const r=state.romance,e=engine();return romanceContext(r,state.world)+'\n连续剧情摘要：'+e.summary+'\n当前尚待玩家决定的事：'+e.focus+'\n最近事件（避免重复）：'+JSON.stringify(e.episodes.slice(-6).map(x=>x.summary))+'\n游戏订单（私人，NPC 不知道）：'+JSON.stringify(state.orders.slice(-2).map(o=>o.name))}
async function worldRequest(body){const r=await fetch('/api/world',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(45000)});const data=await r.json();if(!r.ok)throw Error(data.error||'暂时没有取得剧情');return data.plan}
function worldUserMessage(text){
 const r=state.romance;r.turns++;r.stageTurns++;r.journal.push({at:Date.now(),kind:'player',text:text.slice(0,240)});r.journal=r.journal.slice(-50);
 // Record only explicit user facts, never model guesses.
 if(/我叫|我是|我喜欢|我不喜欢|过敏|生日|我的工作|记住|不要叫我/.test(text)&&!r.facts.includes(text.slice(0,150)))r.facts.push(text.slice(0,150));r.facts=r.facts.slice(-40);
 if(/先暂停剧情|暂停生活事件/.test(text)){r.paused=true;toast('自动剧情已暂停，自由聊天继续')}
 engine().revision=(engine().revision||0)+1;save();
}
function worldAfterChat(){if(!state.romance.configured)return;clearTimeout(directorTimer);directorTimer=setTimeout(()=>runDirector('reflect'),1200)}
function storyChanged(){save();updateSceneMusic();renderStoryLauncher();if(page==='mentions')refreshXInPlace();}
async function runDirector(mode='scene',manual=false){
 const r=state.romance,e=engine();if(!storyReady()||!(siteConfig.ready||sessionKey))return;
 if(directorBusy||pending.has('jin')){if(mode==='reflect')directorAgain=true;return}
 const now=Date.now();if(!manual&&now-e.lastAttempt<25000){if(mode==='reflect'){clearTimeout(directorTimer);directorTimer=setTimeout(()=>runDirector('reflect'),26000-(now-e.lastAttempt))}return}
 if(mode==='scene'&&!manual&&now-r.lastEventAt<120000)return;
 directorBusy=true;e.lastAttempt=now;e.error='';const revision=e.revision||0;renderStoryLauncher();
 try{
  const h=directorHistory();const plan=await worldRequest({mode,context:currentStoryContext().slice(0,9000),messages:h});
  // A new player message wins over a plan generated against stale context.
  if(state.romance!==r||revision!==(e.revision||0)||!storyReady())return;
  if(plan.summary)e.summary=plan.summary;if(plan.focus)e.focus=plan.focus;
  if(mode==='reflect'){
   const user=h.filter(x=>x.role==='user').at(-1)?.text||'';
   // Only a proposal preceding this player response can establish mutual consent.
   const index=h.map(x=>x.role).lastIndexOf('user');const preceding=h.slice(0,index).filter(x=>x.role==='assistant').slice(-4).map(x=>x.text).join(' ');
   const next=acceptedStage(r,plan,user,preceding);if(next!==r.stage){r.journal.push({at:Date.now(),kind:'relationship',text:WORLD_LABELS[r.stage]+' → '+WORLD_LABELS[next]});r.stage=next;r.stageTurns=0;toast('你们的关系有了新的进展')}
   e.lastReflect=Date.now();
  }else if(plan.messages.length){
   const episode={id:uid(),at:Date.now(),title:plan.title||'生活继续',summary:plan.summary,mood:plan.mood};e.episodes.push(episode);e.episodes=e.episodes.slice(-40);r.lastEventAt=Date.now();r.eventCount++;r.mood=plan.mood;
   r.journal.push({at:Date.now(),kind:'scene',text:plan.summary});r.journal=r.journal.slice(-50);
   if(plan.publicUpdate){const a={id:uid(),...plan.publicUpdate,at:Date.now(),scene:episode.id};state.world.activity.unshift(a);state.world.activity=state.world.activity.slice(0,80);addAmbientPost(plan.publicUpdate.text,episode.id)}
   if(plan.sms){const sender=state.sms.find(x=>x.id==='bighit');if(sender){sender.messages.push({text:'[虚构生活事件] '+plan.sms,at:Date.now()});state.smsUnread++;showGameBanner('bighit',plan.sms,'sms:bighit')}}
   save();
   for(let i=0;i<plan.messages.length;i++){if(i)await new Promise(done=>setTimeout(done,650+Math.min(700,plan.messages[i].length*12)));if(revision!==(e.revision||0)||!storyReady())break;receiveWorldChat(plan.messages[i],{id:episode.id,ko:''})}
  }
  r.mood=plan.mood;storyChanged();
 }catch(error){e.error=error.name==='TimeoutError'?'剧情生成稍慢，请稍后重试':error.message;save();if(manual)toast(e.error)}finally{directorBusy=false;renderStoryLauncher();if(directorAgain){directorAgain=false;worldAfterChat()}}
}
function deliverRomanceScene(force=false){return runDirector('scene',force)}
function addAmbientPost(text,eventId){
 // Other users see only an innocuous public update, not the private scene.
 state.world.posts.push({id:uid(),author:'day',text:'公开的游戏动态里看到一句：'+text,at:Date.now(),likes:1,reposts:0,comments:[],eventId});state.world.posts=state.world.posts.slice(-300);
 worldNotice(state.world,'post','日光存档发布了新动态',state.world.posts.at(-1).id,Date.now(),uid());
}
function refreshXInPlace(){if(page!=='mentions'||xComposing||$('#overlay').children.length)return;const field=document.activeElement;if(field?.matches('input,textarea'))return;const scroll=$('.page-scroll')?.scrollTop||0;renderMentions();const el=$('.page-scroll');if(el)el.scrollTop=scroll}
function queueSocialReaction(w,post,now=Date.now()){
 if(socialBusy.has(post.id)||post.reacted||w!==state.world||!(siteConfig.ready||sessionKey))return [];
 if(Date.now()-(post.reactionAttempt||0)<45000)return [];
 const available=WORLD_NPCS.filter(n=>!w.blocked.includes(n.id)&&!w.muted.includes(n.id)).map(n=>n.id);if(!available.length)return [];
 socialBusy.add(post.id);post.reactionAttempt=Date.now();save();
 (async()=>{try{
  const revision=post.comments.length;const plan=await worldRequest({mode:'social',post:{text:post.text,comments:post.comments.slice(-8)},npcs:available});
  if(w!==state.world||!w.posts.includes(post)||post.comments.length!==revision)return;
  for(const c of plan.comments){if(w.blocked.includes(c.author)||w.muted.includes(c.author))continue;post.comments.push({id:uid(),author:c.author,text:c.text,at:Date.now()});const n=npcById(c.author);worldNotice(w,'comment',n.name+' 回复了你的帖子',post.id,Date.now(),uid());if(n.tone==='support'||n.tone==='casual'){post.likes++;if(!w.followers.includes(n.id))w.followers.push(n.id)}if(c.repost){post.reposts++;w.posts.push({id:uid(),author:n.id,text:c.text,quote:post.id,at:Date.now(),likes:0,reposts:0,comments:[]})}}
  post.reacted=true;post.reactionError='';w.lastReaction=Date.now();save();if(plan.comments.length){showGameBanner('X · 虚构互动','有人回应了你的帖子','mentions');refreshXInPlace();if(page==='home')renderHome()}
  if(state.romance.configured&&plan.comments.some(c=>c.author==='night'||c.author==='paper')){recordWorldEvent('public','玩家公开帖子引起不同意见；硕珍只有在玩家告诉他或看见公开帖后才知道。');engine().focus=engine().focus||'网上的讨论与私人生活之间有信息差，不升级为泄露身份';}
 }catch(error){post.reactionError=error.message;save();refreshXInPlace()}finally{socialBusy.delete(post.id)}})();return [];
}
function showRomanceSetup(){
 const r=state.romance,e=engine();modal(r.configured?'你们的故事':'先决定，故事从哪里开始',`<p class="story-intro">这是成年角色的虚构生活。你可以随便聊天、发帖、买东西；生活事件会自然到来。每次邀约和关系确认，都由你自己回答。</p><form id="romance-profile"><label for="romance-identity">你是谁？</label><textarea id="romance-identity" maxlength="300" placeholder="身份、喜欢的东西，或者先留空慢慢聊">${escape(r.identity)}</textarea>${!r.configured?`<label for="romance-backstory">这一次的起点</label><select id="romance-backstory"><option value="strangers">从零认识</option><option value="acquainted">已有交集，慢慢靠近</option>${state.chats.jin.length?'<option value="continue" selected>延续已有恋人聊天</option>':''}</select><p class="explain">原有聊天完整保留。选择新起点时，AI 会从这次开场继续理解关系。</p>`:`<div class="story-now"><small>现在 · ${WORLD_LABELS[r.stage]}</small><p>${escape(e.summary||'刚刚开始，给彼此一点自然相处的空间。')}</p>${e.focus?`<small>尚未说完的事</small><p>${escape(e.focus)}</p>`:''}</div>`}<div class="setting-row">自动生活事件<button type="button" class="toggle ${!r.paused?'on':''}" data-story-control="pause" role="switch" aria-label="自动生活事件" aria-checked="${!r.paused}"></button></div><p class="explain">网页在前台时运行，约每两分钟安排一小步；聊天期间让你先说。不会在关闭网页后继续发消息。会使用现有 DeepSeek 余额。</p><button class="primary">${r.configured?'保存身份，继续聊天':'开始故事'}</button></form>${r.configured?'<button class="secondary" data-story-control="next">让生活往前走一步</button>':''}<button class="secondary" data-world="audio">语音与背景配乐</button>${e.error?`<p class="story-error" role="status">${escape(e.error)}。自由聊天可继续。</p>`:''}${e.episodes.length?`<details class="story-journal"><summary>已经发生的事 · ${e.episodes.length}</summary>${e.episodes.slice(-8).reverse().map(x=>`<p><strong>${escape(x.title)}</strong><br>${escape(x.summary)}</p>`).join('')}</details>`:''}`,'<button class="secondary" data-action="close-overlay">先看看手机</button>');
 $('#romance-profile').addEventListener('submit',event=>{event.preventDefault();r.identity=$('#romance-identity').value.trim();if(!r.configured){const choice=$('#romance-backstory').value;r.backstory=choice==='strangers'?'strangers':'acquainted';if(choice!=='continue'){r.stage='meeting';r.storyStartAt=Date.now()}r.configured=true;r.paused=false;state.proactive=true;r.lastEventAt=0;e.focus='用符合身份背景的第一条消息开始，介绍联系方式的由来，留给玩家回答';}save();$('#overlay').replaceChildren();openRoom('jin','kkt');runDirector('scene',true)});
}
function renderStoryLauncher(){if(page!=='home')return;let node=$('#story-launcher');if(!node){node=document.createElement('button');node.id='story-launcher';node.dataset.world='setup';screen.append(node)}node.innerHTML=`<span class="story-live-dot"></span>${!state.romance.configured?'开始你的故事':directorBusy?'生活正在发生…':state.romance.paused?'故事已暂停':WORLD_LABELS[state.romance.stage]+' · 故事进行中'} <span>›</span>`;node.setAttribute('aria-label',state.romance.configured?'查看故事进展':'开始你的故事')}
function offerStoryOpening(){renderStoryLauncher();if(!state.romance.configured&&page==='home'&&!openingOffered&&!$('#overlay').children.length){openingOffered=true;setTimeout(()=>{if(page==='home'&&!$('#overlay').children.length)showRomanceSetup()},250)}}
new MutationObserver(()=>{renderStoryLauncher();if(page==='home')offerStoryOpening();if(page==='chat'&&$('#messages')&&!$('#message-input')?.value){const list=$('#messages');requestAnimationFrame(()=>{if(list.isConnected)list.scrollTop=list.scrollHeight})}}).observe(screen,{childList:true});
new MutationObserver(()=>{if(page==='home'&&!$('#overlay').children.length)offerStoryOpening()}).observe($('#overlay'),{childList:true});
document.addEventListener('click',event=>{const target=event.target.closest('[data-story-control]');if(!target)return;if(target.dataset.storyControl==='pause'){state.romance.paused=!state.romance.paused;save();showRomanceSetup()}else if(target.dataset.storyControl==='next'){$('#overlay').replaceChildren();runDirector('scene',true)}},true);
// Pauses protect player input, overlays, and background tabs. Never run catch-up bursts.
setInterval(()=>{if(!storyReady()||$('#overlay').children.length||pending.has('jin')||$('#message-input')?.value.trim())return;runDirector('scene')},15000);
window.addEventListener('online',()=>{if(storyReady())runDirector('reflect')});
offerStoryOpening();
async function queueDirectMessage(peer){
 const w=state.world,key='dm:'+peer;if(socialBusy.has(key)||w.blocked.includes(peer))return;socialBusy.add(key);
 try{const history=w.dms.filter(x=>x.peer===peer||x.author===peer).slice(-8);const revision=history.at(-1)?.id;const p=await worldRequest({mode:'dm',post:{text:history.filter(x=>x.author==='you').at(-1)?.text||'',comments:history.map(x=>({author:x.author,text:x.text}))},npcs:[peer]});if(w!==state.world||w.blocked.includes(peer)||w.dms.filter(x=>x.peer===peer||x.author===peer).at(-1)?.id!==revision)return;for(const c of p.comments){if(c.author!==peer)continue;w.dms.push({id:uid(),author:peer,peer,text:c.text,at:Date.now()})}worldNotice(w,'dm',xName(peer)+' 回复了你的私信','',Date.now(),uid());save();showGameBanner('X · 私信',xName(peer)+' 发来新消息','mentions');refreshXInPlace()}catch(error){toast('私信暂未回复：'+error.message)}finally{socialBusy.delete(key)}
}
