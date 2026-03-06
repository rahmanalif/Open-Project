import React, { useEffect, useState } from 'react';
import { Target, Radio, Check, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { MatchState } from './MatchResultsPanel';
interface AutoMatchHeroCardProps {
  matchState: MatchState;
  onStartMatch: () => void;
  onResetMatch: () => void;
  isProfileReady: boolean;
  onFillProfile: () => void;
  profileData: any;
}
export function AutoMatchHeroCard({
  matchState,
  onStartMatch,
  onResetMatch,
  isProfileReady,
  onFillProfile,
  profileData
}: AutoMatchHeroCardProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [resetConfirmVisible, setResetConfirmVisible] = useState(false);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (matchState === 'searching') {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else if (matchState === 'idle') {
      setElapsedTime(0);
      setResetConfirmVisible(false);
    }
    return () => clearInterval(interval);
  }, [matchState]);
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };
  const handleResetClick = () => {
    if (resetConfirmVisible) {
      onResetMatch();
    } else {
      setResetConfirmVisible(true);
    }
  };
  const handleCancelReset = () => {
    setResetConfirmVisible(false);
  };
  // 6 fields to check for completeness
  const fields = [
  !!profileData.category,
  !!profileData.matchMode,
  !!profileData.role,
  !!profileData.availability,
  !!profileData.timeline,
  profileData.skills?.length > 0];

  return (
    <div className="bg-[#0a0a0b] border border-[#27272a] rounded-2xl p-8 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
      {/* Circuit board texture background */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          backgroundPosition: 'center center'
        }} />


      {/* Profile Readiness Badge */}
      <div className="absolute top-6 right-6 flex flex-col items-end z-10">
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold font-mono tracking-wide border shadow-lg ${isProfileReady ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]'}`}>

          {isProfileReady ?
          <CheckCircle2 size={14} /> :

          <AlertTriangle size={14} />
          }
          {isProfileReady ? 'PROFILE READY' : 'SETUP INCOMPLETE'}
        </div>

        <div className="flex gap-1.5 mt-3 mb-3">
          {fields.map((isFilled, idx) =>
          <div
            key={idx}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${isFilled ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-[#27272a]'}`} />

          )}
        </div>

        {!isProfileReady &&
        <button
          onClick={onFillProfile}
          className="text-xs font-medium text-blue-400 hover:text-blue-300 hover:underline transition-colors">

            Fill Required Fields
          </button>
        }
      </div>

      {/* Center CTA */}
      <div className="flex flex-col items-center mt-12 relative z-10">
        <button
          onClick={onStartMatch}
          disabled={matchState === 'searching'}
          className={`relative group flex flex-col items-center justify-center w-48 h-48 rounded-full transition-all duration-500 ${matchState === 'idle' ? 'bg-[#141416] border border-[#27272a] hover:border-blue-500/50 hover:scale-105 shadow-[0_0_30px_rgba(0,0,0,0.5)] cursor-pointer' : matchState === 'searching' ? 'bg-blue-600/10 border border-blue-500 shadow-[0_0_50px_rgba(37,99,235,0.4)] cursor-default' : 'bg-emerald-500/10 border border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.4)] cursor-default'}`}>

          {/* Idle Rings */}
          {matchState === 'idle' &&
          <>
              <div className="absolute inset-[-10px] border border-[#27272a] rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-[-20px] border border-[#27272a] rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-[-30px] border border-[#27272a] rounded-full opacity-50" />
            </>
          }

          {/* Searching Rings */}
          {matchState === 'searching' &&
          <>
              <div className="absolute inset-[-20px] border-2 border-blue-500/40 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
              <div className="absolute inset-[-40px] border border-blue-500/20 rounded-full animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]" />
              <div className="absolute inset-[-10px] border-2 border-blue-500/60 rounded-full border-t-transparent animate-[spin_1.5s_linear_infinite]" />
              <div className="absolute inset-[-30px] border border-blue-500/30 rounded-full border-b-transparent animate-[spin_2s_linear_infinite_reverse]" />
            </>
          }

          {/* Matched Rings */}
          {matchState === 'matched' &&
          <>
              <div className="absolute inset-[-10px] border-2 border-emerald-500/50 rounded-full" />
              <div className="absolute inset-[-20px] border border-emerald-500/30 rounded-full" />
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-pulse" />
            </>
          }

          <div
            className={`transition-transform duration-300 ${matchState === 'idle' ? 'text-blue-500 group-hover:scale-110 group-hover:text-blue-400' : matchState === 'searching' ? 'text-blue-400' : 'text-emerald-400'}`}>

            {matchState === 'idle' && <Target size={56} strokeWidth={1.5} />}
            {matchState === 'searching' &&
            <Radio size={56} strokeWidth={1.5} className="animate-pulse" />
            }
            {matchState === 'matched' && <Check size={56} strokeWidth={2} />}
          </div>
        </button>

        <h3
          className={`mt-12 text-2xl font-bold tracking-wide transition-colors duration-300 ${matchState === 'idle' ? 'text-white' : matchState === 'searching' ? 'text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]' : 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]'}`}>

          {matchState === 'idle' && 'Start Auto Match'}
          {matchState === 'searching' && 'Searching...'}
          {matchState === 'matched' && 'Matches Found'}
        </h3>

        <div className="mt-4 text-sm font-bold font-mono tracking-widest text-gray-400 bg-[#141416] px-5 py-2 rounded-full border border-[#27272a] shadow-inner">
          {matchState === 'idle' && 'ESTIMATED WAIT: ~2 MIN'}
          {matchState === 'searching' &&
          <span className="text-blue-400">
              ELAPSED: {formatTime(elapsedTime)}
            </span>
          }
          {matchState === 'matched' &&
          <span className="text-emerald-400">
              FOUND IN {formatTime(elapsedTime)}
            </span>
          }
        </div>

        {/* Reset Matchmaking Button Area */}
        <div className="mt-8 h-10 flex items-center justify-center">
          {matchState !== 'idle' &&
          <div className="animate-in fade-in slide-in-from-top-2">
              {!resetConfirmVisible ?
            <button
              onClick={handleResetClick}
              className="px-5 py-1.5 text-xs font-mono font-bold tracking-wider text-red-400 border border-red-500/30 rounded-full hover:bg-red-500/10 hover:border-red-500/60 transition-all shadow-[0_0_10px_rgba(248,113,113,0.1)]">

                  RESET MATCHMAKING
                </button> :

            <div className="flex items-center gap-3 bg-[#141416] px-4 py-1.5 rounded-full border border-red-500/50 shadow-[0_0_15px_rgba(248,113,113,0.2)]">
                  <span className="text-xs font-mono text-gray-300">
                    Reset and lose results?
                  </span>
                  <div className="flex items-center gap-2 border-l border-[#27272a] pl-3">
                    <button
                  onClick={handleResetClick}
                  className="text-xs font-bold text-red-400 hover:text-red-300 uppercase tracking-wider">

                      Confirm
                    </button>
                    <span className="text-gray-600">/</span>
                    <button
                  onClick={handleCancelReset}
                  className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider">

                      Cancel
                    </button>
                  </div>
                </div>
            }
            </div>
          }
        </div>
      </div>
    </div>);

}