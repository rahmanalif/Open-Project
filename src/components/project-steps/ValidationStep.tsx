import React from 'react';
import { Github, Image, Link } from 'lucide-react';

interface ValidationStepProps {
  data: any;
  updateData: (key: string, value: any) => void;
}

export function ValidationStep({ data, updateData }: ValidationStepProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          Validation Context
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Add concrete context that helps people trust and join quickly.
        </p>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project Name
            </label>
            <input
              type="text"
              value={data.projectName || ''}
              onChange={(e) => updateData('projectName', e.target.value)}
              placeholder="e.g., Indie SaaS Analytics Tool"
              maxLength={50}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />

            <div className="text-right text-xs text-gray-400 dark:text-gray-500 mt-1">
              {data.projectName?.length || 0}/50
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              First Milestone
            </label>
            <textarea
              value={data.milestone || ''}
              onChange={(e) => updateData('milestone', e.target.value)}
              placeholder="What is the first concrete thing you want to achieve with your collaborator?"
              maxLength={200}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />

            <div className="text-right text-xs text-gray-400 dark:text-gray-500 mt-1">
              {data.milestone?.length || 0}/200
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Links
            </h3>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link size={14} className="text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="url"
                value={data.demoLink || ''}
                onChange={(e) => updateData('demoLink', e.target.value)}
                placeholder="Prototype or Demo URL"
                className="pl-9 w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />

            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Github size={14} className="text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="url"
                value={data.repoLink || ''}
                onChange={(e) => updateData('repoLink', e.target.value)}
                placeholder="Repository URL"
                className="pl-9 w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />

            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image size={14} className="text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="url"
                value={data.designLink || ''}
                onChange={(e) => updateData('designLink', e.target.value)}
                placeholder="Mood board or Design URL"
                className="pl-9 w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />

            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Have you collaborated before on this type of project?
            </label>
            <select
              value={data.collaborationExperience || ''}
              onChange={(e) => updateData('collaborationExperience', e.target.value)}
              className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500">

              <option value="">Optional</option>
              <option value="First time doing this">First time doing this</option>
              <option value="Yes and it went well">Yes and it went well</option>
              <option value="Yes and it was difficult">Yes and it was difficult</option>
            </select>
          </div>
        </div>
      </div>
    </div>);

}
