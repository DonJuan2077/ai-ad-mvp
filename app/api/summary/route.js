import ads from "../../../ads.json";

export async function POST(req) {
  try {
    const { question } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct", // 免费模型
        messages: [{ role: "user", content: question }],
      }),
    });

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error(data.error?.message || "OpenRouter 没返回结果");
    }

    const answer = data.choices[0].message.content;

    // 从广告池随机选一条
    const ad = ads[Math.floor(Math.random() * ads.length)];

    return new Response(JSON.stringify({ answer: answer + "\n\n" + ad }), { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}






