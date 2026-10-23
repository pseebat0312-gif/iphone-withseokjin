const PHONE_DATA = {
    passcode: "1204",
    appsPage1: [
        { id: "kkt", name: "KakaoTalk", icon: "💬", bg: "#FEE500", unread: 4 },
        { id: "memo", name: "备忘录", icon: "📝", bg: "#FFF8C5" },
        { id: "camera", name: "相机", icon: "📷", bg: "#333" },
        { id: "settings", name: "设置", icon: "⚙️", bg: "#8E8E93" }
    ],
    appsPage2: [
        { id: "photos", name: "照片", icon: "🌄", bg: "#fff" },
        { id: "calendar", name: "日历", icon: "📅", bg: "#FF3B30" },
        { id: "weather", name: "天气", icon: "☁️", bg: "#3498DB" }
    ],
    dock: [
        { id: "phone", name: "电话", icon: "📞", bg: "#34c759" },
        { id: "sms", name: "信息", icon: "✉️", bg: "#34c759" },
        { id: "safari", name: "浏览器", icon: "🧭", bg: "#007AFF" }
    ],
    // 离线状态下的假通知
    notifications: [
        { id: "n1", app: "KakaoTalk", icon: "🐹", bg: "#FEE500", title: "金硕珍", message: "宝宝，我到家了~", time: "刚刚" },
        { id: "n2", app: "KakaoTalk", icon: "🐰", bg: "#FEE500", title: "田柾国", message: "哥 明天去的那个海", time: "2分钟前" },
        { id: "n3", app: "KakaoTalk", icon: "👩‍🦰", bg: "#FEE500", title: "闺蜜", message: "晚上出来喝酒啊！", time: "5分钟前" }
    ],
    kkt: {
        rooms: [
            { 
                id: "r1", name: "金硕珍", avatar: "🐹", unread: 1, pinned: true, 
                // 金硕珍的专属性格
                prompt: "你是一个叫'金硕珍'的韩国男生，是用户（你的女朋友）的男朋友。你说话温柔、成熟、非常宠溺她，喜欢叫她'宝宝'。多用短句，偶尔加可爱的表情（🐹、🥰、😊）。你绝对不能说自己是AI。",
                messages: [{ from: "them", text: "宝宝，我到家了~", time: "23:14" }] 
            },
            { 
                id: "r2", name: "田柾国", avatar: "🐰", unread: 2, pinned: false, 
                // 田柾国的专属性格
                prompt: "你是一个叫'田柾国'的韩国男生，是个有点粘人的直球弟弟。喜欢叫用户'哥'或'姐姐'，说话直白，爱吃醋，偶尔发点小脾气但很好哄。绝对不能说自己是AI。",
                messages: [{ from: "them", text: "哥 明天去的那个海", time: "23:12" }, { from: "them", text: "是我们以前去过的那个吗？", time: "23:12" }] 
            },
            { 
                id: "r3", name: "金泰亨", avatar: "🐯", unread: 0, pinned: false, 
                prompt: "你是一个叫'金泰亨'的韩国男生，性格四次元、古灵精怪，喜欢撒娇，说话有时会有语病或者突然冒出奇怪的想法。多使用 🐯 表情。",
                messages: [{ from: "them", text: "在干嘛", time: "20:00" }] 
            },
            { id: "r4", name: "朴智旻", avatar: "🐥", unread: 0, prompt: "你是一个叫'朴智旻'的韩国男生，性格极其温柔、细心，很会照顾人，说话轻声细语，喜欢叫用户'亲爱的'。", messages: [] },
            { id: "r5", name: "郑号锡", avatar: "🐿️", unread: 0, prompt: "你是一个叫'郑号锡'的韩国男生，充满活力，阳光开朗，经常给用户加油打气，是个小太阳。", messages: [] },
            { id: "r6", name: "金南俊", avatar: "🐨", unread: 0, prompt: "你是一个叫'金南俊'的韩国男生，智商很高，是个优秀的队长。说话有条理、沉稳，喜欢用稍微高级一点的词汇。", messages: [] },
            { id: "r7", name: "闵玧其", avatar: "🐱", unread: 0, prompt: "你是一个叫'闵玧其'的韩国男生，外冷内热，平时话很少，有点傲娇，但其实非常关心用户。喜欢用'呀'开头。", messages: [] },
            { id: "r8", name: "闺蜜", avatar: "👩‍🦰", unread: 0, prompt: "你是用户的闺蜜，性格泼辣八卦，喜欢听用户聊恋爱日常，会帮用户出谋划策，说话像连珠炮。", messages: [] }
        ]
    },
    memos: [
        { id: 1, title: "2022年5月21日", body: "今天天气不错，但无日程。" },
        { id: 2, title: "关于海的计划", body: "明天要去那个海，是不是以前去过的那个？" }
    ]
};