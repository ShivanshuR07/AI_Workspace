import { useEffect, useState } from "react";
import { Bell, Link as LinkIcon, Lock, Mail, Palette, Save, User, Zap } from "lucide-react";
import { StateBlock } from "../components/StateBlock";
import { useAsyncResource } from "../hooks/useAsyncResource";
import { api, type WorkspaceSettings } from "../lib/api";

export function Settings() {
  const { data, error, isLoading, reload } = useAsyncResource(api.settings, []);
  const [settings, setSettings] = useState<WorkspaceSettings | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    if (data?.settings) {
      setSettings(data.settings);
    }
  }, [data]);

  async function saveSettings() {
    if (!settings) {
      return;
    }

    setSaveState("saving");
    try {
      const response = await api.saveSettings(settings);
      setSettings(response.settings);
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }

  if (isLoading) {
    return <StateBlock title="Loading settings" description="Fetching saved preferences and integrations." variant="loading" />;
  }

  if (error || !settings) {
    return (
      <StateBlock
        title="Settings unavailable"
        description={error ?? "The workspace API did not return settings."}
        actionLabel="Retry"
        onAction={reload}
        variant="error"
      />
    );
  }

  return (
    <div className="max-w-5xl space-y-6">
      <section className="rounded-lg border border-border bg-card p-5">
        <h3 className="mb-5">Profile</h3>
        <div className="flex flex-col gap-5 md:flex-row md:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-10 w-10" />
          </div>
          <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
            <TextField
              label="Full Name"
              value={settings.profile.fullName}
              onChange={(value) => setSettings({ ...settings, profile: { ...settings.profile, fullName: value } })}
            />
            <TextField
              label="Email"
              type="email"
              value={settings.profile.email}
              onChange={(value) => setSettings({ ...settings, profile: { ...settings.profile, email: value } })}
            />
            <div className="md:col-span-2">
              <TextField
                label="Role"
                value={settings.profile.role}
                onChange={(value) => setSettings({ ...settings, profile: { ...settings.profile, role: value } })}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card p-5">
        <div className="mb-5 flex items-center gap-2">
          <Zap className="h-5 w-5" />
          <h3>AI Preferences</h3>
        </div>
        <div className="divide-y divide-border">
          <PreferenceToggle
            label="Auto-summarize meetings"
            description="Automatically generate summaries after meetings end"
            checked={settings.aiPreferences.autoSummaries}
            onChange={(checked) =>
              setSettings({ ...settings, aiPreferences: { ...settings.aiPreferences, autoSummaries: checked } })
            }
          />
          <PreferenceToggle
            label="Smart email suggestions"
            description="Get AI-powered email draft suggestions"
            checked={settings.aiPreferences.emailSuggestions}
            onChange={(checked) =>
              setSettings({ ...settings, aiPreferences: { ...settings.aiPreferences, emailSuggestions: checked } })
            }
          />
          <PreferenceToggle
            label="Document insights"
            description="Automatically extract insights from uploaded documents"
            checked={settings.aiPreferences.documentInsights}
            onChange={(checked) =>
              setSettings({ ...settings, aiPreferences: { ...settings.aiPreferences, documentInsights: checked } })
            }
          />
          <PreferenceToggle
            label="Task extraction"
            description="Automatically create tasks from meetings and emails"
            checked={settings.aiPreferences.taskExtraction}
            onChange={(checked) =>
              setSettings({ ...settings, aiPreferences: { ...settings.aiPreferences, taskExtraction: checked } })
            }
          />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card p-5">
        <div className="mb-5 flex items-center gap-2">
          <Palette className="h-5 w-5" />
          <h3>Appearance</h3>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {(["light", "dark", "auto"] as const).map((theme) => (
            <button
              key={theme}
              type="button"
              onClick={() => setSettings({ ...settings, appearance: { theme } })}
              className={`rounded-lg border-2 bg-accent p-4 text-left capitalize transition-colors hover:bg-accent/80 ${
                settings.appearance.theme === theme ? "border-primary" : "border-transparent"
              }`}
            >
              <div className={`mb-3 h-14 rounded border border-border ${theme === "dark" ? "bg-gray-900" : theme === "auto" ? "bg-gradient-to-r from-white to-gray-900" : "bg-white"}`} />
              {theme}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card p-5">
        <div className="mb-5 flex items-center gap-2">
          <LinkIcon className="h-5 w-5" />
          <h3>Connected Apps</h3>
        </div>
        <div className="space-y-3">
          <IntegrationRow
            icon={Mail}
            name="Gmail"
            description="Connect your Gmail account"
            connected={settings.integrations.gmail}
            onToggle={() => setSettings({ ...settings, integrations: { ...settings.integrations, gmail: !settings.integrations.gmail } })}
          />
          <IntegrationRow
            icon={Bell}
            name="Slack"
            description="Get notifications in Slack"
            connected={settings.integrations.slack}
            onToggle={() => setSettings({ ...settings, integrations: { ...settings.integrations, slack: !settings.integrations.slack } })}
          />
          <IntegrationRow
            icon={Lock}
            name="Google Drive"
            description="Access documents from Drive"
            connected={settings.integrations.googleDrive}
            onToggle={() =>
              setSettings({ ...settings, integrations: { ...settings.integrations, googleDrive: !settings.integrations.googleDrive } })
            }
          />
        </div>
      </section>

      <div className="sticky bottom-4 flex justify-end">
        <button
          type="button"
          onClick={() => void saveSettings()}
          disabled={saveState === "saving"}
          className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-primary-foreground shadow-lg hover:opacity-90 disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {saveState === "saving" ? "Saving..." : saveState === "saved" ? "Saved" : "Save Changes"}
        </button>
      </div>
      {saveState === "error" ? <p className="text-sm text-red-600">Settings could not be saved. Please retry.</p> : null}
    </div>
  );
}

function TextField({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-muted-foreground">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="h-10 w-full rounded-lg bg-input-background px-3 outline-none" />
    </label>
  );
}

function PreferenceToggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <div>{label}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

function IntegrationRow({
  icon: Icon,
  name,
  description,
  connected,
  onToggle,
}: {
  icon: typeof Mail;
  name: string;
  description: string;
  connected: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-muted p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-accent">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div>{name}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={`h-9 rounded-lg px-4 transition-colors ${connected ? "bg-accent hover:bg-accent/80" : "bg-primary text-primary-foreground hover:opacity-90"}`}
      >
        {connected ? "Connected" : "Connect"}
      </button>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-primary" : "bg-switch-background"}`}
    >
      <span className={`absolute top-[2px] h-5 w-5 rounded-full bg-white transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
    </button>
  );
}
