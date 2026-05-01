import { Upload, File, Send, ExternalLink } from "lucide-react";
import { useState } from "react";

const documents = [
  { name: "Q4 Financial Report.pdf", size: "2.3 MB", date: "Apr 8, 2026" },
  { name: "Product Roadmap.docx", size: "1.1 MB", date: "Apr 7, 2026" },
  { name: "Marketing Strategy.pdf", size: "3.5 MB", date: "Apr 6, 2026" },
  { name: "Team Handbook.pdf", size: "890 KB", date: "Apr 5, 2026" },
  { name: "Legal Contract.pdf", size: "1.8 MB", date: "Apr 4, 2026" },
];

const mockConversation = [
  {
    question: "What were the key findings in the Q4 report?",
    answer: "The Q4 report highlighted three key findings: Revenue increased by 23% year-over-year, customer retention improved to 94%, and operational costs decreased by 8% through efficiency improvements.",
    citations: ["Q4 Financial Report.pdf - Page 3", "Q4 Financial Report.pdf - Page 12"],
  },
];

export function Documents() {
  const [question, setQuestion] = useState("");

  return (
    <div className="h-[calc(100vh-144px)] grid grid-cols-[320px_1fr] gap-6">
      {/* Left: Upload & Document List */}
      <div className="flex flex-col gap-4">
        <button className="flex items-center justify-center gap-2 h-12 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity">
          <Upload className="w-5 h-5" />
          Upload Document
        </button>

        <div className="flex-1 bg-card border border-border rounded-xl p-4 overflow-auto">
          <h3 className="mb-4">Documents</h3>
          <div className="space-y-2">
            {documents.map((doc, i) => (
              <button
                key={i}
                className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left"
              >
                <File className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="truncate">{doc.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {doc.size} • {doc.date}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Q&A Chat & Citations */}
      <div className="flex flex-col gap-4">
        <div className="flex-1 bg-card border border-border rounded-xl p-6 overflow-auto">
          <h3 className="mb-6">Document Q&A</h3>

          {mockConversation.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Ask a question about your documents
            </div>
          ) : (
            <div className="space-y-6">
              {mockConversation.map((item, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex justify-end">
                    <div className="max-w-[80%] bg-primary text-primary-foreground rounded-xl px-4 py-3">
                      {item.question}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-muted rounded-xl px-4 py-3">{item.answer}</div>
                    <div className="flex flex-wrap gap-2">
                      {item.citations.map((citation, j) => (
                        <button
                          key={j}
                          className="flex items-center gap-2 px-3 py-2 bg-accent rounded-lg hover:bg-accent/80 transition-colors text-sm"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          {citation}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Question Input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask a question about your documents..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 h-12 px-4 bg-input-background rounded-xl outline-none"
          />
          <button className="w-12 h-12 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
