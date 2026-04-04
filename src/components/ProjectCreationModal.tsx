import React from 'react';
import { X } from 'lucide-react';
import { ProjectCreationWizard } from './ProjectCreationWizard';
interface ProjectCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export function ProjectCreationModal({
  isOpen,
  onClose
}: ProjectCreationModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4 lg:p-6">
      <div
        className="absolute inset-0 bg-[rgba(8,8,10,0.78)] backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="premium-panel premium-grid relative flex h-[100dvh] w-full max-w-6xl flex-col overflow-hidden rounded-none animate-in fade-in zoom-in-95 duration-200 sm:h-[94vh] sm:rounded-[28px] lg:rounded-[32px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(208,164,106,0.14),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(243,237,226,0.05),transparent_30%)]" />

        <div className="relative flex items-start justify-between gap-4 border-b border-[var(--border)] px-4 py-3 sm:px-6 sm:py-3.5 lg:px-7 lg:py-4">
          <div className="min-w-0 max-w-3xl pr-2">
            <p className="premium-kicker mb-1">Project Builder</p>
            <h2 className="font-display text-2xl text-[var(--text)] sm:text-3xl lg:text-[2.5rem]">Create New Project</h2>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-full border border-[var(--border)] bg-[color:var(--bg-panel)] p-2.5 text-[var(--text-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text)]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <ProjectCreationWizard onClose={onClose} />
        </div>
      </div>
    </div>);

}
