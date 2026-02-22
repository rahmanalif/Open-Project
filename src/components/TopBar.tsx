import React, { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown, Plus } from 'lucide-react';
interface TopBarProps {
  onNewProject?: () => void;
  onFilterChange?: (filters: FilterState) => void;
  onSortChange?: (sort: SortOption) => void;
  onSearchChange?: (query: string) => void;
}
export interface FilterState {
  roles: string[];
  commitment: string[];
  matchScore: number[];
}
export type SortOption = 'relevance' | 'match-score' | 'recent';
const SORT_OPTIONS: {
  value: SortOption;
  label: string;
}[] = [
{
  value: 'relevance',
  label: 'Relevance'
},
{
  value: 'match-score',
  label: 'Match Score'
},
{
  value: 'recent',
  label: 'Most Recent'
}];

export function TopBar({
  onNewProject,
  onFilterChange,
  onSortChange,
  onSearchChange
}: TopBarProps) {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSort, setCurrentSort] = useState<SortOption>('relevance');
  const [filters, setFilters] = useState<FilterState>({
    roles: [],
    commitment: [],
    matchScore: [0, 100]
  });
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };
  const handleSortSelect = (sort: SortOption) => {
    setCurrentSort(sort);
    setShowSort(false);
    if (onSortChange) {
      onSortChange(sort);
    }
  };
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };
  const toggleRole = (role: string) => {
    const newRoles = filters.roles.includes(role) ?
    filters.roles.filter((r) => r !== role) :
    [...filters.roles, role];
    handleFilterChange('roles', newRoles);
  };
  const toggleCommitment = (commitment: string) => {
    const newCommitment = filters.commitment.includes(commitment) ?
    filters.commitment.filter((c) => c !== commitment) :
    [...filters.commitment, commitment];
    handleFilterChange('commitment', newCommitment);
  };
  const clearFilters = () => {
    const emptyFilters = {
      roles: [],
      commitment: [],
      matchScore: [0, 100]
    };
    setFilters(emptyFilters);
    if (onFilterChange) {
      onFilterChange(emptyFilters);
    }
  };
  const activeFilterCount = filters.roles.length + filters.commitment.length;
  return (
    <header className="h-14 bg-white dark:bg-[#141416] border-b border-gray-200 dark:border-[#27272a] sticky top-0 z-10 flex items-center justify-between px-6 transition-colors duration-200">
      {/* Left: Search */}
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full group">
          <Search
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-gray-600 dark:group-focus-within:text-gray-300 transition-colors"
            size={16} />

          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full h-9 pl-9 pr-4 bg-gray-50 dark:bg-[#0a0a0b] border border-transparent dark:border-[#27272a] rounded-md text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-[#1f1f23] focus:border-gray-300 dark:focus:border-[#3f3f46] focus:outline-none focus:ring-0 transition-all font-sans" />

        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 border-r border-gray-200 dark:border-[#27272a] pr-3 mr-1">
          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="h-8 px-3 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1f1f23] rounded-md transition-colors border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#141416]">

              <SlidersHorizontal size={14} />
              <span>Filter</span>
              {activeFilterCount > 0 &&
              <span className="ml-1 px-1.5 py-0.5 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-full">
                  {activeFilterCount}
                </span>
              }
            </button>

            {/* Filter Dropdown */}
            {showFilter &&
            <>
                <div
                className="fixed inset-0 z-10"
                onClick={() => setShowFilter(false)} />

                <div className="absolute right-0 top-10 w-80 bg-white dark:bg-[#1f1f23] border border-gray-200 dark:border-[#3f3f46] rounded-lg shadow-lg z-20 p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Filters
                    </h3>
                    {activeFilterCount > 0 &&
                  <button
                    onClick={clearFilters}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline">

                        Clear all
                      </button>
                  }
                  </div>

                  {/* Roles */}
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Role
                    </h4>
                    <div className="space-y-2">
                     {[
                    'Frontend Developer',
                    'Backend Developer',
                    'Product Designer',
                    'Product Manager',
                    'Data Scientist',
                    'DevOps Engineer'].
                    map((role) =>
                    <label
                      key={role}
                      className="flex items-center gap-2 cursor-pointer">

                          <input
                        type="checkbox"
                        checked={filters.roles.includes(role)}
                        onChange={() => toggleRole(role)}
                        className="w-4 h-4 text-blue-600 border-gray-300 dark:border-[#3f3f46] rounded focus:ring-blue-500" />

                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {role}
                          </span>
                        </label>
                    )}
                    </div>
                  </div>

                  {/* Commitment */}
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Commitment
                    </h4>
                    <div className="space-y-2">
                      {[
                    '5-10 hrs/week',
                    '10-20 hrs/week',
                    '20+ hrs/week',
                    'Full-time',
                    'Project-based'].
                    map((commitment) =>
                    <label
                      key={commitment}
                      className="flex items-center gap-2 cursor-pointer">

                          <input
                        type="checkbox"
                        checked={filters.commitment.includes(commitment)}
                        onChange={() => toggleCommitment(commitment)}
                        className="w-4 h-4 text-blue-600 border-gray-300 dark:border-[#3f3f46] rounded focus:ring-blue-500" />

                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {commitment}
                          </span>
                        </label>
                    )}
                    </div>
                  </div>

                  {/* Match Score */}
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Minimum Match Score
                    </h4>
                    <div className="flex items-center gap-3">
                      <input
                      type="range"
                      min="0"
                      max="100"
                      step="10"
                      value={filters.matchScore[0]}
                      onChange={(e) =>
                      handleFilterChange('matchScore', [
                      parseInt(e.target.value),
                      100]
                      )
                      }
                      className="flex-1 h-2 bg-gray-200 dark:bg-[#27272a] rounded-lg appearance-none cursor-pointer accent-blue-600" />

                      <span className="text-sm font-mono font-medium text-gray-900 dark:text-white w-12 text-right">
                        {filters.matchScore[0]}%
                      </span>
                    </div>
                  </div>
                </div>
              </>
            }
          </div>

          {/* Sort Button */}
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="h-8 px-3 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1f1f23] rounded-md transition-colors border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#141416]">

              <span>
                Sort: {SORT_OPTIONS.find((s) => s.value === currentSort)?.label}
              </span>
              <ChevronDown
                size={14}
                className="text-gray-400 dark:text-gray-500" />

            </button>

            {/* Sort Dropdown */}
            {showSort &&
            <>
                <div
                className="fixed inset-0 z-10"
                onClick={() => setShowSort(false)} />

                <div className="absolute right-0 top-10 w-48 bg-white dark:bg-[#1f1f23] border border-gray-200 dark:border-[#3f3f46] rounded-lg shadow-lg z-20 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {SORT_OPTIONS.map((option) =>
                <button
                  key={option.value}
                  onClick={() => handleSortSelect(option.value)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${currentSort === option.value ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a]'}`}>

                      {option.label}
                    </button>
                )}
                </div>
              </>
            }
          </div>
        </div>

        <button
          onClick={onNewProject}
          className="h-8 px-3 flex items-center gap-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-md transition-colors shadow-sm">

          <Plus size={14} />
          <span>New Project</span>
        </button>
      </div>
    </header>);

}
