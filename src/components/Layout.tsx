import React from 'react';
import { Sidebar, Tab } from './Sidebar';
import { TopBar, FilterState, SortOption } from './TopBar';
interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onNewProject: () => void;
  showMatchingPulse?: boolean;
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
  showMatchingPulse,
  currentUser,
  onLogout,
  onFilterChange,
  onSortChange,
  onSearchChange
}: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0a0a0b] font-sans text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Sidebar
        activeTab={activeTab}
        onTabChange={onTabChange}
        showMatchingPulse={showMatchingPulse}
        currentUser={currentUser}
        onLogout={onLogout} />

      <div className="flex-1 ml-[240px] flex flex-col min-w-0">
        <TopBar
          onNewProject={onNewProject}
          onFilterChange={onFilterChange}
          onSortChange={onSortChange}
          onSearchChange={onSearchChange} />

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>);

}
