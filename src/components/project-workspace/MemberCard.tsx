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
    <div className="bg-white dark:bg-[#1f1f23] border border-gray-200 dark:border-[#27272a] rounded-lg p-4 flex items-center gap-4 group hover:border-gray-300 dark:hover:border-[#3f3f46] transition-colors">
      <div className="relative">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium text-white"
          style={{
            backgroundColor: member.avatarColor
          }}>

          {member.initials}
        </div>
        <div
          className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#1f1f23] ${getStatusColor(member.status)}`} />

      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="font-semibold text-gray-900 dark:text-white truncate">
            {member.name}
          </h4>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded border font-medium uppercase tracking-wider ${getRoleBadge(member.role)}`}>

            {member.role}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {member.title}
        </p>
      </div>

      <button className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#27272a] rounded opacity-0 group-hover:opacity-100 transition-all">
        <MoreHorizontal size={16} />
      </button>
    </div>);

}