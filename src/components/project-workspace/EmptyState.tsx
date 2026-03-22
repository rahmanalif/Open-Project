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
    <div className="premium-panel flex flex-col items-center justify-center rounded-[30px] border-dashed px-4 py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-[var(--accent)]">
        <Icon size={24} />
      </div>
      <h3 className="mb-1 text-lg font-medium text-[var(--text)]">
        {title}
      </h3>
      <p className="mb-6 max-w-sm text-sm text-[var(--text-muted)]">
        {description}
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={onAction}
          className="premium-button rounded-2xl px-4 py-2 text-sm font-medium transition-all">

          {actionLabel}
        </button>
        {secondaryAction &&
        <button
          onClick={secondaryAction.onClick}
          className="premium-button-secondary rounded-2xl px-4 py-2 text-sm font-medium transition-colors">

            {secondaryAction.label}
          </button>
        }
      </div>
    </div>);

}
