# 可执行剧情节点清单

八幕新线与旧存档兼容线均包含。引擎从 choice.next 建立前置依赖；requires 是额外的事实条件。

## stranger

幕 1；故事线 A；角色 jin；界面 kkt；关键选择

前置：开局；额外条件：无

- 你好，刚才那条评论是我留的。
- 朋友转给我的公开照片，我认出了那家店。原本想问店名，结果评论发出去了。

选项：

- ask「你认出店了，为什么又删掉？」→ explain；变量 {"trust":1}；条件 无
- boundary「先说好，我不希望被陌生账号围观。」→ boundary；变量 {"secrecy":2}；条件 无

跨 App 与通知：first-photo · instagram · 你保存的一张街景：书店门口的雨棚。；first-comment · igdm · jin 的评论：你也去过这里？；first-delete · igdm · 评论已删除：评论由作者删除；通知仍保留。

## acquaintance

幕 1；故事线 D；角色 friend；界面 kkt；关键选择

前置：开局；额外条件：无

- 我是书妍，今晚替我跟硕珍说声谢谢？他帮我搬了展板。
- 我只介绍你们认识。感情上的事，你们自己决定，别让我当快递。

选项：

- intro「可以，把介绍说清楚再拉群。」→ known；变量 {"friendship":2}；条件 无
- direct「我自己向他道谢，不拉群。」→ known-private；变量 {"secrecy":1}；条件 无

跨 App 与通知：first-photo · instagram · 你保存的一张街景：书店门口的雨棚。；first-comment · igdm · jin 的评论：你也去过这里？；first-delete · igdm · 评论已删除：评论由作者删除；通知仍保留。

## explain

幕 1；故事线 B；角色 jin；界面 kkt；关键选择

前置：stranger:ask；额外条件：无

- 我删掉是因为那条评论能把别人引到你主页。
- 但先不问你就留下痕迹，是我考虑不周。店名不用告诉我，我已经知道自己该先道歉。

选项：

