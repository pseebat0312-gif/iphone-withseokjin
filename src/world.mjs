// Pure, local fictional simulation. No real social accounts or locations are used.
export const WORLD_STAGES = ['meeting','closer','confession','secret','happy'];
export const WORLD_LABELS = {meeting:'相识',closer:'暧昧',confession:'心意',secret:'秘密恋爱',happy:'一起走下去'};
export const WORLD_NPCS = [
 {id:'peach',name:'桃子放映室',handle:'peachfilm',bio:'爱音乐，也爱认真听完再说。',tone:'support'},
 {id:'night',name:'夜间观察',handle:'night_note',bio:'有疑问就问，不代表我有证据。',tone:'skeptic'},
 {id:'blue',name:'蓝色时刻',handle:'blue_hour',bio:'拒绝人肉，给彼此一点空间。',tone:'boundary'},
 {id:'paper',name:'纸星',handle:'paperstar',bio:'网络嘴替，偶尔说话太冲。',tone:'sharp'},
 {id:'day',name:'日光存档',handle:'daylight',bio:'日常、摄影、饭后散步。',tone:'casual'}
];
export function createWorld(oldEvents=[],now=Date.now()) {
 const posts=[{id:'welcome',author:'day',text:'今天练习把手机放下十分钟。结果第九分钟又拿起来了。#小小日常',at:now,likes:12,reposts:2,comments:[],liked:false,reposted:false}];
 for(const e of oldEvents)posts.push({id:'legacy-'+e.id,author:'night',text:e.text,at:e.at,likes:0,reposts:0,comments:[...(e.comments||[]).map(([name,text])=>({id:name,text,author:name,at:e.at})),...(e.reply?[{id:'legacy-reply',author:'you',text:e.reply,at:e.at}]:[])],legacy:true});
 return {version:1,posts,notifications:[],dms:[],following:['day','peach'],followers:[],blocked:[],muted:[],activity:[],lastExposure:0,lastReaction:0,unread:0};
}
const hashWorld=s=>[...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);
export function worldNotice(w,type,text,post,now,id){w.notifications.unshift({id,type,text,post,at:now});w.notifications=w.notifications.slice(0,100);w.unread=Math.min(99,w.unread+1)}
export function reactToPost(w,post,now,id) {
 if(post.author!=='you'||post.reacted||now-w.lastReaction<15000)return [];
 const available=WORLD_NPCS.filter(n=>!w.blocked.includes(n.id)&&!w.muted.includes(n.id));
 const theme=/恋|喜欢|约会|秘密|硕珍|진|jin|love/i.test(post.text)?'relationship':/买|购物|包|订单|付款/.test(post.text)?'shopping':'daily';
 const excerpt=post.text.replace(/\s+/g,' ').slice(0,22);
 const lines={relationship:[`“${excerpt}”这句有点可爱，祝你开心。`,`“${excerpt}”到底是日常还是在暗示？先问一句，没证据我不下结论。`,'喜欢谁是私事，别靠猜测去扒人家的位置。','又开始打哑谜了？有话就直说，别拿大家当解谜工具。',`看到“${excerpt}”想到我朋友，恋爱归恋爱，先吃饭。`],shopping:[`“${excerpt}”！买到喜欢的东西心情会好一点。`,'分享可以，别把消费当成谁爱谁的证明。','游戏购物就图个开心，别拿虚构账单当真人新闻。','炫来炫去有点烦，普通人的日子也值得发。',`看到“${excerpt}”，我默默打开了自己的愿望清单。`],daily:[`“${excerpt}”这种小事也值得记录。`,`“${excerpt}”？我的体验刚好相反，可能每个人情况不同。`,'有不同意见正常，别追着人骂。','刷到三遍了，有点无语，先划走。',`“${excerpt}”哈哈，我今天也差不多。`]};
 const offset=hashWorld(post.text)%available.length||0;
 const selected=available.length?Array.from({length:Math.min(3,available.length)},(_,i)=>available[(i+offset)%available.length]):[];
 for(const npc of selected){post.comments.push({id:id(),author:npc.id,text:lines[theme][WORLD_NPCS.indexOf(npc)],at:now});if(['support','casual'].includes(npc.tone)){post.likes++;worldNotice(w,'like',`${npc.name} 赞了你的帖子`,post.id,now,id())}worldNotice(w,'comment',`${npc.name} 回复了你`,post.id,now,id());}
 if(selected.length){post.reposts++;worldNotice(w,'repost',`${selected[0].name} 转发了你的帖子`,post.id,now,id());const npc=selected.find(n=>n.tone==='support'||n.tone==='casual');if(npc&&!w.followers.includes(npc.id)){w.followers.push(npc.id);worldNotice(w,'follow',`${npc.name} 关注了你`,post.id,now,id())}const mention=post.text.match(/@([\w_]+)/);if(mention){const target=available.find(n=>n.handle===mention[1]);if(target){w.dms.push({id:id(),author:target.id,text:'看到你 @ 我了，评论里的想法只是我自己的看法。愿意的话，我们可以在这里慢慢聊。',at:now});worldNotice(w,'mention',`${target.name} 提及了你`,post.id,now,id())}}}
 post.reacted=true;w.lastReaction=now;return selected;
}
export function makeRomance(existing=false){return {version:1,configured:false,identity:'',backstory:existing?'acquainted':'strangers',stage:existing?'secret':'meeting',turns:0,stageTurns:0,seen:[],journal:[],lastEventAt:0,eventCount:0,paused:false,mood:'daily',boundaries:[],publicClues:[],facts:[]}}
export function advanceRomance(r,text,now=Date.now(),assistantText='') {
 const old=r.stage;r.turns++;r.stageTurns++;
 r.facts=Array.isArray(r.facts)?r.facts:[];
 if(/我叫|我是|我喜欢|我不喜欢|我讨厌|过敏|生日|我的工作|记住|不要叫我/.test(text)){const fact=text.slice(0,150);if(!r.facts.includes(fact))r.facts.push(fact);r.facts=r.facts.slice(-40)}
 r.journal.push({at:now,kind:'player',text:text.slice(0,240)});r.journal=r.journal.slice(-50);
 const refusal=/不想|不要|不愿|别再|停一下|慢一点|不喜欢|不爱|不接受|没准备|not ready|don't|싫|아니/i.test(text);
 if(refusal){r.boundaries.push(text.slice(0,150));r.boundaries=r.boundaries.slice(-8);r.mood='daily';return false}
 const romanticText=text.replace(/喜欢你(?:的|这|那)[^，。！？!?.]*/g,'');
 const affection=/喜欢你|想你|心动|爱你|抱抱|想见你|约会|like you|love you|보고 싶|좋아해|사랑해/i.test(romanticText);
 const proposal=/做我.*朋友|想做你.*朋友|和我在一起|愿意.*交往|我们交往|想.*和你在一起|我喜欢你(?:[，。！？!?,.]|$)|我爱你(?:[，。！？!?,.]|$)/.test(assistantText);
 if(['meeting','closer','confession'].includes(r.stage)&&proposal&&/我愿意|好啊|好呀|我也|答应|当然|yes/i.test(text))r.stage='secret';
 else if(r.stage==='meeting'&&affection)r.stage='closer';
 else if(r.stage==='closer'&&/喜欢你|爱你|在一起|男朋友|女朋友|love you|좋아해|사랑해/i.test(romanticText))r.stage='confession';
 else if(r.stage==='confession'&&/我们在一起|和你在一起|我也喜欢你|我也爱你|答应.*交往/i.test(text))r.stage='secret';
 else if(r.stage==='secret'&&/一直在一起|一起走下去|未来.*一起|余生|永远|不分开|forever|함께/i.test(text))r.stage='happy';
 r.mood=affection||r.stage==='happy'?'sweet':'daily';
 if(old!==r.stage){r.stageTurns=0;r.journal.push({at:now,kind:'relationship',text:WORLD_LABELS[old]+' → '+WORLD_LABELS[r.stage]});return true}return false;
}
export const ROMANCE_SCENES=[
 {id:'first',stage:'meeting',title:'一个意外的空档',ko:'안녕하세요. 잠깐 시간이 생겼어요. 오늘은 어떤 하루였어요?',lines:['刚刚多了十分钟空档。','先打个招呼。我叫硕珍，你希望我怎么称呼你？'],public:'练习室的灯还亮着。今天也辛苦啦。',mood:'daily'},
 {id:'acquainted',stage:'meeting',title:'想起上一次',ko:'지난번에 못 한 얘기가 생각났어요. 오늘 잠깐 이야기할래요?',lines:['上次没聊完的话，我刚才又想起来了。','今天要不要接着聊？不用急着回。'],public:'有时候旧话题，也会有新的下半句。',mood:'daily'},
 {id:'cooking',stage:'meeting',title:'厨房事故',ko:'달걀말이가 조금 이상해졌어요. 맛은 괜찮아요. 아마도요.',lines:['我把蛋卷煎成了一张地图。','味道还是好的。至少我投了赞成票ㅋㅋ'],public:'今天的菜单：不规则蛋卷。',mood:'daily'},
 {id:'coffee',stage:'closer',title:'没发出去的照片',ko:'사진보다 네 생각이 먼저 났어. 시간이 괜찮으면 같이 커피 마실래?',lines:['看到一家很安静的咖啡店，第一反应居然是想发给你。','你方便的时候，要不要一起去？不方便我们就换一天。'],public:'咖啡店门口的风铃，声音很好听。',mood:'sweet'},
 {id:'member',stage:'closer',title:'差点被看穿',ko:'남준이가 왜 웃냐고 물었어. 게임 얘기라고 했는데, 별로 안 믿는 눈치야.',lines:['南俊问我看手机为什么笑。','我说游戏赢了。他说我输了也在笑。失策。'],public:'今天有人看手机看得特别认真。也可能真的是在打游戏。',mood:'sweet'},
 {id:'confession',stage:'confession',title:'这一次说清楚',ko:'나는 네가 좋아. 우리 만나 볼래? 바로 대답하지 않아도 괜찮아.',lines:['这次不绕着说了。我喜欢你。','想认真和你在一起。你愿意吗？不用为了照顾我就马上回答。'],public:'有些话，留给当事人听就好了。',mood:'sweet'},
 {id:'distance',stage:'secret',title:'隔着半个大厅',ko:'아까 못 본 척해서 미안해. 네가 불편했다면 말해 줘. 우리 둘이 방법을 정하자.',lines:['刚才在大厅没有走过去，不是没看见你。','公开场合怎么保持距离，我们商量着来。不能只让你迁就我。'],public:'工作人员在大厅等行程。请不要猜测素人身份。',mood:'tense'},
 {id:'schedule',stage:'secret',title:'改签的约定',ko:'일정이 바뀌었어. 약속을 없애고 싶진 않아. 네가 편한 날 다시 정할까?',lines:['行程临时挪了，原来约好的时间恐怕不行。','但我没有把我们的约定取消。你哪天方便，我们重新找一个都不赶的晚上。'],public:'虚构行程调整：今日录制延后，其他安排以当事人沟通为准。',mood:'tense'},
 {id:'twist',stage:'secret',title:'原来是惊喜',ko:'지민이가 눈치챘어. 사진 때문이 아니라 내가 케이크를 계속 물어봐서. 아무에게도 말하지 않겠대.',lines:['智旻好像察觉了。不是网上那张照片。','是我一下午问了他三次蛋糕怎么藏。他答应不多嘴，还嘲笑了我的冰箱。'],public:'蛋糕保鲜盒，今天成为宿舍最抢手的东西。',mood:'sweet'},
 {id:'rain',stage:'secret',title:'雨里的十分钟',ko:'비가 와. 오늘 못 만나도 괜찮아. 집에 가면 따뜻한 걸 먹고, 난 여기 있을게.',lines:['突然下雨了。要是出门麻烦，今天不见也可以。','我把伞放门边了。不是催你，只是想多准备一种可能。'],public:'下雨了。别为了拍照淋湿自己。',mood:'sweet'},
 {id:'happy',stage:'happy',title:'不用再证明的未来',ko:'우리 천천히 오래 가자. 비밀이어도 외롭게 두지는 않을게. 내일은 뭐 먹을까?',lines:['好，那就一起走下去。不是要你证明什么，是我们都愿意。','秘密是我们的边界，不该变成你的孤单。','说完这么认真的话，我现在最想问：明天吃什么？ㅋㅋ'],public:'明天也有平常的小事值得期待。',mood:'sweet'},
 {id:'game',stage:'happy',title:'结局以后的星期二',ko:'오늘 게임에서 졌어. 설거지는 내가 할게. 넌 오늘 어땠어?',lines:['今天游戏输了，洗碗归我。','没什么重大剧情，只有洗洁精快用完了。你今天呢？'],public:'普通星期二，也可以很幸福。',mood:'daily'}
];
export function nextRomanceScene(r,now=Date.now(),force=false){
 if(r.paused||!r.configured||(!force&&now-r.lastEventAt<180000))return null;
 const scenes=ROMANCE_SCENES.filter(s=>s.stage===r.stage&&!r.seen.includes(s.id)&&!(s.id==='first'&&r.backstory==='acquainted')&&!(s.id==='acquainted'&&r.backstory==='strangers'));
 const s=scenes[0];if(!s)return null;r.seen.push(s.id);r.lastEventAt=now;r.eventCount++;r.mood=s.mood;r.journal.push({at:now,kind:'scene',text:s.title});r.journal=r.journal.slice(-50);return s;
}
export function romanceContext(r,w){return `架空成年角色的私人剧情，不是真人事实。玩家身份：${r.identity||'由玩家自由说明'}；背景：${r.backstory==='strangers'?'从零认识':'已有交集'}；当前关系：${WORLD_LABELS[r.stage]}。${r.stage==='meeting'?'还不是恋人，不默认亲昵称呼。':r.stage==='closer'?'相互了解中，不能替玩家同意交往。':r.stage==='confession'?'已表达心意，等待玩家自由回答，不强制接受。':'双方秘密恋爱，不公开承认，不代玩家发帖或赴约。'}成员并非天然知道恋情，不把用户默认介绍为女朋友。故事走向幸福，但不强制推进，不反复误会或拖延表白。结局后继续日常。尊重玩家节奏与拒绝，主动消息可以分享日常、幽默、邀请，但不替玩家行动。最近记忆：${JSON.stringify(r.journal.slice(-10))}。长期记忆（玩家自述）：${JSON.stringify(r.facts||[])}。边界：${JSON.stringify(r.boundaries)}。公开虚构动态：${JSON.stringify(w.posts.filter(p=>p.author==='you').slice(-3).map(p=>p.text))}。公开可见信息与私人聊天分开，NPC 不知道未公开的秘密。`.slice(0,5000)}

