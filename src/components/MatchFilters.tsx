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
    <div className="mb-6 flex flex-col gap-4 p-1 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-4">
        <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-[#27272a] dark:bg-[#141416] dark:text-gray-300 dark:hover:bg-[#1f1f23]">
          <Briefcase size={14} className="text-gray-500 dark:text-gray-400" />
          <span>Role: UI Designer</span>
        </div>

        <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-[#27272a] dark:bg-[#141416] dark:text-gray-300 dark:hover:bg-[#1f1f23]">
          <Clock size={14} className="text-gray-500 dark:text-gray-400" />
          <span>Commitment: Part-time</span>
        </div>

        <div className="hidden h-4 w-px bg-gray-300 dark:bg-[#3f3f46] xl:block xl:mx-2" />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Confidence Threshold
          </span>
          <div className="flex items-center gap-3 rounded-md border border-gray-200 bg-white px-3 py-1.5 shadow-sm dark:border-[#27272a] dark:bg-[#141416]">
            <input
              type="range"
              min="70"
              max="99"
              value={minConfidence}
              onChange={(e) => onConfidenceChange(parseInt(e.target.value))}
              className="h-1 w-28 sm:w-32 bg-gray-200 dark:bg-[#27272a] rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500" />

            <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">
              {minConfidence}%+
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-md transition-colors">
          <Filter size={16} />
        </button>
        <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-md transition-colors">
          <SlidersHorizontal size={16} />
        </button>
      </div>
    </div>);

}
