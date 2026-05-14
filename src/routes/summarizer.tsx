import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { chatComplete } from "@/lib/ai.functions";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/summarizer")({ component: SummarizerPage });

function SummarizerPage() {
  const ai = useServerFn(chatComplete);
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!notes.trim()) { toast.error("Paste your meeting notes first."); return; }
    setLoading(true); setOutput("");
    const system =
      "You are an expert meeting analyst. Given raw meeting notes or a transcript, produce a structured summary using markdown with these sections in order: ## Summary (3-5 sentences), ## Key Decisions (bullets), ## Action Items (bullets, each with owner and deadline if mentioned, otherwise 'TBD'), ## Open Questions (bullets). Be faithful to the source — don't invent facts.";
    const res = await ai({ data: { messages: [{ role: "system", content: system }, { role: "user", content: notes }] } });
    setLoading(false);
    if (res.error) toast.error(res.error); else setOutput(res.content);
  };

  return (
    <PageShell title="Meeting Notes Summarizer" description="Extract summary, decisions, action items and open questions.">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Paste notes or transcript</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Textarea rows={18} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Paste raw meeting notes here..." />
            <Button onClick={run} disabled={loading} className="w-full">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Summarize
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Structured summary</CardTitle></CardHeader>
          <CardContent>
            <Textarea rows={22} value={output} onChange={(e) => setOutput(e.target.value)} placeholder="Your summary will appear here." />
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}