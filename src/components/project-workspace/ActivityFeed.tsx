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
    <div className="bg-white dark:bg-[#1f1f23] border border-gray-200 dark:border-[#27272a] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-[#27272a] flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h3>
        <button className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
          View all
        </button>
      </div>
      <div className="divide-y divide-gray-50 dark:divide-[#27272a]">
        {MOCK_ACTIVITY.map((item) =>
        <div
          key={item.id}
          className="px-5 py-3 flex gap-3 hover:bg-gray-50 dark:hover:bg-[#27272a] transition-colors">

            <div
            className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium text-white mt-0.5"
            style={{
              backgroundColor: item.user.color
            }}>

              {item.user.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-900 dark:text-gray-200">
                <span className="font-medium">{item.user.name}</span>{' '}
                <span className="text-gray-500 dark:text-gray-400">
                  {item.text}
                </span>{' '}
                {item.target &&
              <span className="font-medium text-gray-900 dark:text-white truncate">
                    {item.target}
                  </span>
              }
              </p>
              <div className="flex items-center gap-2 mt-1">
                {getIcon(item.type)}
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {item.time}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

}