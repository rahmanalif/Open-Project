import React from 'react';
import {
  Calendar,
  MessageSquare,
  CheckSquare,
  MoreHorizontal } from
'lucide-react';
export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';
export interface Task {
  id: string;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignee?: {
    name: string;
    initials: string;
    color: string;
  };
  dueDate?: string;
  comments: number;
  subtasks: {
    completed: number;
    total: number;
  };
}
interface TaskCardProps {
  task: Task;
}
export function TaskCard({ task }: TaskCardProps) {
  const getPriorityColor = (p: TaskPriority) => {
    switch (p) {
      case 'high':
        return 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-100 dark:border-red-500/20';
      case 'medium':
        return 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-500/20';
      case 'low':
        return 'bg-gray-50 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-500/20';
    }
  };
  return (
    <div className="premium-soft-panel group cursor-pointer rounded-[24px] p-4 transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <span
          className={`rounded-full border px-2 py-1 text-[10px] font-medium uppercase tracking-wider ${getPriorityColor(task.priority)}`}>

          {task.priority}
        </span>
        <button className="text-[var(--text-muted)] opacity-0 transition-opacity group-hover:opacity-100 hover:text-[var(--text)]">
          <MoreHorizontal size={14} />
        </button>
      </div>

      <h4 className="mb-3 text-sm font-medium leading-snug text-[var(--text)]">
        {task.title}
      </h4>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
          {task.dueDate &&
          <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{task.dueDate}</span>
            </div>
          }
          {task.subtasks.total > 0 &&
          <div className="flex items-center gap-1">
              <CheckSquare size={12} />
              <span>
                {task.subtasks.completed}/{task.subtasks.total}
              </span>
            </div>
          }
          {task.comments > 0 &&
          <div className="flex items-center gap-1">
              <MessageSquare size={12} />
              <span>{task.comments}</span>
            </div>
          }
        </div>

        {task.assignee ?
        <div
          className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-medium text-white ring-2 ring-[color:var(--bg-panel)]"
          style={{
            backgroundColor: task.assignee.color
          }}
          title={task.assignee.name}>

            {task.assignee.initials}
          </div> :

        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-[var(--border-strong)] bg-[color:var(--bg-muted)] text-[var(--text-muted)]">
            <span className="text-[10px]">+</span>
          </div>
        }
      </div>
    </div>);

}
