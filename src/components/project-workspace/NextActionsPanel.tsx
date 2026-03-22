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
    <div className="premium-panel overflow-hidden rounded-[30px]">
      <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[rgba(208,164,106,0.08)] px-5 py-4">
        <Sparkles size={18} className="text-[var(--accent)]" />
        <h3 className="font-semibold text-[var(--text)]">
          Your Next Steps
        </h3>
      </div>
      <div className="p-2">
        {actions.map((action) =>
        <button
          key={action.id}
          onClick={() => handleClick(action.action)}
          className="group flex w-full items-center justify-between rounded-[22px] border border-transparent p-3 text-left transition-all hover:border-[var(--border)] hover:bg-[color:var(--bg-muted)]">

            <div className="flex items-center gap-3">
              {getIcon(action.type)}
              <span
              className={`text-sm ${action.urgent ? 'font-medium text-[var(--text)]' : 'text-[var(--text-muted)]'}`}>

                {action.text}
              </span>
            </div>
            <ArrowRight
            size={14}
            className="translate-x-0 text-[var(--text-muted)] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />

          </button>
        )}
      </div>
      <div className="border-t border-[var(--border)] bg-[rgba(208,164,106,0.06)] px-5 py-3 text-center">
        <p className="text-xs font-medium text-[var(--accent)]">
          Updated just now
        </p>
      </div>
    </div>);

}
