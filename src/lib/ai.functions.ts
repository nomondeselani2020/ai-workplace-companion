import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string().min(1).max(20000),
});

const InputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(50),
  model: z.string().optional(),
});

export const chatComplete = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { content: "", error: "AI service not configured. Please contact support." };
    }

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: data.model ?? "google/gemini-3-flash-preview",
          messages: data.messages,
        }),
      });

      if (res.status === 429) {
        return { content: "", error: "Rate limit reached. Please try again in a moment." };
      }
      if (res.status === 402) {
        return { content: "", error: "AI usage credits exhausted. Please add credits in workspace settings." };
      }
      if (!res.ok) {
        const text = await res.text();
        console.error("AI gateway error", res.status, text);
        return { content: "", error: `AI request failed (${res.status}).` };
      }

      const json = await res.json();
      const content = json?.choices?.[0]?.message?.content ?? "";
      return { content, error: null as string | null };
    } catch (err) {
      console.error("AI request exception", err);
      return { content: "", error: "AI service is currently unavailable." };
    }
  });