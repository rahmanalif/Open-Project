import React, { useState } from 'react';
import {
  ArrowLeft,
  Settings,
  MoreHorizontal,
  UserPlus,
  Bell } from
'lucide-react';
import { InviteMemberModal } from '../modals/InviteMemberModal';
import { NotificationsPanel } from '../modals/NotificationsPanel';
import { ProjectMenuModal } from '../modals/ProjectMenuModal';
interface ProjectTopBarProps {
  onBack: () => void;
  onNavigateToSettings?: () => void;
}
export function ProjectTopBar({
  onBack,
  onNavigateToSettings
}: ProjectTopBarProps) {
  const [showInvite, setShowInvite] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    right: 0
  });
  const handleInvite = (inviteData: any) => {
    console.log('Member invited:', inviteData);
  };
  const handleSettingsClick = () => {
    if (onNavigateToSettings) {
      onNavigateToSettings();
    }
  };
  const handleMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right
    });
    setShowMenu(true);
  };
  return (
    <header className="h-14 bg-white dark:bg-[#141416] border-b border-gray-200 dark:border-[#27272a] sticky top-0 z-30 flex items-center justify-between px-4 transition-colors duration-200">
      {/* Left: Project Identity */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-md transition-colors"
          title="Back to Browse">

          <ArrowLeft size={18} />
        </button>

        <div className="h-6 w-px bg-gray-200 dark:bg-[#27272a]" />

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            IS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-gray-900 dark:text-white leading-none">
                Indie SaaS Analytics
              </h1>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
                Active
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-none mt-1 truncate max-w-[300px]">
              Building a privacy-focused analytics platform for indie hackers.
            </p>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Avatars */}
        <div className="flex -space-x-2 mr-2">
          {['JD', 'SC', 'MW'].map((initials, i) =>
          <div
            key={i}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium text-white ring-2 ring-white dark:ring-[#141416] ${i === 0 ? 'bg-purple-500' : i === 1 ? 'bg-blue-500' : 'bg-amber-500'}`}>

              {initials}
            </div>
          )}
          <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-[#27272a] flex items-center justify-center text-[10px] font-medium text-gray-500 dark:text-gray-400 ring-2 ring-white dark:ring-[#141416]">
            +2
          </div>
        </div>

        <button
          onClick={() => setShowInvite(true)}
          className="h-8 px-3 flex items-center gap-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-md transition-colors shadow-sm">

          <UserPlus size={14} />
          <span>Invite</span>
        </button>

        <div className="h-6 w-px bg-gray-200 dark:bg-[#27272a] mx-1" />

        <button
          onClick={() => setShowNotifications(true)}
          className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-md transition-colors relative">

          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button
          onClick={handleSettingsClick}
          className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-md transition-colors">

          <Settings size={18} />
        </button>
        <button
          onClick={handleMoreClick}
          className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-md transition-colors">

          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Modals */}
      <InviteMemberModal
        isOpen={showInvite}
        onClose={() => setShowInvite(false)}
        onInvite={handleInvite} />

      <NotificationsPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)} />

      <ProjectMenuModal
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        position={menuPosition} />

    </header>);

}