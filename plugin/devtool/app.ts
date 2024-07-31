import { defineToolbarApp } from "astro/toolbar";
const motivationalMessages = [
    "你做得很好！",
    "继续保持这种努力！",
    "你太棒了！",
    "你是明星！",
];

export default defineToolbarApp({
    init(canvas, app, server) {
        // ...
        const h1 = document.createElement('h1');
        h1.textContent = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
        canvas.append(h1);

        // 当应用切换时显示一个随机消息
      app.onToggled(({ state }) => {
        const newMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
          h1.textContent = newMessage;
      });
    },
});