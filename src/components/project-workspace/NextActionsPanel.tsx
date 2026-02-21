import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Clock } from
'lucide-react';
interface NextActionsPanelProps {
  onActionClick?: (action: string) => void;
}
export function NextActionsPanel({ onActionClick }: NextActionsPanelProps) {
  const actions = [
  {
    id: 'setup',
    text: 'Complete your profile setup',
    type: 'setup',
    urgent: false,
    action: 'navigate-settings'
  },
  {
    id: 'tasks',
    text: '2 tasks assigned to you',
    type: 'task',
    urgent: true,
    action: 'navigate-tasks'
  },
  {
    id: 'review',
    text: 'Review 3 pending comments',
    type: 'review',
    urgent: false,
    action: 'navigate-tasks'
  },
  {
    id: 'deadline',
    text: 'Design Review (2 days)',
    type: 'deadline',
    urgent: true,
    action: 'navigate-tasks'
  }];

  const getIcon = (type: string) => {
    switch (type) {
      case 'task':
        return <CheckCircle2 size={16} className="text-blue-500" />;
      case 'review':
        return <MessageSquare size={16} className="text-purple-500" />;
      case 'deadline':
        return <Clock size={16} className="text-amber-500" />;
      default:
        return <Sparkles size={16} className="text-gray-400" />;
    }
  };
  const handleClick = (action: string) => {
    if (onActionClick) {
      onActionClick(action);
    } else {
      console.log('Action clicked:', action);
    }
  };
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/10 dark:to-[#1f1f23] border border-blue-100 dark:border-blue-500/20 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-blue-100 dark:border-blue-500/20 flex items-center gap-2">
        <Sparkles size={18} className="text-blue-600 dark:text-blue-400" />
        <h3 className="font-semibold text-blue-900 dark:text-blue-100">
          Your Next Steps
        </h3>
      </div>
      <div className="p-2">
        {actions.map((action) =>
        <button
          key={action.id}
          onClick={() => handleClick(action.action)}
          className="w-full text-left p-3 rounded-lg hover:bg-white dark:hover:bg-[#27272a] hover:shadow-sm transition-all flex items-center justify-between group border border-transparent hover:border-blue-100 dark:hover:border-blue-500/20">

            <div className="flex items-center gap-3">
              {getIcon(action.type)}
              <span
              className={`text-sm ${action.urgent ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>

                {action.text}
              </span>
            </div>
            <ArrowRight
            size={14}
            className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />

          </button>
        )}
      </div>
      <div className="px-5 py-3 bg-blue-50/50 dark:bg-blue-900/5 text-center border-t border-blue-100 dark:border-blue-500/20">
        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
          Updated just now
        </p>
      </div>
    </div>);

}