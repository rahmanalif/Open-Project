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
    <div className="bg-white dark:bg-[#1f1f23] border border-gray-200 dark:border-[#27272a] rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex justify-between items-start mb-2">
        <span
          className={`text-[10px] font-medium px-1.5 py-0.5 rounded border uppercase tracking-wider ${getPriorityColor(task.priority)}`}>

          {task.priority}
        </span>
        <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={14} />
        </button>
      </div>

      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 leading-snug">
        {task.title}
      </h4>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
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
          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium text-white ring-2 ring-white dark:ring-[#1f1f23]"
          style={{
            backgroundColor: task.assignee.color
          }}
          title={task.assignee.name}>

            {task.assignee.initials}
          </div> :

        <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-[#27272a] border border-gray-200 dark:border-[#3f3f46] border-dashed flex items-center justify-center text-gray-400 dark:text-gray-500">
            <span className="text-[10px]">+</span>
          </div>
        }
      </div>
    </div>);

}