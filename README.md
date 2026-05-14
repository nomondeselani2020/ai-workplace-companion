# AI Workplace Productivity Assistant (WorkAI)

A modern, responsive web app that brings multiple AI-powered productivity tools
into a single dashboard. Built to demonstrate practical AI implementation,
strong prompt engineering, real-world problem solving, responsible AI usage,
and clean SaaS-style UI/UX.

## Project Overview

WorkAI is a single integrated platform — not a collection of separate apps —
that helps professionals automate everyday workplace tasks. From a unified
sidebar dashboard, users can draft emails, summarize meetings, plan their
week, research topics, and chat with an AI assistant.

All AI requests go through a secure server function and the Lovable AI
Gateway, so no API keys are ever exposed to the browser.

## Features

The app ships with **5 AI-powered features**:

1. **Smart Email Generator** — Generate professional emails in multiple tones
   (professional, formal, friendly, persuasive, apologetic, concise).
2. **Meeting Notes Summarizer** — Turn raw notes or transcripts into a
   structured summary with key decisions, action items, and open questions.
3. **AI Task Planner** — Build prioritized daily or weekly schedules using
   the Eisenhower matrix, with realistic time blocks and short breaks.
4. **AI Research Assistant** — Summarize topics or pasted articles with
   key points, insights, recommendations, and explicit caveats.
5. **AI Chatbot** — Conversational workplace assistant with full
   conversation memory.

Plus:
- Responsive dashboard (mobile + desktop) with collapsible sidebar
- Editable AI outputs (every result lives in a textarea you can refine)
- Copy-to-clipboard on generated emails
- Responsible AI disclaimer on every page
- Toast-based error handling for rate limits / credit issues

## Tools Used

- **Framework:** TanStack Start (React 19 + Vite 7)
- **Routing:** TanStack Router (file-based)
- **Styling:** Tailwind CSS v4 with a custom semantic design system (oklch tokens, gradients, elegant shadows)
- **UI components:** shadcn/ui (Card, Button, Input, Textarea, Select, Sidebar, Sonner toasts)
- **Icons:** lucide-react
- **Validation:** Zod (server-side input validation)
- **Backend:** Lovable Cloud (managed Supabase)
- **AI:** Lovable AI Gateway (default model: `google/gemini-3-flash-preview`)
- **Server logic:** TanStack `createServerFn` (typed RPC, secrets stay server-side)

## Responsible AI Practices

- Clear disclaimer on the dashboard and every feature page
- Prompts instruct the model to be faithful to source material and to flag uncertainty
- All outputs are editable before use
- API keys never reach the browser — all model calls run through a server function
- Input length limits and validation enforced server-side

## Setup Instructions

### Prerequisites
- [Bun](https://bun.sh) (or Node.js 20+)
- A Lovable Cloud project (already provisioned for this app)

### Local development

```bash
# Install dependencies
bun install

# Start the dev server
bun run dev
```

The app will be available at `http://localhost:5173`.

### Environment variables

These are auto-provisioned by Lovable Cloud — you do **not** need to create
a `.env` file manually:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `LOVABLE_API_KEY` (server-only — used by the AI gateway)

### Project structure

```
src/
├── routes/                # File-based routes
│   ├── __root.tsx         # Root layout (sidebar + header)
│   ├── index.tsx          # Dashboard
│   ├── email.tsx          # Smart Email Generator
│   ├── summarizer.tsx     # Meeting Notes Summarizer
│   ├── planner.tsx        # AI Task Planner
│   ├── research.tsx       # AI Research Assistant
│   └── chat.tsx           # AI Chatbot
├── components/
│   ├── app-sidebar.tsx    # Collapsible sidebar navigation
│   ├── page-shell.tsx     # Shared page wrapper with disclaimer
│   └── ui/                # shadcn/ui components
├── lib/
│   └── ai.functions.ts    # Server function calling Lovable AI
└── styles.css             # Design system (oklch tokens, gradients)
```

### Deployment

Click **Publish** in the Lovable editor to deploy. The app ships as a
TanStack Start build targeting the edge (Cloudflare Workers).

## Team Members

_Add your team members here:_

- Your Name — Role

## License

MIT