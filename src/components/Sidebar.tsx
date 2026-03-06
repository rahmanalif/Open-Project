import React, { useState } from 'react';
import {
  FolderKanban,
  Target,
  List,
  Settings,
  Command,
  Moon,
  Sun,
  LogOut,
  User,
  ChevronDown } from
'lucide-react';
import { useTheme } from '../hooks/useTheme';
export type Tab = 'projects' | 'matchmaking' | 'matches' | 'listings' | 'settings';
interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  isMatchingActive?: boolean;
  currentUser?: {
    name: string;
    initials: string;
    role: string;
  };
  onLogout?: () => void;
}
type NavItem = {
  id: Tab;
  label: string;
  icon: React.ElementType;
};
const navItems: NavItem[] = [
{
  id: 'matchmaking',
  label: 'Matchmaking',
  icon: Target
},
{
  id: 'projects',
  label: 'Projects',
  icon: FolderKanban
},
{
  id: 'matches',
  label: 'Matches',
  icon: Target
},
{
  id: 'listings',
  label: 'My Listings',
  icon: List
},
{
  id: 'settings',
  label: 'Settings',
  icon: Settings
}];

export function Sidebar({ activeTab, onTabChange, isMatchingActive = false, currentUser, onLogout }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior - redirect to login
      window.location.href = '/login';
    }
  };
  const displayName = currentUser?.name || 'New Member';
  const displayRole = currentUser?.role || 'Collaborator';
  const displayInitials = currentUser?.initials || 'NM';
  return (
    <aside className="w-[240px] h-screen bg-white dark:bg-[#141416] border-r border-gray-200 dark:border-[#27272a] flex flex-col fixed left-0 top-0 z-20 transition-colors duration-200">
      {/* Brand / Logo Area */}
      <div className="h-14 px-4 border-b border-gray-100 dark:border-[#27272a] flex items-center">
        <div className="flex items-center gap-2.5 text-gray-900 dark:text-white">
          <div className="w-6 h-6 bg-gray-900 dark:bg-white rounded-md flex items-center justify-center text-white dark:text-gray-900">
            <Command size={14} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.12em]">
            OPEN PROJECT
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-0.5">
        
        {navItems.map((item) =>
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`
              w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
              ${activeTab === item.id ? 'bg-gray-100 dark:bg-[#27272a] text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1f1f23] hover:text-gray-900 dark:hover:text-white'}
            `}>
            <div className="flex items-center gap-3">
              <item.icon
                size={18}
                className={
                  activeTab === item.id
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400'
                }
              />
              <span className="flex items-center gap-2">{item.label}</span>
            </div>
            {item.id === 'matchmaking' && (
              <div
                className={`w-2 h-2 rounded-full ${isMatchingActive ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-gray-300 dark:bg-gray-600'}`}
              />
            )}
          </button>
        )}
      </nav>

      {/* Theme Toggle */}
      <div className="px-4 py-3 border-t border-gray-100 dark:border-[#27272a]">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1f1f23] hover:text-gray-900 dark:hover:text-white rounded-md transition-colors">

          <span className="flex items-center gap-3">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>

      {/* User Profile with Dropdown */}
      <div className="p-4 border-t border-gray-100 dark:border-[#27272a] relative">
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="w-full flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-[#1f1f23] rounded-md p-2 -m-2 transition-colors group">

          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-xs font-medium text-white">
            {displayInitials}
          </div>
          <div className="flex-1 flex flex-col text-left">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {displayName}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {displayRole}
            </span>
          </div>
          <ChevronDown
            size={16}
            className={`text-gray-400 dark:text-gray-500 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />

        </button>

        {/* Profile Dropdown Menu */}
        {showProfileMenu &&
        <>
            <div
            className="fixed inset-0 z-10"
            onClick={() => setShowProfileMenu(false)} />

            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white dark:bg-[#1f1f23] border border-gray-200 dark:border-[#3f3f46] rounded-lg shadow-lg z-20 py-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <button
              onClick={() => {
                onTabChange('settings');
                setShowProfileMenu(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a] flex items-center gap-3 transition-colors">

                <User size={16} />
                View Profile
              </button>
              <div className="h-px bg-gray-100 dark:bg-[#27272a] my-1" />
              <button
              onClick={() => {
                setShowProfileMenu(false);
                handleLogout();
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-3 transition-colors">

                <LogOut size={16} />
                Logout
              </button>
            </div>
          </>
        }
      </div>
    </aside>);

}
