import React, { useState } from 'react';
import { Bookmark, ChevronDown, ChevronUp, Users, Clock } from 'lucide-react';
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
}];

export function MatchResultsPanel({ matchState }: MatchResultsPanelProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };
  const getScoreColor = (score: number) => {
    if (score >= 80)
    return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
    return 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
  };
  const getScoreTextColor = (score: number) => {
    if (score >= 80)
    return 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]';
    return 'text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]';
  };
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold text-white mb-4 tracking-wide flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
        Matched Projects
      </h2>

      {matchState === 'idle' &&
      <div className="flex-1 bg-[#0a0a0b] border border-[#27272a] rounded-xl flex flex-col items-center justify-center p-8 text-center min-h-[400px] relative overflow-hidden">
          {/* Subtle grid background */}
          <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }} />

          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 border border-[#27272a] rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-2 border border-[#27272a] rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]" />
            <div className="w-2 h-2 bg-[#3f3f46] rounded-full" />
          </div>
          <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">
            Your matches will appear here once you start.
          </p>
        </div>
      }

      {matchState === 'searching' &&
      <div className="flex-1 min-h-[400px]">
          <ScanningStatus />
        </div>
      }

      {matchState === 'matched' &&
      <div className="space-y-3">
          {MOCK_RESULTS.map((result) =>
        <div
          key={result.id}
          className="bg-[#141416] border border-[#27272a] rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] relative group">

              {/* Left accent border */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#27272a] group-hover:bg-blue-500/50 transition-colors" />

              {/* Main Row */}
              <div
            className="p-4 pl-5 flex items-center gap-4 cursor-pointer"
            onClick={() => toggleRow(result.id)}>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="text-base font-bold text-white truncate tracking-wide">
                      {result.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 whitespace-nowrap">
                      {result.domain}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400 font-mono text-xs">
                    <span className="text-gray-300">{result.role}</span>
                    <span className="flex items-center gap-1.5">
                      <Users size={14} className="text-gray-500" />{' '}
                      {result.members}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-gray-500" /> {result.eta}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  {/* Score */}
                  <div className="flex flex-col items-end">
                    <span
                  className={`text-2xl font-bold font-mono leading-none mb-1.5 ${getScoreTextColor(result.score)}`}>

                      {result.score}%
                    </span>
                    <div className="w-16 h-1 bg-[#27272a] rounded-full overflow-hidden">
                      <div
                    className={`h-full rounded-full ${getScoreColor(result.score)}`}
                    style={{
                      width: `${result.score}%`
                    }} />

                    </div>
                  </div>

                  {/* Actions */}
                  <div
                className="flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}>

                    <button className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-full transition-colors">
                      <Bookmark size={18} />
                    </button>
                    <button className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-500 transition-colors shadow-[0_0_10px_rgba(37,99,235,0.3)] hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                      Join
                    </button>
                  </div>

                  <div className="text-gray-500 group-hover:text-gray-300 transition-colors">
                    {expandedRow === result.id ?
                <ChevronUp size={20} /> :

                <ChevronDown size={20} />
                }
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              <div
            className={`bg-[#0a0a0b] border-t border-[#27272a] transition-all duration-300 ease-in-out overflow-hidden ${expandedRow === result.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>

                <div className="p-4 pl-5 grid grid-cols-3 gap-8">
                  <div>
                    <div className="flex justify-between text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                      <span>Skills Match</span>
                      <span className="text-white">{result.skillsMatch}%</span>
                    </div>
                    <div className="w-full h-1 bg-[#27272a] rounded-full overflow-hidden">
                      <div
                    className="h-full bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                    style={{
                      width: `${result.skillsMatch}%`
                    }} />

                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                      <span>Availability</span>
                      <span className="text-white">
                        {result.availabilityMatch}%
                      </span>
                    </div>
                    <div className="w-full h-1 bg-[#27272a] rounded-full overflow-hidden">
                      <div
                    className="h-full bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                    style={{
                      width: `${result.availabilityMatch}%`
                    }} />

                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                      <span>Working Style</span>
                      <span className="text-white">
                        {result.workingStyleMatch}%
                      </span>
                    </div>
                    <div className="w-full h-1 bg-[#27272a] rounded-full overflow-hidden">
                      <div
                    className="h-full bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                    style={{
                      width: `${result.workingStyleMatch}%`
                    }} />

                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}
        </div>
      }
    </div>);

}