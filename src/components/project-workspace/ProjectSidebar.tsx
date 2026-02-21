import React from 'react';
import {
  Home,
  CheckSquare,
  Folder,
  Users,
  Settings,
  Activity,
  Moon,
  Sun } from
'lucide-react';
import { useTheme } from '../../hooks/useTheme';
export type ProjectTab = 'overview' | 'tasks' | 'files' | 'members' | 'settings';
interface ProjectSidebarProps {
  activeTab: ProjectTab;
  onTabChange: (tab: ProjectTab) => void;
}
export function ProjectSidebar({
  activeTab,
  onTabChange
}: ProjectSidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const navItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: Home
  },
  {
    id: 'tasks',
    label: 'Tasks',
    icon: CheckSquare,
    count: 12
  },
  {
    id: 'files',
    label: 'Files',
    icon: Folder
  },
  {
    id: 'members',
    label: 'Members',
    icon: Users,
    count: 4
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings
  }];

  return (
    <aside className="w-[240px] h-screen bg-[#f8f9fa] dark:bg-[#141416] border-r border-gray-200 dark:border-[#27272a] flex flex-col fixed left-0 top-0 z-20 transition-colors duration-200">
      {/* Project Identity Placeholder (TopBar covers this visually but we need spacing) */}
      <div className="h-14" />

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) =>
        <button
          key={item.id}
          onClick={() => onTabChange(item.id as ProjectTab)}
          className={`
              w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 group
              ${activeTab === item.id ? 'bg-white dark:bg-[#27272a] text-gray-900 dark:text-white shadow-sm ring-1 ring-gray-200 dark:ring-[#3f3f46]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1f1f23] hover:text-gray-900 dark:hover:text-white'}
            `}>

            <div className="flex items-center gap-3">
              <item.icon
              size={18}
              className={
              activeTab === item.id ?
              'text-blue-600 dark:text-blue-400' :
              'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
              } />

              {item.label}
            </div>
            {item.count &&
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${activeTab === item.id ? 'bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-[#27272a] text-gray-500 dark:text-gray-400'}`}>

                {item.count}
              </span>
          }
          </button>
        )}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 dark:border-[#27272a] space-y-4">
        {/* Health Indicator */}
        <div className="bg-white dark:bg-[#1f1f23] p-3 rounded-lg border border-gray-200 dark:border-[#27272a] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Health
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              On Track
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 dark:bg-[#27272a] rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{
                width: '85%'
              }} />

          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1f1f23] rounded-md transition-colors">

          <span className="flex items-center gap-3">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>
    </aside>);

}