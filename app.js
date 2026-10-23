const $ = (selector) => document.querySelector(selector);
let inputCode = "";

// ================= 1. 时钟与时间 =================
function updateClock() {
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    $("#status-time").textContent = timeStr;
    $("#lock-time").textContent = timeStr;
    const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
    $("#lock-date").textContent = `${now.getMonth() + 1}月${now.getDate()}日 星期${weekdays[now.getDay()]}`;
}
setInterval(updateClock, 1000);
updateClock();

// ================= 2. 锁屏与密码 =================
const keypad = $("#keypad");
[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].forEach(k => {
    const btn = document.createElement("button");
    btn.textContent = k;
    if (k === "") btn.className = "empty";
    btn.onclick = () => handleKeyPress(k);
    keypad.appendChild(btn);
});

function handleKeyPress(k) {
    if (k === "⌫") inputCode = inputCode.slice(0, -1);
    else if (k !== "" && inputCode.length < 4) inputCode += k;
    
    $("#dots").innerHTML = Array.from({ length: 4 }, (_, i) => 
        `<span class="dot ${i < inputCode.length ? "filled" : ""}"></span>`
    ).join("");

    if (inputCode.length === 4) {
        if (inputCode === PHONE_DATA.passcode) {
            $("#lock-screen").classList.remove("active");
            $("#home-screen").classList.add("active");
            renderHomeScreen();
            // 解锁后延迟弹出横幅通知
            setTimeout(showBannerNotification, 2000); 
        } else {
            $("#lock-screen").classList.add("shake");
            setTimeout(() => {
                $("#lock-screen").classList.remove("shake");
                inputCode = ""; 
                $("#dots").innerHTML = ""; 
            }, 400);
        }
    }
}

// 渲染锁屏通知
function renderLockNotifications() {
    const container = $("#lock-notifications");
    container.innerHTML = PHONE_DATA.notifications.map(n => `
        <div class="lock-notification">
            <div class="notif-icon" style="background:${n.bg}">${n.icon}</div>
            <div class="notif-content">
                <div class="notif-header"><span class="notif-app">${n.app}</span><span class="notif-time">${n.time}</span></div>
                <div class="notif-title">${n.title}</div>
                <div class="notif-msg">${n.message}</div>
            </div>
        </div>
    `).join("");
}
renderLockNotifications();

// ================= 3. 主屏幕渲染 =================
function renderHomeScreen() {
    renderPage("page-1", PHONE_DATA.appsPage1);
    renderPage("page-2", PHONE_DATA.appsPage2);
    
    const dock = $("#dock");
    dock.innerHTML = "";
    PHONE_DATA.dock.forEach(app => dock.appendChild(createIcon(app)));
}

function renderPage(pageId, apps) {
    const container = $(`#${pageId}`);
    container.innerHTML = "";
    apps.forEach(app => container.appendChild(createIcon(app)));
}

function createIcon(app) {
    const btn = document.createElement("button");
    btn.className = "app-icon";
    btn.innerHTML = `
        <div class="icon-wrapper">
            <div class="icon-bg" style="background: ${app.bg}">${app.icon}</div>
            ${app.unread ? `<div class="badge">${app.unread}</div>` : ""}
        </div>
        <span class="app-name">${app.name}</span>
    `;
    btn.onclick = () => openApp(app.id);
    return btn;
}

// 底部小白条返回
$("#home-indicator").onclick = () => {
    $("#app-view").classList.remove("active");
    $("#app-view").innerHTML = "";
};

// ================= 4. 通知横幅 (Banner) =================
function showBannerNotification() {
    const banner = $("#banner-notification");
    const n = PHONE_DATA.notifications[0]; // 模拟最新一条
    banner.innerHTML = `
        <div class="notif-icon" style="background:${n.bg}">${n.icon}</div>
        <div class="notif-content">
            <div class="notif-header"><span class="notif-app">${n.app}</span><span class="notif-time">现在</span></div>
            <div class="notif-title">${n.title}</div>
            <div class="notif-msg">${n.message}</div>
        </div>
    `;
    banner.classList.add("show");
    
    // 3秒后自动隐藏
    setTimeout(() => {
        banner.classList.remove("show");
    }, 3000);
}

// ================= 5. App 路由与相机 =================
function openApp(id) {
    const view = $("#app-view");
    view.classList.add("active");
    view.innerHTML = "";

    // 相机需要全屏，没有 Header
    if (id === "camera") {
        view.innerHTML = `<video id="camera-video" autoplay muted loop playsinline></video>`;
        return;
    }

    // 其他 App 有 Header
    const header = document.createElement("div");
    header.className = "app-header";
    header.innerHTML = `
        <button class="back-btn">‹ 返回</button>
        <span class="app-title">${id === 'kkt' ? 'KakaoTalk' : id}</span>
        <span style="width: 60px;"></span>
    `;
    header.querySelector(".back-btn").onclick = () => {
        $("#app-view").classList.remove("active");
        $("#app-view").innerHTML = "";
    };
    view.appendChild(header);

    const body = document.createElement("div");
    body.className = "app-body";
    view.appendChild(body);

    if (id === "kkt") renderKKT(body);
    if (id === "photos") body.innerHTML = `<p style="color:#888; text-align:center; margin-top:50px;">相册待导入</p>`;
    // ... 其他 App 简单占位
}

function renderKKT(container) {
    // 这里暂时先显示列表，我们下一阶段重点搞聊天界面
    container.innerHTML = `
        <div class="kkt-list">
            ${PHONE_DATA.kkt.rooms.map(room => `
                <div class="kkt-room">
                    <div class="avatar">${room.avatar}</div>
                    <div class="room-info">
                        <div class="room-name">${room.name}</div>
                        <div class="room-preview">${room.messages[room.messages.length-1].text}</div>
                    </div>
                    ${room.unread ? `<div class="kkt-unread">${room.unread}</div>` : ""}
                </div>
            `).join("")}
        </div>
    `;
}