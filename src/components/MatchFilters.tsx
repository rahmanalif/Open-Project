import React from 'react';
import { Filter, SlidersHorizontal, Clock, Briefcase } from 'lucide-react';
interface MatchFiltersProps {
  minConfidence: number;
  onConfidenceChange: (value: number) => void;
}
export function MatchFilters({
  minConfidence,
  onConfidenceChange
}: MatchFiltersProps) {
  return (
    <div className="premium-soft-panel mb-6 flex flex-col gap-4 rounded-[30px] p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-4">
        <div className="premium-pill flex items-center gap-2 rounded-full px-4 py-2 text-sm shadow-sm transition-colors">
          <Briefcase size={14} className="text-[var(--accent)]" />
          <span>Role: UI Designer</span>
        </div>

        <div className="premium-pill flex items-center gap-2 rounded-full px-4 py-2 text-sm shadow-sm transition-colors">
          <Clock size={14} className="text-[var(--success)]" />
          <span>Commitment: Part-time</span>
        </div>

        <div className="hidden h-4 w-px bg-[var(--border)] xl:mx-2 xl:block" />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
            Confidence Threshold
          </span>
          <div className="premium-button-secondary flex items-center gap-3 rounded-full px-4 py-2 shadow-sm">
            <input
              type="range"
              min="70"
              max="99"
              value={minConfidence}
              onChange={(e) => onConfidenceChange(parseInt(e.target.value))}
              className="h-1 w-28 cursor-pointer appearance-none rounded-lg bg-[color:var(--bg-muted)] accent-[var(--accent)] sm:w-32" />

            <span className="text-sm font-bold text-[var(--accent)]">
              {minConfidence}%+
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button className="premium-button-secondary rounded-2xl p-2 transition-colors">
          <Filter size={16} />
        </button>
        <button className="premium-button-secondary rounded-2xl p-2 transition-colors">
          <SlidersHorizontal size={16} />
        </button>
      </div>
    </div>);

}
