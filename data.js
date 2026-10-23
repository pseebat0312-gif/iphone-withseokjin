const PHONE_DATA = {
    passcode: "1204", // 锁屏密码
    apps: [
        { id: "photos", name: "相册", icon: "🌄", bg: "#ffffff" },
        { id: "kkt", name: "KKT", icon: "💬", bg: "#FEE500" }, // 黄色图标占位
        { id: "memo", name: "备忘录", icon: "📝", bg: "#FFF8C5" },
    ],
    dock: ["photos", "kkt"], // 底部固定的 App
    photos: [
        // 以后你要加照片，就在这里加。现在留了占位
        { id: 1, url: "", caption: "照片占位 1" },
        { id: 2, url: "", caption: "照片占位 2" },
        { id: 3, url: "", caption: "照片占位 3" }
    ],
    kkt: {
        rooms: [
            {
                id: "r1",
                name: "他",
                avatar: "🐻",
                messages: [
                    { from: "them", text: "睡了吗？", time: "23:12" },
                    { from: "me", text: "还没", time: "23:13" },
                    { from: "them", text: "密码还是 1204 吧", time: "23:14" }
                ]
            }
        ]
    },
    memos: [
        { id: 1, title: "12月4日", body: "今天他说……" }
    ]
};