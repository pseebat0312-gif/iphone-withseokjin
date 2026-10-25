/* Additive phone apps: fictional X, private romance and original ambient score. */
function initializeWorldState(){
 state.world=state.world?.version===1?state.world:createWorld(state.storyEvents);
 state.romance=state.romance?.version===1?state.romance:makeRomance(state.chats.jin.length>0);state.romance.facts=state.romance.facts||[];
 state.sceneAudio={enabled:false,volume:.25,muted:false,...state.sceneAudio};
 state.sms=Array.isArray(state.sms)?state.sms:[{id:'bighit',name:'bighit',messages:[]},{id:'bank',name:'松州银行',messages:[]}];
 state.orders=Array.isArray(state.orders)?state.orders:[];state.unread=state.unread||{};state.notificationsLog=state.notificationsLog||[];
 state.smsUnread=state.smsUnread||0;state.soundVolume=state.soundVolume??.7;state.notifications=state.notifications!==false;state.sound=state.sound!==false;
}
initializeWorldState();
const xApp=v3Apps.find(a=>a[0]==='mentions');if(xApp){xApp[1]='X';xApp[3]='x'}
paths.home='<path d="m3 11 9-8 9 8v10h-6v-7H9v7H3Z"/>';
paths.x='<path d="M4 3h5l11 18h-5ZM20 3 4 21"/>';
let xComposeImage='';
let xTab='for-you',xQuery='',xProfile='you',xThread='',xDm='peach',xQuote='',xReply='',xComposing=false;
let voicePlayer=null,voiceUrl='',voiceBusy=false,voiceGeneration=0,voiceBubble='',worldBubbleTimer=null;
let worldSceneActive=false;
const npcById=id=>WORLD_NPCS.find(n=>n.id===id);
const xName=id=>id==='you'?state.nickname:(npcById(id)?.name||id);
const xHandle=id=>id==='you'?'you':(npcById(id)?.handle||id.replace(/^@/,''));
function xText(text){return escape(text).replace(/(^|\s)([@#][\w\u3400-\u9fff]+)/g,'$1<span class="x-tag">$2</span>')}
function xAvatar(id){return `<span class="x-avatar">${escape(xName(id)[0])}</span>`}
function xAction(action,label,extra='',selected=false){return `<button data-x-action="${action}" ${extra} class="${selected?'selected':''}">${label}</button>`}
function xNotification(text,post,type='comment'){
 worldNotice(state.world,type,text,post,Date.now(),uid());save();showGameBanner('X · 虚构互动',text,'mentions');if(page==='home')renderHome();else if(page==='lock')renderLock();
}
function xPostCard(p,detail=false){
 const quote=p.quote&&state.world.posts.find(x=>x.id===p.quote);
 return `<article class="x-post" data-post-id="${escape(p.id)}"><div>${xAvatar(p.author)}</div><div class="x-post-main"><header><button data-x-profile="${escape(p.author)}"><strong>${escape(xName(p.author))}</strong></button><span>@${escape(xHandle(p.author))} · ${time(p.at)}</span></header><button class="x-post-text" data-x-thread="${escape(p.id)}">${xText(p.text)}</button>${p.author==='you'&&!p.reacted?`<small class="x-reaction-state">${p.reactionError?escape(p.reactionError)+' · 稍后自动重试':'虚构社区正在读你的帖子…'}</small>`:''}${quote?`<blockquote><strong>${escape(xName(quote.author))}</strong><p>${xText(quote.text)}</p></blockquote>`:''}${p.image?`<img class="x-photo" src="${escape(p.image)}" alt="游戏内分享的照片">`:''}<div class="x-actions">${xAction('reply',`${icon('chat')} ${p.comments.length}`,`data-id="${escape(p.id)}"`)}${xAction('repost',`⇄ ${p.reposts}`,`data-id="${escape(p.id)}" aria-label="转发"`,p.reposted)}${xAction('like',`${icon('heart')} ${p.likes}`,`data-id="${escape(p.id)}" aria-label="点赞" aria-pressed="${Boolean(p.liked)}"`,p.liked)}${xAction('quote','引用',`data-id="${escape(p.id)}"`)}</div>${detail?`<h4>回复</h4>${p.comments.map(c=>`<div class="x-comment"><button data-x-profile="${escape(c.author)}"><strong>${escape(xName(c.author))}</strong> <small>@${escape(xHandle(c.author))}</small></button><p>${xText(c.text)}</p>${xAction('reply','回复',`data-id="${escape(p.id)}" data-mention="${escape(xHandle(c.author))}"`)}</div>`).join('')||'<p class="explain">还没有回复。</p>'}`:''}</div></article>`;
}
function renderMentions(){
 const w=state.world;const wasUnread=w.unread;
 if(xTab==='notifications'||xTab==='messages'){w.unread=0;save()}
 let body='';
 if(xTab==='for-you'||xTab==='following'){
  const posts=w.posts.filter(p=>!w.blocked.includes(p.author)&&!w.muted.includes(p.author)&&(xTab!=='following'||p.author==='you'||w.following.includes(p.author))).slice().reverse();
  body=`<div class="x-feed-tabs">${xAction('tab','为你推荐','data-tab="for-you"',xTab==='for-you')}${xAction('tab','正在关注','data-tab="following"',xTab==='following')}</div><button class="x-compose-prompt" data-x-action="compose">${xAvatar('you')} 有什么新鲜事？ <b>发帖</b></button>${posts.map(p=>xPostCard(p)).join('')||'<p class="explain">还没有动态，去发现一些虚构朋友吧。</p>'}`;
 }else if(xTab==='search'){
  const tags=[...new Set(w.posts.flatMap(p=>p.text.match(/#[\w\u3400-\u9fff]+/g)||[]))];
  const q=xQuery.toLowerCase();const posts=w.posts.filter(p=>!w.blocked.includes(p.author)&&!w.muted.includes(p.author)&&(p.text+' '+xName(p.author)+' @'+xHandle(p.author)).toLowerCase().includes(q));
  body=`<form id="x-search" class="x-search"><input id="x-query" placeholder="搜索虚构 X" aria-label="搜索虚构 X" value="${escape(xQuery)}"><button>搜索</button></form><h3>为你推荐的趋势</h3><div class="x-trends">${(tags.length?tags:['#小小日常']).map((t,i)=>`<button data-x-search="${escape(t)}"><small>${i+1} · 游戏内趋势</small><strong>${escape(t)}</strong><span>${w.posts.filter(p=>p.text.includes(t)).length} 条帖子</span></button>`).join('')}</div><h3>人物</h3>${WORLD_NPCS.filter(n=>(n.name+n.handle).toLowerCase().includes(q)&&!w.blocked.includes(n.id)).map(n=>`<button class="x-person" data-x-profile="${n.id}">${xAvatar(n.id)}<span><strong>${n.name}</strong><small>@${n.handle}</small></span></button>`).join('')}<h3>帖子</h3>${posts.slice().reverse().map(p=>xPostCard(p)).join('')}`;
 }else if(xTab==='profile'){
  const own=xProfile==='you';const n=npcById(xProfile);const posts=w.posts.filter(p=>(p.author===xProfile||(own&&p.reposted))&&!w.blocked.includes(p.author));
  body=`<div class="x-cover"></div><div class="x-profile">${xAvatar(xProfile)}<h2>${escape(xName(xProfile))}</h2><small>@${escape(xHandle(xProfile))}</small><p>${escape(own?state.romance.identity||'在自己的节奏里生活。':n?.bio||'由旧剧情保留的虚构账号')}</p><p><strong>${own?w.following.length:12}</strong> 正在关注 · <strong>${own?w.followers.length:48}</strong> 关注者</p>${own?xAction('edit-profile','编辑个人资料'):n?`${xAction('follow',w.following.includes(n.id)?'正在关注':'关注',`data-id="${n.id}"`)}${xAction('dm','私信',`data-id="${n.id}"`)}${xAction('mute',w.muted.includes(n.id)?'取消静音':'静音',`data-id="${n.id}"`)}${xAction('block',w.blocked.includes(n.id)?'取消屏蔽':'屏蔽',`data-id="${n.id}"`)}`:''}</div>${posts.slice().reverse().map(p=>xPostCard(p)).join('')}`;
 }else if(xTab==='notifications'){
  body=`<h3>通知</h3><div class="x-notifications">${w.notifications.filter(n=>!n.actor||!w.blocked.includes(n.actor)).map(n=>`<button data-x-thread="${escape(n.post||'')}"><span>${n.type==='follow'?'＋':n.type==='like'?'♥':'@'}</span><div><strong>${escape(n.text)}</strong><small>${time(n.at)} · 虚构互动</small></div></button>`).join('')||'<p class="explain">现在还很安静。</p>'}</div>`;
 }else if(xTab==='messages'){
  const npc=npcById(xDm)||WORLD_NPCS[0];
  body=`<h3>私信</h3><div class="x-dm-people">${WORLD_NPCS.filter(n=>!w.blocked.includes(n.id)).map(n=>xAction('dm',escape(n.name),`data-id="${n.id}"`,n.id===xDm)).join('')}</div><h4>@${npc.handle}</h4><div class="x-dm-history">${w.dms.filter(m=>m.peer===npc.id||m.author===npc.id).map(m=>`<p class="${m.author==='you'?'outgoing':''}"><small>${escape(xName(m.author))}</small>${xText(m.text)}</p>`).join('')||'<p class="explain">这是本地虚构私信，不会发送给真人。</p>'}</div><form id="x-dm-form"><input id="x-dm-text" maxlength="1000" placeholder="发送私信" aria-label="发送私信" ${w.blocked.includes(npc.id)?'disabled':''}><button>发送</button></form>`;
 }else if(xTab==='thread'){
  const p=w.posts.find(p=>p.id===xThread);body=p?xPostCard(p,true):'<p class="explain">帖子不存在。</p>';
 }
 shell('',`<header class="x-head"><button data-x-profile="you" aria-label="我的个人主页">${xAvatar('you')}</button><strong>𝕏</strong><button data-x-action="options" aria-label="X 体验设置">${icon('more')}</button></header><p class="x-fiction">虚构 X · 本地模拟，非真实 X 数据或账号</p>${body}`,{cls:'x-page',back:'home',footer:`<nav class="x-nav">${xAction('tab',icon('home'),'data-tab="for-you" aria-label="X 首页"',['for-you','following'].includes(xTab))}${xAction('tab',icon('search'),'data-tab="search" aria-label="搜索与热搜"',xTab==='search')}${xAction('tab',`${icon('bell')}${wasUnread?'<sup>'+wasUnread+'</sup>':''}`,'data-tab="notifications" aria-label="X 通知"',xTab==='notifications')}${xAction('tab',icon('mail'),'data-tab="messages" aria-label="X 私信"',xTab==='messages')}</nav><button class="x-fab" data-x-action="compose" aria-label="发布帖子">＋</button>`});
 $('#x-search')?.addEventListener('submit',e=>{e.preventDefault();xQuery=$('#x-query').value.trim().slice(0,100);renderMentions()});
 $('#x-dm-form')?.addEventListener('submit',e=>{e.preventDefault();const input=$('#x-dm-text'),text=input.value.trim();if(!text||w.blocked.includes(xDm))return;const now=Date.now();w.dms.push({id:uid(),author:'you',peer:xDm,text,at:now});queueDirectMessage(xDm);w.dms=w.dms.slice(-200);save();renderMentions()});
}
function openXComposer(reply='',quote='',mention='',image=''){
 xComposeImage=image;
 xReply=reply;xQuote=quote;xComposing=true;modal(reply?'回复':quote?'引用帖子':'发布帖子',`<p class="explain">只发布到游戏内虚构 X。NPC 会通过现有 AI 服务回应，不会发布到真实 X。</p><form id="x-compose">${image?`<img class="share-photo-thumb" src="${escape(image)}" alt="待发布的游戏照片">`:""}<textarea id="x-post-text" maxlength="1000" rows="5" aria-label="帖子内容" placeholder="有什么新鲜事？可使用 @peachfilm 和 #话题">${mention?'@'+escape(mention)+' ':''}</textarea><small id="x-counter">0 / 1000</small><button class="primary" type="submit">${reply?'回复':'发布'}</button></form>`,'<button class="secondary" data-action="close-overlay">取消</button>');
 $('#x-post-text').addEventListener('input',e=>$('#x-counter').textContent=e.target.value.length+' / 1000');
 $('#x-compose').addEventListener('submit',e=>{e.preventDefault();const text=$('#x-post-text').value.trim();if(!text)return;
  const now=Date.now(),w=state.world;
  if(xReply){const p=w.posts.find(p=>p.id===xReply);if(!p)return;p.comments.push({id:uid(),author:'you',text,at:now});const npc=npcById(p.author==='you'?p.comments.find(c=>npcById(c.author))?.author:p.author);p.reacted=false;p.reactionAttempt=0;queueSocialReaction(w,p,now);xThread=p.id;xTab='thread';}
  else{const p={id:uid(),author:'you',text,quote:xQuote||null,image:xComposeImage||null,at:now,likes:0,reposts:0,comments:[]};w.posts.push(p);w.posts=w.posts.slice(-300);const selected=queueSocialReaction(w,p,now,uid);xThread=p.id;xTab='for-you';if(selected.length)showGameBanner('X · 虚构互动',`${selected[0].name} 等人回应了你的帖子`,'mentions');}
  save();xComposing=false;$('#overlay').replaceChildren();renderMentions();
 });$('#x-post-text').focus();
}
setInterval(()=>{
 if(document.visibilityState!=='visible'||['lock','passcode'].includes(page)||$('#overlay').children.length)return;
 const w=state.world,p=w.posts.find(p=>p.author==='you'&&!p.reacted&&Date.now()-p.at<3600000);
 if(!p)return;const reactions=queueSocialReaction(w,p,Date.now(),uid);if(!reactions.length)return;
 save();showGameBanner('X · 虚构互动',`${reactions[0].name} 等人回应了你的帖子`,'mentions');if(page==='mentions')renderMentions();else if(page==='home')renderHome();
},15000);
function xOptions(){modal('X 体验设置',`<p>全部账号、帖子、评论与趋势均为本地虚构内容，不抓取真实 X。NPC 有不同立场，但每次发帖的互动有限，不会持续追着玩家攻击。</p><div class="setting-row">随机舆论事件<button class="toggle ${state.storyEnabled?'on':''}" data-world="exposure-toggle" aria-label="随机舆论事件" aria-checked="${Boolean(state.storyEnabled)}" role="switch"></button></div><p class="explain">默认关闭；开启后仅在前台解锁时运行，至少间隔 8 分钟。可静音或屏蔽具体账号。</p><button class="secondary" data-world="exposure">体验一条虚构舆论事件</button><button class="secondary" data-world="setup">人物与故事设置</button><p>已屏蔽：${state.world.blocked.map(xName).join('、')||'无'}；已静音：${state.world.muted.map(xName).join('、')||'无'}</p>`,'<button class="secondary" data-action="close-overlay">关闭</button>')}
function triggerStory(){
 const w=state.world,now=Date.now();if(now-w.lastExposure<8*60000){toast('讨论暂时平息了，给生活留一点空间');return}
 const source=w.posts.filter(p=>p.author==='you').at(-1);if(source&&w.lastExposureSource===source.id){toast('这条动态已经讨论过了，不会重复炒作');return}if(!source){toast('先自由发一条帖子；舆论只围绕已公开内容展开');return}
 const npc=WORLD_NPCS.find(n=>n.tone==='skeptic'&&!w.blocked.includes(n.id)&&!w.muted.includes(n.id));if(!npc){toast('相关账号已被屏蔽或静音');return}
 const post={id:uid(),author:npc.id,text:`@you 关于“${source.text.slice(0,50)}”，我觉得大家猜得太远了。只是公开动态，别拿它当恋情证据。#今日讨论`,quote:source.id,at:now,likes:3,reposts:1,comments:[{id:uid(),author:'blue',text:'讨论可以，别扒素人位置。',at:now},{id:uid(),author:'paper',text:'怎么什么都能扯到恋爱，无语。',at:now}]};w.posts.push(post);w.lastExposure=now;w.lastExposureSource=source.id;state.romance.publicClues.push({text:post.text,at:now});state.romance.publicClues=state.romance.publicClues.slice(-10);state.romance.mood='tense';xNotification(`${npc.name} @ 了你；猜测不等于事实`,post.id,'mention');if(page==='mentions')renderMentions();updateSceneMusic();
}
function currentStoryContextPrevious(){return romanceContext(state.romance,state.world)+'\n私人游戏购物记录（不对外公开）：'+JSON.stringify(state.orders.slice(-3).map(o=>({name:o.name,at:o.at})))+'\n公开的游戏社交动态：'+JSON.stringify(state.world.activity.slice(0,3).map(a=>({platform:a.platform,text:a.text}))) }
function recordWorldEvent(kind,text){if(!state.romance)return;state.romance.journal.push({kind,text:text.slice(0,300),at:Date.now()});state.romance.journal=state.romance.journal.slice(-50)}
function showRomanceSetupPrevious(){
 const r=state.romance;modal('你与故事',`<p>主角是架空虚构的成年金硕珍，所有私人剧情均为创作。你决定行动、关系节奏和是否接受邀请。原有聊天、订单、照片不会被清空。</p><form id="romance-profile"><label for="romance-identity">你的身份（成年角色）</label><textarea id="romance-identity" maxlength="300" placeholder="例如：在首尔读设计的成年留学生，喜欢摄影">${escape(r.identity)}</textarea><label for="romance-backstory">最初的交集</label><select id="romance-backstory" ${r.configured?'disabled':''}><option value="strangers" ${r.backstory==='strangers'?'selected':''}>从零认识</option><option value="acquainted" ${r.backstory==='acquainted'?'selected':''}>已经认识，慢慢靠近</option></select><p class="explain">${r.configured?'故事已开始，保留当前关系与长期记忆。':'通过聊天自然表达亲近、心意或拒绝，没有任务和固定剧情选项。已有恋人聊天会保留关系。'}</p><button class="primary">${r.configured?'保存身份':'开始自己的故事'}</button></form><button class="secondary" data-world="pause">${r.paused?'恢复生活事件':'暂停自动生活事件'}</button><button class="secondary" data-world="audio">语音与剧情配乐</button>`,'<button class="secondary" data-action="close-overlay">关闭</button>');
 $('#romance-profile').addEventListener('submit',e=>{e.preventDefault();r.identity=$('#romance-identity').value.trim();if(!r.configured){r.backstory=$('#romance-backstory').value;r.configured=true}save();$('#overlay').replaceChildren();openRoom('jin','kkt');deliverRomanceScene(true)});
}
function receiveWorldChat(text,scene){
 const msg={id:uid(),role:'assistant',text,at:Date.now(),story:true,scene:scene.id,korean:scene.ko};state.chats.jin.push(msg);save();if(page==='chat'&&roomId==='jin'){const draft=$('#message-input')?.value||'';renderChat();$('#message-input').value=draft}notifyIncoming('jin',text);
}
function deliverRomanceScenePrevious(force=false){
 const r=state.romance;if(worldSceneActive||pending.has('jin'))return;const scene=nextRomanceScene(r,Date.now(),force);if(!scene)return;
 worldSceneActive=true;let i=0;const deliver=()=>{if(document.visibilityState!=='visible'||['lock','passcode'].includes(page)||r.paused){worldSceneActive=false;worldBubbleTimer=null;return}receiveWorldChat(scene.lines[i++],scene);if(i<scene.lines.length)worldBubbleTimer=setTimeout(deliver,1000);else{worldSceneActive=false;worldBubbleTimer=null}};deliver();
 state.world.activity.unshift({id:uid(),platform:scene.id==='member'||scene.id==='twist'?'weverse':'instagram',text:scene.public,at:Date.now(),scene:scene.id,image:scene.id==='coffee'?'/assets/3.jpg':null});state.world.activity=state.world.activity.slice(0,80);
 if(['schedule','distance','happy'].includes(scene.id)){const sender=state.sms.find(s=>s.id==='bighit');if(sender){sender.messages.push({text:`[虚构生活事件] ${scene.id==='happy'?'今天没有额外安排。把时间留给你自己的生活。':scene.id==='schedule'?'活动安排调整；私人约定由你们自行商量，不代表现实行程。':'公开场合请注意界限，未经同意不发布他人私人信息。'}`,at:Date.now()});state.smsUnread++}}
  save();updateSceneMusic();
}
function decorateWorld(){
 if(page==='home'){
  const app=$('[data-app="mentions"]');if(app){app.querySelector('.app-badge')?.remove();if(state.world.unread)app.insertAdjacentHTML('beforeend',`<span class="app-badge">${state.world.unread}</span>`)}
  const today=$('.home-today');if(today&&!today.querySelector('[data-world]'))today.insertAdjacentHTML('beforeend','<button data-world="setup">你与故事 ›</button>');
 }
 if(page==='settings'&&!$('#world-settings'))$('.page-scroll')?.insertAdjacentHTML('beforeend','<div class="settings-group" id="world-settings"><button class="setting-row" data-world="setup">♡ 人物与秘密恋爱故事 <span class="chevron">›</span></button><button class="setting-row" data-world="audio">♫ 韩语语音与原创配乐 <span class="chevron">›</span></button></div>');
 if(page==='chat'){
  const m=members.find(m=>m.id===roomId);if(m?.id==='jin'&&!pending.has('jin'))$('.heading small').textContent=WORLD_LABELS[state.romance.stage]+' · 虚构角色';
  if(!$('#world-chat-tools'))$('.conv-head')?.insertAdjacentHTML('afterend',`<div class="world-chat-tools" id="world-chat-tools"><button data-world="setup">人物与故事</button><button data-world="audio">语音 / 配乐</button></div>`);
  const rows=[...document.querySelectorAll('#messages .message-row:not(:has(.typing))')];const messages=state.chats[roomId];
  rows.forEach((row,i)=>{const msg=messages[i];if(!msg||msg.role!=='assistant'||!msg.text||row.querySelector('[data-world-voice]'))return;const bubble=row.querySelector('.bubble');if(msg.story)bubble.insertAdjacentHTML('beforeend','<small class="world-scene-label">虚构生活事件</small>');bubble.insertAdjacentHTML('beforeend',`<button class="voice-message" data-world-voice="${escape(msg.id)}" data-member="${roomId}" aria-label="播放韩语语音">${voiceBubble===msg.id?'■ 停止语音':'▷ 韩语语音'} <small>原创通用男声</small></button><span class="voice-subtitle" aria-live="polite">${escape(msg.voiceKorean||msg.korean||'点按后生成韩语语音；原文为字幕')}</span>`)});
 }
 if(page==='contact'&&roomId==='jin'){$('.contact-detail p').textContent='JIN · '+WORLD_LABELS[state.romance.stage];const p=$('.help-card p');if(p)p.textContent='这是架空成年角色的私人故事。你决定如何认识、是否接受心意和怎样继续生活，成员不会默认知道你们的秘密。'}
}
new MutationObserver(decorateWorld).observe(screen,{childList:true});
function worldUserMessagePrevious(text){
 if(worldBubbleTimer)clearTimeout(worldBubbleTimer);worldBubbleTimer=null;worldSceneActive=false;
 const replies=state.chats.jin.filter(m=>m.role==='assistant'),last=replies.at(-1);
 const proposalContext=last?.turn?replies.filter(m=>m.turn===last.turn).map(m=>m.text).join(' '):(last?.text||'');
 advanceRomance(state.romance,text,Date.now(),proposalContext);save();updateSceneMusic();
}
// The AI is free to propose plans; local scenes never decide the player's actions.

function showLocalSocial(platform){
 const label=platform==='instagram'?'Instagram':'Weverse';const entries=state.world.activity.filter(a=>a.platform===platform);
 modal(label,`<p class="explain">虚构生活动态 · 与现实公开报道分开。本地剧情不会发到真实账号。</p><a class="secondary social-official" target="_blank" rel="noopener noreferrer" href="${platform==='instagram'?'https://www.instagram.com/jin/':'https://weverse.io/bts/artist'}">打开原有官方 ${label} ↗</a><form id="local-social-post"><textarea id="local-social-text" maxlength="500" placeholder="分享一条虚构日常…" aria-label="虚构社交动态"></textarea><button class="primary">发布到游戏动态</button></form>${entries.map(a=>`<article class="local-social-entry"><small>${a.author==='you'?escape(state.nickname):'虚构角色'} · ${time(a.at)}</small><p>${xText(a.text)}</p>${a.image?`<img src="${a.image}" alt="虚构场景配图"><button class="secondary" data-world-photo="${a.id}">保存配图到相册</button>`:''}<button class="secondary" data-world-crosspost="${a.id}">分享到虚构 X</button></article>`).join('')||'<p class="explain">还没有游戏动态，生活事件会慢慢出现在这里。</p>'}`,'<button class="secondary" data-action="close-overlay">关闭</button>');
 $('#local-social-post').addEventListener('submit',e=>{e.preventDefault();const text=$('#local-social-text').value.trim();if(!text)return;state.world.activity.unshift({id:uid(),platform,author:'you',text,at:Date.now()});save();showLocalSocial(platform)});
}
function showWorldAudio(){
 const a=state.sceneAudio;modal('语音与剧情配乐',`<p>韩语语音使用 OpenAI 通用合成男声 Onyx，不模仿或克隆金硕珍本人。点按消息才生成，不会自动收费播放；文本会发送给已配置的语音服务。</p><p id="voice-ready">正在检查语音服务…</p><p>韩语音频附韩文与消息原文字幕。未接通服务时不会冒充已经播放。</p><div class="setting-row">原创剧情配乐<button class="toggle ${a.enabled?'on':''}" data-world="music-toggle" role="switch" aria-checked="${a.enabled}" aria-label="原创剧情配乐"></button></div><div class="setting-row">配乐静音<button class="toggle ${a.muted?'on':''}" data-world="music-mute" role="switch" aria-checked="${a.muted}" aria-label="配乐静音"></button></div><label for="world-volume">配乐音量</label><input id="world-volume" type="range" min="0" max="1" step=".01" value="${a.volume}"><label for="voice-volume">语音音量</label><input id="voice-volume" type="range" min="0" max="1" step=".01" value="${state.voiceVolume??.8}"><p class="explain">当前氛围：${state.romance.mood==='sweet'?'甜蜜':state.romance.mood==='tense'?'紧张':'日常'}。音色与旋律为本程序原创合成，切换时淡入淡出；锁屏或后台暂停，不影响原 Spotify。</p><button class="secondary" data-world="voice-stop">停止语音</button>`,'<button class="secondary" data-action="close-overlay">关闭</button>');
 $('#world-volume').addEventListener('input',e=>{a.volume=Number(e.target.value);save();updateSceneMusic()});$('#voice-volume').addEventListener('input',e=>{state.voiceVolume=Number(e.target.value);if(voicePlayer)voicePlayer.volume=state.voiceVolume;save()});
 fetch('/api/voice/config').then(r=>r.json()).then(d=>{const el=$('#voice-ready');if(el)el.textContent=d.ready?'语音服务已配置；实际生成按服务用量计费。':'语音未接通：站长需配置 TTS_API_KEY；中文转韩文还需要已连接的 DeepSeek。'}).catch(()=>{if($('#voice-ready'))$('#voice-ready').textContent='语音服务状态暂不可用。'});
}
function stopWorldVoice(){voiceGeneration++;voiceBusy=false;voiceBubble='';voicePlayer?.pause();voicePlayer=null;if(voiceUrl)URL.revokeObjectURL(voiceUrl);voiceUrl='';updateSceneMusic();if(page==='chat')decorateWorldVoiceButtons()}
function decorateWorldVoiceButtons(){document.querySelectorAll('[data-world-voice]').forEach(b=>{b.firstChild.textContent=voiceBubble===b.dataset.worldVoice?'■ 停止语音 ':'▷ 韩语语音 '})}
async function playWorldVoice(id,member){
 if(voiceBubble===id){stopWorldVoice();return}if(voiceBusy){toast('正在生成上一条语音，请稍候或点停止');return}stopWorldVoice();const msg=state.chats[member]?.find(m=>m.id===id);if(!msg)return;const generation=voiceGeneration;voiceBusy=true;toast('正在生成韩语语音…');
 try{const r=await fetch('/api/voice',{method:'POST',headers:{'Content-Type':'application/json',...(sessionKey?{'X-DeepSeek-Key':sessionKey}:{})},body:JSON.stringify({text:msg.text.slice(0,1200)}),signal:AbortSignal.timeout(60000)});const data=await r.json();if(!r.ok)throw Error(data.error||'语音生成失败');if(generation!==voiceGeneration)return;msg.voiceKorean=data.korean;save();const bytes=Uint8Array.from(atob(data.audio),c=>c.charCodeAt(0));voiceUrl=URL.createObjectURL(new Blob([bytes],{type:'audio/mpeg'}));voicePlayer=new Audio(voiceUrl);voicePlayer.volume=state.voiceVolume??.8;voiceBubble=id;voicePlayer.addEventListener('ended',stopWorldVoice,{once:true});voicePlayer.addEventListener('error',()=>{stopWorldVoice();toast('音频播放失败，可重新点按生成')},{once:true});await voicePlayer.play();if(page==='chat'&&roomId===member){const draft=$('#message-input')?.value||'';renderChat();$('#message-input').value=draft;decorateWorld();}updateSceneMusic();}
 catch(e){if(generation===voiceGeneration){stopWorldVoice();toast(e.message||'语音暂时不可用')}}finally{if(generation===voiceGeneration)voiceBusy=false}
}
let scoreContext=null,scoreGain=null,scoreTimer=null,scoreMood='',scoreStep=0;
const scoreNotes={daily:[261.63,329.63,392,329.63,293.66,349.23,440,349.23],sweet:[261.63,329.63,440,523.25,440,392,329.63,293.66],tense:[220,261.63,246.94,293.66,220,261.63,207.65,246.94]};
function updateSceneMusic(){
 const a=state.sceneAudio;const active=a.enabled&&!a.muted&&document.visibilityState==='visible'&&!['lock','passcode'].includes(page)&&!(music.track&&!music.paused);
 try{if(active&&!scoreContext){scoreContext=new(window.AudioContext||window.webkitAudioContext)();scoreGain=scoreContext.createGain();scoreGain.gain.value=0;scoreGain.connect(scoreContext.destination)}if(!scoreContext)return;if(active)scoreContext.resume().catch(()=>{});const now=scoreContext.currentTime;const target=active?a.volume*(voicePlayer?.paused === false ? .025 : .12):0;scoreGain.gain.cancelScheduledValues(now);scoreGain.gain.setValueAtTime(scoreGain.gain.value,now);scoreGain.gain.linearRampToValueAtTime(target,now+1.2);
  if(active&&!scoreTimer){scoreTimer=setInterval(()=>{if(scoreContext.state!=='running')return;const mood=state.romance.mood;if(mood!==scoreMood){scoreMood=mood;scoreStep=0;scoreGain.gain.setValueAtTime(0,scoreContext.currentTime);scoreGain.gain.linearRampToValueAtTime(state.sceneAudio.volume*(voicePlayer?.paused === false ? .025 : .12),scoreContext.currentTime+1.2)}const notes=scoreNotes[mood]||scoreNotes.daily;const t=scoreContext.currentTime;for(const factor of [1,.5]){const osc=scoreContext.createOscillator(),gain=scoreContext.createGain();osc.type='sine';osc.frequency.value=notes[scoreStep%notes.length]*factor;gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(.24,t+.2);gain.gain.exponentialRampToValueAtTime(.001,t+1.7);osc.connect(gain);gain.connect(scoreGain);osc.start(t);osc.stop(t+1.8)}scoreStep++},900)}if(!active&&scoreTimer){clearInterval(scoreTimer);scoreTimer=null;setTimeout(()=>{if(!scoreTimer)scoreContext?.suspend()},1500)}}catch{toast('此浏览器暂时无法播放配乐')}
}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState!=='visible')stopWorldVoice();updateSceneMusic()});
document.addEventListener('pointerdown',()=>{if(state.sceneAudio.enabled)updateSceneMusic()},{once:true});
setInterval(updateSceneMusic,2500);
document.addEventListener('click',e=>{
 const el=e.target.closest('[data-world],[data-world-voice],[data-x-action],[data-x-profile],[data-x-thread],[data-x-search],[data-world-crosspost],[data-world-photo],[data-app="instagram"],[data-app="weverse"]');if(!el)return;
 if(el.dataset.app){e.preventDefault();e.stopImmediatePropagation();showLocalSocial(el.dataset.app);return}
 const w=state.world;
 if(el.dataset.xProfile){xProfile=el.dataset.xProfile;xTab='profile';renderMentions();return}
 if(el.hasAttribute('data-x-thread')){if(!el.dataset.xThread)return;xThread=el.dataset.xThread;xTab='thread';renderMentions();return}
 if(el.dataset.xSearch){xQuery=el.dataset.xSearch;xTab='search';renderMentions();return}
 if(el.dataset.worldVoice){playWorldVoice(el.dataset.worldVoice,el.dataset.member);return}
 if(el.dataset.worldCrosspost){const entry=w.activity.find(a=>a.id===el.dataset.worldCrosspost);if(!entry)return;const p={id:uid(),author:'you',text:`分享游戏 ${entry.platform==='instagram'?'Instagram':'Weverse'} 动态：${entry.text}`,image:entry.image||null,at:Date.now(),likes:0,reposts:0,comments:[]};w.posts.push(p);queueSocialReaction(w,p,Date.now(),uid);save();$('#overlay').replaceChildren();xTab='for-you';navigate('mentions');return}
 if(el.dataset.worldPhoto){const entry=w.activity.find(a=>a.id===el.dataset.worldPhoto);if(entry?.image)toDataUrl(entry.image).then(data=>{state.uploads.unshift(data);if(save())toast('配图已保存到相册')}).catch(()=>toast('配图读取失败'));return}
 if(el.dataset.world){switch(el.dataset.world){case'photo-x':$('#overlay').replaceChildren();xTab='for-you';navigate('mentions');openXComposer('','','',photoShareData);break;case'setup':showRomanceSetup();break;case'audio':showWorldAudio();break;case'pause':state.romance.paused=!state.romance.paused;save();showRomanceSetup();break;case'exposure-toggle':state.storyEnabled=!state.storyEnabled;save();xOptions();break;case'exposure':triggerStory();$('#overlay').replaceChildren();break;case'music-toggle':state.sceneAudio.enabled=!state.sceneAudio.enabled;save();updateSceneMusic();showWorldAudio();break;case'music-mute':state.sceneAudio.muted=!state.sceneAudio.muted;save();updateSceneMusic();showWorldAudio();break;case'voice-stop':stopWorldVoice();toast('语音已停止');break}return}
 const action=el.dataset.xAction,p=w.posts.find(p=>p.id===el.dataset.id);
 if(action==='tab'){xTab=el.dataset.tab;xThread='';renderMentions()}
 else if(action==='compose')openXComposer();else if(action==='options')xOptions();else if(action==='edit-profile')showRomanceSetup();
 else if(action==='reply'&&p)openXComposer(p.id,'',el.dataset.mention||'');else if(action==='quote'&&p)openXComposer('',p.id);
 else if(action==='like'&&p){p.liked=!p.liked;p.likes=Math.max(0,p.likes+(p.liked?1:-1));save();renderMentions()}
 else if(action==='repost'&&p){p.reposted=!p.reposted;p.reposts=Math.max(0,p.reposts+(p.reposted?1:-1));save();renderMentions()}
 else if(['follow','block','mute'].includes(action)){const list=action==='follow'?'following':action==='block'?'blocked':'muted';if(!npcById(el.dataset.id))return;const at=w[list].indexOf(el.dataset.id);if(at<0)w[list].push(el.dataset.id);else w[list].splice(at,1);save();renderMentions()}
 else if(action==='dm'){xDm=el.dataset.id;xTab='messages';renderMentions()}
},true);
// Register before existing app handlers: preserve official links inside the new sheets.
save();decorateWorld();

