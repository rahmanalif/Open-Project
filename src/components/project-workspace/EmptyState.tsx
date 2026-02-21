import React from 'react';
import { BoxIcon } from 'lucide-react';
interface EmptyStateProps {
  icon: BoxIcon;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}
export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryAction
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white dark:bg-[#1f1f23] border border-dashed border-gray-300 dark:border-[#3f3f46] rounded-xl">
      <div className="w-12 h-12 bg-gray-50 dark:bg-[#27272a] rounded-full flex items-center justify-center mb-4 text-gray-400 dark:text-gray-500">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
        {description}
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={onAction}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-md transition-colors shadow-sm">

          {actionLabel}
        </button>
        {secondaryAction &&
        <button
          onClick={secondaryAction.onClick}
          className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#27272a] rounded-md transition-colors">

            {secondaryAction.label}
          </button>
        }
      </div>
    </div>);

}