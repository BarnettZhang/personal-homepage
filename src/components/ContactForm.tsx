"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate form submission (replace with actual Web3Forms/Formspree endpoint)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {status === "sent" ? (
        <div className="glass p-8 text-center">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-semibold text-white mb-2">消息已发送！</h3>
          <p className="text-gray-400">感谢你的留言，我会尽快回复。</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              你的名字
            </label>
            <input
              id="name"
              type="text"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all"
              placeholder="张三"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              邮箱地址
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all"
              placeholder="hello@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              想说的话
            </label>
            <textarea
              id="message"
              rows={4}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all resize-none"
              placeholder="你好！我想聊聊..."
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "发送中..." : "发送消息"}
          </button>
        </form>
      )}
    </div>
  );
}
