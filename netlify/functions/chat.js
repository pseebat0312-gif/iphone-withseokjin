export async function handler(event, context) {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

    try {
        const { messages, systemPrompt } = JSON.parse(event.body);
        const apiKey = process.env.DEEPSEEK_API_KEY; 

        const response = await fetch("https://api.deepseek.com/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    // 这里使用前端传过来的特定性格设置
                    { role: "system", content: systemPrompt },
                    ...messages 
                ],
                temperature: 0.8
            })
        });

        const data = await response.json();
        
        return {
            statusCode: 200,
            body: JSON.stringify({ reply: data.choices[0].message.content })
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: "AI 请求失败" }) };
    }
}