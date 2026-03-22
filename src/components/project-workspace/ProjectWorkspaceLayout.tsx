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
    <div className="premium-shell flex min-h-screen text-[var(--text)] transition-colors duration-300">
      <ProjectSidebar activeTab={activeTab} onTabChange={onTabChange} />
      <div className="flex min-w-0 flex-1 flex-col md:ml-[264px]">
        <ProjectTopBar
          onBack={onBack}
          onNavigateToSettings={onNavigateToSettings} />

        <main className="flex-1 overflow-auto px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>);

}
