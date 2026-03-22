import React, { useState } from 'react';
import {
  Home,
  CheckSquare,
  MessageSquare,
  Folder,
  Users,
  Settings,
  Activity,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export type ProjectTab = 'overview' | 'tasks' | 'channels' | 'files' | 'members' | 'settings';

interface ProjectSidebarProps {
  activeTab: ProjectTab;
  onTabChange: (tab: ProjectTab) => void;
}

export function ProjectSidebar({ activeTab, onTabChange }: ProjectSidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, count: 12 },
    { id: 'channels', label: 'Channels', icon: MessageSquare, count: 3 },
    { id: 'files', label: 'Files', icon: Folder },
    { id: 'members', label: 'Members', icon: Users, count: 4 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setIsMobileOpen((prev) => !prev)}
        className="premium-soft-panel fixed left-4 top-3 z-40 inline-flex items-center justify-center rounded-xl p-2 text-[var(--text)] md:hidden"
      >
        {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close project sidebar"
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`premium-soft-panel premium-grid scrollbar-hidden fixed left-0 top-0 z-30 flex h-screen w-[264px] flex-col overflow-y-auto border-r transition-transform duration-300 md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="border-b border-[var(--border)] px-4 py-5">
          <p className="premium-kicker">Workspace</p>
          <h2 className="mt-2 font-display text-2xl leading-none text-[var(--text)]">Project Hub</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
            Keep the team aligned across delivery, decisions, and momentum.
          </p>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id as ProjectTab);
                setIsMobileOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-[color:var(--accent-soft)] text-[var(--text)] shadow-[0_16px_30px_rgba(0,0,0,0.08)]'
                  : 'text-[var(--text-muted)] hover:bg-[color:var(--bg-muted)] hover:text-[var(--text)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  size={18}
                  className={activeTab === item.id ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}
                />
                {item.label}
              </div>
              {item.count ? (
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    activeTab === item.id
                      ? 'bg-[rgba(255,248,239,0.72)] text-[var(--accent)]'
                      : 'bg-[color:var(--bg-muted)] text-[var(--text-muted)]'
                  }`}
                >
                  {item.count}
                </span>
              ) : activeTab === item.id ? (
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_16px_rgba(208,164,106,0.5)]" />
              ) : null}
            </button>
          ))}
        </nav>

        <div className="space-y-3 border-t border-[var(--border)] p-3">
          <div className="rounded-[24px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Health</span>
              <span className="text-xs font-semibold text-[var(--success)]">On Track</span>
            </div>
            <div className="mb-3 flex items-center gap-2 text-[var(--text)]">
              <Activity size={16} className="text-[var(--success)]" />
              <span className="text-sm font-medium">Strong delivery rhythm this week</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[color:var(--bg-muted)]">
              <div className="h-full rounded-full bg-[var(--success)]" style={{ width: '85%' }} />
            </div>
          </div>

            <button
            onClick={toggleTheme}
            className="premium-button-secondary flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors"
          >
            <span className="flex items-center gap-3">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
