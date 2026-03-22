import React from 'react';
import { MoreHorizontal, Shield, User } from 'lucide-react';
export interface Member {
  id: string;
  name: string;
  role: 'Owner' | 'Admin' | 'Member' | 'Viewer';
  title: string;
  status: 'online' | 'away' | 'offline';
  joined: string;
  avatarColor: string;
  initials: string;
}
interface MemberCardProps {
  member: Member;
}
export function MemberCard({ member }: MemberCardProps) {
  const getStatusColor = (s: string) => {
    switch (s) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-amber-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Owner':
        return 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-500/20';
      case 'Admin':
        return 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-500/20';
      default:
        return 'bg-gray-50 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-500/20';
    }
  };
  return (
    <div className="premium-soft-panel group flex items-center gap-4 rounded-[26px] p-4 transition-colors hover:border-[var(--border-strong)]">
      <div className="relative">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium text-white"
          style={{
            backgroundColor: member.avatarColor
          }}>

          {member.initials}
        </div>
        <div
          className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[color:var(--bg-panel)] ${getStatusColor(member.status)}`} />

      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="truncate font-semibold text-[var(--text)]">
            {member.name}
          </h4>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded border font-medium uppercase tracking-wider ${getRoleBadge(member.role)}`}>

            {member.role}
          </span>
        </div>
        <p className="truncate text-sm text-[var(--text-muted)]">
          {member.title}
        </p>
      </div>

      <button className="rounded-xl p-1.5 text-[var(--text-muted)] opacity-0 transition-all group-hover:opacity-100 hover:bg-[color:var(--bg-muted)] hover:text-[var(--text)]">
        <MoreHorizontal size={16} />
      </button>
    </div>);

}
