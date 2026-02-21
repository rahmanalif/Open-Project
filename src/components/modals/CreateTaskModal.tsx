import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: any) => void;
}
const TEAM_MEMBERS = [
{
  id: '1',
  name: 'John Doe',
  initials: 'JD',
  color: '#8b5cf6'
},
{
  id: '2',
  name: 'Sarah Chen',
  initials: 'SC',
  color: '#10b981'
},
{
  id: '3',
  name: 'Mike Wilson',
  initials: 'MW',
  color: '#3b82f6'
}];

export function CreateTaskModal({
  isOpen,
  onClose,
  onCreateTask
}: CreateTaskModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    assignee: '',
    dueDate: '',
    status: 'todo' as 'todo' | 'in-progress' | 'review' | 'done'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onCreateTask(formData);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      status: 'todo'
    });
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/20 dark:bg-black/40 backdrop-blur-sm"
        onClick={onClose} />


      <div className="relative w-full max-w-lg bg-white dark:bg-[#141416] rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-[#27272a]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Create New Task
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-[#27272a]">

            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Task Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value
              })
              }
              className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-[#3f3f46]'}`}
              placeholder="e.g., Design dashboard wireframes" />

            {errors.title &&
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.title}
              </p>
            }
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value
              })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] rounded-lg bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add more details about this task..." />

          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Priority
              </label>
              <div className="space-y-2">
                {(['high', 'medium', 'low'] as const).map((priority) =>
                <label
                  key={priority}
                  className="flex items-center gap-2 cursor-pointer">

                    <input
                    type="radio"
                    name="priority"
                    checked={formData.priority === priority}
                    onChange={() =>
                    setFormData({
                      ...formData,
                      priority
                    })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 dark:border-[#3f3f46] focus:ring-blue-500" />

                    <span
                    className={`text-sm capitalize ${priority === 'high' ? 'text-red-600 dark:text-red-400' : priority === 'medium' ? 'text-amber-600 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400'}`}>

                      {priority}
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as any
                })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] rounded-lg bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">

                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Assignee */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Assignee
              </label>
              <select
                value={formData.assignee}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  assignee: e.target.value
                })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] rounded-lg bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">

                <option value="">Unassigned</option>
                {TEAM_MEMBERS.map((member) =>
                <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                )}
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  dueDate: e.target.value
                })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] rounded-lg bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />

            </div>
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

              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>);

}