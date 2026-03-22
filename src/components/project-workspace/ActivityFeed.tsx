import React from 'react';
import { MessageSquare, CheckCircle2, FileText, UserPlus } from 'lucide-react';
interface ActivityItem {
  id: string;
  type: 'comment' | 'task_complete' | 'file_upload' | 'member_join';
  user: {
    name: string;
    initials: string;
    color: string;
  };
  text: string;
  target: string;
  time: string;
}
const MOCK_ACTIVITY: ActivityItem[] = [
{
  id: '1',
  type: 'task_complete',
  user: {
    name: 'Sarah Chen',
    initials: 'SC',
    color: '#10b981'
  },
  text: 'completed task',
  target: 'Design dashboard wireframes',
  time: '2h ago'
},
{
  id: '2',
  type: 'comment',
  user: {
    name: 'Mike Wilson',
    initials: 'MW',
    color: '#3b82f6'
  },
  text: 'commented on',
  target: 'API documentation',
  time: '5h ago'
},
{
  id: '3',
  type: 'member_join',
  user: {
    name: 'Alex Kim',
    initials: 'AK',
    color: '#8b5cf6'
  },
  text: 'joined the project',
  target: '',
  time: '1d ago'
},
{
  id: '4',
  type: 'file_upload',
  user: {
    name: 'John Doe',
    initials: 'JD',
    color: '#f59e0b'
  },
  text: 'uploaded',
  target: 'Q4_Roadmap.pdf',
  time: '1d ago'
},
{
  id: '5',
  type: 'comment',
  user: {
    name: 'Sarah Chen',
    initials: 'SC',
    color: '#10b981'
  },
  text: 'commented on',
  target: 'User testing plan',
  time: '2d ago'
}];

export function ActivityFeed() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'comment':
        return <MessageSquare size={14} className="text-blue-500" />;
      case 'task_complete':
        return <CheckCircle2 size={14} className="text-green-500" />;
      case 'file_upload':
        return <FileText size={14} className="text-amber-500" />;
      case 'member_join':
        return <UserPlus size={14} className="text-purple-500" />;
      default:
        return <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />;
    }
  };
  return (
    <div className="premium-panel overflow-hidden rounded-[30px]">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
        <h3 className="font-semibold text-[var(--text)]">
          Recent Activity
        </h3>
        <button className="text-xs font-medium text-[var(--accent)] hover:underline">
          View all
        </button>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {MOCK_ACTIVITY.map((item) =>
        <div
          key={item.id}
          className="flex gap-3 px-5 py-4 transition-colors hover:bg-[color:var(--bg-muted)]">

            <div
            className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium text-white mt-0.5"
            style={{
              backgroundColor: item.user.color
            }}>

              {item.user.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-[var(--text)]">
                <span className="font-medium">{item.user.name}</span>{' '}
                <span className="text-[var(--text-muted)]">
                  {item.text}
                </span>{' '}
                {item.target &&
              <span className="truncate font-medium text-[var(--text)]">
                    {item.target}
                  </span>
              }
              </p>
              <div className="flex items-center gap-2 mt-1">
                {getIcon(item.type)}
                <span className="text-xs text-[var(--text-muted)]">
                  {item.time}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

}
