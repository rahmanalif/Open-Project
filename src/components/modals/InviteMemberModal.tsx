import React, { useState } from 'react';
import { X, Mail, UserPlus } from 'lucide-react';
interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (data: any) => void;
}
export function InviteMemberModal({
  isOpen,
  onClose,
  onInvite
}: InviteMemberModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    role: 'member' as 'owner' | 'admin' | 'member' | 'viewer',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    newErrors.email = 'Invalid email format';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onInvite(formData);
    setFormData({
      email: '',
      role: 'member',
      message: ''
    });
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/20 dark:bg-black/40 backdrop-blur-sm"
        onClick={onClose} />


      <div className="relative w-full max-w-md bg-white dark:bg-[#141416] rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-[#27272a]">
          <div className="flex items-center gap-2">
            <UserPlus size={20} className="text-gray-600 dark:text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Invite Team Member
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-[#27272a]">

            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                size={18} />

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value
                })
                }
                className={`w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-[#3f3f46]'}`}
                placeholder="colleague@example.com" />

            </div>
            {errors.email &&
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.email}
              </p>
            }
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value as any
              })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] rounded-lg bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">

              <option value="viewer">Viewer - Can view only</option>
              <option value="member">Member - Can edit and comment</option>
              <option value="admin">Admin - Full access except settings</option>
              <option value="owner">Owner - Full access</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Personal Message (Optional)
            </label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) =>
              setFormData({
                ...formData,
                message: e.target.value
              })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] rounded-lg bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add a personal note to the invitation..." />

          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-lg transition-colors">

              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-lg transition-colors shadow-sm">

              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>);

}