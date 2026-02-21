import React from 'react';
import { Copy, Archive, Download, Trash2 } from 'lucide-react';
interface ProjectMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  position: {
    top: number;
    right: number;
  };
}
export function ProjectMenuModal({
  isOpen,
  onClose,
  position
}: ProjectMenuModalProps) {
  if (!isOpen) return null;
  const handleAction = (action: string) => {
    console.log('Project action:', action);
    onClose();
  };
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div
        className="fixed z-50 w-56 bg-white dark:bg-[#1f1f23] border border-gray-200 dark:border-[#3f3f46] rounded-lg shadow-lg py-1 animate-in fade-in zoom-in-95 duration-100"
        style={{
          top: position.top,
          right: position.right
        }}>

        <button
          onClick={() => handleAction('duplicate')}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a] flex items-center gap-3 transition-colors">

          <Copy size={16} />
          Duplicate Project
        </button>
        <button
          onClick={() => handleAction('archive')}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a] flex items-center gap-3 transition-colors">

          <Archive size={16} />
          Archive Project
        </button>
        <button
          onClick={() => handleAction('export')}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a] flex items-center gap-3 transition-colors">

          <Download size={16} />
          Export Data
        </button>
        <div className="h-px bg-gray-100 dark:bg-[#27272a] my-1" />
        <button
          onClick={() => handleAction('delete')}
          className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-3 transition-colors">

          <Trash2 size={16} />
          Delete Project
        </button>
      </div>
    </>);

}