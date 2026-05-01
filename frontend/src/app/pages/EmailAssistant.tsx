import { Copy, RefreshCw, Edit } from "lucide-react";
import { useState } from "react";

const tones = ["Professional", "Friendly", "Formal", "Casual", "Persuasive"];

const mockDraft = `Dear Client,

I hope this email finds you well. I wanted to follow up on our recent discussion regarding the Q2 project timeline and deliverables.

Based on our meeting notes, I've outlined the key milestones and action items for the upcoming quarter. The team has reviewed the requirements and we're confident in our ability to meet the proposed deadlines.

Could we schedule a brief call next week to finalize the details? I'm available Tuesday or Thursday afternoon if that works for your schedule.

Looking forward to your response.

Best regards`;

export function EmailAssistant() {
  const [context, setContext] = useState("");
  const [selectedTone, setSelectedTone] = useState("Professional");

  return (
    <div className="h-[calc(100vh-144px)] grid grid-cols-[360px_1fr] gap-6">
      {/* Left: Context Input */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="mb-4">Email Context</h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm text-muted-foreground">What do you want to communicate?</label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Describe the purpose of your email..."
              className="w-full h-32 px-3 py-2 bg-input-background rounded-lg outline-none resize-none"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-muted-foreground">Recipient</label>
            <input
              type="text"
              placeholder="Enter recipient name or email..."
              className="w-full h-10 px-3 bg-input-background rounded-lg outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-muted-foreground">Subject</label>
            <input
              type="text"
              placeholder="Enter subject line..."
              className="w-full h-10 px-3 bg-input-background rounded-lg outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-muted-foreground">Additional Context</label>
            <textarea
              placeholder="Add any relevant background information..."
              className="w-full h-24 px-3 py-2 bg-input-background rounded-lg outline-none resize-none"
            />
          </div>
          <button className="w-full h-10 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            Generate Draft
          </button>
        </div>
      </div>

      {/* Right: Tone Selector & Draft Preview */}
      <div className="flex flex-col gap-4">
        {/* Tone Selector */}
        <div className="bg-card border border-border rounded-xl p-4">
          <label className="block mb-3 text-sm text-muted-foreground">Tone</label>
          <div className="flex gap-2">
            {tones.map((tone) => (
              <button
                key={tone}
                onClick={() => setSelectedTone(tone)}
                className={`px-4 h-9 rounded-lg transition-colors ${
                  selectedTone === tone
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground hover:bg-accent/80"
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        {/* Draft Preview */}
        <div className="flex-1 bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3>Email Draft</h3>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 h-9 bg-accent rounded-lg hover:bg-accent/80 transition-colors">
                <Copy className="w-4 h-4" />
                Copy
              </button>
              <button className="flex items-center gap-2 px-3 h-9 bg-accent rounded-lg hover:bg-accent/80 transition-colors">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button className="flex items-center gap-2 px-3 h-9 bg-accent rounded-lg hover:bg-accent/80 transition-colors">
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </button>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-6 whitespace-pre-wrap">{mockDraft}</div>
        </div>
      </div>
    </div>
  );
}
