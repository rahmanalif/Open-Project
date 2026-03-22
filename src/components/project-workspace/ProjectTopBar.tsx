import React, { useState } from 'react';
import { ArrowLeft, Settings, MoreHorizontal, UserPlus, Bell } from 'lucide-react';
import { InviteMemberModal } from '../modals/InviteMemberModal';
import { NotificationsPanel } from '../modals/NotificationsPanel';
import { ProjectMenuModal } from '../modals/ProjectMenuModal';

interface ProjectTopBarProps {
  onBack: () => void;
  onNavigateToSettings?: () => void;
}

export function ProjectTopBar({ onBack, onNavigateToSettings }: ProjectTopBarProps) {
  const [showInvite, setShowInvite] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    right: 0
  });

  const handleInvite = (inviteData: any) => {
    console.log('Member invited:', inviteData);
  };

  const handleMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right
    });
    setShowMenu(true);
  };

  return (
    <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6">
      <div className="premium-panel flex flex-col gap-4 rounded-[30px] px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="ml-12 flex min-w-0 items-center gap-4 md:ml-0">
          <button
            onClick={onBack}
            className="premium-button-secondary rounded-2xl p-3 transition-colors"
            title="Back to Browse"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="h-8 w-px bg-[var(--border)]" />

          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent),var(--success))] text-sm font-bold text-[#fff8ef] shadow-[0_18px_30px_rgba(0,0,0,0.2)]">
              IS
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate font-display text-2xl text-[var(--text)]">Indie SaaS Analytics</h1>
                <span className="rounded-full bg-[rgba(91,191,167,0.12)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--success)]">
                  Active
                </span>
              </div>
              <p className="mt-1 max-w-[520px] truncate text-sm text-[var(--text-muted)]">
                Building a privacy-focused analytics platform for indie hackers.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          <div className="hidden -space-x-2 sm:flex">
            {['JD', 'SC', 'MW'].map((initials, i) => (
              <div
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-semibold text-white ring-2 ring-[color:var(--bg-panel)] ${
                  i === 0 ? 'bg-fuchsia-500' : i === 1 ? 'bg-sky-500' : 'bg-amber-500'
                }`}
              >
                {initials}
              </div>
            ))}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--bg-muted)] text-[10px] font-semibold text-[var(--text-muted)] ring-2 ring-[color:var(--bg-panel)]">
              +2
            </div>
          </div>

          <button
            onClick={() => setShowInvite(true)}
            className="premium-button flex h-11 items-center gap-2 rounded-2xl px-4 text-sm font-semibold transition-all"
          >
            <UserPlus size={14} />
            <span className="hidden sm:inline">Invite</span>
          </button>

          <button
            onClick={() => setShowNotifications(true)}
            className="premium-button-secondary relative rounded-2xl p-3 transition-colors"
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[var(--danger)]" />
          </button>
          <button onClick={onNavigateToSettings} className="premium-button-secondary rounded-2xl p-3 transition-colors">
            <Settings size={18} />
          </button>
          <button onClick={handleMoreClick} className="premium-button-secondary rounded-2xl p-3 transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      <InviteMemberModal isOpen={showInvite} onClose={() => setShowInvite(false)} onInvite={handleInvite} />
      <NotificationsPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      <ProjectMenuModal isOpen={showMenu} onClose={() => setShowMenu(false)} position={menuPosition} />
    </header>
  );
}
