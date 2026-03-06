import React, { useState } from 'react';
import {
  FolderKanban,
  Target,
  List,
  Settings,
  Moon,
  Sun,
  LogOut,
  User,
  ChevronDown,
  Menu,
  X } from
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

const PIXEL_FONT: Record<string, string[]> = {
  O: ['111', '101', '101', '101', '111'],
  P: ['110', '101', '110', '100', '100'],
  E: ['111', '100', '110', '100', '111'],
  N: ['101', '111', '111', '111', '101'],
  R: ['110', '101', '110', '101', '101'],
  J: ['111', '001', '001', '101', '111'],
  C: ['111', '100', '100', '100', '111'],
  T: ['111', '010', '010', '010', '010'],
  ' ': ['000', '000', '000', '000', '000']
};

const BRAND_TEXT = 'OPEN PROJECT';
const BRAND_TEXT_ROWS = Array.from({ length: 5 }, (_, rowIndex) =>
  BRAND_TEXT.split('').map((char) => PIXEL_FONT[char]?.[rowIndex] || PIXEL_FONT[' '][rowIndex]).join('0')
);
const BRAND_LOGO = ['11111', '10001', '10101', '10001', '11111'];
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
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
    <>
      <button
        type="button"
        onClick={() => setIsMobileOpen((prev) => !prev)}
        className="md:hidden fixed left-4 top-3 z-40 inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-[#27272a] bg-white/95 dark:bg-[#141416]/95 p-2 text-gray-700 dark:text-gray-200 shadow-lg backdrop-blur">
        {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {isMobileOpen &&
      <button
        type="button"
        aria-label="Close sidebar"
        onClick={() => setIsMobileOpen(false)}
        className="fixed inset-0 z-20 bg-black/50 md:hidden" />
      }

      <aside className={`w-[240px] h-screen bg-white dark:bg-[#141416] border-r border-gray-200 dark:border-[#27272a] flex flex-col fixed left-0 top-0 z-30 transition-transform duration-200 md:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Brand / Logo Area */}
      <div className="h-14 px-3 border-b border-gray-100 dark:border-[#27272a] flex items-center overflow-hidden">
        <div className="flex items-center gap-2 text-gray-900 dark:text-white min-w-0 w-full overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#f3f4f6] p-1.5 shadow-sm ring-1 ring-gray-200 dark:bg-[#f5f5f5] dark:ring-white/10">
            <div className="grid grid-cols-5 gap-[1.5px]">
              {BRAND_LOGO.flatMap((row, rowIndex) =>
              row.split('').map((cell, cellIndex) =>
              <div
                key={`logo-${rowIndex}-${cellIndex}`}
                className={`h-[3px] w-[3px] rounded-[1px] ${cell === '1' ? 'bg-[#111113]' : 'bg-[#c9ccd3]'}`} />

              )
              )}
            </div>
          </div>

          <div className="min-w-0 max-w-full overflow-hidden rounded-[10px] border border-[#2a2d34] bg-[#111113] px-2 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div
              className="grid gap-[1px]"
              style={{
                backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.14) 0.7px, transparent 0.7px)',
                backgroundSize: '4px 4px',
                backgroundPosition: 'center'
              }}>
              {BRAND_TEXT_ROWS.map((row, rowIndex) =>
              <div key={`text-${rowIndex}`} className="flex gap-[1px]">
                  {row.split('').map((cell, cellIndex) =>
                <div
                  key={`text-${rowIndex}-${cellIndex}`}
                  className={`h-[2px] w-[2px] rounded-[1px] ${cell === '1' ? 'bg-[#f4f7ff]' : 'bg-transparent'}`} />

                )}
                </div>

              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-0.5">
        
        {navItems.map((item) =>
        <button
          key={item.id}
          onClick={() => {
            onTabChange(item.id);
            setIsMobileOpen(false);
          }}
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
            {activeTab === item.id && (
              <div
                className={`w-2 h-2 rounded-full ${item.id === 'matchmaking' ? (isMatchingActive ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-gray-300 dark:bg-gray-600') : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]'}`}
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
    </aside>
    </>);

}
