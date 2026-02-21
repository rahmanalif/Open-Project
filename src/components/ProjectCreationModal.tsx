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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/20 dark:bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose} />


      {/* Modal Content */}
      <div className="relative w-full max-w-4xl h-[85vh] bg-white dark:bg-[#141416] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-[#27272a]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Create New Project
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-md hover:bg-gray-100 dark:hover:bg-[#27272a]">

            <X size={20} />
          </button>
        </div>

        {/* Wizard Content */}
        <div className="flex-1 overflow-hidden">
          <ProjectCreationWizard onClose={onClose} />
        </div>
      </div>
    </div>);

}