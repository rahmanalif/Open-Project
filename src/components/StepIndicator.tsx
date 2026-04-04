import React from 'react';
import { Check } from 'lucide-react';
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}
export function StepIndicator({
  currentStep,
  totalSteps,
  labels
}: StepIndicatorProps) {
  return (
    <div className="border-b border-[var(--border)] bg-[color:var(--bg-elevated)] px-4 py-2.5 sm:px-6 lg:px-7 lg:py-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Creation flow</p>
          <p className="mt-0.5 text-sm text-[var(--text-muted)]">
            Step {currentStep} of {totalSteps}: {labels[currentStep - 1]}
          </p>
        </div>
        <div className="w-fit rounded-full border border-[var(--border)] bg-[color:var(--bg-panel)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          {Math.round((currentStep / totalSteps) * 100)}% complete
        </div>
      </div>

      <div className="scrollbar-hidden -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="relative flex min-w-[520px] items-start justify-between gap-2 sm:min-w-0 sm:gap-4">
        <div className="absolute left-0 right-0 top-5 h-px bg-[var(--border)]" />
        <div
          className="absolute left-0 top-5 h-px bg-[linear-gradient(90deg,var(--accent-strong),var(--accent),var(--success))] transition-all duration-500"
          style={{
            width: `${(currentStep - 1) / (totalSteps - 1) * 100}%`
          }} />

        {labels.map((label, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          return (
            <div
              key={label}
              className="relative z-10 flex min-w-0 flex-1 flex-col items-center gap-2 bg-[color:var(--bg-elevated)] px-1 text-center"
            >
              <div
                className={`
                  flex h-10 w-10 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-200
                  ${isCompleted ? 'border-[color:var(--success)] bg-[rgba(91,191,167,0.14)] text-[var(--success)]' : ''}
                  ${isCurrent ? 'border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[var(--text)] shadow-[0_12px_28px_rgba(0,0,0,0.18)]' : ''}
                  ${!isCompleted && !isCurrent ? 'border-[var(--border)] bg-[color:var(--bg-panel)] text-[var(--text-muted)]' : ''}
                `}
              >
                {isCompleted ? <Check size={14} /> : stepNum}
              </div>

              <div className="min-h-[1.35rem] sm:min-h-[1.6rem]">
                <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${isCurrent ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                  {label}
                </p>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
