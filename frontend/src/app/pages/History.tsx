import { FileText, Video, Mail, CheckSquare, Tag } from "lucide-react";

const filterChips = ["All", "Documents", "Meetings", "Emails", "Tasks"];

const historyItems = [
  {
    type: "document",
    icon: FileText,
    action: "Document analyzed",
    details: "Q4 Financial Report.pdf",
    metadata: ["3 insights extracted", "2 questions answered"],
    timestamp: "2 minutes ago",
  },
  {
    type: "meeting",
    icon: Video,
    action: "Meeting summarized",
    details: "Q1 Planning Meeting",
    metadata: ["4 decisions captured", "5 tasks extracted"],
    timestamp: "15 minutes ago",
  },
  {
    type: "email",
    icon: Mail,
    action: "Email drafted",
    details: "Client Proposal Follow-up",
    metadata: ["Professional tone", "3 paragraphs"],
    timestamp: "1 hour ago",
  },
  {
    type: "task",
    icon: CheckSquare,
    action: "Task completed",
    details: "Review contracts",
    metadata: ["Assigned to Emma Davis", "High priority"],
    timestamp: "2 hours ago",
  },
  {
    type: "document",
    icon: FileText,
    action: "Document uploaded",
    details: "Marketing Strategy.pdf",
    metadata: ["3.5 MB", "Ready for analysis"],
    timestamp: "3 hours ago",
  },
  {
    type: "meeting",
    icon: Video,
    action: "Meeting transcript processed",
    details: "Team Sync",
    metadata: ["45 minutes", "8 participants"],
    timestamp: "5 hours ago",
  },
  {
    type: "email",
    icon: Mail,
    action: "Email drafted",
    details: "Budget Update Request",
    metadata: ["Formal tone", "2 paragraphs"],
    timestamp: "Yesterday",
  },
  {
    type: "task",
    icon: CheckSquare,
    action: "Task created",
    details: "Prepare presentation slides",
    metadata: ["Assigned to Mike Roberts", "Medium priority"],
    timestamp: "Yesterday",
  },
];

export function History() {
  return (
    <div className="space-y-6">
      {/* Filter Chips */}
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground">Filter by:</span>
        <div className="flex gap-2">
          {filterChips.map((chip) => (
            <button
              key={chip}
              className={`px-4 h-9 rounded-lg transition-colors ${
                chip === "All"
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground hover:bg-accent/80"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="mb-6">AI Activity Timeline</h3>
        <div className="space-y-6">
          {historyItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex gap-4">
                {/* Icon & Line */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  {i < historyItems.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="mb-1">{item.action}</div>
                      <div className="text-muted-foreground">{item.details}</div>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">{item.timestamp}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.metadata.map((tag, j) => (
                      <div key={j} className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm text-muted-foreground">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
