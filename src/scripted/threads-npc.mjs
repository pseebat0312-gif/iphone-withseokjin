import {threadsActor,threadsCommentHash} from './threads-metrics.mjs';
export const THREADS_NPC_BATCHES={initial:['我好想我家明星','阿米快来和我卢关！！','金硕珍好帅啊我操我被他帅得要死了都怪你','老套能别去南美了吗我真的受不了了。这群贱人养牛','我做了100份高雄場的物料！是我自己做的拼豆和掛件喔～歡迎大家伸手！','套叔叔回韩国没','啊，去學校好累啊==','誠收BTS曼谷碩珍生日場票😭求求'], '001':['河道那个说介绍认识的是真的假的啊？我纳尼了','看今天的河道我好纳尼','有没有介绍认识我明星的渠道？砸锅卖铁我也收','又有热演姐在河道热演了😂😂看主页就发了一条也没粉籍，又来犯关中病','你们都在纳尼我是真的想要认识我明星','你再牛逼看到河道有人和明星认识了你能不难受？','我好想我明星啊，我明星已经把他的ig放生了，2周没发社交平台我看你是欠日了'],comment:['我操我调理不好了。金硕珍你想干吗啊。。。','谁能把那个账号开了。。','别开素人啊。。？小姐姐只是发了个日常很无辜啊，双方无妄之灾啊，可能只是工作人员，手滑了而已，别这么敏感坤。。','？前几天不是有个蜜蜜发了说她认识一个明星么。不会就是…','我不得劲了，肠肠什么时候手滑评论一下我。显化','我看那个人主页也没什么东西，流量也一般啊，珍怎么刷到的？'],'002':['那个女明星到底有完没完了？谁特么理她啊？','我操河道那个还在加码','我靠我有点不敢猜了 弹钢琴的背影，，','这不一眼ai😂😂关中','我操为什么我有一种不祥的预感..我很容易不安 我只是觉得那个背影真的好像…','蜜儿们不要管那个女明星啊啊！！只是来热演的而已啊，那个图这么糊完全看不出是谁，直接封锁就行了，影响心情🫳🏻🫳🏻🫳🏻 🫳🏻','卧槽啊，记得前几天套1手滑评论那个事情吗 我怎么越看越像是..细思极恐啊…'],'003':['有完没完，河道热演的你死了','到底要闹到什么时候','我受不了了我要把脆卸了，河道好难看','那个照片啥意思啊？那个关中还在发疯？','？？。？看河道我一直在纳尼','有很多话想说。。最后只能憋出一句。。纳尼。。纳。。尼。。。。','您能别演了吗？','你們都在說的到底是啥啊…是我網速太慢了嗎hhh誰能告訴我發生了什麼…','我建议有关中病的大婆消停一下吧，河道不是你调情和演戏的工具。没人坤你哦坤？']};

export const THREADS_FIXED_NPCS=['initial','001','comment','002','003'].flatMap(batch=>THREADS_NPC_BATCHES[batch].map((text,index)=>({id:'npc-'+batch+'-'+index,batch,text}))).map((post,index)=>({...post,number:index+1}));

// Exact per-post comment pools supplied by the author (editorial numbers 01–37).
export const THREADS_COMMENT_RULES={
1:{echo:true},2:{pool:['卢！！','我来惹！','我要卢关','来！','我来']},3:{echo:true},
4:{finite:true,pool:['卧槽点了。恶心死了','真的。南美真的无敌我心肝很差']},
5:{pool:['好厲害！','期待！']},6:{finite:true,pool:['还没吧应该，还有巴西','不知道🫪','好想让他们快点离开南美']},7:{pool:[]},8:{pool:[]},
9:{pool:['纳尼']},10:{echo:true},11:{echo:true},12:{pool:[]},13:{echo:true},
14:{pool:['我操我是真难受了','你再牛逼看到河道有人和明星认识了你能不难受？','我是真不得劲。。']},15:{pool:[]},
16:{first:'我真不行了大哥哥',pool:['纳尼']},17:{pool:[]},18:{pool:[]},19:{pool:['纳尼']},20:{pool:['显化']},21:{pool:[]},
22:{pool:['就是啊','对啊','贱死了','点了','无人在意']},23:{pool:['👂']},24:{pool:['纳尼。']},25:{pool:[]},26:{pool:[]},
27:{pool:['好 谢谢蜜儿😭','😭😭😭😭','谢谢蜜儿..好多了','谢谢蜜蜜','谢谢你。看完你这句话之后我好多了']},
28:{pool:['纳尼','真的假的','别乱猜了。。','你有啥证据？','管我心肝啥事','。。','？','。']},
29:{pool:[]},30:{pool:[]},31:{pool:['我也','唉','受不了了','我也打算走了','以前的河道不是这样的。。']},
32:{pool:['对','我受不了她了','这人能别演了吗']},33:{pool:[]},34:{pool:['纳。。尼。。。。']},35:{echo:true},36:{pool:[]},37:{echo:true}
};
export function applyFixedThreadsComments(post){
 const def=THREADS_FIXED_NPCS.find(p=>p.id===post.id);if(!def)return;
 const rule=THREADS_COMMENT_RULES[def.number],pool=rule.echo?[def.text]:rule.pool;
 post.text=def.text;
 if(post.commentRevision!==60){
  const own=(post.comments||[]).filter(c=>c.author==='me');
  post.comments=[...(rule.first?[rule.first]:[]),...pool].map((text,i)=>({id:post.id+':v60:'+i,...threadsActor(post,'comment60',i),text,afterSeconds:0,likes:1+((threadsCommentHash(post.id)+i*137)%997)})).concat(own);
  post.commentRevision=60;
 }
 post.fixedCommentRule={pool,first:rule.first||'',finite:!!rule.finite};
 delete post.repeatComments;
 post.growth=(post.growth||[]).map(row=>({...row,replies:pool.length?(rule.finite?pool.length:Math.max(row.replies,pool.length+(rule.first?1:0))):0}));
}

// Keep this exact authored NPC post and its original comment pool, but delay it until draft 004 is published.
export function threadsNpcAllowed84(id,db){return id!=='npc-002-6'||(db.posts||[]).some(p=>p.sourceId==='004')}
export function reconcileThreadsNpc84(db,now=Date.now()){const id='npc-002-6',index=(db.posts||[]).findIndex(p=>p.id===id);if(!threadsNpcAllowed84(id,db)&&index>=0){db.deferredNpc84=db.posts.splice(index,1)[0];return}if(threadsNpcAllowed84(id,db)&&db.deferredNpc84){if(index<0)db.posts.push({...db.deferredNpc84,at:now});delete db.deferredNpc84;}}
