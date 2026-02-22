import React from 'react';
import { HOURS_OPTIONS, TIMELINE_OPTIONS, URGENCY_OPTIONS } from './constants';

interface CommitmentStepProps {
  data: any;
  updateData: (key: string, value: any) => void;
}

export function CommitmentStep({ data, updateData }: CommitmentStepProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          Commitment
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Set clear expectations for collaborators from the start.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Weekly Hours Expected from Collaborators
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
              {HOURS_OPTIONS.map((option) =>
              <button
                key={option}
                onClick={() => updateData('hours', option)}
                className={`p-2 rounded-lg border text-center text-sm transition-all ${data.hours === option ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-300 font-medium' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}`}>

                {option}
              </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Timeline Horizon
              </label>
              <div className="space-y-2">
                {TIMELINE_OPTIONS.map((option) =>
                <button
                  key={option}
                  onClick={() => updateData('timeline', option)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${data.timeline === option ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 ring-1 ring-blue-600 dark:ring-blue-500' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}`}>

                  <span className={`text-sm font-medium ${data.timeline === option ? 'text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>
                    {option}
                  </span>
                </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Urgency Level
              </label>
              <div className="space-y-2">
                {URGENCY_OPTIONS.map((option) =>
                <button
                  key={option}
                  onClick={() => updateData('urgency', option)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${data.urgency === option ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 ring-1 ring-blue-600 dark:ring-blue-500' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}`}>

                  <span className={`text-sm font-medium ${data.urgency === option ? 'text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>
                    {option}
                  </span>
                </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Collaborator Availability Note
            </label>
            <input
              type="text"
              value={data.availabilityNote || ''}
              onChange={(e) => updateData('availabilityNote', e.target.value)}
              maxLength={150}
              placeholder="Example: I am most active on weekends. Expecting responses within 48 hours."
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />

            <div className="text-right text-xs text-gray-400 dark:text-gray-500 mt-1">
              {data.availabilityNote?.length || 0}/150
            </div>
          </div>
        </div>
      </div>
    </div>);

}