export function validWorldBackup(data){
 const strings=(a,max=1000)=>Array.isArray(a)&&a.length<=500&&a.every(s=>typeof s==='string'&&s.length<=max);
 const text=(s,max=2000)=>typeof s==='string'&&s.length<=max;
 const image=s=>!s||(typeof s==='string'&&(s.startsWith('/assets/')||/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(s)));
 const records=(a,max,check)=>Array.isArray(a)&&a.length<=max&&a.every(x=>x&&typeof x==='object'&&check(x));
 if(data.world){const w=data.world;if(w.version!==1||!['following','followers','blocked','muted'].every(k=>strings(w[k],100))||!Number.isFinite(w.unread)||!Number.isFinite(w.lastReaction)||!Number.isFinite(w.lastExposure))return false;
  if(!records(w.posts,1000,p=>text(p.id,100)&&text(p.author,100)&&text(p.text)&&image(p.image)&&Number.isFinite(p.at)&&Number.isFinite(p.likes)&&Number.isFinite(p.reposts)&&records(p.comments,1000,c=>text(c.id,100)&&text(c.author,100)&&text(c.text)&&Number.isFinite(c.at))))return false;
  if(!records(w.dms,500,m=>text(m.id,100)&&text(m.author,100)&&text(m.text)&&Number.isFinite(m.at))||!records(w.notifications,500,n=>text(n.id,100)&&text(n.text)&&Number.isFinite(n.at))||!records(w.activity,500,a=>text(a.id,100)&&text(a.platform,30)&&text(a.text)&&image(a.image)&&Number.isFinite(a.at)))return false;
 }
 if(data.romance){const r=data.romance;if(r.facts&&!strings(r.facts,150))return false;if(r.version!==1||!WORLD_STAGES.includes(r.stage)||!text(r.identity,300)||!['strangers','acquainted'].includes(r.backstory)||!strings(r.seen,100)||!strings(r.boundaries,150)||!['daily','sweet','tense'].includes(r.mood)||!Number.isFinite(r.lastEventAt)||!records(r.journal,100,j=>text(j.text)&&Number.isFinite(j.at))||!records(r.publicClues,50,c=>text(c.text)&&Number.isFinite(c.at)))return false}
 if(data.sceneAudio&&(!Number.isFinite(data.sceneAudio.volume)||data.sceneAudio.volume<0||data.sceneAudio.volume>1))return false;
 return true;
}

