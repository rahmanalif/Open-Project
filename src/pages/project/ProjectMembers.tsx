import React, { useState } from 'react';
import { UserPlus, Users } from 'lucide-react';
import { MemberCard, Member } from '../../components/project-workspace/MemberCard';
import { EmptyState } from '../../components/project-workspace/EmptyState';
import { InviteMemberModal } from '../../components/modals/InviteMemberModal';

const MOCK_MEMBERS: Member[] = [
  { id: '1', name: 'John Doe', role: 'Owner', title: 'Product Lead', status: 'online', joined: 'Oct 12, 2023', avatarColor: '#8b5cf6', initials: 'JD' },
  { id: '2', name: 'Sarah Chen', role: 'Admin', title: 'Frontend Engineer', status: 'online', joined: 'Oct 14, 2023', avatarColor: '#10b981', initials: 'SC' },
  { id: '3', name: 'Mike Wilson', role: 'Member', title: 'Backend Engineer', status: 'away', joined: 'Oct 15, 2023', avatarColor: '#3b82f6', initials: 'MW' },
  { id: '4', name: 'Alex Kim', role: 'Viewer', title: 'Designer', status: 'offline', joined: 'Oct 20, 2023', avatarColor: '#f59e0b', initials: 'AK' }
];

export function ProjectMembers() {
  const [showInvite, setShowInvite] = useState(false);
  const [members] = useState<Member[]>(MOCK_MEMBERS);

  const handleInvite = (inviteData: any) => {
    console.log('Member invited:', inviteData);
  };

  return (
    <div className="space-y-6">
      <section className="premium-panel premium-grid rounded-[34px] px-6 py-7 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="premium-kicker mb-2">Team</p>
            <h2 className="font-display text-4xl text-[var(--text)]">Members</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">
              Manage roles, access, and the people shaping this project together.
            </p>
          </div>
          <button onClick={() => setShowInvite(true)} className="premium-button flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold">
            <UserPlus size={16} />
            Invite Member
          </button>
        </div>
      </section>

      {members.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
          <button
            onClick={() => setShowInvite(true)}
            className="premium-panel flex min-h-[152px] flex-col items-center justify-center rounded-[26px] border-dashed p-6 text-[var(--text-muted)] transition-colors hover:bg-[color:var(--bg-muted)] hover:text-[var(--text)]"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-[var(--accent)]">
              <UserPlus size={20} />
            </div>
            <span className="text-sm font-medium">Invite new member</span>
          </button>
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="You're the only one here"
          description="Invite collaborators to work together on this project."
          actionLabel="Invite Team Member"
          onAction={() => setShowInvite(true)}
        />
      )}

      <InviteMemberModal isOpen={showInvite} onClose={() => setShowInvite(false)} onInvite={handleInvite} />
    </div>
  );
}
