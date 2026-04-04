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
        className={`premium-soft-panel fixed top-3 z-[60] inline-flex items-center justify-center rounded-xl p-2 text-[var(--text)] transition-all md:hidden ${
          isMobileOpen ? 'right-3 left-auto' : 'left-3 right-auto'
        }`}>
        {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {isMobileOpen &&
      <button
        type="button"
        aria-label="Close sidebar"
        onClick={() => setIsMobileOpen(false)}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" />
      }

      <aside className={`premium-soft-panel premium-grid fixed left-0 top-0 z-50 flex h-screen w-[min(20rem,calc(100vw-0.75rem))] max-w-[320px] flex-col border-r transition-transform duration-300 md:w-[264px] md:max-w-none md:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Brand / Logo Area */}
      <div className="flex h-20 items-center overflow-hidden border-b border-[var(--border)] px-4">
        <div className="flex min-w-0 w-full items-center gap-3 overflow-hidden text-[var(--text)]">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--accent-soft)] p-2 shadow-[0_10px_24px_rgba(0,0,0,0.14)] ring-1 ring-[var(--border)]">
            <div className="grid grid-cols-5 gap-[1.5px]">
              {BRAND_LOGO.flatMap((row, rowIndex) =>
              row.split('').map((cell, cellIndex) =>
              <div
                key={`logo-${rowIndex}-${cellIndex}`}
                className={`h-[3px] w-[3px] rounded-[1px] ${cell === '1' ? 'bg-[var(--text)]' : 'bg-[color:var(--border-strong)]'}`} />

              )
              )}
            </div>
          </div>

          <div className="min-w-0 max-w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[color:var(--bg-panel)] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div
              className="grid gap-[1px]"
              style={{
                backgroundImage:
                'radial-gradient(circle, rgba(208,164,106,0.18) 0.7px, transparent 0.7px)',
                backgroundSize: '4px 4px',
                backgroundPosition: 'center'
              }}>
              {BRAND_TEXT_ROWS.map((row, rowIndex) =>
              <div key={`text-${rowIndex}`} className="flex gap-[1px]">
                  {row.split('').map((cell, cellIndex) =>
                <div
                  key={`text-${rowIndex}-${cellIndex}`}
                  className={`h-[2px] w-[2px] rounded-[1px] ${cell === '1' ? 'bg-[var(--text)]' : 'bg-transparent'}`} />

                )}
                </div>

              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        <div className="px-3 pb-3">
          <p className="premium-kicker">Navigate</p>
          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
            Find collaborators, review aligned projects, and keep active work moving.
          </p>
        </div>
        {navItems.map((item) =>
        <button
          key={item.id}
          onClick={() => {
            onTabChange(item.id);
            setIsMobileOpen(false);
          }}
          className={`
              flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300
              ${activeTab === item.id ? 'bg-[color:var(--accent-soft)] text-[var(--text)] shadow-[0_16px_30px_rgba(0,0,0,0.08)]' : 'text-[var(--text-muted)] hover:bg-[color:var(--bg-muted)] hover:text-[var(--text)]'}
            `}>
            <div className="flex items-center gap-3">
              <item.icon
                size={18}
                className={
                  activeTab === item.id
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--text-muted)]'
                }
              />
              <span className="flex items-center gap-2">{item.label}</span>
            </div>
            {activeTab === item.id && (
              <div
                className={`h-2.5 w-2.5 rounded-full ${item.id === 'matchmaking' ? (isMatchingActive ? 'bg-[var(--success)] shadow-[0_0_16px_rgba(91,191,167,0.7)]' : 'bg-[color:var(--border-strong)]') : 'bg-[var(--accent)] shadow-[0_0_16px_rgba(208,164,106,0.5)]'}`}
              />
            )}
          </button>
        )}
      </nav>

      {/* Theme Toggle */}
      <div className="border-t border-[var(--border)] px-4 py-4">
        <button
          onClick={toggleTheme}
          className="premium-button-secondary flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors">

          <span className="flex items-center gap-3">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>

      {/* User Profile with Dropdown */}
      <div className="relative border-t border-[var(--border)] p-4">
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex w-full items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-[color:var(--bg-muted)]">

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent),var(--success))] text-xs font-semibold text-[#fff8ef] shadow-[0_18px_30px_rgba(0,0,0,0.2)]">
            {displayInitials}
          </div>
          <div className="flex-1 flex flex-col text-left">
            <span className="text-sm font-semibold text-[var(--text)]">
              {displayName}
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              {displayRole}
            </span>
          </div>
          <ChevronDown
            size={16}
            className={`text-[var(--text-muted)] transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />

        </button>

        {/* Profile Dropdown Menu */}
        {showProfileMenu &&
        <>
            <div
            className="fixed inset-0 z-10"
            onClick={() => setShowProfileMenu(false)} />

            <div className="premium-panel absolute bottom-full left-4 right-4 z-20 mb-2 rounded-2xl py-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <button
              onClick={() => {
                onTabChange('settings');
                setShowProfileMenu(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-[var(--text)] transition-colors hover:bg-[color:var(--bg-muted)]">

                <User size={16} />
                View Profile
              </button>
              <div className="my-1 h-px bg-[var(--border)]" />
              <button
              onClick={() => {
                setShowProfileMenu(false);
                handleLogout();
              }}
              className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-[var(--danger)] transition-colors hover:bg-[rgba(180,83,9,0.08)]">

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
