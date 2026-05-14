import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { chatComplete } from "@/lib/ai.functions";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Copy, Sparkles } from "lucide-react";

export const Route = createFileRoute("/email")({ component: EmailPage });

function EmailPage() {
  const ai = useServerFn(chatComplete);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState("professional");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!context.trim()) {
      toast.error("Please describe what the email is about.");
      return;
    }
    setLoading(true);
    setOutput("");
    const system =
      "You are a professional email writer. Produce a clear, well-structured email with subject line and body. Keep it concise. Match the requested tone exactly. Do not include placeholders like [Your Name] unless necessary.";
    const user = `Write an email with the following details:\n- Recipient: ${recipient || "Unspecified"}\n- Subject hint: ${subject || "Infer a good subject"}\n- Tone: ${tone}\n- Purpose / context:\n${context}\n\nFormat:\nSubject: <subject>\n\n<body>`;
    const res = await ai({ data: { messages: [{ role: "system", content: system }, { role: "user", content: user }] } });
    setLoading(false);
    if (res.error) toast.error(res.error);
    else setOutput(res.content);
  };

  return (
    <PageShell title="Smart Email Generator" description="Generate professional emails in any tone.">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Email details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Recipient</Label>
              <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Sarah, Marketing team" />
            </div>
            <div>
              <Label>Subject hint (optional)</Label>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Project update" />
            </div>
            <div>
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                  <SelectItem value="apologetic">Apologetic</SelectItem>
                  <SelectItem value="concise">Concise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>What is the email about?</Label>
              <Textarea rows={6} value={context} onChange={(e) => setContext(e.target.value)} placeholder="Describe the purpose, key points, and any specifics..." />
            </div>
            <Button onClick={generate} disabled={loading} className="w-full">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Generate email
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated email</CardTitle>
              {output && (
                <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied"); }}>
                  <Copy className="h-4 w-4" /> Copy
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Textarea rows={18} value={output} onChange={(e) => setOutput(e.target.value)} placeholder="Your email will appear here. You can edit it freely." />
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}