import React, { useEffect, useRef, useState } from 'react';
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
  const [activeCells, setActiveCells] = useState<Record<string, boolean>>({});
  const cellTimeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
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
  useEffect(() => {
    return () => {
      cellTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
      cellTimeoutsRef.current.clear();
    };
  }, []);
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
  const handleCellTrail = (cellKey: string) => {
    setActiveCells((prev) => ({
      ...prev,
      [cellKey]: true
    }));

    const existingTimeout = cellTimeoutsRef.current.get(cellKey);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    const timeoutId = setTimeout(() => {
      setActiveCells((prev) => {
        const next = { ...prev };
        delete next[cellKey];
        return next;
      });
      cellTimeoutsRef.current.delete(cellKey);
    }, 10000);

    cellTimeoutsRef.current.set(cellKey, timeoutId);
  };
  // 6 fields to check for completeness
  const fields = [
  !!profileData.category,
  !!profileData.matchMode,
  !!profileData.role,
  !!profileData.availability,
  !!profileData.timeline,
  profileData.skills?.length > 0];
  const circleGridSize = 42;
  const circleRadius = 20;
  const circleCells = Array.from({ length: circleGridSize }, (_, rowIndex) =>
  Array.from({ length: circleGridSize }, (_, columnIndex) => {
    const offsetX = columnIndex - (circleGridSize - 1) / 2;
    const offsetY = rowIndex - (circleGridSize - 1) / 2;
    return offsetX * offsetX + offsetY * offsetY <= circleRadius * circleRadius;
  })
  );
  const highlightedCells = new Set(['8-14', '10-29', '12-32', '15-20', '18-11', '20-34']);
  const getBaseCellClasses = (rowIndex: number, cellIndex: number) => {
    const wave = (Math.sin((rowIndex + cellIndex) / 3) + 1) / 2;
    if (matchState === 'matched') {
      return wave > 0.55 ?
      'bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.7)] animate-pulse' :
      'bg-emerald-400/75 shadow-[0_0_8px_rgba(52,211,153,0.35)]';
    }
    if (matchState === 'searching') {
      return wave > 0.55 ?
      'bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.75)] animate-pulse' :
      'bg-blue-400/75 shadow-[0_0_8px_rgba(96,165,250,0.35)]';
    }
    return wave > 0.55 ?
    'bg-blue-300 shadow-[0_0_10px_rgba(147,197,253,0.7)] animate-pulse' :
    'bg-blue-500/70 shadow-[0_0_8px_rgba(59,130,246,0.3)]';
  };
  return (
    <div className="bg-[#0a0a0b] border border-[#27272a] rounded-2xl p-4 sm:p-8 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col items-center justify-center min-h-[420px] sm:min-h-[500px]">
      {/* Circuit board texture background */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          backgroundPosition: 'center center'
        }} />


      {/* Profile Readiness Badge */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex max-w-[55%] sm:max-w-none flex-col items-end z-10">
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
      <div className="flex flex-col items-center mt-8 sm:mt-12 relative z-10 w-full">
        <button
          onClick={onStartMatch}
          disabled={matchState === 'searching'}
          className={`relative group flex flex-col items-center justify-center w-44 h-44 sm:w-56 sm:h-56 rounded-full transition-all duration-500 ${matchState === 'idle' ? 'bg-black border border-[#27272a] hover:border-blue-500/50 hover:scale-105 shadow-[0_0_30px_rgba(0,0,0,0.7)] cursor-pointer' : matchState === 'searching' ? 'bg-blue-600/10 border border-blue-500 shadow-[0_0_50px_rgba(37,99,235,0.4)] cursor-default' : 'bg-emerald-500/10 border border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.4)] cursor-default'}`}>

          {/* Idle Rings */}
          {matchState === 'idle' &&
          <>
              <div className="absolute inset-[-8px] sm:inset-[-10px] border border-[#27272a] rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-[-14px] sm:inset-[-20px] border border-[#27272a] rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-[-20px] sm:inset-[-30px] border border-[#27272a] rounded-full opacity-50" />
            </>
          }

          {/* Searching Rings */}
          {matchState === 'searching' &&
          <>
              <div className="absolute inset-[-14px] sm:inset-[-20px] border-2 border-blue-500/40 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
              <div className="absolute inset-[-24px] sm:inset-[-40px] border border-blue-500/20 rounded-full animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]" />
              <div className="absolute inset-[-8px] sm:inset-[-10px] border-2 border-blue-500/60 rounded-full border-t-transparent animate-[spin_1.5s_linear_infinite]" />
              <div className="absolute inset-[-18px] sm:inset-[-30px] border border-blue-500/30 rounded-full border-b-transparent animate-[spin_2s_linear_infinite_reverse]" />
            </>
          }

          {/* Matched Rings */}
          {matchState === 'matched' &&
          <>
              <div className="absolute inset-[-8px] sm:inset-[-10px] border-2 border-emerald-500/50 rounded-full" />
              <div className="absolute inset-[-14px] sm:inset-[-20px] border border-emerald-500/30 rounded-full" />
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-pulse" />
            </>
          }

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-[1px] rounded-full bg-[#050505] border border-[#111113]" />
            <div className="relative flex flex-col items-center gap-[1px] transition-transform duration-300 group-hover:scale-105">
              {circleCells.map((row, rowIndex) =>
              <div key={rowIndex} className="flex items-center justify-center gap-[1px]">
                  {row.map((isVisible, cellIndex) =>
                {
                  const cellKey = `${rowIndex}-${cellIndex}`;
                  const isHighlighted = highlightedCells.has(cellKey);
                  const isActive = activeCells[cellKey];
                  const isCircleCell = isVisible;
                  return (
                <div
                  key={cellKey}
                  onMouseEnter={isCircleCell ? () => handleCellTrail(cellKey) : undefined}
                  className={`h-[3px] w-[3px] sm:h-[4px] sm:w-[4px] transition-all duration-150 ${isCircleCell ? getBaseCellClasses(rowIndex, cellIndex) : 'bg-transparent shadow-none'} ${isHighlighted && isCircleCell ? '!bg-white shadow-[0_0_10px_rgba(255,255,255,0.95)]' : ''} ${isActive && isCircleCell ? '!bg-black !shadow-[0_0_12px_rgba(0, 0, 0, 0.8)]' : ''}`}
                  style={{
                    animationDelay: `${(rowIndex * 45 + cellIndex * 35) % 1400}ms`
                  }} />
                  );
                }

                )}
                </div>

              )}
            </div>
          </div>
        </button>

        <h3
          className={`mt-8 sm:mt-12 text-xl sm:text-2xl font-bold tracking-wide transition-colors duration-300 ${matchState === 'idle' ? 'text-white' : matchState === 'searching' ? 'text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]' : 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]'}`}>

          {matchState === 'idle' && 'Start Auto Match'}
          {matchState === 'searching' && 'Searching...'}
          {matchState === 'matched' && 'Matches Found'}
        </h3>

        <div className="mt-4 max-w-full text-sm font-bold font-mono tracking-widest text-gray-400 bg-[#141416] px-4 sm:px-5 py-2 rounded-full border border-[#27272a] shadow-inner">
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
