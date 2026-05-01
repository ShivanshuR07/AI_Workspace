import { Upload, Clock, CheckCircle2 } from "lucide-react";

const mockSummary = {
  title: "Q1 Planning Meeting",
  date: "April 8, 2026",
  duration: "45 minutes",
  participants: 8,
  summary: "Team discussed Q1 objectives, resource allocation, and timeline for new product launch. Key priorities include customer onboarding improvements and platform stability.",
};

const keyDecisions = [
  "Approved $50K budget increase for engineering team",
  "Launch date set for May 15, 2026",
  "Sarah Chen assigned as technical lead",
  "Weekly sync meetings scheduled every Tuesday at 2 PM",
];

const extractedTasks = [
  { task: "Finalize product specifications", assignee: "Sarah Chen", due: "Apr 15, 2026", status: "In Progress" },
  { task: "Prepare marketing materials", assignee: "Mike Roberts", due: "Apr 20, 2026", status: "Not Started" },
  { task: "Update project timeline", assignee: "Lisa Park", due: "Apr 12, 2026", status: "In Progress" },
  { task: "Schedule client demo", assignee: "Tom Wilson", due: "Apr 18, 2026", status: "Not Started" },
  { task: "Review budget allocation", assignee: "Emma Davis", due: "Apr 10, 2026", status: "Completed" },
];

export function Meetings() {
  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-card border border-border rounded-xl p-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-accent-foreground" />
          </div>
          <div className="text-center">
            <h3 className="mb-1">Upload Meeting Transcript</h3>
            <p className="text-muted-foreground">Drop your audio or transcript file here, or click to browse</p>
          </div>
          <button className="px-6 h-10 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            Choose File
          </button>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="mb-4">Meeting Summary</h3>
        <div className="space-y-4">
          <div>
            <div className="text-muted-foreground text-sm mb-1">Meeting Title</div>
            <div>{mockSummary.title}</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-muted-foreground text-sm mb-1">Date</div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                {mockSummary.date}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground text-sm mb-1">Duration</div>
              <div>{mockSummary.duration}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-sm mb-1">Participants</div>
              <div>{mockSummary.participants} people</div>
            </div>
          </div>
          <div>
            <div className="text-muted-foreground text-sm mb-1">Summary</div>
            <div className="text-muted-foreground">{mockSummary.summary}</div>
          </div>
        </div>
      </div>

      {/* Key Decisions */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="mb-4">Key Decisions</h3>
        <div className="space-y-3">
          {keyDecisions.map((decision, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span>{decision}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Extracted Tasks */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="mb-4">Extracted Tasks</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground">Task</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Assignee</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Due Date</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {extractedTasks.map((task, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-3 px-4">{task.task}</td>
                  <td className="py-3 px-4">{task.assignee}</td>
                  <td className="py-3 px-4 text-muted-foreground">{task.due}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
