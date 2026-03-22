import React, { useState } from 'react';
import { Bookmark, ChevronDown, ChevronUp, Clock, Users } from 'lucide-react';
import { ScanningStatus } from './ScanningStatus';

export type MatchState = 'idle' | 'searching' | 'matched';

interface MatchResultsPanelProps {
  matchState: MatchState;
}

const MOCK_RESULTS = [
  {
    id: '1',
    name: 'Neon Horizon',
    domain: 'Game Dev',
    role: '3D Artist',
    members: 4,
    score: 92,
    eta: 'Ready now',
    skillsMatch: 95,
    availabilityMatch: 90,
    workingStyleMatch: 85
  },
  {
    id: '2',
    name: 'Nexus Analytics',
    domain: 'Web App',
    role: 'Frontend Dev',
    members: 2,
    score: 85,
    eta: 'Starts in 2 weeks',
    skillsMatch: 80,
    availabilityMatch: 100,
    workingStyleMatch: 75
  },
  {
    id: '3',
    name: 'Echoes of Time',
    domain: 'Filmmaking',
    role: 'Sound Designer',
    members: 6,
    score: 68,
    eta: 'Ready now',
    skillsMatch: 70,
    availabilityMatch: 60,
    workingStyleMatch: 80
  }
];

export function MatchResultsPanel({ matchState }: MatchResultsPanelProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[var(--success)] bg-[rgba(91,191,167,0.12)]';
    return 'text-[var(--danger)] bg-[rgba(180,83,9,0.12)]';
  };

  return (
    <div className="flex h-full flex-col">
      <div className="premium-panel premium-grid flex h-full flex-col rounded-[34px] p-5 sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="premium-kicker mb-2">Results</p>
            <h2 className="font-display text-3xl text-[var(--text)]">Matched Projects</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-muted)]">
              Review collaborators and projects that align with your role, timing, and preferred working style.
            </p>
          </div>
        </div>

        {matchState === 'idle' && (
          <div className="flex min-h-[440px] flex-1 flex-col items-center justify-center rounded-[30px] border border-[var(--border)] bg-[color:var(--bg-panel)] px-8 text-center">
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-[var(--border)]">
              <div className="absolute inset-0 rounded-full border border-[var(--border)] animate-[spin_12s_linear_infinite]" />
              <div className="absolute inset-3 rounded-full border border-[var(--border)] border-dashed animate-[spin_18s_linear_infinite_reverse]" />
              <div className="h-3 w-3 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(208,164,106,0.7)]" />
            </div>
            <p className="font-display text-2xl text-[var(--text)]">Waiting for your first scan</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-[var(--text-muted)]">
              Once you start, your best-fit projects will appear here with transparent fit breakdowns.
            </p>
          </div>
        )}

        {matchState === 'searching' && (
          <div className="min-h-[440px] flex-1">
            <ScanningStatus />
          </div>
        )}

        {matchState === 'matched' && (
          <div className="space-y-4">
            {MOCK_RESULTS.map((result) => (
              <div
                key={result.id}
                className="overflow-hidden rounded-[30px] border border-[var(--border)] bg-[color:var(--bg-panel)] transition-all duration-300 hover:border-[var(--border-strong)]"
              >
                <div className="cursor-pointer p-5" onClick={() => toggleRow(result.id)}>
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-[var(--text)]">{result.name}</h3>
                        <span className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                          {result.domain}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
                        <span>{result.role}</span>
                        <span className="inline-flex items-center gap-1.5">
                          <Users size={14} />
                          {result.members} members
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={14} />
                          {result.eta}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`rounded-[22px] px-4 py-3 text-center ${getScoreColor(result.score)}`}>
                        <p className="text-2xl font-semibold">{result.score}%</p>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">Fit Score</p>
                      </div>

                      <button className="rounded-2xl border border-[var(--border)] p-3 text-[var(--text-muted)] transition-colors hover:bg-[color:var(--bg-muted)] hover:text-[var(--text)]">
                        <Bookmark size={18} />
                      </button>
                      <button className="premium-button rounded-2xl px-4 py-3 text-sm font-semibold transition-all">
                        Join
                      </button>
                      <div className="text-[var(--text-muted)]">
                        {expandedRow === result.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`overflow-hidden border-t border-[var(--border)] bg-[rgba(255,255,255,0.02)] transition-all duration-300 ${
                    expandedRow === result.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="grid gap-4 p-5 md:grid-cols-3">
                    {[
                      ['Skills Match', result.skillsMatch, 'var(--accent)'],
                      ['Availability', result.availabilityMatch, 'var(--danger)'],
                      ['Working Style', result.workingStyleMatch, 'var(--success)']
                    ].map(([label, value, color]) => (
                      <div key={label} className="rounded-[22px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-4">
                        <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                          <span>{label}</span>
                          <span className="text-[var(--text)]">{value}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-[color:var(--bg-muted)]">
                          <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
