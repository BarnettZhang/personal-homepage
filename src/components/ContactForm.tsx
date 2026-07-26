"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div class="max-w-lg mx-auto">
      {status === "sent" ? (
        <div class="card p-10 text-center">
          <div class="w-16 h-16 rounded-2xl bg-sage-subtle flex items-center justify-center text-3xl mx-auto mb-5">
            ✨
          </div>
          <h3 class="text-xl font-serif font-semibold text-ink mb-2">消息已送达</h3>
          <p class="text-sm text-ink-light">感谢你的留言，我会尽快回复。</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} class="space-y-5">
          <div>
            <label htmlFor="name" class="block text-sm font-medium text-ink mb-2">
              你的名字
            </label>
            <input
              id="name"
              type="text"
              required
              class="w-full px-4 py-3 bg-white border border-border rounded-xl text-ink
                     placeholder:text-ink-muted/50 focus:outline-none focus:border-sage
                     focus:ring-2 focus:ring-sage-subtle transition-all text-sm"
              placeholder="张三"
            />
          </div>

          <div>
            <label htmlFor="email" class="block text-sm font-medium text-ink mb-2">
              邮箱地址
            </label>
            <input
              id="email"
              type="email"
              required
              class="w-full px-4 py-3 bg-white border border-border rounded-xl text-ink
                     placeholder:text-ink-muted/50 focus:outline-none focus:border-sage
                     focus:ring-2 focus:ring-sage-subtle transition-all text-sm"
              placeholder="hello@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" class="block text-sm font-medium text-ink mb-2">
              想说的话
            </label>
            <textarea
              id="message"
              rows={4}
              required
              class="w-full px-4 py-3 bg-white border border-border rounded-xl text-ink
                     placeholder:text-ink-muted/50 focus:outline-none focus:border-sage
                     focus:ring-2 focus:ring-sage-subtle transition-all text-sm resize-none"
              placeholder="你好！我想聊聊..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            class="btn-primary w-full !py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending" ? (
              <span class="flex items-center justify-center gap-2">
                <span class="w-4 h-4 border-2 border-cream/50 border-t-cream rounded-full animate-spin" />
                发送中...
              </span>
            ) : (
              "发送消息"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
