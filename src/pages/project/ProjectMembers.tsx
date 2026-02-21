import React, { useState } from 'react';
import { UserPlus, Users } from 'lucide-react';
import {
  MemberCard,
  Member } from
'../../components/project-workspace/MemberCard';
import { EmptyState } from '../../components/project-workspace/EmptyState';
import { InviteMemberModal } from '../../components/modals/InviteMemberModal';
const MOCK_MEMBERS: Member[] = [
{
  id: '1',
  name: 'John Doe',
  role: 'Owner',
  title: 'Product Lead',
  status: 'online',
  joined: 'Oct 12, 2023',
  avatarColor: '#8b5cf6',
  initials: 'JD'
},
{
  id: '2',
  name: 'Sarah Chen',
  role: 'Admin',
  title: 'Frontend Engineer',
  status: 'online',
  joined: 'Oct 14, 2023',
  avatarColor: '#10b981',
  initials: 'SC'
},
{
  id: '3',
  name: 'Mike Wilson',
  role: 'Member',
  title: 'Backend Engineer',
  status: 'away',
  joined: 'Oct 15, 2023',
  avatarColor: '#3b82f6',
  initials: 'MW'
},
{
  id: '4',
  name: 'Alex Kim',
  role: 'Viewer',
  title: 'Designer',
  status: 'offline',
  joined: 'Oct 20, 2023',
  avatarColor: '#f59e0b',
  initials: 'AK'
}];

export function ProjectMembers() {
  const [showInvite, setShowInvite] = useState(false);
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const handleInvite = (inviteData: any) => {
    console.log('Member invited:', inviteData);
    // In a real app, would send invitation and add to pending list
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Team Members
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage access and roles for this project.
          </p>
        </div>
        <button
          onClick={() => setShowInvite(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 shadow-sm">

          <UserPlus size={16} />
          Invite Member
        </button>
      </div>

      {members.length > 0 ?
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) =>
        <MemberCard key={member.id} member={member} />
        )}

          {/* Add Member Card */}
          <button
          onClick={() => setShowInvite(true)}
          className="h-full min-h-[100px] border border-dashed border-gray-300 dark:border-[#3f3f46] rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f23] transition-colors p-6">

            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#27272a] flex items-center justify-center mb-2">
              <UserPlus size={20} />
            </div>
            <span className="text-sm font-medium">Invite new member</span>
          </button>
        </div> :

      <EmptyState
        icon={Users}
        title="You're the only one here"
        description="Invite collaborators to work together on this project."
        actionLabel="Invite Team Member"
        onAction={() => setShowInvite(true)} />

      }

      <InviteMemberModal
        isOpen={showInvite}
        onClose={() => setShowInvite(false)}
        onInvite={handleInvite} />

    </div>);

}