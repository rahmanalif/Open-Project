import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}
export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger'
}: ConfirmDialogProps) {
  if (!isOpen) return null;
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/20 dark:bg-black/40 backdrop-blur-sm"
        onClick={onClose} />


      <div className="relative w-full max-w-sm bg-white dark:bg-[#141416] rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${variant === 'danger' ? 'bg-red-100 dark:bg-red-500/10' : variant === 'warning' ? 'bg-amber-100 dark:bg-amber-500/10' : 'bg-blue-100 dark:bg-blue-500/10'}`}>

              <AlertTriangle
                size={20}
                className={
                variant === 'danger' ?
                'text-red-600 dark:text-red-400' :
                variant === 'warning' ?
                'text-amber-600 dark:text-amber-400' :
                'text-blue-600 dark:text-blue-400'
                } />

            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {message}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-lg transition-colors">

              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors shadow-sm ${variant === 'danger' ? 'bg-red-600 hover:bg-red-700' : variant === 'warning' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'}`}>

              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>);

}