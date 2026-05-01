import { AlertCircle, Inbox, Loader2, RefreshCcw } from "lucide-react";

type StateBlockProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: "loading" | "empty" | "error";
};

export function StateBlock({ title, description, actionLabel, onAction, variant = "empty" }: StateBlockProps) {
  const Icon = variant === "loading" ? Loader2 : variant === "error" ? AlertCircle : Inbox;

  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card p-8 text-center">
      <Icon className={`mb-3 h-8 w-8 text-muted-foreground ${variant === "loading" ? "animate-spin" : ""}`} />
      <h3 className="text-base">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">{description}</p>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm text-primary-foreground hover:opacity-90"
        >
          <RefreshCcw className="h-4 w-4" />
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
