import { User, Mail, Bell, Lock, Palette, Zap, Link as LinkIcon } from "lucide-react";

export function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Profile Card */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="mb-6">Profile</h3>
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl">
            <User className="w-10 h-10" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Full Name</label>
                <input type="text" defaultValue="Alex Johnson" className="w-full h-10 px-3 bg-input-background rounded-lg outline-none" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="alex.johnson@company.com"
                  className="w-full h-10 px-3 bg-input-background rounded-lg outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Role</label>
              <input type="text" defaultValue="Product Manager" className="w-full h-10 px-3 bg-input-background rounded-lg outline-none" />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
          <button className="px-4 h-10 bg-accent rounded-lg hover:bg-accent/80 transition-colors">Cancel</button>
          <button className="px-4 h-10 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            Save Changes
          </button>
        </div>
      </div>

      {/* AI Preferences */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="w-5 h-5" />
          <h3>AI Preferences</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <div>Auto-summarize meetings</div>
              <div className="text-sm text-muted-foreground">Automatically generate summaries after meetings end</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-switch-background peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <div>Smart email suggestions</div>
              <div className="text-sm text-muted-foreground">Get AI-powered email draft suggestions</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-switch-background peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <div>Document insights</div>
              <div className="text-sm text-muted-foreground">Automatically extract insights from uploaded documents</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-switch-background peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <div>Task extraction</div>
              <div className="text-sm text-muted-foreground">Automatically create tasks from meetings and emails</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-switch-background peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Theme/Appearance */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Palette className="w-5 h-5" />
          <h3>Appearance</h3>
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-3">Theme</label>
          <div className="grid grid-cols-3 gap-3">
            <button className="flex flex-col items-center gap-2 p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors border-2 border-primary">
              <div className="w-full h-16 bg-white border border-border rounded"></div>
              <span>Light</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors border-2 border-transparent">
              <div className="w-full h-16 bg-gray-900 rounded"></div>
              <span>Dark</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors border-2 border-transparent">
              <div className="w-full h-16 bg-gradient-to-r from-white to-gray-900 rounded"></div>
              <span>Auto</span>
            </button>
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <LinkIcon className="w-5 h-5" />
          <h3>Connected apps</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div>Gmail</div>
                <div className="text-sm text-muted-foreground">Connect your Gmail account</div>
              </div>
            </div>
            <button className="px-4 h-9 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              Connect
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <div>Slack</div>
                <div className="text-sm text-muted-foreground">Get notifications in Slack</div>
              </div>
            </div>
            <button className="px-4 h-9 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              Connect
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div>Google Drive</div>
                <div className="text-sm text-muted-foreground">Access documents from Drive</div>
              </div>
            </div>
            <button className="px-4 h-9 bg-accent rounded-lg hover:bg-accent/80 transition-colors">Connected</button>
          </div>
        </div>
      </div>
    </div>
  );
}
