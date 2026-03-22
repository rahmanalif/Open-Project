import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Globe,
  MessageSquare,
  Zap,
  Briefcase,
  Target,
  Users,
  ChevronDown,
  ChevronUp } from
'lucide-react';
export type MatchStatus = 'new' | 'pending' | 'passed' | 'micro-commitment';
export interface MatchData {
  id: string;
  projectName: string;
  projectStage: 'Idea' | 'Prototype' | 'Active Development';
  matchScore: number;
  role: string;
  commitment: string;
  duration: string;
  complementarity: string[];
  intentAlignment: string[];
  workingStyle: {
    async: boolean;
    timezoneOverlap: number;
    meetings: string;
  };
  breakdown: {
    skillFit: number;
    availabilityFit: number;
    styleFit: number;
  };
  reasoning: string[];
  status: MatchStatus;
}
interface MatchCardProps {
  match: MatchData;
  onAction: (id: string, action: 'interested' | 'maybe' | 'pass' | 'micro') => void;
}
export function MatchCard({ match, onAction }: MatchCardProps) {
  const [expanded, setExpanded] = useState(false);
  const getScoreColor = (score: number) => {
    if (score >= 90)
    return 'text-[var(--success)] bg-[rgba(91,191,167,0.12)] border-[rgba(91,191,167,0.18)]';
    if (score >= 80)
    return 'text-[var(--accent)] bg-[color:var(--accent-soft)] border-[color:var(--border)]';
    return 'text-[var(--danger)] bg-[rgba(180,83,9,0.08)] border-[rgba(180,83,9,0.18)]';
  };
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Idea':
        return 'bg-[rgba(180,83,9,0.08)] text-[var(--danger)] border-[rgba(180,83,9,0.18)]';
      case 'Prototype':
        return 'bg-[color:var(--accent-soft)] text-[var(--accent)] border-[color:var(--border)]';
      case 'Active Development':
        return 'bg-[rgba(91,191,167,0.12)] text-[var(--success)] border-[rgba(91,191,167,0.18)]';
      default:
        return 'bg-gray-50 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-500/20';
    }
  };
  if (match.status === 'pending' || match.status === 'micro-commitment') {
    return (
      <div className="premium-soft-panel rounded-[28px] p-4 opacity-80 transition-colors sm:p-6">
        <div className="flex items-start gap-4 sm:items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-[var(--accent)]">
            <Clock size={20} />
          </div>
          <div>
            <h3 className="font-medium text-[var(--text)]">
              {match.status === 'micro-commitment' ? 'Micro-Collab Requested' : 'Interest Expressed'}
            </h3>
            <p className="text-sm text-[var(--text-muted)]">
              {match.status === 'micro-commitment' ?
              `Waiting for ${match.projectName} to confirm a 7-day trial sprint.` :
              `Waiting for ${match.projectName} to review your profile.`
              }
            </p>
          </div>
        </div>
      </div>);

  }
  return (
    <div className="premium-panel overflow-hidden rounded-[30px] transition-all duration-200">
      {/* Header Section */}
      <div className="border-b border-[var(--border)] p-5 sm:p-6">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2 sm:gap-3">
              <h3 className="text-xl font-semibold text-[var(--text)] break-words">
                {match.projectName}
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStageColor(match.projectStage)}`}>

                {match.projectStage}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5 rounded-full bg-[color:var(--bg-muted)] px-3 py-1 text-[var(--text)] font-medium">
                <Briefcase size={14} />
                {match.role}
              </span>
              <span className="hidden sm:inline text-[var(--border-strong)]">•</span>
              <span className="text-xs font-medium">{match.commitment}</span>
              <span className="hidden sm:inline text-[var(--border-strong)]">•</span>
              <span className="text-xs font-medium">{match.duration}</span>
            </div>
          </div>

          <div
            className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-[22px] border self-start sm:self-auto ${getScoreColor(match.matchScore)}`}>

            <span className="text-lg font-bold leading-none">
              {match.matchScore}%
            </span>
            <span className="text-[10px] font-medium uppercase mt-1">
              Match
            </span>
          </div>
        </div>

        {/* Why this match */}
        <div className="rounded-[24px] border border-[var(--border)] bg-[rgba(208,164,106,0.08)] p-4">
          <div className="flex items-start gap-3">
            <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--accent)]" />
            <div>
              <h4 className="mb-2 text-sm font-semibold text-[var(--text)]">
                Why this match
              </h4>
              <ul className="space-y-1.5">
                {match.reasoning.map((reason, idx) =>
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-[var(--text-muted)]">

                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                    {reason}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className="rounded-[20px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-3">
            <p className="text-[11px] uppercase tracking-wide text-[var(--text-muted)]">
              Skill Fit
            </p>
            <p className="text-sm font-semibold text-[var(--text)]">
              {match.breakdown.skillFit}%
            </p>
          </div>
          <div className="rounded-[20px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-3">
            <p className="text-[11px] uppercase tracking-wide text-[var(--text-muted)]">
              Availability
            </p>
            <p className="text-sm font-semibold text-[var(--text)]">
              {match.breakdown.availabilityFit}%
            </p>
          </div>
          <div className="rounded-[20px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-3">
            <p className="text-[11px] uppercase tracking-wide text-[var(--text-muted)]">
              Style Fit
            </p>
            <p className="text-sm font-semibold text-[var(--text)]">
              {match.breakdown.styleFit}%
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown (Expandable) */}
      <div
        className={`border-b border-[var(--border)] bg-[rgba(255,255,255,0.02)] transition-all duration-300 ease-in-out ${expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}>

        <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 md:grid-cols-3">
          {/* Complementarity */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--text)]">
              <Target
                size={16}
                className="text-[var(--accent)]" />

              Skill Complementarity
            </div>
            <ul className="space-y-2">
              {match.complementarity.map((item, idx) =>
              <li
                key={idx}
                className="flex items-start gap-2 rounded-[18px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-2 text-xs text-[var(--text-muted)]">

                  <CheckCircle2
                  size={12}
                  className="mt-0.5 flex-shrink-0 text-[var(--accent)]" />

                  {item}
                </li>
              )}
            </ul>
          </div>

          {/* Intent */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--text)]">
              <Users size={16} className="text-amber-500 dark:text-amber-400" />
              Intent Alignment
            </div>
            <ul className="space-y-2">
              {match.intentAlignment.map((item, idx) =>
              <li
                key={idx}
                className="flex items-start gap-2 rounded-[18px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-2 text-xs text-[var(--text-muted)]">

                  <CheckCircle2
                  size={12}
                  className="text-amber-500 dark:text-amber-400 mt-0.5 flex-shrink-0" />

                  {item}
                </li>
              )}
            </ul>
          </div>

          {/* Working Style */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--text)]">
              <MessageSquare
                size={16}
                className="text-emerald-500 dark:text-emerald-400" />

              Working Style
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-[18px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-2">
                <span className="text-xs text-[var(--text-muted)]">
                  Communication
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-[var(--text)]">
                  {match.workingStyle.async ?
                  <Globe size={12} /> :

                  <MessageSquare size={12} />
                  }
                  {match.workingStyle.async ? 'Async-first' : 'Synchronous'}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-[18px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-2">
                <span className="text-xs text-[var(--text-muted)]">
                  Timezone Overlap
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-[var(--text)]">
                  <Clock size={12} />
                  {match.workingStyle.timezoneOverlap} hours
                </span>
              </div>
              <div className="flex items-center justify-between rounded-[18px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-2">
                <span className="text-xs text-[var(--text-muted)]">
                  Meetings
                </span>
                <span className="text-xs font-medium text-[var(--text)]">
                  {match.workingStyle.meetings}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Footer */}
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 rounded-full px-3 py-2 text-left text-xs font-medium text-[var(--text-muted)] transition-colors hover:bg-[color:var(--bg-muted)] hover:text-[var(--text)]">

          {expanded ?
          <>
              <ChevronUp size={14} /> Less details
            </> :

          <>
              <ChevronDown size={14} /> More details
            </>
          }
        </button>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-center lg:justify-end lg:gap-3">
          <button
            onClick={() => onAction(match.id, 'pass')}
            className="px-4 py-2 text-left text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text)] sm:text-center">

            Pass
          </button>
          <button
            onClick={() => onAction(match.id, 'maybe')}
            className="premium-button-secondary rounded-2xl px-4 py-2 text-left text-sm font-medium shadow-sm transition-colors sm:text-center">

            Maybe Later
          </button>
          <button
            onClick={() => onAction(match.id, 'micro')}
            className="rounded-2xl border border-[var(--border)] bg-[rgba(91,191,167,0.12)] px-4 py-2 text-left text-sm font-medium text-[var(--success)] shadow-sm transition-colors hover:bg-[rgba(91,191,167,0.18)] sm:text-center">

            Try 7-day Micro-Collab
          </button>
          <button
            onClick={() => onAction(match.id, 'interested')}
            className="premium-button flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all">

            Interested
          </button>
        </div>
      </div>
    </div>);

}
