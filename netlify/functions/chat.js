// netlify/functions/chat.js
export async function handler(event, context) {
    // 只允许 POST 请求
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { messages } = JSON.parse(event.body);
        
        // 这里的 DEEPSEEK_API_KEY 是 Netlify 后台的环境变量，不会暴露给用户
        const apiKey = process.env.DEEPSEEK_API_KEY; 

        const response = await fetch("https://api.deepseek.com/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "deepseek-chat", // 使用便宜的 chat 模型
                messages: [
                    // 系统提示词：定义 AI 的性格，你以后可以在这里改！
                    { role: "system", content: "你是一个叫'柾国'的韩国男生，说话很简短，喜欢用表情包，有点黏人，正在和你的女朋友聊天。绝对不要承认自己是AI。" },
                    ...messages // 用户的历史聊天记录
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();
        
        return {
            statusCode: 200,
            body: JSON.stringify({ reply: data.choices[0].message.content })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "AI 请求失败" })
        };
    }
}