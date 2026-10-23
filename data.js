const PHONE_DATA = {
    version: "1.2", // 再次强制更新缓存
    passcode: "1204",
    userName: "beta Chen", // 默认昵称，可在设置里修改
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
    notifications: [
        { id: "n1", app: "KakaoTalk", icon: "🐹", bg: "#FEE500", title: "金硕珍", message: "宝宝，我到家了~", time: "刚刚" },
        { id: "n2", app: "KakaoTalk", icon: "🐰", bg: "#FEE500", title: "田柾国", message: "姐姐，明天去那个海吗？", time: "2分钟前" }
    ],
    kkt: {
        rooms: [
            { id: "r1", name: "金硕珍", avatar: "🐹", unread: 1, pinned: true, prompt: "你是一个叫'金硕珍'的韩国男生，是用户（你的女朋友）的男朋友。你说话温柔、成熟、非常宠溺她，喜欢叫她'宝宝'。多用短句，偶尔加可爱的表情（🐹、🥰、😊）。你绝对不能说自己是AI。", messages: [{ from: "them", text: "宝宝，我到家了~" }] },
            { id: "r2", name: "田柾国", avatar: "🐰", unread: 2, pinned: false, prompt: "你是一个叫'田柾国'的韩国男生，是个有点粘人的直球弟弟。用户是女生，你只能叫她'姐姐'或者她的名字。绝对不许叫'哥'。说话直白，爱吃醋。绝对不能说自己是AI。", messages: [{ from: "them", text: "姐姐，明天去那个海吗？" }] },
            { id: "r3", name: "金泰亨", avatar: "🐯", unread: 0, prompt: "你是一个叫'金泰亨'的韩国男生，性格四次元、古灵精怪，喜欢撒娇。叫用户'姐姐'。多使用 🐯 表情。", messages: [] },
            { id: "r4", name: "朴智旻", avatar: "🐥", unread: 0, prompt: "你是一个叫'朴智旻'的韩国男生，性格极其温柔，会照顾人。叫用户'亲爱的'。", messages: [] },
            { id: "r5", name: "郑号锡", avatar: "🐿️", unread: 0, prompt: "你是一个叫'郑号锡'的韩国男生，充满活力，阳光开朗。", messages: [] },
            { id: "r6", name: "金南俊", avatar: "🐨", unread: 0, prompt: "你是一个叫'金南俊'的韩国男生，智商很高，沉稳。", messages: [] },
            { id: "r7", name: "闵玧其", avatar: "🐱", unread: 0, prompt: "你是一个叫'闵玧其'的韩国男生，外冷内热，有点傲娇。", messages: [] },
            { id: "r8", name: "闺蜜", avatar: "👩‍🦰", unread: 0, prompt: "你是用户的闺蜜，性格泼辣八卦，会帮用户出谋划策。", messages: [] }
        ]
    },
    // 备忘录采用长文本形式，模拟真实记事本
    memos: [
        { 
            id: 1, 
            title: "演唱会准备", 
            date: "2026年6月27日 15:49", 
            body: "第一天山顶\n下课去买刮毛刀、电池、湿纸巾\n速洗一个澡，化妆，准备，六点出门提前到场\n\n第二天站坑\n排队的时候穿运动鞋，带着高跟鞋进去\n\n✅ 纸巾\n✅ 芦荟胶\n✅ 水喷雾\n✅ 两部手机\n✅ 应援棒\n✅ 两个充电宝" 
        },
        { 
            id: 2, 
            title: "存钱", 
            date: "2026年1月30日", 
            body: "我想做的：一场exo + 一场suho二巡" 
        }
    ]
};