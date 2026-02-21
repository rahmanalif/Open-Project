import React from 'react';
import { Save, AlertTriangle, Trash2, Archive, PauseCircle } from 'lucide-react';
export function ProjectSettings() {
  return (
    <div className="max-w-3xl space-y-10 pb-12">
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Project Settings
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage configuration and danger zone.
        </p>
      </div>

      {/* General */}
      <section className="space-y-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-[#27272a] pb-2">
          General
        </h3>

        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project Name
            </label>
            <input
              type="text"
              defaultValue="Indie SaaS Analytics Tool"
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#1f1f23] text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              defaultValue="Building a privacy-focused analytics platform for indie hackers and small teams."
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#1f1f23] text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />

          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phase
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#1f1f23] text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm">
                <option>Planning</option>
                <option selected>Development</option>
                <option>Testing</option>
                <option>Launch</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Visibility
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#1f1f23] text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm">
                <option>Public</option>
                <option selected>Private</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-[#27272a] pb-2">
          Notifications
        </h3>
        <div className="space-y-3">
          {[
          'Email me when tasks are assigned to me',
          'Email me when I am mentioned',
          'Send me a daily digest'].
          map((label, i) =>
          <label key={i} className="flex items-center gap-3">
              <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 bg-white dark:bg-[#1f1f23] dark:border-[#3f3f46]" />

              <span className="text-sm text-gray-600 dark:text-gray-300">
                {label}
              </span>
            </label>
          )}
        </div>
      </section>

      {/* Danger Zone */}
      <section className="space-y-4 pt-6">
        <h3 className="text-sm font-semibold text-red-600 dark:text-red-400 border-b border-red-100 dark:border-red-900/30 pb-2 flex items-center gap-2">
          <AlertTriangle size={16} /> Danger Zone
        </h3>

        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                Pause Project
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Temporarily hide this project from search results.
              </p>
            </div>
            <button className="px-3 py-1.5 text-sm font-medium text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 rounded-md transition-colors flex items-center gap-2">
              <PauseCircle size={14} /> Pause
            </button>
          </div>

          <div className="h-px bg-red-200 dark:bg-red-900/20" />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                Archive Project
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Make read-only and move to archived list.
              </p>
            </div>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors flex items-center gap-2">
              <Archive size={14} /> Archive
            </button>
          </div>

          <div className="h-px bg-red-200 dark:bg-red-900/20" />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                Delete Project
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Permanently delete this project and all data.
              </p>
            </div>
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors flex items-center gap-2">
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      </section>

      <div className="flex justify-end pt-4">
        <button className="flex items-center gap-2 px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 shadow-sm transition-colors">
          <Save size={16} />
          Save Changes
        </button>
      </div>
    </div>);

}