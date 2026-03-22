import React from 'react';
import { Save, AlertTriangle, Trash2, Archive, PauseCircle } from 'lucide-react';

export function ProjectSettings() {
  return (
    <div className="max-w-4xl space-y-8 pb-12">
      <section className="premium-panel premium-grid rounded-[34px] px-6 py-7 sm:px-8">
        <p className="premium-kicker mb-2">Configuration</p>
        <h2 className="font-display text-4xl text-[var(--text)]">Project Settings</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">
          Manage project details, communication defaults, and sensitive actions from one calm control surface.
        </p>
      </section>

      <section className="premium-panel rounded-[30px] p-6">
        <h3 className="mb-5 text-lg font-semibold text-[var(--text)]">General</h3>
        <div className="grid gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text)]">Project Name</label>
            <input type="text" defaultValue="Indie SaaS Analytics Tool" className="premium-input w-full rounded-2xl px-4 py-3 text-sm" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text)]">Description</label>
            <textarea
              rows={4}
              defaultValue="Building a privacy-focused analytics platform for indie hackers and small teams."
              className="premium-input w-full rounded-2xl px-4 py-3 text-sm"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Phase</label>
              <select className="premium-input w-full rounded-2xl px-4 py-3 text-sm">
                <option>Planning</option>
                <option selected>Development</option>
                <option>Testing</option>
                <option>Launch</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">Visibility</label>
              <select className="premium-input w-full rounded-2xl px-4 py-3 text-sm">
                <option>Public</option>
                <option selected>Private</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-panel rounded-[30px] p-6">
        <h3 className="mb-5 text-lg font-semibold text-[var(--text)]">Notifications</h3>
        <div className="space-y-3">
          {['Email me when tasks are assigned to me', 'Email me when I am mentioned', 'Send me a daily digest'].map((label) => (
            <label key={label} className="flex items-center gap-3 rounded-[20px] border border-[var(--border)] bg-[color:var(--bg-panel)] px-4 py-3">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-[var(--border-strong)] text-[var(--accent)] focus:ring-[var(--accent)]"
              />
              <span className="text-sm text-[var(--text)]">{label}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-[30px] border border-[rgba(180,83,9,0.18)] bg-[rgba(180,83,9,0.06)] p-6">
        <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold text-[var(--danger)]">
          <AlertTriangle size={18} /> Danger Zone
        </h3>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 rounded-[22px] border border-[rgba(180,83,9,0.18)] bg-[rgba(255,255,255,0.35)] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="text-sm font-medium text-[var(--text)]">Pause Project</h4>
              <p className="text-xs text-[var(--text-muted)]">Temporarily hide this project from search results.</p>
            </div>
            <button className="rounded-2xl bg-[rgba(180,83,9,0.12)] px-4 py-2 text-sm font-medium text-[var(--danger)] transition-colors hover:bg-[rgba(180,83,9,0.18)]">
              <span className="inline-flex items-center gap-2"><PauseCircle size={14} /> Pause</span>
            </button>
          </div>

          <div className="flex flex-col gap-4 rounded-[22px] border border-[rgba(180,83,9,0.18)] bg-[rgba(255,255,255,0.35)] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="text-sm font-medium text-[var(--text)]">Archive Project</h4>
              <p className="text-xs text-[var(--text-muted)]">Make the project read-only and move it to the archive.</p>
            </div>
            <button className="premium-button-secondary rounded-2xl px-4 py-2 text-sm font-medium">
              <span className="inline-flex items-center gap-2"><Archive size={14} /> Archive</span>
            </button>
          </div>

          <div className="flex flex-col gap-4 rounded-[22px] border border-[rgba(180,83,9,0.18)] bg-[rgba(255,255,255,0.35)] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="text-sm font-medium text-[var(--text)]">Delete Project</h4>
              <p className="text-xs text-[var(--text-muted)]">Permanently delete this project and all associated data.</p>
            </div>
            <button className="rounded-2xl bg-[var(--danger)] px-4 py-2 text-sm font-medium text-white transition-colors hover:brightness-95">
              <span className="inline-flex items-center gap-2"><Trash2 size={14} /> Delete</span>
            </button>
          </div>
        </div>
      </section>

      <div className="flex justify-end pt-2">
        <button className="premium-button flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold">
          <Save size={16} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
