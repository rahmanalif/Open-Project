import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';
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
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${minutes}:${remainder.toString().padStart(2, '0')}`;
  };

  const handleResetClick = () => {
    if (resetConfirmVisible) {
      onResetMatch();
    } else {
      setResetConfirmVisible(true);
    }
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
    }, 8000);

    cellTimeoutsRef.current.set(cellKey, timeoutId);
  };

  const fields = [
    !!profileData.category,
    !!profileData.matchMode,
    !!profileData.role,
    !!profileData.availability,
    !!profileData.timeline,
    profileData.skills?.length > 0
  ];

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
      return wave > 0.55
        ? 'bg-[var(--success)] shadow-[0_0_10px_rgba(91,191,167,0.75)] animate-pulse'
        : 'bg-[rgba(91,191,167,0.78)] shadow-[0_0_8px_rgba(91,191,167,0.3)]';
    }
    if (matchState === 'searching') {
      return wave > 0.55
        ? 'bg-[var(--accent-strong)] shadow-[0_0_10px_rgba(235,195,141,0.75)] animate-pulse'
        : 'bg-[rgba(208,164,106,0.75)] shadow-[0_0_8px_rgba(208,164,106,0.28)]';
    }
    return wave > 0.55
      ? 'bg-[rgba(243,237,226,0.7)] shadow-[0_0_10px_rgba(243,237,226,0.3)] animate-pulse'
      : 'bg-[rgba(174,162,144,0.5)] shadow-[0_0_8px_rgba(0,0,0,0.15)]';
  };

  const stateTitle =
    matchState === 'idle' ? 'Start Auto Match' : matchState === 'searching' ? 'Scanning for alignment' : 'Strong matches found';
  const stateCopy =
    matchState === 'idle'
      ? 'When you start, the system evaluates role fit, working style, and contribution intent.'
      : matchState === 'searching'
        ? 'We are comparing fit signals across active projects and collaborator needs.'
        : 'Your best-fit results are ready to review. Start with the strongest alignment first.';

  return (
    <div className="premium-panel premium-grid relative overflow-hidden rounded-[34px] p-5 sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(208,164,106,0.14),transparent_38%)]" />

      <div className="relative z-10 flex flex-col gap-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <p className="premium-kicker mb-2">Match Console</p>
            <h2 className="font-display text-3xl text-[var(--text)] sm:text-4xl">{stateTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--text-muted)] sm:text-base">{stateCopy}</p>
          </div>

          <div className="flex max-w-[320px] flex-col items-start gap-3 rounded-[28px] border border-[var(--border)] bg-[color:var(--bg-panel)] px-4 py-4">
            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] ${
                isProfileReady
                  ? 'bg-[rgba(91,191,167,0.12)] text-[var(--success)]'
                  : 'bg-[rgba(180,83,9,0.12)] text-[var(--danger)]'
              }`}
            >
              {isProfileReady ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
              {isProfileReady ? 'Profile Ready' : 'Setup Incomplete'}
            </div>

            <div className="flex gap-2">
              {fields.map((isFilled, idx) => (
                <div
                  key={idx}
                  className={`h-2.5 w-10 rounded-full transition-colors duration-300 ${
                    isFilled ? 'bg-[var(--success)] shadow-[0_0_10px_rgba(91,191,167,0.5)]' : 'bg-[color:var(--bg-muted)]'
                  }`}
                />
              ))}
            </div>

            {!isProfileReady && (
              <button onClick={onFillProfile} className="text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent-strong)]">
                Complete required fields
              </button>
            )}
          </div>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[1fr_260px]">
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={onStartMatch}
              disabled={matchState === 'searching'}
              className={`group relative flex h-56 w-56 items-center justify-center rounded-full transition-all duration-500 sm:h-72 sm:w-72 ${
                matchState === 'idle'
                  ? 'border border-[var(--border)] bg-[radial-gradient(circle_at_center,rgba(243,237,226,0.08),rgba(18,19,21,0.94))] hover:scale-[1.02]'
                  : matchState === 'searching'
                    ? 'border border-[rgba(208,164,106,0.35)] bg-[radial-gradient(circle_at_center,rgba(208,164,106,0.16),rgba(18,19,21,0.96))]'
                    : 'border border-[rgba(91,191,167,0.35)] bg-[radial-gradient(circle_at_center,rgba(91,191,167,0.16),rgba(18,19,21,0.96))]'
              }`}
            >
              {matchState === 'idle' && (
                <>
                  <div className="absolute inset-[-10px] rounded-full border border-[var(--border)] animate-[spin_16s_linear_infinite]" />
                  <div className="absolute inset-[-22px] rounded-full border border-[var(--border)] border-dashed opacity-70 animate-[spin_24s_linear_infinite_reverse]" />
                </>
              )}

              {matchState === 'searching' && (
                <>
                  <div className="absolute inset-[-14px] rounded-full border border-[rgba(208,164,106,0.34)] animate-[ping_2.2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <div className="absolute inset-[-30px] rounded-full border border-[rgba(208,164,106,0.18)] animate-[ping_2.8s_cubic-bezier(0,0,0.2,1)_infinite_0.45s]" />
                  <div className="absolute inset-[-8px] rounded-full border border-[rgba(235,195,141,0.55)] border-t-transparent animate-[spin_1.5s_linear_infinite]" />
                </>
              )}

              {matchState === 'matched' && (
                <>
                  <div className="absolute inset-[-10px] rounded-full border border-[rgba(91,191,167,0.38)]" />
                  <div className="absolute inset-0 rounded-full bg-[rgba(91,191,167,0.08)] animate-pulse" />
                </>
              )}

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-[2px] rounded-full border border-[var(--border)] bg-[rgba(10,10,12,0.88)]" />
                <div className="relative flex flex-col items-center gap-[1px] transition-transform duration-300 group-hover:scale-[1.03]">
                  {circleCells.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex items-center justify-center gap-[1px]">
                      {row.map((isVisible, cellIndex) => {
                        const cellKey = `${rowIndex}-${cellIndex}`;
                        const isHighlighted = highlightedCells.has(cellKey);
                        const isActive = activeCells[cellKey];
                        return (
                          <div
                            key={cellKey}
                            onMouseEnter={isVisible ? () => handleCellTrail(cellKey) : undefined}
                            className={`h-[3px] w-[3px] transition-all duration-150 sm:h-[4px] sm:w-[4px] ${
                              isVisible ? getBaseCellClasses(rowIndex, cellIndex) : 'bg-transparent shadow-none'
                            } ${isHighlighted && isVisible ? '!bg-[#fff8ef] shadow-[0_0_12px_rgba(255,248,239,0.9)]' : ''} ${
                              isActive && isVisible ? '!bg-black !shadow-[0_0_12px_rgba(0,0,0,0.8)]' : ''
                            }`}
                            style={{
                              animationDelay: `${(rowIndex * 45 + cellIndex * 35) % 1400}ms`
                            }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-8 flex items-center gap-2 rounded-full bg-[rgba(255,248,239,0.08)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f3ede2]">
                <Sparkles size={12} className="text-[var(--accent)]" />
                {matchState === 'idle' ? 'Ready to scan' : matchState === 'searching' ? 'Evaluating fit' : 'Results ready'}
              </div>
            </button>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Session</p>
              <p className="mt-3 text-3xl font-semibold text-[var(--text)]">
                {matchState === 'idle' ? '~2m' : formatTime(elapsedTime)}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                {matchState === 'matched'
                  ? 'Match results were found within this scan window.'
                  : 'Average scan time depends on role specificity and project availability.'}
              </p>
            </div>

            <div className="rounded-[28px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Current focus</p>
              <p className="mt-3 text-lg font-semibold text-[var(--text)]">
                {profileData.role || 'No role selected yet'}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                {profileData.category
                  ? `${profileData.category} projects with ${profileData.availability || 'flexible'} availability.`
                  : 'Choose your role and project category to improve recommendation quality.'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex min-h-[44px] items-center justify-center">
          {matchState !== 'idle' && (
            !resetConfirmVisible ? (
              <button
                onClick={handleResetClick}
                className="rounded-full border border-[rgba(180,83,9,0.3)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--danger)] transition-colors hover:bg-[rgba(180,83,9,0.08)]"
              >
                Reset Matchmaking
              </button>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-3 rounded-full border border-[rgba(180,83,9,0.3)] bg-[rgba(180,83,9,0.08)] px-4 py-2 text-sm text-[var(--text)]">
                <span>Reset and lose current results?</span>
                <button onClick={handleResetClick} className="font-semibold text-[var(--danger)]">
                  Confirm
                </button>
                <button onClick={() => setResetConfirmVisible(false)} className="font-semibold text-[var(--text-muted)]">
                  Cancel
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
