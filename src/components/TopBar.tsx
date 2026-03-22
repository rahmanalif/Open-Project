import React, { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown, Plus } from 'lucide-react';

interface TopBarProps {
  onNewProject?: () => void;
  onFilterChange?: (filters: FilterState) => void;
  onSortChange?: (sort: SortOption) => void;
  onSearchChange?: (query: string) => void;
  showProjectControls?: boolean;
}

export interface FilterState {
  roles: string[];
  commitment: string[];
  matchScore: number[];
}

export type SortOption = 'relevance' | 'match-score' | 'recent';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'match-score', label: 'Match Score' },
  { value: 'recent', label: 'Most Recent' }
];

export function TopBar({
  onNewProject,
  onFilterChange,
  onSortChange,
  onSearchChange,
  showProjectControls = false
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
    onSearchChange?.(value);
  };

  const handleSortSelect = (sort: SortOption) => {
    setCurrentSort(sort);
    setShowSort(false);
    onSortChange?.(sort);
  };

  const handleFilterChange = (key: keyof FilterState, value: string[] | number[]) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const toggleRole = (role: string) => {
    const newRoles = filters.roles.includes(role)
      ? filters.roles.filter((r) => r !== role)
      : [...filters.roles, role];
    handleFilterChange('roles', newRoles);
  };

  const toggleCommitment = (commitment: string) => {
    const newCommitments = filters.commitment.includes(commitment)
      ? filters.commitment.filter((c) => c !== commitment)
      : [...filters.commitment, commitment];
    handleFilterChange('commitment', newCommitments);
  };

  const clearFilters = () => {
    const emptyFilters = {
      roles: [],
      commitment: [],
      matchScore: [0, 100]
    };
    setFilters(emptyFilters);
    onFilterChange?.(emptyFilters);
  };

  const activeFilterCount = filters.roles.length + filters.commitment.length;

  return (
    <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6">
      <div className="premium-panel flex flex-col gap-3 rounded-[28px] px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div className="ml-12 flex max-w-none flex-1 items-center md:ml-0 md:max-w-xl">
          <div className="group relative w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-colors group-focus-within:text-[var(--accent)]"
              size={16}
            />
            <input
              type="text"
              placeholder="Search projects, roles, or collaborators..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="premium-input h-11 w-full rounded-2xl pl-10 pr-4 text-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:justify-end md:gap-3">
          {showProjectControls && (
            <div className="flex flex-wrap items-center gap-2 md:mr-1 md:border-r md:border-[var(--border)] md:pr-4">
              <div className="relative">
                <button
                  onClick={() => setShowFilter((prev) => !prev)}
                  className="premium-button-secondary flex h-10 items-center gap-2 rounded-2xl px-4 text-sm font-medium transition-colors"
                >
                  <SlidersHorizontal size={14} />
                  <span>Filter</span>
                  {activeFilterCount > 0 && (
                    <span className="ml-1 rounded-full bg-[color:var(--accent-soft)] px-1.5 py-0.5 text-xs font-semibold text-[var(--accent)]">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {showFilter && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowFilter(false)} />
                    <div className="premium-panel absolute right-0 top-12 z-20 w-[min(21rem,calc(100vw-2rem))] rounded-[24px] p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-[var(--text)]">Filters</h3>
                        {activeFilterCount > 0 && (
                          <button onClick={clearFilters} className="text-xs text-[var(--accent)] hover:underline">
                            Clear all
                          </button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-xs font-medium text-[var(--text-muted)]">Role</h4>
                          <div className="space-y-2">
                            {[
                              'Frontend Developer',
                              'Backend Developer',
                              'Product Designer',
                              'Product Manager',
                              'Data Scientist',
                              'DevOps Engineer'
                            ].map((role) => (
                              <label key={role} className="flex cursor-pointer items-center gap-2 text-[var(--text)]">
                                <input
                                  type="checkbox"
                                  checked={filters.roles.includes(role)}
                                  onChange={() => toggleRole(role)}
                                  className="h-4 w-4 rounded border-[var(--border-strong)] text-[var(--accent)] focus:ring-[var(--accent)]"
                                />
                                <span className="text-sm">{role}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="mb-2 text-xs font-medium text-[var(--text-muted)]">Commitment</h4>
                          <div className="space-y-2">
                            {['5-10 hrs/week', '10-20 hrs/week', '20+ hrs/week', 'Full-time', 'Project-based'].map(
                              (commitment) => (
                                <label key={commitment} className="flex cursor-pointer items-center gap-2 text-[var(--text)]">
                                  <input
                                    type="checkbox"
                                    checked={filters.commitment.includes(commitment)}
                                    onChange={() => toggleCommitment(commitment)}
                                    className="h-4 w-4 rounded border-[var(--border-strong)] text-[var(--accent)] focus:ring-[var(--accent)]"
                                  />
                                  <span className="text-sm">{commitment}</span>
                                </label>
                              )
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="mb-2 text-xs font-medium text-[var(--text-muted)]">Minimum Match Score</h4>
                          <div className="flex items-center gap-3">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              step="10"
                              value={filters.matchScore[0]}
                              onChange={(e) => handleFilterChange('matchScore', [parseInt(e.target.value, 10), 100])}
                              className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-[color:var(--bg-muted)] accent-[var(--accent)]"
                            />
                            <span className="w-12 text-right text-sm font-semibold text-[var(--text)]">
                              {filters.matchScore[0]}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowSort((prev) => !prev)}
                  className="premium-button-secondary flex h-10 items-center gap-2 rounded-2xl px-4 text-sm font-medium transition-colors"
                >
                  <span>Sort: {SORT_OPTIONS.find((s) => s.value === currentSort)?.label}</span>
                  <ChevronDown size={14} className="text-[var(--text-muted)]" />
                </button>

                {showSort && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowSort(false)} />
                    <div className="premium-panel absolute right-0 top-12 z-20 w-48 max-w-[calc(100vw-2rem)] rounded-[22px] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleSortSelect(option.value)}
                          className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                            currentSort === option.value
                              ? 'bg-[color:var(--accent-soft)] font-medium text-[var(--accent)]'
                              : 'text-[var(--text)] hover:bg-[color:var(--bg-muted)]'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <button
            onClick={onNewProject}
            className="premium-button flex h-11 items-center gap-2 rounded-2xl px-4 text-sm font-semibold transition-all"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">New Project</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>
    </header>
  );
}