- tease「道歉收到了，下次先走私信通道。」→ coffee；变量 {"trust":2,"humor":1}；条件 无
- clear「谢谢解释。以后公开互动先问我。」→ coffee；变量 {"trust":2,"secrecy":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## boundary

幕 1；故事线 B；角色 jin；界面 kkt；关键选择

前置：stranger:boundary；额外条件：无

- 好，你不需要为了跟我聊天承担围观。
- 我不会转发照片，也不会问你住哪。你愿意聊什么，我们就从那里聊。

选项：

- warm「那就从那家店的咖啡聊起。」→ coffee；变量 {"trust":2}；条件 无
- independent「我先忙，晚一点再聊。」→ later；变量 {"personalLife":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## later

幕 1；故事线 E；角色 jin；界面 kkt；可汇合/继续点

前置：boundary:independent；额外条件：无

- 好，我也该去排练了。
- 晚一点我来发消息，你不用守着手机。

选项：

- back「现在有空了，刚才说到咖啡。」→ coffee；变量 {"independent":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## known

幕 1；故事线 D；角色 jin；界面 kkt；关键选择

前置：acquaintance:intro；额外条件：无

- 书妍把群名改成了“搬展板售后服务”。
- 服务内容目前只有问候。我是硕珍，你好。

选项：

- joke「请问售后包咖啡吗？」→ coffee；变量 {"humor":2}；条件 无
- thanks「听说你帮了她很久，谢谢。」→ coffee；变量 {"trust":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## known-private

幕 1；故事线 B；角色 jin；界面 kkt；关键选择

前置：acquaintance:direct；额外条件：无

- 书妍说你会来道谢，还特地加了一句“本人会说话”。
- 我姑且相信她不是在评价我。你好。

选项：

- tease「她对谁都这样，你习惯一下。」→ coffee；变量 {"humor":1}；条件 无
- sincere「谢谢你帮忙，改天我请咖啡。」→ coffee；变量 {"trust":2,"active":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## coffee

幕 2；故事线 F；角色 jin；界面 kkt；关键选择

前置：explain:tease、explain:clear、boundary:warm、later:back、known:joke、known:thanks、known-private:tease、known-private:sincere；额外条件：无

- 先声明，我喝无糖的。
- 这是为以后可能出现的请客打基础，不是暗示。……好吧，最后半句说得不太诚实。

选项：

- remember「无糖，我记住了。」→ invite, friend-side；变量 {"rememberSugar":true,"trust":1}；条件 无
- joke「先记账，请客得看你表现。」→ invite, friend-side；变量 {"humor":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## friend-side

幕 2；故事线 D；角色 friend；界面 kkt；关键选择

前置：coffee:remember、coffee:joke；额外条件：无

- 展览出了点麻烦，场地方临时少给了两面墙。
- 我想改成小型展，不想硬撑。你愿意帮我看新方案，还是我们改天单纯吃饭？

选项：

- help「发来吧，我今晚能帮你看。」→ friend-help；变量 {"friendship":2,"helpedFriend":true}；条件 无
- honest「今晚有约，明天陪你吃饭聊。」→ friend-dinner；变量 {"friendship":1,"friendDinner":true}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## friend-help

幕 2；故事线 D；角色 friend；界面 kkt；可汇合/继续点

前置：friend-side:help；额外条件：无

- 谢谢。我把不想展出的那组撤掉了，反而松了口气。
- 我会记得你认真看过，不只在需要我时找我。

选项：

- promise「下次布展也叫我。」→ 此支线收束；变量 {"friendship":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## friend-dinner

幕 2；故事线 D；角色 friend；界面 kkt；可汇合/继续点

前置：friend-side:honest；额外条件：无

- 好，诚实说忙比敷衍我强。
- 明天我选店，这次不让你边吃边帮我改排版。

选项：

- confirm「说定了，我把明晚空出来。」→ 此支线收束；变量 {"friendship":1}；条件 无

跨 App 与通知：friend-dinner · calendar · 书妍的晚餐：已约好明晚吃饭。

## invite

幕 2；故事线 A；角色 jin；界面 kkt；关键选择

前置：coffee:remember、coffee:joke；额外条件：无

- 今晚临时空出一个小时。想去那家店，但不是要你迁就临时通知。
- 你愿意一起坐坐，还是留到双方都提前安排好的时候？

选项：

- yes「我有空，今晚见。」→ meet；变量 {"met":true,"relationship":1}；条件 无
- no「今晚不行，我们提前约另一天。」→ decline；变量 {"declined":true,"personalLife":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## meet

幕 2；故事线 A；角色 jin；界面 kkt；关键选择

前置：invite:yes；额外条件：无

- 我到店了，坐在窗边。
- 路上看到南俊，他也来买书。我还没提你，你希望怎么介绍？

选项：

- friend「正常介绍名字，就说是朋友。」→ rm-meet；变量 {"rmKnowsName":true,"secrecy":1}；条件 无
- privacy「今天想安静一点，换个地方吧。」→ walk；变量 {"privateMeet":true,"secrecy":2}；条件 无

跨 App 与通知：date · calendar · 今晚：书店咖啡：玩家已接受见面。

## rm-meet

幕 2；故事线 D；角色 rm；界面 kkt；关键选择

前置：meet:friend；额外条件：无

- 你好，我是南俊。硕珍刚才把菜单看反了，你来了他才发现。
- 别担心，我今天只打算买一本书。通常最后会买三本。

选项：

- talk「你在看什么书？」→ rm-talk；变量 {"friendship":1}；条件 无
- space「那就不打扰你挑书了。」→ date-end；变量 {"secrecy":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## rm-talk

幕 2；故事线 D；角色 rm；界面 kkt；可汇合/继续点

前置：rm-meet:talk；额外条件：无

- 一本关于城市空间的。你有兴趣的话，下次借你。
- 你认真问我在读什么，而不是只问他的行程。这样的聊天，我很喜欢。

选项：

- accept「好，下次听你推荐。」→ date-end；变量 {"rmAlly":true,"friendship":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## walk

幕 2；故事线 B；角色 jin；界面 kkt；关键选择

前置：meet:privacy；额外条件：无

- 好，我们去街角散步。换地方的理由我来解释，不让你显得像在躲人。
- 你看，我连独自买咖啡都能临时变成路线规划。

选项：

- tease「路线规划合格，聊天继续努力。」→ date-end；变量 {"humor":1}；条件 无
- thanks「谢谢你没有让我为难。」→ date-end；变量 {"trust":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## date-end

幕 2；故事线 A；角色 jin；界面 kkt；关键选择

前置：rm-meet:space、rm-talk:accept、walk:tease、walk:thanks；额外条件：无

- 今天很开心。不是礼貌性售后回访。
- 下次我提前约你，不拿临时空档当诚意。

选项：

- warm「我也开心。下次留一个完整晚上。」→ life；变量 {"trust":2}；条件 无
- direct「那就现在约下次，别只说下次。」→ life；变量 {"active":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## decline

幕 2；故事线 E；角色 jin；界面 kkt；关键选择

前置：invite:no；额外条件：无

- 收到，那今天就不见。
- 我不把拒绝临时安排理解成拒绝我。去做你的事，之后我们认真挑个日子。

选项：

- friend「我今晚想去帮书妍处理展览。」→ home-friend；变量 {"friendship":1}；条件 无
- rest「我今晚需要自己待一会儿。」→ home-rest；变量 {"personalLife":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## home-friend

幕 2；故事线 D；角色 friend；界面 kkt；可汇合/继续点

前置：decline:friend；额外条件：无

- 你来了，我正好敢把那两幅画撤掉。
- 不是所有事情都需要做大一点。有时做小一点才像自己。

选项：

- listen「把你想留下的那幅讲给我听。」→ life；变量 {"helpedFriend":true,"friendship":2}；条件 无

跨 App 与通知：exhibit-photo · instagram · 书妍的小展：今晚重新布置了展墙。照片里没有硕珍。

## home-rest

幕 2；故事线 F；角色 jin；界面 kkt；可汇合/继续点

前置：decline:rest；额外条件：无

- 我也回来了。今天不继续问你在干嘛。
- 留一条消息：明天如果精神好一点，我们再挑见面时间。晚安。

选项：

- return「休息好了，明天我有个机会想和你聊。」→ life；变量 {"independent":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## life

幕 3；故事线 E；角色 friend；界面 kkt；关键选择

前置：date-end:warm、date-end:direct、home-friend:listen、home-rest:return；额外条件：无

- 有个短期项目在找人。不是替谁做免费宣传，有正式预算。
- 学生可以交作品集、上班族可以投短期合作、自由职业者可以谈报价。你愿意争取，还是这阵子先留一点余地？

选项：

- career「我想争取，帮我转发正式资料。」→ work；变量 {"personalLife":3,"career":true}；条件 无
- balance「我想先把已有安排做好。」→ balance；变量 {"personalLife":1,"restPlan":true}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## work

幕 3；故事线 E；角色 jin；界面 kkt；关键选择

前置：life:career；额外条件：无

- 听说你在准备自己的项目，挺好。
- 约会可以改时间，不用为了证明在意我放弃机会。你需要我帮什么，还是只想有人听你说？

选项：

- listen「陪我练一遍介绍就好。」→ rehearsal；变量 {"trust":2}；条件 无
- space「我想自己先准备完，再给你看。」→ work-space；变量 {"independent":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## rehearsal

幕 3；故事线 A；角色 jin；界面 kkt；可汇合/继续点

前置：work:listen；额外条件：无

- 可以，我先当不认识你的面试官。
- 第一题：请解释为什么一个小时里偷看了三次我的消息。……这题不计分。

选项：

- laugh「因为面试官不太守规矩。」→ public-met, public-home；变量 {"humor":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## work-space

幕 3；故事线 A；角色 jin；界面 kkt；可汇合/继续点

前置：work:space；额外条件：无

- 好。等你想展示的时候再给我看。
- 我把原来那晚空着，改成你忙完后的第二天。不是临时插队，是正式预约。

选项：

- book「第二天可以，记下来。」→ public-met, public-home；变量 {"trust":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## balance

幕 3；故事线 F；角色 jin；界面 kkt；关键选择

前置：life:balance；额外条件：无

- 你没有接新项目，那也不意味着空下来的时间归我。
- 我们选个你真的想出门的晚上，好不好？

选项：

- yes「周五吧，我想见你。」→ public-met, public-home；变量 {"active":2}；条件 无
- own「周末更好，周五留给我的朋友。」→ public-met, public-home；变量 {"friendship":1,"independent":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## public-met

幕 3；故事线 C；角色 jin；界面 kkt；关键选择

前置：rehearsal:laugh、work-space:book、balance:yes、balance:own；额外条件：met

- 我看见那张店外照片了。我们见过面，所以我先来跟你对齐事实。
- 它没有拍到我们同框。你想公开说一句、只跟我商量，还是先不参与？

选项：

- public「我只澄清照片，不回应私人关系。」→ public-answer；变量 {"publicAttention":2,"publicReply":true}；条件 无
- private「我们私下约好边界，不加入讨论。」→ private-answer；变量 {"secrecy":2,"trust":1}；条件 无
- ignore「先不回应，别替我发任何声明。」→ ignore-answer；变量 {"independent":1}；条件 无
- rm「先问南俊，他当时也在场。」→ rm-context；变量 {"rmConsulted":true}；条件 rmAlly

跨 App 与通知：street-post · instagram · 书店门口的照片：店铺发布的游戏内照片；只能说明地点相同，不是恋情证据。；discussion · x · 同一家店？：两个人去过同一家店，就值得整理时间线吗？我觉得先别下结论。#公开照片

## public-home

幕 3；故事线 C；角色 friend；界面 kkt；关键选择

前置：rehearsal:laugh、work-space:book、balance:yes、balance:own；额外条件：declined

- 有人把你的公开照片和店铺动态放在一起猜。
- 但你那晚根本没去见他。这次你有清楚的事实，不需要编一个解释。

选项：

- public「我只说自己那天没去，不多讲私人安排。」→ public-answer；变量 {"publicAttention":1,"publicReply":true}；条件 无
- private「我私下跟他对齐情况，不回应网友。」→ private-answer；变量 {"secrecy":2}；条件 无
- ignore「我不参与，先继续自己的生活。」→ ignore-answer；变量 {"personalLife":1}；条件 无
- evidence「你之前那份展览文件，能帮我核对日期吗？」→ friend-evidence；变量 {"evidenceReceived":true}；条件 helpedFriend

跨 App 与通知：discussion-home · x · 并没有发生的偶遇：一张旧书店照片被拿来猜约会。日期尚未核实，别把猜测当事实。#公开照片

## public-answer

幕 3；故事线 C；角色 friend；界面 kkt；关键选择

前置：public-met:public、public-home:public、friend-evidence:date；额外条件：无

- 你只澄清了能证明的部分。有人接受，也有人嫌你回应得太认真。
- 公开发言会留下痕迹。之后我不会替你说“她什么都没回应”。

选项：

- hold「保留原话，不继续争论。」→ confess；变量 {"trust":1}；条件 无
- boundary「补一句请不要猜素人的身份。」→ confess；变量 {"secrecy":1}；条件 无

跨 App 与通知：clarification · x · 玩家的澄清：请核对照片的日期。公开照片不能证明私人关系，也请不要猜测素人身份。

## private-answer

幕 3；故事线 B；角色 jin；界面 kkt；关键选择

前置：public-met:private、public-home:private、friend-evidence:private、rm-context:facts；额外条件：无

- 好，我不会要求你用公开回应换取我的安心。
- 如果有人问到你，我先来问你，不抢着替你定义关系。

选项：

- tell「可信的朋友可以知道一点，但要先商量。」→ confess；变量 {"shareTrusted":true,"trust":2}；条件 无
- keep「先只有我们知道，之后再讨论。」→ confess；变量 {"secrecy":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## ignore-answer

幕 3；故事线 E；角色 jin；界面 kkt；关键选择

前置：public-met:ignore、public-home:ignore、rm-context:none；额外条件：无

- 明白，沉默不是默认，也不是逃避。
- 我先把自己这边的公开安排看好。我们要谈的话，留在这里。

选项：

- thanks「谢谢，别让我靠解释来证明信任。」→ confess；变量 {"trust":2}；条件 无
- active「那我们现在谈谈彼此到底想怎样。」→ confess；变量 {"active":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## confess

幕 4；故事线 A；角色 jin；界面 kkt；关键选择

前置：public-answer:hold、public-answer:boundary、private-answer:tell、private-answer:keep、ignore-answer:thanks、ignore-answer:active；额外条件：无

- 我喜欢你。不是因为你处理舆论的方式“合格”，更不是因为你总有空。
- 我想认真和你交往。保密的麻烦我会一起承担，但决定权不在我一个人手上。

选项：

- yes「我愿意。但我们先约好彼此的边界。」→ couple-boundary；变量 {"relationship":3,"couple":true}；条件 无
- slow「我也有好感，但想再见一次才决定。」→ second-date；变量 {"trust":1,"notYet":true}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## second-date

幕 4；故事线 A；角色 jin；界面 kkt；关键选择

前置：confess:slow；额外条件：无

- 可以，喜欢不是限时答题。
- 这次不等临时空档。我们约在你方便的时候，认真见一面；你可以在那之后继续说不。

选项：

- yes「那就见过再说，我愿意认真了解。」→ after-second；变量 {"secondDate":true}；条件 无
- pause「我先处理完自己的安排，再来约。」→ checkpoint-slow；变量 {"personalLife":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## after-second

幕 4；故事线 A；角色 jin；界面 kkt；关键选择

前置：second-date:yes；额外条件：无

- 见面之后，我的答案没变。
- 但我不会替你把“愿意了解”翻译成“已经交往”。你的答案呢？

选项：

- yes「这次是明确答应。我们在一起吧。」→ couple-boundary；变量 {"couple":true,"relationship":3}；条件 无
- wait「还想慢一点，但不消失。」→ checkpoint-slow；变量 {"trust":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## couple-boundary

幕 4；故事线 B；角色 jin；界面 kkt；关键选择

前置：confess:yes、after-second:yes；额外条件：无

- 那从今天开始，是恋人了。
- 我们先约一件最实际的事：临时工作冲突时，要怎么照顾彼此？

选项：

- talk「提前说清楚，再一起找补回来的时间。」→ couple-plan；变量 {"trust":2,"communicate":true}；条件 无
- independent「各自先处理工作，但别失联。」→ couple-space；变量 {"personalLife":2,"independent":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## couple-plan

幕 4；故事线 F；角色 jin；界面 kkt；关键选择

前置：couple-boundary:talk；额外条件：无

- 好。我刚在日历里认真写了“约会”，看起来有点郑重。
- 又加了一句“不要再把菜单拿反”。这下比较像我。

选项：

- sugar「顺便记住：你的无糖咖啡。」→ hidden-coffee；变量 {"sweet":1}；条件 rememberSugar；即时回应：你记得那句话啊。 / 那下一杯我请，这次不是试探。
- new「下一次我挑地方，你挑甜点。」→ checkpoint-couple；变量 {"active":1}；条件 无
- sleep「约会别安排太晚，我要留点睡觉时间。」→ checkpoint-couple；变量 {"personalLife":1}；条件 无；即时回应：好，把关心作息列入约会计划。 / 我不打算让你靠熬夜证明喜欢。

跨 App 与通知：couple-date · calendar · 下一次正式约会：双方约定：工作冲突提前沟通，不让临时改期变成失联。

## couple-space

幕 4；故事线 E；角色 jin；界面 kkt；关键选择

前置：couple-boundary:independent；额外条件：无

- 好，我不会拿“你怎么没回”当考勤。
- 但忙完之后会告诉你。我想参与你的生活，不接管它。

选项：

- photo「忙完互发一张今天的照片吧。」→ checkpoint-independent；变量 {"photoPromise":true}；条件 无
- dinner「周末留一顿饭给彼此。」→ checkpoint-independent；变量 {"weeklyDinner":true}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## hidden-coffee

幕 4；故事线 F；角色 jin；界面 kkt；可汇合/继续点

前置：couple-plan:sugar；额外条件：rememberSugar

- 当时我以为那句无糖会被你当废话略过去。
- 结果认真记住的人是你。今天这一杯，我会喝得很慢。

选项：

- stay「以后还有很多杯，不急。」→ checkpoint-couple；变量 {"trust":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## checkpoint-couple

幕 4；故事线 A；角色 jin；界面 kkt；可汇合/继续点

前置：couple-plan:new、couple-plan:sleep、hidden-coffee:stay；额外条件：无

- 今天没有需要证明给外人看的东西。
- 我们已经约好下一次，也约好有事直接说。先把日子好好过起来。

选项：

- continue「继续我们的秘密恋爱日常」→ r-tae；变量 {"couple":true}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## checkpoint-independent

幕 4；故事线 E；角色 jin；界面 kkt；可汇合/继续点

前置：couple-space:photo、couple-space:dinner；额外条件：无

- 你继续忙你的计划，我也去做我的工作。
- 这不是退回朋友。是两个都没把自己弄丢的人，开始谈恋爱。

选项：

- continue「继续我们的秘密恋爱日常」→ r-tae；变量 {"couple":true}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## checkpoint-slow

幕 4；故事线 A；角色 jin；界面 kkt；可汇合/继续点

前置：second-date:pause、after-second:wait；额外条件：无

- 好，我记住的是你说的“慢一点”，不是替你补一个答案。
- 我们没有删掉已有的心意。下一次，仍然可以由你来决定。

选项：

- continue「安排一次当面约会，再决定关系」→ r-second-date；变量 {}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## friend-evidence

幕 3；故事线 D；角色 friend；界面 kkt；关键选择

前置：public-home:evidence；额外条件：helpedFriend

- 能。你之前帮我认真看过方案，我留着原始文件。
- 日期可以给你核对，但照片里还有别的朋友。要公开的话，先只用日期，别把她们一起卷进去。

选项：

- date「只用日期澄清，不发别人的照片。」→ public-answer；变量 {"publicEvidence":true,"trust":1}；条件 无
- private「我自己知道就好，不公开文件。」→ private-answer；变量 {"secrecy":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## rm-context

幕 3；故事线 D；角色 rm；界面 kkt；关键选择

前置：public-met:rm；额外条件：rmAlly

- 我记得那晚。但我只能说我亲眼见到的，不替你定义私人关系。
- 你上次愿意正常聊书，我也愿意认真听你的顾虑。需要我做什么，先说明范围。

选项：

- facts「只核对时间，不请你替我声明。」→ private-answer；变量 {"trust":1,"secrecy":1}；条件 无
- none「先不用出面，你知道情况就够了。」→ ignore-answer；变量 {"independent":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## spark

幕 1；故事线 A；角色 jin；界面 igdm；关键选择

前置：开局；额外条件：无

- 还没睡？
- 刚才那条评论是我手快。明明可以私信你，偏偏点到了评论。
- 删掉了。但你要是看见了……不准拿这个笑我一整年。

选项：

- tease「先笑到今晚。你本来想说什么？」→ r-invite；变量 {"humor":2}；条件 无
- warm「看见了。你是不是也想见我？」→ r-invite；变量 {"active":2}；条件 无

跨 App 与通知：r-photo · instagram · 你的一张雨夜照片：和熟悉的人约过的那家店，雨棚还是老样子。；r-comment · igdm · jin 留下评论：你上次说想再来。今晚？；r-deleted · igdm · 评论已删除：jin 删除了刚才的评论。通知记录仍在。

## familiar

幕 1；故事线 D；角色 friend；界面 kkt；关键选择

前置：开局；额外条件：无

- 你俩一个问我咖啡馆几点关门，一个问我今晚有没有别人。
- 我只回这一遍：店主今天留了预约时段。你们自己聊。
- 展览下周开，我也有自己的大事要忙，别让我天天当红娘。

选项：

- honest「被你发现了。开幕我也会来帮忙。」→ r-invite；变量 {"helpedFriend":true,"friendship":2}；条件 无
- private「我自己问他。你的开幕时间发我。」→ r-invite；变量 {"secrecy":1,"friendship":1}；条件 无

跨 App 与通知：r-photo · instagram · 雨夜街景：熟悉的咖啡馆，雨棚还是老样子。；r-deleted · igdm · 评论已删除：jin 留下「今晚？」后删除了评论。

## r-invite

幕 1；故事线 A；角色 jin；界面 kkt；关键选择

前置：spark:tease、spark:warm、familiar:honest、familiar:private；额外条件：无

- 想。
- 原来准备绕两句，既然你已经问了，我就省点力气。
- 今晚八点四十，店主留了最后一段预约。侧门进，不用站在路边等我。你方便吗？

选项：

- go「方便。我到了给你消息。」→ r-arrive；变量 {"met":true,"relationship":1}；条件 无
- later「今晚有事，明天下午见。」→ r-reschedule；变量 {"personalLife":2,"declined":true}；条件 无

跨 App 与通知：r-booking · calendar · 雨巷咖啡 · 私人预约：地点已确认；不是公开行程。可以改期，不必临时迁就。

## r-reschedule

幕 1；故事线 E；角色 jin；界面 kkt；可汇合/继续点

前置：r-invite:later；额外条件：无

- 明天可以。我把预约改到下午。
- 你先忙。别一边回我一边做正事，打错字我又舍不得笑你。

选项：

- ready「忙完了。明天我准时赴约。」→ r-arrive；变量 {"met":true,"independent":1}；条件 无；即时回应：收到。到时候见。 / 伞我带，你带自己来就行。

跨 App 与通知：KakaoTalk 消息通知

## r-arrive

幕 2；故事线 B；角色 jin；界面 scene · 雨巷 · 预约咖啡馆；关键选择

前置：r-invite:go、r-reschedule:ready；额外条件：无

- 我在里面。
- 侧门那把伞是给你留的，不是店里的。
- 别急，进门再把手机收起来。今天想当面听你说话。

选项：

- enter「推开侧门，进入咖啡馆」→ r-seat；变量 {"enteredCafe":true}；条件 无
- check「先看清门牌，再推门进去」→ r-seat；变量 {"enteredCafe":true,"secrecy":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-seat

幕 2；故事线 B；角色 jin；界面 scene · 雨巷 · 预约咖啡馆；关键选择

前置：r-arrive:enter、r-arrive:check；额外条件：无

- 来了。
- 他站起身，把靠里的椅子拉开，又停了一下。
- “坐里面会自在点。你想坐哪边？我挪。”

选项：

- inside「坐在靠里的位置，把湿伞放好」→ r-order；变量 {"secrecy":1}；条件 无；即时回应：“手给我看看……冷的。杯子先捂着，别急着喝。”
- beside「坐到他旁边，小声说：这里可以吗」→ r-order；变量 {"active":1}；条件 无；即时回应：他看了眼门口，嘴角压了压。 / “可以。就是你再靠近一点，我可能忘记点单。”

跨 App 与通知：KakaoTalk 消息通知

## r-order

幕 2；故事线 F；角色 jin；界面 scene · 雨巷 · 预约咖啡馆；关键选择

前置：r-seat:inside、r-seat:beside；额外条件：无

- “我喝无糖。你呢？”
- 他翻着菜单，却把印着甜点的那一面朝向了你。
- “想吃就点。不是请你来陪我喝一杯苦的。”

选项：

- sugar「记住他喝无糖，给自己点一份甜点」→ r-door；变量 {"rememberSugar":true,"sweet":1}；条件 无
- share「点两把叉子：这一份我们分着吃」→ r-door；变量 {"active":2,"sharedCake":true}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-door

幕 2；故事线 B；角色 jin；界面 scene · 雨巷 · 预约咖啡馆；关键选择

前置：r-order:sugar、r-order:share；额外条件：无

- 门外忽然有人推了推门。
- 他没有碰你，只把自己的手机扣在桌上，抬眼看了眼店主。
- 店主隔着门说预约已满。脚步声渐渐远了。
- “吓到了？……是我选的地方，我会看好。你不用跟着装镇定。”

选项：

- hand「桌下轻轻拉住他的袖口」→ r-cafe-close；变量 {"trust":2,"heldSleeve":true}；条件 无；即时回应：他的手在桌沿停了一秒，轻轻握住你的指尖。 / “嗯。我在。”
- ask「小声问：每次见面都得这样吗」→ r-cafe-close；变量 {"trust":2,"boundaries":true}；条件 无；即时回应：“不会让每次见面都变成躲人。” / “我会找能好好待着的地方。这不是你该独自适应的事。”

跨 App 与通知：KakaoTalk 消息通知

## r-cafe-close

幕 2；故事线 A；角色 jin；界面 scene · 雨巷 · 预约咖啡馆；关键选择

前置：r-door:hand、r-door:ask；额外条件：无

- “我本来可以让司机送伞，发个消息问你冷不冷。”
- 他抬眼看你，笑了一下，又把笑收了回去。
- “但我想自己见你。这个理由，你应该听明白了。”

选项：

- clear「听明白了。可我要你亲口说。」→ r-confess；变量 {"active":2}；条件 无
- tease「哥哥，这算不算在追我？」→ r-confess；变量 {"humor":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-confess

幕 3；故事线 A；角色 jin；界面 scene · 雨巷 · 预约咖啡馆；关键选择

前置：r-cafe-close:clear、r-cafe-close:tease；额外条件：无

- “算。追得不算熟练，你多包涵。”
- “我喜欢你。不是只想偶尔约一杯咖啡。”
- “想跟你谈恋爱。见面麻烦、临时工作多，这些我不拿来骗你说没有。但我会认真安排。”
- “你愿不愿意？”

选项：

- yes「愿意。那今天开始，你是我男朋友了。」→ r-first-couple；变量 {"couple":true,"relationship":4}；条件 无
- slow「我也喜欢你，再给我一次认真约会的时间。」→ r-second-date；变量 {"notYet":true,"trust":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-second-date

幕 3；故事线 A；角色 jin；界面 scene · 雨巷 · 预约咖啡馆；关键选择

前置：checkpoint-slow:continue、r-confess:slow；额外条件：无

- “好。不是今晚不答应，我就把咖啡收回去。”
- 两天后，他真的提前空出一个晚上。相同的店主，相同的侧门，这次你们已经知道彼此会来。
- “你慢慢想。但我想追你这件事，不会让你猜。”

选项：

- yes「这次不用猜。我愿意和你在一起。」→ r-first-couple；变量 {"couple":true,"relationship":4}；条件 无
- honest「先陪我聊聊保密的边界，再答应你。」→ r-agreement；变量 {"trust":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-agreement

幕 3；故事线 B；角色 jin；界面 scene · 雨巷 · 预约咖啡馆；可汇合/继续点

前置：r-second-date:honest；额外条件：无

- “不查手机，不要求你删朋友。你自己的工作照常。”
- “不把你推到镜头前。需要公开回应，先一起决定。”
- “这些做不到，你可以直接告诉我。”

选项：

- agree「那我答应。我们一起面对。」→ r-first-couple；变量 {"couple":true,"relationship":4,"boundaries":true}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-first-couple

幕 3；故事线 F；角色 jin；界面 scene · 雨巷 · 预约咖啡馆；关键选择

前置：r-confess:yes、r-second-date:yes、r-agreement:agree；额外条件：无

- “男朋友……嗯，这个称呼挺好。”
- 他低头收起杯子，却又把你外套的袖口理正。
- “回去报个平安。不是查岗，我今晚大概会忍不住看手机。”

选项：

- home「回到家后给他发：男朋友，我到了。」→ r-home-message；变量 {"trust":1}；条件 无
- photo「出门前拍下两只空杯，只留给彼此。」→ r-home-message；变量 {"privatePhoto":true}；条件 无；即时回应：“这张别发公开账号。” / 他看了看照片，又补了一句：“发我。我要。”

跨 App 与通知：r-us · calendar · 第一天 · 恋人：已明确确认关系；后续不再重复试探身份。

## r-home-message

幕 4；故事线 A；角色 jin；界面 kkt；关键选择

前置：r-first-couple:home、r-first-couple:photo；额外条件：无

- 到了就好。
- 我刚才回去的路上，想起你叫我那一声。
- 没什么，就是……再叫一次也行。

选项：

- tease「哥哥，男朋友。满意了吗？」→ r-tae；变量 {"humor":2}；条件 无；即时回应：差不多。 / 不对，挺满意的。
- sweet「男朋友，今天很开心。你也早点休息。」→ r-tae；变量 {"sweet":2}；条件 无；即时回应：我也是。 / 睡前先跟你说：明天见，不是客套。

跨 App 与通知：r-safe-photo · photo · 给你的第一张日常照片：忙完给你看一眼。只是你们的游戏内私人照片。

## r-tae

幕 4；故事线 D；角色 v；界面 kkt；关键选择

前置：checkpoint-couple:continue、checkpoint-independent:continue、r-home-message:tease、r-home-message:sweet；额外条件：无

- 哥今天把手机拿反了还看了好一会。
- 我没问他在等谁。
- 那家店你喜欢吗？之前说想带你去的，看来有人抢先。

选项：

- kind「喜欢。下次大家一起去吧。」→ r-tae-answer；变量 {"taeFriend":2}；条件 无
- truth「我和硕珍在一起了，想亲口告诉你。」→ r-tae-truth；变量 {"taeKnows":true,"trust":1}；条件 无

跨 App 与通知：r-tae-post · instagram · thv · 深夜的唱片：有些歌，过了今天才听懂。

## r-tae-answer

幕 4；故事线 D；角色 v；界面 kkt；可汇合/继续点

前置：r-tae:kind；额外条件：无

- 大家一起……好。
- 那我负责选歌。你们两个别嫌我选得太慢。
- 我下周有拍摄，忙完请你看成片。这个约定还算数吧？

选项：

- yes「算数。祝拍摄顺利。」→ r-jk；变量 {"taeFriend":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-tae-truth

幕 4；故事线 D；角色 v；界面 kkt；可汇合/继续点

前置：r-tae:truth；额外条件：无

- 嗯。我猜到了。
- 谢谢你自己告诉我。你不用解释更多，我也不会替你们说出去。
- 本来存着一家餐厅想问你。现在……等大家一起吃吧。祝你们好。

选项：

- care「谢谢你。我也认真珍惜我们这份朋友关系。」→ r-jk；变量 {"taeFriend":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-jk

幕 4；故事线 D；角色 jk；界面 kkt；关键选择

前置：r-tae-answer:yes、r-tae-truth:care；额外条件：无

- 你到家了吗？
- ……哥已经问过了吧。我刚看到他发的消息。
- 算了，安全到家就好。上次答应教你的料理还记得吗？

选项：

- friends「记得。叫上大家一起做吧。」→ r-jk-answer；变量 {"jkFriend":2}；条件 无
- clear「记得。我和硕珍在一起了，不想瞒着你。」→ r-jk-truth；变量 {"jkKnows":true}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-jk-answer

幕 4；故事线 D；角色 jk；界面 kkt；可汇合/继续点

前置：r-jk:friends；额外条件：无

- 好，我多买一点材料。
- 本来按两个人算的。没事，大家都来热闹。
- 还有，哥要是忙，我能帮你带东西。不是让你欠我什么。

选项：

- thanks「谢啦。我也会带一道菜。」→ r-morning；变量 {"jkFriend":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-jk-truth

幕 4；故事线 D；角色 jk；界面 kkt；可汇合/继续点

前置：r-jk:clear；额外条件：无

- 知道了。
- 我本来还想……没什么，菜谱晚点发你。
- 哥挺会照顾人的。你们好好的。我们还是朋友，对吧？

选项：

- yes「当然。你不用勉强自己现在陪我聊天。」→ r-morning；变量 {"jkFriend":2,"jkRespect":true}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-morning

幕 4；故事线 F；角色 jin；界面 kkt；关键选择

前置：r-jk-answer:thanks、r-jk-truth:yes；额外条件：无

- 早。
- 今天有排练，我大概下午才能回。不是忽然不想理你。
- 早餐别只拍给我看，记得吃。……说得像我很啰嗦？

选项：

- tease「是有一点。哥哥继续。」→ r-life；变量 {"humor":1}；条件 无
- own「知道啦。我今天也有自己的安排。」→ r-life；变量 {"personalLife":1}；条件 无

跨 App 与通知：r-morning-photo · photo · 排练前给你看一眼：今天留给你的一张。不是现实实时消息。；r-fan-morning · x · 粉丝的排练日讨论：今天看官方舞台片段，终于理解为什么大家说现场更好。别拿私人行程当追星作业。

## r-life

幕 4；故事线 E；角色 friend；界面 kkt；关键选择

前置：r-morning:tease、r-morning:own；额外条件：无

- 开幕的工作邀请发你了，有预算和截止时间。
- 你来做视觉方案，还是帮我半天布展？都不行也可以直接说。
- 不是因为你认识谁才找你，我看过你的东西。

选项：

- work「我接视觉方案。把正式要求发来。」→ r-project；变量 {"career":true,"personalLife":3,"helpedFriend":true}；条件 无
- help「我留半天帮你布展，其他时间留给自己。」→ r-balance；变量 {"helpedFriend":true,"friendship":2}；条件 无
- rest「这次不接。我最近需要休息，但会来开幕。」→ r-rest；变量 {"restPlan":true,"personalLife":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-project

幕 4；故事线 E；角色 jin；界面 kkt；关键选择

前置：r-life:work；额外条件：无

- 接了？那你先做。
- 我把周五约会改到你交稿之后，别为了回消息把思路弄断。
- 忙完给我看一眼，不懂的地方我就诚实夸你好看。

选项：

- ask「能不能当一次认真观众，听我讲讲？」→ r-rehearse；变量 {"trust":2}；条件 无
- space「我先自己做，成稿再给你看。」→ r-space；变量 {"independent":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-rehearse

幕 4；故事线 A；角色 jin；界面 kkt；可汇合/继续点

前置：r-project:ask；额外条件：无

- 可以。现在开始，我不插嘴。
- ……等等，开场之前能先说一句吗？
- 你认真讲自己东西的时候，很好看。好了，我闭嘴。

选项：

- smile「先讲完，再让你夸。」→ r-date-invite；变量 {"humor":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-space

幕 4；故事线 A；角色 jin；界面 kkt；可汇合/继续点

前置：r-project:space；额外条件：无

- 好。你忙完再找我。
- 外卖我不擅自点，万一你已经吃了。
- 只是问一句：有好好吃饭吗？

选项：

- yes「有。交稿之后我挑电影。」→ r-date-invite；变量 {"trust":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-balance

幕 4；故事线 F；角色 friend；界面 kkt；可汇合/继续点

前置：r-life:help；额外条件：无

- 半天够了，别把自己的周末全交给我。
- 泰亨说可以借一张凳子，柾国说能搬。我让他俩别把展场弄成健身房。

选项：

- laugh「我负责拦着他们。」→ r-date-invite；变量 {"friendship":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-rest

幕 4；故事线 E；角色 jin；界面 kkt；可汇合/继续点

前置：r-life:rest；额外条件：无

- 那就休息。
- 不需要把空出来的时间全给我。
- 但你要是想找个不用说话的人一起看电影，我报名。

选项：

- yes「报名通过。我来挑电影。」→ r-date-invite；变量 {"independent":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-date-invite

幕 4；故事线 A；角色 jin；界面 kkt；关键选择

前置：r-rehearse:smile、r-space:yes、r-balance:laugh、r-rest:yes；额外条件：无

- 小放映室订好了。私人预约，不会有人突然进来。
- 你挑电影，我带晚饭。
- 顺便提醒，恐怖片可以，但不准说是我害怕。

选项：

- movie「赴约，走进小放映室」→ r-movie；变量 {"movieDate":true}；条件 无
- cook「想吃你做的。改成周日一起做饭好吗？」→ r-cook；变量 {"cookDate":true}；条件 无

跨 App 与通知：r-date2 · calendar · 周末约会 · 由你来选：私人放映室或一起做饭，选择后以聊天约定为准。

## r-movie

幕 4；故事线 F；角色 jin；界面 scene · 小放映室 · 灯留了一盏；关键选择

前置：r-date-invite:movie；额外条件：无

- “给你留了靠外的座位。”
- 影片刚响起第一声，他就把爆米花递过来，假装只是腾手。
- “刚才那个音效太响，不是吓到。”

选项：

- hold「伸手：那借你握一会。」→ r-movie-close；变量 {"heldHand":true,"sweet":2}；条件 无；即时回应：他把爆米花放下，握住你的手。 / “你提的。我可没耍赖。”
- tease「一本正经地点头：哥哥很勇敢。」→ r-movie-close；变量 {"humor":2}；条件 无；即时回应：“嗯。勇敢的人申请换一部喜剧。”

跨 App 与通知：KakaoTalk 消息通知

## r-movie-close

幕 4；故事线 A；角色 jin；界面 scene · 小放映室 · 灯留了一盏；关键选择

前置：r-movie:hold、r-movie:tease；额外条件：无

- 片尾亮起来，他没有立刻松开手。
- “以后忙归忙，一个月总得有几次这种时间。”
- “不是挤剩下来的。我会提前留。”

选项：

- agree「约好。也要留出我的工作和朋友。」→ r-screen；变量 {"trust":2,"regularDate":true}；条件 无
- active「那下次我订地方，你跟我走。」→ r-screen；变量 {"active":2,"regularDate":true}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-cook

幕 4；故事线 F；角色 jin；界面 scene · 周日 · 两个人的一顿饭；关键选择

前置：r-date-invite:cook；额外条件：无

- “先洗手。围裙在旁边。”
- 他把一只形状离奇的饭团端出来，脸上倒很镇定。
- “这个是限定版。好看的一般没这么有个性。”

选项：

- taste「尝一口：限定版味道不错。」→ r-cook-close；变量 {"sweet":2}；条件 无
- help「站到料理台另一边：我们一起做。」→ r-cook-close；变量 {"sharedCooking":true,"trust":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-cook-close

幕 4；故事线 A；角色 jin；界面 scene · 周日 · 两个人的一顿饭；关键选择

前置：r-cook:taste、r-cook:help；额外条件：无

- “平时工作的时候，饭常常只是赶紧吃完。”
- 他把碗往你这边推了点。
- “今天不一样。可以慢慢吃。”

选项：

- future「以后也留一些这样的周日。」→ r-screen；变量 {"regularDate":true,"sweet":1}；条件 无
- joke「那下一次我做，你负责夸。」→ r-screen；变量 {"regularDate":true,"humor":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-screen

幕 5；故事线 C；角色 friend；界面 kkt；可汇合/继续点

前置：r-movie-close:agree、r-movie-close:active、r-cook-close:future、r-cook-close:joke；额外条件：无

- 有人把你那条雨夜照片和硕珍工作室附近的灯牌放一起了。
- 我先把原帖链接发你。它只能证明两处灯牌很像，不是你们同框。
- 先看完整再决定。别让别人剪出来的半句话替你发言。

选项：

- read「打开 X，看看这条讨论」→ r-x-read；变量 {"sawDiscussion":true}；条件 无

跨 App 与通知：r-lamp · x · 粉丝讨论 · 同款灯牌？：这张街景的灯牌和工作室附近很像。别急着认人，好多店用同一款。

## r-x-read

幕 5；故事线 C；角色 jin；界面 x；关键选择

前置：r-screen:read；额外条件：无

- 我看到了。
- 你没做错，不用急着删掉自己的生活。
- 这条只是灯牌猜测。想不回应，或者只澄清照片日期，都可以。我不替你发。

选项：

- quiet「不回应，保留证据，限制陌生私信。」→ r-quiet；变量 {"quietResponse":true,"secrecy":2}；条件 无
- facts「只发日期澄清，不解释私人关系。」→ r-facts；变量 {"publicReply":true,"publicAttention":2}；条件 无
- friend「先找书妍核对原始照片的时间。」→ r-evidence；变量 {"askedFriend":true}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-quiet

幕 5；故事线 B；角色 jin；界面 kkt；可汇合/继续点

前置：r-x-read:quiet、r-evidence:keep；额外条件：无

- 好，我这边也不添新的痕迹。
- 明天那张后台照片先不发，背景里有你的包。
- 我自己发现的。总不能每次都等你替我检查。

选项：

- thanks「谢谢。我们继续正常过日子。」→ r-ig-follow；变量 {"trust":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-facts

幕 5；故事线 C；角色 jin；界面 kkt；可汇合/继续点

前置：r-x-read:facts、r-evidence:date；额外条件：无

- 看见你写的了，只说日期，没有拉别人出来。
- 接下来别守着刷新。澄清不是保证每个人都会相信。
- 过来跟我说说今天，剩下的我让工作人员留意。

选项：

- close「我关掉通知了。你今天过得怎么样？」→ r-ig-follow；变量 {"trust":1}；条件 无

跨 App 与通知：r-fact-post · x · 你的澄清：照片拍摄日期早于网传行程，请停止拼接私人身份。

## r-evidence

幕 5；故事线 D；角色 friend；界面 kkt；关键选择

前置：r-x-read:friend；额外条件：无

- 原始照片的日期我帮你核对了。
- 但里面还有其他人的行程，不能整份公开。
- 你之前帮我留过备份，今天刚好用上。没有那份也能核对，只是会慢一点。

选项：

- date「只公开日期，其他资料留在私下。」→ r-facts；变量 {"publicEvidence":true}；条件 无
- keep「先不公开。谢谢，我心里有数了。」→ r-quiet；变量 {"quietResponse":true,"friendship":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-ig-follow

幕 5；故事线 C；角色 v；界面 kkt；可汇合/继续点

前置：r-quiet:thanks、r-facts:close；额外条件：无

- 你的私信可能会突然多一点。
- 有个号问我是不是认识你，我没有回应。
- 不是所有人都带着恶意，但不需要让每个陌生人都进来。你要不要先看看请求箱？

选项：

- look「打开 Instagram 私信请求」→ r-ig-request；变量 {"checkedRequests":true}；条件 无

跨 App 与通知：r-ig-kind · igdm · 陌生账号 · 支持与边界：看到有人乱猜。你不用证明什么，不要发住址或行程。；r-ig-question · igdm · 陌生账号 · 询问：你真的认识他吗？为什么那张照片删了评论？

## r-ig-request

幕 5；故事线 C；角色 jin；界面 igdm；关键选择

前置：r-ig-follow:look；额外条件：无

- 这条问身份的私信，你不用回。
- 想表达边界就表达；想关掉请求箱，也不是心虚。
- 我在工作间隙，手机还在手边。处理完给我一个句号也行。

选项：

- limit「限制请求，不回复陌生身份问题。」→ r-party-invite；变量 {"limitedDM":true,"secrecy":2}；条件 无
- boundary「回复：请不要追问私人关系，也不要转发我的照片。」→ r-party-invite；变量 {"dmBoundary":true}；条件 无；即时回应：好。我看见你说的边界了。 / 如果对方还继续，我们留存后屏蔽，不陪他耗。

跨 App 与通知：KakaoTalk 消息通知

## r-party-invite

幕 5；故事线 D；角色 jk；界面 kkt；关键选择

前置：r-ig-request:limit、r-ig-request:boundary；额外条件：无

- 食材买好了。哥也来，泰亨负责音乐。
- 你要不要来？露台不对外开放，不会有人在旁边拍。
- 今天我当厨师，不问你们俩的事。……尽量。

选项：

- go「参加聚餐，带上答应的菜。」→ r-party；变量 {"party":true,"jkFriend":1}；条件 无
- no「今晚想两个人安静待着，下次请你吃饭。」→ r-alone；变量 {"aloneDate":true,"independent":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-party

幕 5；故事线 D；角色 jk；界面 scene · 凌晨 · 有风的露台；关键选择

前置：r-party-invite:go；额外条件：无

- “这份没放辣，我记得你上次问过。”
- 柾国把碗放在你面前，刚想再说什么，看到硕珍替你拉开椅子，便去拿了筷子。
- “哥，照顾好她。……我说吃饭，别让菜凉。”

选项：

- friend「谢谢你记得。下次我做一道给大家。」→ r-tae-terrace；变量 {"jkFriend":2}；条件 无
- help「去厨房帮他收拾，把话题留在菜谱上。」→ r-jk-kitchen；变量 {"jkFriend":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-jk-kitchen

幕 5；故事线 D；角色 jk；界面 scene · 凌晨 · 有风的露台；关键选择

前置：r-party:help；额外条件：无

- “不用帮，我马上好。”
- 他洗了两次同一只碗，终于自己笑了。
- “我知道你们在一起。刚开始有一点不习惯，但我会调整。你别为了照顾我，反而不自在。”

选项：

- respect「那我们慢慢来。朋友也不用假装没情绪。」→ r-tae-terrace；变量 {"jkRespect":true,"jkFriend":2}；条件 无
- space「好，我先出去。你想聊的时候再找我。」→ r-tae-terrace；变量 {"jkSpace":true}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-tae-terrace

幕 5；故事线 D；角色 v；界面 scene · 凌晨 · 有风的露台；关键选择

前置：r-party:friend、r-jk-kitchen:respect、r-jk-kitchen:space；额外条件：无

- “这首歌，原来想单独放给你听。”
- 泰亨把音量调低，望向室内，过了一会儿又笑。
- “现在也不算迟。只是听歌的人多了一个。”
- “别露出那种要道歉的表情。我没有要你负责。”

选项：

- warm「谢谢你的歌。我不会把你的心意拿来开玩笑。」→ r-jin-terrace；变量 {"taeRespect":true,"taeFriend":2}；条件 无
- space「给他一点安静，回到硕珍身边。」→ r-jin-terrace；变量 {"taeSpace":true}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-jin-terrace

幕 5；故事线 A；角色 jin；界面 scene · 凌晨 · 有风的露台；关键选择

前置：r-tae-terrace:warm、r-tae-terrace:space；额外条件：无

- 他把外套搭在你肩上，声音很低。
- “我看见了。他们有他们的心情，我不会替他们说。”
- “我也会吃醋。只是不会拿这个让你删朋友。”
- “回去的时候，能不能坐我旁边？”

选项：

- close「现在就坐到他旁边：一直给你留着。」→ r-shift；变量 {"sweet":2,"trust":2}；条件 无
- talk「靠近他：你有不舒服也可以告诉我。」→ r-shift；变量 {"communicate":true,"trust":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-alone

幕 5；故事线 A；角色 jin；界面 scene · 周日 · 两个人的一顿饭；关键选择

前置：r-party-invite:no；额外条件：无

- “今天不想见别人，那就不见。”
- 他把电视声音调低，给你让出沙发的一半。
- “我倒是挺高兴。不是不喜欢他们，是今天想多占你一会儿。”

选项：

- stay「靠在他身边，把今晚留给彼此。」→ r-shift；变量 {"sweet":2}；条件 无
- joke「那哥哥今晚负责陪我，禁止偷偷加班。」→ r-shift；变量 {"humor":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-shift

幕 6；故事线 E；角色 jin；界面 kkt；关键选择

前置：r-jin-terrace:close、r-jin-terrace:talk、r-alone:stay、r-alone:joke；额外条件：无

- 临时加了录制，开幕那天我可能赶不上。
- 我还在确认收工时间，不想先答应再让你在门口等。
- 花已经订了，但我知道花不能替人到场。你可以失望，直接跟我说。

选项：

- honest「我会失望，但不会取消自己的开幕。结束后再见。」→ r-exhibit；变量 {"careerPriority":true,"trust":2}；条件 无
- plan「给我一个确认时间。赶不上就约第二天庆祝。」→ r-deadline；变量 {"communicate":true}；条件 无
- quiet「我先把工作做好，今晚想自己待一会儿。」→ r-breathe；变量 {"independent":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-deadline

幕 6；故事线 B；角色 jin；界面 kkt；可汇合/继续点

前置：r-shift:plan；额外条件：无

- 好，下午四点前给你准话。
- 四点：赶不上开场。我不让你再空等。
- 明天晚上我请你吃饭，今晚你先做主角。结束想聊，我会接。

选项：

- ok「收到。我去准备开幕了。」→ r-exhibit；变量 {"trust":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-breathe

幕 6；故事线 E；角色 jin；界面 kkt；可汇合/继续点

前置：r-shift:quiet；额外条件：无

- 好，我先不追着问。
- 明天中午我再发消息。今晚不是冷战，我记得。
- 你先把自己的事做好。花的卡片不写我的名字，免得抢了你的场。

选项：

- go「把手机收好，去展场。」→ r-exhibit；变量 {"personalLife":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-exhibit

幕 6；故事线 E；角色 friend；界面 scene · 开幕前 · 你的展场；关键选择

前置：r-shift:honest、r-deadline:ok、r-breathe:go；额外条件：无

- “站过来，我给你看最后一面墙。”
- 书妍把你的名字贴正，拍了拍自己的手。
- “今天是我们把这件事做成了。晚上你想庆祝、想发呆，都行。”

选项：

- speech「在自己的作品前，认真完成介绍。」→ r-exhibit-end；变量 {"careerWin":true,"personalLife":3}；条件 无
- friend「先帮书妍处理开幕失误，再一起面对观众。」→ r-exhibit-end；变量 {"friendship":3,"helpedFriend":true}；条件 无

跨 App 与通知：r-exhibition · instagram · 书妍 · 开幕了：不是谁的附属身份。谢谢每一个认真完成自己工作的人。

## r-exhibit-end

幕 6；故事线 A；角色 jin；界面 kkt；关键选择

前置：r-exhibit:speech、r-exhibit:friend；额外条件：无

- 你发的展场照片我看了。名字那一栏，很好看。
- 今天想听你讲，不急着讲我的录制。
- 等会有人给你送饭，不进你住处。是你上次选的那家。可以吗？

选项：

- yes「可以。我慢慢讲给你听。」→ r-unknown；变量 {"trust":2}；条件 无
- tomorrow「今天和朋友庆祝，明天再把整晚留给你。」→ r-unknown；变量 {"independent":1,"friendship":1}；条件 无；即时回应：好。替我向大家说恭喜，别提送饭的人是谁。 / 明天见。今晚好好庆祝。

跨 App 与通知：KakaoTalk 消息通知

## r-unknown

幕 6；故事线 B；角色 jin；界面 kkt；可汇合/继续点

前置：r-exhibit-end:yes、r-exhibit-end:tomorrow；额外条件：无

- 刚忙完。准备给你发消息，看到工作人员转来的截图。
- 有人在打听你。不要猜是谁，我先确认范围。
- 如果收到陌生号码，先不要告诉对方自己在哪。

选项：

- check「查看刚刚响起的陌生来电」→ r-call；变量 {"unknownCallSeen":true}；条件 无

跨 App 与通知：r-unknown-sms · sms · 陌生号码：你认识金硕珍吧？有几张照片想和你确认。；r-unknown-call · call · 未知号码来电：游戏内模拟来电；不会访问通讯录，也不会真实拨号。

## r-call

幕 6；故事线 B；角色 unknown；界面 call；关键选择

前置：r-unknown:check；额外条件：无

- 屏幕上只有一串陌生号码。
- 来电连续响了几次；你可以拒接，也可以接通后只听对方说明来意。
- 这是一通虚构来电，不是现实号码。

选项：

- reject「拒接并保存来电记录」→ r-reject；变量 {"rejectedCall":true,"secrecy":1}；条件 无
- answer「接听：请先说明身份，我不会提供私人信息」→ r-caller；变量 {"answeredCall":true}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-reject

幕 6；故事线 B；角色 jin；界面 kkt；可汇合/继续点

前置：r-call:reject；额外条件：无

- 拒接就好，截图留着。
- 对方没有权利拿一句“有照片”换你解释。
- 我联系了工作人员核实。如果还有来电，不用一个人接。

选项：

- save「把记录转交给可信任的工作人员。」→ r-report；变量 {"evidenceSaved":true,"trust":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-caller

幕 6；故事线 B；角色 unknown；界面 call；关键选择

前置：r-call:answer；额外条件：无

- “我们是游戏内娱乐账号 D-Report，收到一组离店照片，想请你确认身份。”
- 对方说出了咖啡馆的名字，却没有说出你们预约的具体日期。
- “如果不回应，我们会按现有材料写。”

选项：

- decline「不确认身份，请通过正式渠道联系。挂断。」→ r-call-after；变量 {"noIdentity":true}；条件 无
- ask「要求发来来源和完整日期，不提供个人信息。挂断。」→ r-call-after；变量 {"requestedSource":true}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-call-after

幕 6；故事线 A；角色 jin；界面 kkt；可汇合/继续点

前置：r-caller:decline、r-caller:ask；额外条件：无

- 你不用因为接了电话就怪自己。
- 把对方原话告诉我就好，不补他们没说的。
- 我让人核实那个账号。今晚我会在，先喝口水。

选项：

- facts「只转述原话，保存来电时间。」→ r-report；变量 {"evidenceSaved":true,"trust":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-report

幕 7；故事线 C；角色 jin；界面 kkt；可汇合/继续点

前置：r-reject:save、r-call-after:facts；额外条件：无

- 核实过了。是个游戏内小号，不是真实媒体，也没有拿到你的地址。
- 它发了预告。照片是我从咖啡馆单独离开，配上另一日的路人背影。
- 我们要处理的是拼接，不是让你站出来证明清白。先看原帖。

选项：

- read「打开 X 的曝光预告」→ r-report-read；变量 {"reportRead":true}；条件 无

跨 App 与通知：r-d-report · x · D-Report · 虚构娱乐账号：【游戏内剧情】今晚公开：某位艺人的咖啡馆约会？离店照与一张未核实背影图。两张照片日期尚未确认。

## r-report-read

幕 7；故事线 B；角色 jin；界面 scene · 回到熟悉的房间；关键选择

前置：r-report:read；额外条件：无

- “我来了。不是来替你安排人生。”
- “工作人员在核对原图，不会发你的名字。需要你配合什么，会先问。”
- 他把温水放在你面前。
- “现在想我陪着，还是先一起把应对方式定下来？”

选项：

- together「陪我。然后我们一起决定回应范围。」→ r-strategy；变量 {"trust":3}；条件 无
- space「先给我十分钟，我整理完情绪再谈。」→ r-pause；变量 {"independent":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-pause

幕 7；故事线 A；角色 jin；界面 scene · 回到熟悉的房间；可汇合/继续点

前置：r-report-read:space；额外条件：无

- “好，我就在隔壁，不进来催。”
- 十分钟后，门外只有很轻的一声敲门。
- “水还热吗？想聊了叫我。没想好也没关系。”

选项：

- ready「开门，请他坐到身边。」→ r-strategy；变量 {"trust":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-strategy

幕 7；故事线 B；角色 jin；界面 scene · 回到熟悉的房间；关键选择

前置：r-report-read:together、r-pause:ready；额外条件：无

- “目前两条路都能走。”
- “工作人员只更正照片日期，私人关系不回应。或者我们允许少数可信朋友知道，好安排之后见面。”
- “公开恋情不是今天必须交的答卷。也不能拿保护你当理由，让你从此不出门。”

选项：

- private「只澄清拼接，继续保密；把见面安排得更稳妥。」→ r-private-plan；变量 {"privateRoute":true,"secrecy":3}；条件 无
- trusted「让可信朋友知道，一起维持边界；公众只回应照片。」→ r-trusted-plan；变量 {"trustedRoute":true,"shareTrusted":true,"trust":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-private-plan

幕 7；故事线 B；角色 jin；界面 scene · 回到熟悉的房间；可汇合/继续点

前置：r-strategy:private；额外条件：无

- “好。以后不让你在路边等车，预约、接送分开确认。”
- “公开账号不发能追溯你行程的东西。你的工作和朋友照常。”
- “有一点我想改：我不再只等有空才见你。我提前留时间。”

选项：

- agree「同意。也由我来选一些安全、喜欢的地方。」→ r-friends-check；变量 {"active":1,"regularDate":true}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-trusted-plan

幕 7；故事线 B；角色 jin；界面 scene · 回到熟悉的房间；可汇合/继续点

前置：r-strategy:trusted；额外条件：无

- “那先告诉书妍，还有你愿意信任的人，不自动扩大范围。”
- “泰亨和柾国那边，我自己说，不让你夹在中间。”
- “他们的心情我会尊重。我们的关系，我也不会含糊。”

选项：

- agree「一起说清楚，不把谁当挡箭牌。」→ r-friends-check；变量 {"trustedCircle":true}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-friends-check

幕 7；故事线 D；角色 friend；界面 kkt；关键选择

前置：r-private-plan:agree、r-trusted-plan:agree；额外条件：无

- 原图日期核对完了。那张背影不是你，地点也不同。
- 我不会公开你给过我的私人信息。能发的只有对方已经发布的照片时间。
- 还有，展览有人约下次合作。你想继续，我们明天谈正式条件。

选项：

- work「谢谢。风波处理完，我继续谈自己的项目。」→ r-resolution；变量 {"careerNext":true,"personalLife":2}；条件 无
- rest「先休息两天。机会让对方留个截止日期。」→ r-resolution；变量 {"restPlan":true,"personalLife":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-resolution

幕 7；故事线 C；角色 jin；界面 kkt；可汇合/继续点

前置：r-friends-check:work、r-friends-check:rest；额外条件：无

- 更正发出去了，错误的拼图撤了。
- 不会一夜之间所有人都友好，但原来那条猜测不再能当证据。
- 我们不去追每条评论。今晚先把饭吃了，好不好？

选项：

- yes「好。关掉屏幕，和他一起吃晚饭。」→ r-reunion；变量 {"trust":2}；条件 无

跨 App 与通知：r-correction · x · 原图核对 · 更正：【游戏内剧情】两张照片来自不同日期；背影人物与此次猜测无关。原拼图已撤下。请停止传播普通人的身份与地点。；r-resolution-dm · igdm · 朋友的私信：看到更正了。你不用现在回复，好好休息。

## r-reunion

幕 8；故事线 A；角色 jin；界面 scene · 周日 · 两个人的一顿饭；关键选择

前置：r-resolution:yes；额外条件：无

- “今天我也紧张。”
- “怕自己做得不够，又怕做太多，让你觉得被安排。”
- 他把筷子递给你，笑意有点累，却没有躲开你的目光。
- “但有一件事没犹豫：我想跟你好好在一起。风波过了也是。”

选项：

- hug「靠近他：那今天先抱一下。」→ r-aftercare；变量 {"sweet":3}；条件 无
- words「告诉他：你也不用永远装得很稳。我在。」→ r-aftercare；变量 {"trust":3}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-aftercare

幕 8；故事线 F；角色 jin；界面 scene · 周日 · 两个人的一顿饭；关键选择

前置：r-reunion:hug、r-reunion:words；额外条件：无

- 他把手伸过来，等你靠近才收紧。
- “再抱一会。今天这个要求不过分吧。”
- 手机又亮了一下，他看了眼名字，没有立刻拿起来。
- “明天会回他们。现在先陪你。”

选项：

- tomorrow「和他约定下一个普通的周末。」→ r-sea-invite；变量 {"regularDate":true}；条件 无
- sugar「提醒他：下次还喝无糖，我记着。」→ r-sea-invite；变量 {"sweet":1}；条件 无；即时回应：“你连这个都记得。” / “那我得多认真一点，不能输给一杯咖啡。”

跨 App 与通知：KakaoTalk 消息通知

## r-tae-close

幕 8；故事线 D；角色 v；界面 kkt；关键选择

前置：r-sea-photo:keep、r-sea-photo:later、r-sea-home:stay；额外条件：无

- 拍摄成片出了，我答应给你看。
- 上次有些话没说完，其实也不用都说完。
- 现在我有自己的新工作，也想把朋友这件事好好做下去。下次展览见。

选项：

- support「我会认真看。下次也听你讲自己的事。」→ r-jk-close；变量 {"taeFriend":2}；条件 无
- respect「谢谢你。我们都按舒服的速度往前走。」→ r-jk-close；变量 {"taeRespect":true}；条件 无

跨 App 与通知：r-tae-next · instagram · thv · 新的拍摄：把今天拍好。还有很多地方想去。

## r-jk-close

幕 8；故事线 D；角色 jk；界面 kkt；关键选择

前置：r-tae-close:support、r-tae-close:respect；额外条件：无

- 上次那道菜我试成功了，终于不是照着菜谱紧张。
- 有些事也是，慢慢就能找到自己的位置。
- 下次大家来，我负责做饭。你们带甜点，不许空手。

选项：

- yes「成交。你也继续做自己喜欢的事。」→ r-finale；变量 {"jkFriend":2}；条件 无
- joke「那我要先看到不会糊锅的证明。」→ r-finale；变量 {"humor":1,"jkFriend":1}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-finale

幕 8；故事线 A；角色 jin；界面 scene · 雨巷 · 预约咖啡馆；可汇合/继续点 · 结局

前置：r-jk-close:yes、r-jk-close:joke；额外条件：无

- “周日我留好了。不是临时空出来的，是提前给我们的。”
- 他把另一只杯子推到你面前，没有镜头，没有谁要求你解释身份。
- “下次去哪，你选。”
- “我跟你去。”

选项：



跨 App 与通知：r-future · calendar · 下一个周日 · 两个人的时间：关系已经稳定。主线完成后，可继续进入已写好的情侣日常。

## r-sea-invite

幕 8；故事线 F；角色 jin；界面 kkt；关键选择

前置：r-aftercare:tomorrow、r-aftercare:sugar；额外条件：无

- 周日能不能借你一整天？不是临时加出来的，我提前留好了。
- 想带你去看海。行程不公开，住处和车都确认过，不用你去路边找我。
- 当然，你想睡到自然醒，我们也能把海改到下次。

选项：

- go「我想去。我们一起看海。」→ r-sea-arrive；变量 {"seaDate":true}；条件 无
- home「这周想在家，海留给下一个假期。」→ r-sea-home；变量 {"homeChoice":true,"independent":1}；条件 无

跨 App 与通知：r-sea-calendar · calendar · 一次由你决定的休息日：可以去海边，也可以留在家；没有公开行程。

## r-sea-arrive

幕 8；故事线 A；角色 jin；界面 scene · 海风 · 错峰的海边约会；关键选择

前置：r-sea-invite:go；额外条件：无

- “到了。先别急着下车，我给你拿外套。”
- 他检查了小屋预约，把你带到背风的露台，才把帽檐抬起来。
- “今天没摄像机，也不是工作。终于能好好陪你。”

选项：

- walk「等人少一点，和他走到海边。」→ r-sea-walk；变量 {"trust":2}；条件 无
- stay「先在露台坐一会，拉他一起喝热饮。」→ r-sea-terrace；变量 {"sweet":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-sea-walk

幕 8；故事线 F；角色 jin；界面 scene · 海风 · 错峰的海边约会；关键选择

前置：r-sea-arrive:walk；额外条件：无

- 浪花刚碰到鞋边，他下意识拉了你一下，又自己笑了。
- “刚才那一下不是耍帅。鞋湿了，回去你又要嫌冷。”
- 他站到来风的那侧，手没有松。
- “下次还来吗？不是为了躲谁，是你想来的话。”

选项：

- yes「来。不过下一次换我安排。」→ r-sea-photo；变量 {"active":2}；条件 无
- sweet「只要你认真留时间，在哪里都可以。」→ r-sea-photo；变量 {"trust":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-sea-terrace

幕 8；故事线 F；角色 jin；界面 scene · 海风 · 错峰的海边约会；关键选择

前置：r-sea-arrive:stay；额外条件：无

- “你不想走，我们就坐着。”
- 他把热饮递过来，隔着杯子碰了碰你的指尖。
- “看海也不用完成打卡。想待到什么时候，都算约会。”

选项：

- photo「拍一张只留给彼此的照片。」→ r-sea-photo；变量 {"privatePhoto":true}；条件 无
- quiet「把手机收好，和他一起听风。」→ r-sea-photo；变量 {"sweet":2}；条件 无

跨 App 与通知：KakaoTalk 消息通知

## r-sea-photo

幕 8；故事线 A；角色 jin；界面 scene · 海风 · 错峰的海边约会；关键选择

前置：r-sea-walk:yes、r-sea-walk:sweet、r-sea-terrace:photo、r-sea-terrace:quiet；额外条件：无

- “这张发给你。别急着发出去，先给我留一点私心。”
- “不是让你藏起开心。是今天的行程还没结束，晚一点再决定发什么。”
- 他看了看海，又看向你。
- “其实我更想留下的，是刚才你拉我那一下。”

选项：

- keep「留在我们之间。回去再给朋友报平安。」→ r-tae-close；变量 {"secrecy":1}；条件 无
- later「以后想分享时，我们先一起看过背景。」→ r-tae-close；变量 {"communicate":true}；条件 无

跨 App 与通知：r-sea-private · photo · 只发给你的海边照片：这次休息日，留在你们的私人相册里。

## r-sea-home

幕 8；故事线 F；角色 jin；界面 scene · 周日 · 两个人的一顿饭；可汇合/继续点

前置：r-sea-invite:home；额外条件：无

- “好，那海先记在账上。”
- 他把买好的热饮放进冰箱，又看了眼你。
- “休息日不是一定要去多远。今天你愿意让我待在旁边，我也很高兴。”

选项：

- stay「把今天留给两个人普通的生活。」→ r-tae-close；变量 {"sweet":2}；条件 无

跨 App 与通知：r-home-private · photo · 今天的普通日常：没有赶行程的一天。

## 结局后日常

### breakfast · 早饭考勤（并没有）

早。今天没拍照，早饭已经吃完了。

你看，我也不是每次都要你提醒。

- 夸你。今天奖励哥哥一颗星。 → 一颗是不是少了点。 → 行，攒着。下次见你要兑换。
- 我也吃了，今天各自忙，晚点聊。 → 好。忙完给你看今天拍的照片。 → 不用抢着回，晚上我再来找你。

### rain · 下雨的晚上

看天气要下雨。带伞了吗？

我不是刚好看见预报，是想给你发消息，找了个理由。

- 理由合格。想我可以直接说。 → 想你。 → 直接说完反而有点不好意思，你负责。
- 带了。哥哥也别淋雨。 → 嗯，听你的。 → 下次一起躲雨，别各站一边。

### work · 忙完第一条

收工了。

今天最后一条工作消息发完，第一条私人消息给你。

- 辛苦了。现在去吃点热的。 → 正准备去。 → 给你留一份不现实，但下次真请你吃。
- 现在可以霸占你十分钟吗？ → 可以，今天额度不限十分钟。 → 说吧，哥哥听着。

### tae-song · 朋友的一首歌

今天听到一首歌，想起上次大家在露台。

这次不是藏着话。只是觉得你会喜欢。

- 收到。也讲讲你最近在忙什么吧。 → 在改拍摄方案，有个想试的颜色。 → 等确定了给你看，不只拿感情的事烦你。
- 下次聚餐放吧，我带甜点。 → 好，我这次会选得快一点。 → 你们别又把点歌变成抢答。

### jk-recipe · 菜谱更新

报告，那道菜没糊。照片为证。

哥刚说下次让我少做点，他想留肚子吃你买的甜点。

- 你俩怎么连胃口都要开会。 → 因为有人每次说不饿，吃得最多。 → 我没说是谁。
- 下次我一起做，别又一个人忙。 → 好，给你留个工位。 → 这次不用拿洗碗当借口聊天了，朋友就正常聊。

### miss · 不太直白的想念

你上次留下的杯子我洗好了。

不是催你来拿。你不拿也挺好。

- 哥哥，是想我来，还是想杯子留下？ → 都想。 → 杯子可以一直放着，你要常来。
- 那周末我来看杯子，顺便看你。 → 顺便？ → 行，我争取比杯子表现好一点。

### friend-show · 下一次自己的事

下一次合作的预算谈好了。

你要参与就走正式合同，不靠人情把你绑上。

- 发我看看，我先评估时间。 → 这就发。 → 你有自己的安排，我会等你明确答复。
- 这次先不接，给我留张开幕邀请。 → 当然。你不工作也还是我朋友。 → 到时候好好吃饭，不许临时抓你干活。

### quiet-date · 不需要大场面的约会

今晚没安排惊喜。

想跟你好好吃顿饭，不拍照也没关系。

- 我来选菜，你来讲今天最想吐槽的事。 → 成交。 → 先说好，听完不准把我的笑点举报给成员。
- 我想去咖啡馆坐一会。 → 预约我来确认。 → 这次进门就能认出你，不用再假装研究菜单。

### gift · 小礼物

买了个东西给你，不贵。

看见的时候觉得你用得上。讲得太正式会不会像广告？

- 你亲手给我的时候再介绍。 → 好。 → 那广告词我先删掉，留着见面说。
- 只要不是让我按时喝水的奖状。 → ……那我换张卡片。 → 骗你的。是你说过缺的那种小东西。

### sleep · 睡前两分钟

睡了吗？没睡也不用撑着。

今天只想说句晚安，不开会。

- 晚安，男朋友。明天再见。 → 晚安。 → 明天我先来找你。
- 再陪我两分钟。 → 嗯。手机放稳，别砸脸。 → 我在，不急着挂。

### birthday · 提前记住的日子

你说过的那个重要日子，我记在日历里了。

今天先问你想怎么过，免得我自作主张。

- 两个人安静吃饭就好。 → 好，不安排别人突然出现。 → 你喜欢的那家，我提前订。
- 先和朋友庆祝，之后留时间给你。 → 没问题。 → 我等你庆祝完，别赶场赶得累。

### ordinary · 普通的一天

今天没大事。

但普通的一天也想跟你说两句，不用等出事才找你。

- 那从午饭开始讲吧。 → 午饭还不错。 → 但我比较期待下次坐你对面吃。
- 我也有个很小的事想分享。 → 讲。 → 哥哥今天有空听小事。

### old-photo · 翻到以前的照片

收拾相册翻到一张以前的照片。

不要说我有多想给你看，手机自己选中的。……好吧，是我挑的。

- 哥哥挑得不错，下次继续。 → 那我以后还发。 → 你可别嫌我话多。
- 收到。旧照片也可以有新的回忆。 → 嗯。 → 那这一张以后会让我想起你今天的回复。

### screenshot · 一张留着的截图

以前存的一张截图，刚好翻到了。

不是新拍的。想把以前的小事也慢慢讲给你。

- 我想听，慢慢讲。 → 好。 → 这次不赶工作，也不赶着把话说完。
- 先收下，下次见面讲给我。 → 可以。 → 我把这件事留到下次约会。