"use client";
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function handleAsk() {
    setAnswer("正在生成中...");
    const res = await fetch("/api/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(data.answer);
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>AI 总结 + 赞助实验 MVP</h1>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="请输入你的问题"
        style={{ padding: 8, width: "60%", marginRight: 8 }}
      />
      <button onClick={handleAsk} style={{ padding: 8 }}>
        提问
      </button>

      <div style={{ marginTop: 24, whiteSpace: "pre-wrap" }}>
        {answer}
      </div>
    </main>
  );
}


