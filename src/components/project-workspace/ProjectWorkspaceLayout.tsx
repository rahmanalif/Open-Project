import React from 'react';
import { ProjectSidebar, ProjectTab } from './ProjectSidebar';
import { ProjectTopBar } from './ProjectTopBar';
interface ProjectWorkspaceLayoutProps {
  children: React.ReactNode;
  activeTab: ProjectTab;
  onTabChange: (tab: ProjectTab) => void;
  onBack: () => void;
  onNavigateToSettings?: () => void;
}
export function ProjectWorkspaceLayout({
  children,
  activeTab,
  onTabChange,
  onBack,
  onNavigateToSettings
}: ProjectWorkspaceLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0a0a0b] font-sans text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <ProjectSidebar activeTab={activeTab} onTabChange={onTabChange} />
      <div className="flex-1 md:ml-[240px] flex flex-col min-w-0">
        <ProjectTopBar
          onBack={onBack}
          onNavigateToSettings={onNavigateToSettings} />

        <main className="flex-1 overflow-auto px-4 py-4 sm:px-6 sm:py-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>);

}
