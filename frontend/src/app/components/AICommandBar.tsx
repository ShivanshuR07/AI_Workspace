import { FormEvent, useState } from "react";
import { Bot, Loader2, Send, Sparkles } from "lucide-react";
import { api } from "../lib/api";

export function AICommandBar() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  async function submitCommand(event: FormEvent) {
    event.preventDefault();

    if (!prompt.trim()) {
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await api.command(prompt.trim());
      setResult(response.answer);
      setSuggestions(response.suggestions);
      setPrompt("");
    } catch (error) {
      setResult(error instanceof Error ? error.message : "AI command failed");
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative w-full max-w-2xl">
      <form onSubmit={submitCommand} className="flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-3 shadow-sm">
        <Bot className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          type="text"
          placeholder="Ask AI to find, summarize, draft, or create..."
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Run AI command"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </form>
      {result ? (
        <div className="absolute left-0 right-0 top-12 z-20 rounded-lg border border-border bg-popover p-3 shadow-lg">
          <div className="flex items-start gap-2 text-sm">
            <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
            <div>
              <div>{result}</div>
              {suggestions.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <span key={suggestion} className="rounded bg-accent px-2 py-1 text-xs text-accent-foreground">
                      {suggestion}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
