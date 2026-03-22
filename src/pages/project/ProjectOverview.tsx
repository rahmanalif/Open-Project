import React, { useState } from 'react';
import { X, CheckCircle2, Clock, BarChart3, ArrowUpRight } from 'lucide-react';
import { ActivityFeed } from '../../components/project-workspace/ActivityFeed';
import { NextActionsPanel } from '../../components/project-workspace/NextActionsPanel';
import { CreateTaskModal } from '../../components/modals/CreateTaskModal';
import { InviteMemberModal } from '../../components/modals/InviteMemberModal';

export function ProjectOverview() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showInviteMember, setShowInviteMember] = useState(false);

  const handleCreateTask = (taskData: any) => {
    console.log('Task created:', taskData);
  };

  const handleInviteMember = (inviteData: any) => {
    console.log('Member invited:', inviteData);
  };

  return (
    <div className="space-y-6">
      {showWelcome && (
        <section className="premium-panel premium-grid relative overflow-hidden rounded-[34px] px-6 py-7 sm:px-8">
          <button
            onClick={() => setShowWelcome(false)}
            className="premium-button-secondary absolute right-5 top-5 rounded-xl p-2"
          >
            <X size={16} />
          </button>
          <div className="max-w-3xl">
            <p className="premium-kicker mb-3">Command Center</p>
            <h2 className="font-display text-4xl text-[var(--text)]">Shape the project before the work gets noisy.</h2>
            <p className="mt-4 text-base leading-7 text-[var(--text-muted)]">
              Start with the clearest next move: create the first task, invite the right collaborator, or tighten the roadmap so everyone knows where momentum is heading.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => setShowCreateTask(true)} className="premium-button rounded-2xl px-4 py-3 text-sm font-semibold">
              Create First Task
            </button>
            <button
              onClick={() => setShowInviteMember(true)}
              className="premium-button-secondary rounded-2xl px-4 py-3 text-sm font-semibold"
            >
              Invite Team
            </button>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="premium-panel rounded-[30px] p-6">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="premium-kicker mb-2">Snapshot</p>
                <h3 className="font-display text-3xl text-[var(--text)]">Project Summary</h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">Created Oct 12, 2023 • 45 days remaining</p>
              </div>
              <span className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Development Phase
              </span>
            </div>
            <p className="mb-6 max-w-3xl text-base leading-7 text-[var(--text-muted)]">
              Building a privacy-focused analytics platform for indie hackers and small teams. The goal is to provide simple, actionable insights without compromising user privacy.
            </p>

            <div className="grid gap-4 border-t border-[var(--border)] pt-5 sm:grid-cols-3">
              <div className="rounded-[24px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Owner</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-fuchsia-500 text-xs font-bold text-white">JD</div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">John Doe</p>
                    <p className="text-xs text-[var(--text-muted)]">Product Lead</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[24px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Team Velocity</p>
                <div className="mt-3 flex items-center gap-3">
                  <BarChart3 size={18} className="text-[var(--success)]" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">12 pts/week</p>
                    <p className="text-xs text-[var(--text-muted)]">Healthy delivery pace</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[24px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Tasks</p>
                <div className="mt-3 flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[var(--accent)]" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">11 / 24 done</p>
                    <p className="text-xs text-[var(--text-muted)]">Current sprint in motion</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="premium-panel rounded-[30px] p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="premium-kicker mb-2">Milestones</p>
                <h3 className="font-display text-3xl text-[var(--text)]">Progress</h3>
              </div>
              <span className="text-sm font-semibold text-[var(--accent)]">45% Complete</span>
            </div>

            <div className="mb-8 h-3 w-full overflow-hidden rounded-full bg-[color:var(--bg-muted)]">
              <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--success))]" style={{ width: '45%' }} />
            </div>

            <div className="grid gap-4 md:grid-cols-5">
              {[
                ['Planning', 'done'],
                ['Design', 'done'],
                ['Development', 'current'],
                ['Testing', 'upcoming'],
                ['Launch', 'upcoming']
              ].map(([label, status]) => (
                <div key={label} className="rounded-[24px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-4 text-center">
                  <div
                    className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      status === 'done'
                        ? 'border-[var(--success)] bg-[var(--success)] text-white'
                        : status === 'current'
                          ? 'border-[var(--accent)] bg-transparent text-[var(--accent)]'
                          : 'border-[var(--border-strong)] bg-transparent text-[var(--text-muted)]'
                    }`}
                  >
                    {status === 'done' ? <CheckCircle2 size={16} /> : status === 'current' ? <ArrowUpRight size={16} /> : <Clock size={16} />}
                  </div>
                  <p className={`mt-3 text-sm font-medium ${status === 'current' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>{label}</p>
                </div>
              ))}
            </div>
          </section>

          <ActivityFeed />
        </div>

        <div className="space-y-6">
          <NextActionsPanel />

          <section className="premium-panel rounded-[30px] p-5">
            <p className="premium-kicker mb-2">Calendar</p>
            <h3 className="font-display text-2xl text-[var(--text)]">Upcoming Deadlines</h3>
            <div className="mt-5 space-y-3">
              {[
                { title: 'Design Review', date: 'Tomorrow', urgent: true },
                { title: 'API Integration', date: 'Oct 24', urgent: false },
                { title: 'Beta Launch', date: 'Nov 01', urgent: false }
              ].map((item) => (
                <div key={item.title} className="flex items-center justify-between rounded-[22px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${item.urgent ? 'bg-[var(--danger)]' : 'bg-[var(--border-strong)]'}`} />
                    <span className="text-sm text-[var(--text)]">{item.title}</span>
                  </div>
                  <span className={`text-xs font-semibold ${item.urgent ? 'text-[var(--danger)]' : 'text-[var(--text-muted)]'}`}>{item.date}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <CreateTaskModal isOpen={showCreateTask} onClose={() => setShowCreateTask(false)} onCreateTask={handleCreateTask} />
      <InviteMemberModal isOpen={showInviteMember} onClose={() => setShowInviteMember(false)} onInvite={handleInviteMember} />
    </div>
  );
}
