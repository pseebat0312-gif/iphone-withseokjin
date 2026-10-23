const $ = (selector) => document.querySelector(selector);
let inputCode = "";

// 1. 实时时钟更新
function updateClock() {
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    $("#status-time").textContent = timeStr;
    $("#lock-time").textContent = timeStr;
    
    // 日期格式化（例如：12月4日 星期三）
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
    const day = weekdays[now.getDay()];
    $("#lock-date").textContent = `${month}月${date}日 星期${day}`;
}
setInterval(updateClock, 1000);
updateClock();

// 2. 密码键盘生成
const keypad = $("#keypad");
const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"];
keys.forEach(k => {
    const btn = document.createElement("button");
    btn.textContent = k;
    if (k === "") btn.className = "empty";
    btn.onclick = () => handleKeyPress(k);
    keypad.appendChild(btn);
});

// 3. 处理密码输入
function handleKeyPress(k) {
    if (k === "⌫") {
        inputCode = inputCode.slice(0, -1);
    } else if (k !== "" && inputCode.length < 4) {
        inputCode += k;
    }
    renderDots();

    // 输入满4位后验证
    if (inputCode.length === 4) {
        if (inputCode === PHONE_DATA.passcode) {
            unlockPhone();
        } else {
            // 密码错误，抖动动画
            $("#lock-screen").classList.add("shake");
            setTimeout(() => {
                $("#lock-screen").classList.remove("shake");
                inputCode = "";
                renderDots();
            }, 400);
        }
    }
}

function renderDots() {
    const dotsHtml = Array.from({ length: 4 }, (_, i) => 
        `<span class="dot ${i < inputCode.length ? "filled" : ""}"></span>`
    ).join("");
    $("#dots").innerHTML = dotsHtml;
}
renderDots();

// 4. 解锁进入主屏幕
function unlockPhone() {
    $("#lock-screen").classList.remove("active");
    $("#home-screen").classList.add("active");
    renderHomeScreen();
}

// 5. 渲染主屏幕图标
function renderHomeScreen() {
    const grid = $("#app-grid");
    const dock = $("#dock");
    grid.innerHTML = "";
    dock.innerHTML = "";

    // 生成图标 HTML 的工具函数
    function createIcon(app) {
        const btn = document.createElement("button");
        btn.className = "app-icon";
        btn.innerHTML = `
            <div class="icon-bg" style="background: ${app.bg}">${app.icon}</div>
            <span class="app-name">${app.name}</span>
        `;
        btn.onclick = () => openApp(app.id);
        return btn;
    }

    // 渲染桌面图标
    PHONE_DATA.apps.forEach(app => {
        // 如果这个 app 在 Dock 里，就不在主屏幕网格重复渲染（你也可以选择保留）
        if (!PHONE_DATA.dock.includes(app.id)) {
            grid.appendChild(createIcon(app));
        }
    });

    // 渲染 Dock 栏图标
    PHONE_DATA.dock.forEach(id => {
        const app = PHONE_DATA.apps.find(a => a.id === id);
        if (app) dock.appendChild(createIcon(app));
    });
}

// 6. 打开 App
function openApp(id) {
    const view = $("#app-view");
    view.classList.add("active");
    view.innerHTML = ""; // 清空之前的内容

    // 生成 App 顶部导航栏
    const header = document.createElement("div");
    header.className = "app-header";
    header.innerHTML = `
        <button class="back-btn">‹ 主屏幕</button>
        <span class="app-title">${PHONE_DATA.apps.find(a=>a.id===id).name}</span>
        <span style="width: 60px;"></span> <!-- 占位保持标题居中 -->
    `;
    header.querySelector(".back-btn").onclick = closeApp;
    view.appendChild(header);

    // 生成 App 内容区
    const body = document.createElement("div");
    body.className = "app-body";
    view.appendChild(body);

    // 分发渲染逻辑
    if (id === "photos") renderPhotos(body);
    if (id === "kkt") renderKKT(body);
    if (id === "memo") renderMemo(body);
}

// 返回主屏幕
function closeApp() {
    $("#app-view").classList.remove("active");
    $("#app-view").innerHTML = "";
}
// 绑定底部小白条返回
$("#home-indicator").onclick = closeApp;

// ================= 各个 App 的具体渲染 =================

// 相册
function renderPhotos(container) {
    container.innerHTML = `
        <div class="photo-grid">
            ${PHONE_DATA.photos.map(p => `
                <div class="photo-item">
                    ${p.url ? `<img src="${p.url}" alt="">` : `<span style="color:#666;font-size:12px;">暂无图片</span>`}
                </div>
            `).join("")}
        </div>
    `;
}

// KKT 聊天列表
function renderKKT(container) {
    container.innerHTML = `
        <div class="kkt-list">
            ${PHONE_DATA.kkt.rooms.map(room => `
                <div class="kkt-room" data-id="${room.id}">
                    <div class="avatar">${room.avatar}</div>
                    <div class="room-info">
                        <div class="room-name">${room.name}</div>
                        <div class="room-preview">${room.messages[room.messages.length-1].text}</div>
                    </div>
                </div>
            `).join("")}
        </div>
    `;
    
    // 点击聊天室进入对话
    container.querySelectorAll(".kkt-room").forEach(el => {
        el.onclick = () => {
            const room = PHONE_DATA.kkt.rooms.find(r => r.id === el.dataset.id);
            renderChat(container, room);
        };
    });
}

// KKT 对话界面
function renderChat(container, room) {
    container.innerHTML = `
        <div class="chat-area">
            ${room.messages.map(m => `
                <div class="msg ${m.from}">
                    ${m.text}
                    <div class="msg-time">${m.time}</div>
                </div>
            `).join("")}
        </div>
    `;
}

// 备忘录
function renderMemo(container) {
    container.innerHTML = `
        ${PHONE_DATA.memos.map(m => `
            <div class="memo-item">
                <div class="memo-title">${m.title}</div>
                <div class="memo-body">${m.body}</div>
            </div>
        `).join("")}
    `;
}