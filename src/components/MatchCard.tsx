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
    return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20';
    if (score >= 80)
    return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20';
    return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20';
  };
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Idea':
        return 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-500/20';
      case 'Prototype':
        return 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20';
      case 'Active Development':
        return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20';
      default:
        return 'bg-gray-50 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-500/20';
    }
  };
  if (match.status === 'pending' || match.status === 'micro-commitment') {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm opacity-75 transition-colors dark:border-[#27272a] dark:bg-[#141416] sm:p-6">
        <div className="flex items-start gap-4 sm:items-center">
          <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Clock size={20} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              {match.status === 'micro-commitment' ? 'Micro-Collab Requested' : 'Interest Expressed'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
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
    <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-[#27272a] rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header Section */}
      <div className="border-b border-gray-100 p-4 dark:border-[#27272a] sm:p-6">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2 sm:gap-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white break-words">
                {match.projectName}
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStageColor(match.projectStage)}`}>

                {match.projectStage}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-[#27272a] px-2 py-1 rounded text-gray-700 dark:text-gray-300 font-medium">
                <Briefcase size={14} />
                {match.role}
              </span>
              <span className="hidden sm:inline text-gray-400 dark:text-gray-500">•</span>
              <span className="font-mono text-xs">{match.commitment}</span>
              <span className="hidden sm:inline text-gray-400 dark:text-gray-500">•</span>
              <span className="font-mono text-xs">{match.duration}</span>
            </div>
          </div>

          <div
            className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg border self-start sm:self-auto ${getScoreColor(match.matchScore)}`}>

            <span className="text-lg font-bold font-mono leading-none">
              {match.matchScore}%
            </span>
            <span className="text-[10px] font-medium uppercase mt-1">
              Match
            </span>
          </div>
        </div>

        {/* Why this match */}
        <div className="rounded-lg border border-blue-100/50 bg-blue-50/50 p-4 dark:border-blue-500/10 dark:bg-blue-500/5">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Why this match
              </h4>
              <ul className="space-y-1.5">
                {match.reasoning.map((reason, idx) =>
                <li
                  key={idx}
                  className="text-sm text-blue-800 dark:text-blue-300/80 flex items-start gap-2">

                    <span className="w-1 h-1 rounded-full bg-blue-400 dark:bg-blue-500 mt-2 flex-shrink-0" />
                    {reason}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className="rounded-md bg-gray-50 dark:bg-[#0a0a0b] border border-gray-200 dark:border-[#27272a] p-2">
            <p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Skill Fit
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {match.breakdown.skillFit}%
            </p>
          </div>
          <div className="rounded-md bg-gray-50 dark:bg-[#0a0a0b] border border-gray-200 dark:border-[#27272a] p-2">
            <p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Availability
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {match.breakdown.availabilityFit}%
            </p>
          </div>
          <div className="rounded-md bg-gray-50 dark:bg-[#0a0a0b] border border-gray-200 dark:border-[#27272a] p-2">
            <p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Style Fit
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {match.breakdown.styleFit}%
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown (Expandable) */}
      <div
        className={`bg-gray-50 dark:bg-[#0a0a0b] border-b border-gray-100 dark:border-[#27272a] transition-all duration-300 ease-in-out ${expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>

        <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 md:grid-cols-3">
          {/* Complementarity */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-gray-900 dark:text-white font-medium text-sm">
              <Target
                size={16}
                className="text-purple-500 dark:text-purple-400" />

              Skill Complementarity
            </div>
            <ul className="space-y-2">
              {match.complementarity.map((item, idx) =>
              <li
                key={idx}
                className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2 bg-white dark:bg-[#141416] p-2 rounded border border-gray-200 dark:border-[#27272a]">

                  <CheckCircle2
                  size={12}
                  className="text-purple-500 dark:text-purple-400 mt-0.5 flex-shrink-0" />

                  {item}
                </li>
              )}
            </ul>
          </div>

          {/* Intent */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-gray-900 dark:text-white font-medium text-sm">
              <Users size={16} className="text-amber-500 dark:text-amber-400" />
              Intent Alignment
            </div>
            <ul className="space-y-2">
              {match.intentAlignment.map((item, idx) =>
              <li
                key={idx}
                className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2 bg-white dark:bg-[#141416] p-2 rounded border border-gray-200 dark:border-[#27272a]">

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
            <div className="flex items-center gap-2 mb-3 text-gray-900 dark:text-white font-medium text-sm">
              <MessageSquare
                size={16}
                className="text-emerald-500 dark:text-emerald-400" />

              Working Style
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-white dark:bg-[#141416] p-2 rounded border border-gray-200 dark:border-[#27272a]">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  Communication
                </span>
                <span className="text-xs font-medium text-gray-900 dark:text-white flex items-center gap-1">
                  {match.workingStyle.async ?
                  <Globe size={12} /> :

                  <MessageSquare size={12} />
                  }
                  {match.workingStyle.async ? 'Async-first' : 'Synchronous'}
                </span>
              </div>
              <div className="flex items-center justify-between bg-white dark:bg-[#141416] p-2 rounded border border-gray-200 dark:border-[#27272a]">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  Timezone Overlap
                </span>
                <span className="text-xs font-medium text-gray-900 dark:text-white flex items-center gap-1">
                  <Clock size={12} />
                  {match.workingStyle.timezoneOverlap} hours
                </span>
              </div>
              <div className="flex items-center justify-between bg-white dark:bg-[#141416] p-2 rounded border border-gray-200 dark:border-[#27272a]">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  Meetings
                </span>
                <span className="text-xs font-medium text-gray-900 dark:text-white">
                  {match.workingStyle.meetings}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Footer */}
      <div className="flex flex-col gap-3 bg-white p-4 dark:bg-[#141416] sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 rounded px-2 py-1 text-left text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-[#27272a] dark:hover:text-white">

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
            className="px-4 py-2 text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-left sm:text-center">

            Pass
          </button>
          <button
            onClick={() => onAction(match.id, 'maybe')}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-[#3f3f46] dark:bg-[#141416] dark:text-gray-300 dark:hover:bg-[#1f1f23] sm:text-center">

            Maybe Later
          </button>
          <button
            onClick={() => onAction(match.id, 'micro')}
            className="rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-left text-sm font-medium text-blue-700 shadow-sm transition-colors hover:bg-blue-100 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20 sm:text-center">

            Try 7-day Micro-Collab
          </button>
          <button
            onClick={() => onAction(match.id, 'interested')}
            className="flex items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">

            Interested
          </button>
        </div>
      </div>
    </div>);

}
