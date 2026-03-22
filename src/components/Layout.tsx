import React from 'react';
import { Sidebar, Tab } from './Sidebar';
import { TopBar, FilterState, SortOption } from './TopBar';
interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onNewProject: () => void;
  isMatchingActive?: boolean;
  currentUser?: {
    name: string;
    initials: string;
    role: string;
  };
  onLogout?: () => void;
  onFilterChange?: (filters: FilterState) => void;
  onSortChange?: (sort: SortOption) => void;
  onSearchChange?: (query: string) => void;
}
export function Layout({
  children,
  activeTab,
  onTabChange,
  onNewProject,
  isMatchingActive = false,
  currentUser,
  onLogout,
  onFilterChange,
  onSortChange,
  onSearchChange
}: LayoutProps) {
  return (
    <div className="premium-shell flex min-h-screen text-[var(--text)] transition-colors duration-300">
      <Sidebar
        activeTab={activeTab}
        onTabChange={onTabChange}
        isMatchingActive={isMatchingActive}
        currentUser={currentUser}
        onLogout={onLogout} />

      <div className="flex min-w-0 flex-1 flex-col md:ml-[264px]">
        <TopBar
          onNewProject={onNewProject}
          onFilterChange={onFilterChange}
          onSortChange={onSortChange}
          onSearchChange={onSearchChange}
          showProjectControls={activeTab === 'projects'} />

        <main className="flex-1 overflow-auto px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>);

}
