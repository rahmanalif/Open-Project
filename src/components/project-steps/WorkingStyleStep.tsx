import React from 'react';
import {
  COMMUNICATION_OPTIONS,
  DECISION_STYLE_OPTIONS,
  LANGUAGE_OPTIONS,
  MEETING_OPTIONS,
  PERSONALITY_OPTIONS,
  TIMEZONE_TOLERANCE_OPTIONS } from
'./constants';

interface WorkingStyleStepProps {
  data: any;
  updateData: (key: string, value: any) => void;
}

export function WorkingStyleStep({ data, updateData }: WorkingStyleStepProps) {
  const toggleTag = (key: 'preferredPersonalityTags', value: string) => {
    const current = data[key] || [];
    if (current.includes(value)) {
      updateData(
        key,
        current.filter((item: string) => item !== value)
      );
      return;
    }
    if (current.length >= 5) return;
    updateData(key, [...current, value]);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          Working Style
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Define how communication and decisions will work day-to-day.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
              Communication Method
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {COMMUNICATION_OPTIONS.map((opt) =>
              <button
                key={opt}
                onClick={() => updateData('communication', opt)}
                className={`p-2.5 rounded-lg border text-sm transition-all ${data.communication === opt ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-300 font-medium' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}`}>

                {opt}
              </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
              Meeting Frequency
            </label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              {MEETING_OPTIONS.map((opt) =>
              <button
                key={opt}
                onClick={() => updateData('meetings', opt)}
                className={`p-2.5 rounded-lg border text-sm transition-all ${data.meetings === opt ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-300 font-medium' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}`}>

                {opt}
              </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                Timezone Tolerance
              </label>
              <div className="space-y-2">
                {TIMEZONE_TOLERANCE_OPTIONS.map((opt) =>
                <button
                  key={opt}
                  onClick={() => updateData('timezoneTolerance', opt)}
                  className={`w-full p-2.5 rounded-lg border text-sm text-left transition-all ${data.timezoneTolerance === opt ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-300 font-medium' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}`}>

                  {opt}
                </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                Decision-making Style
              </label>
              <div className="space-y-2">
                {DECISION_STYLE_OPTIONS.map((opt) =>
                <button
                  key={opt}
                  onClick={() => updateData('decisions', opt)}
                  className={`w-full p-2.5 rounded-lg border text-sm text-left transition-all ${data.decisions === opt ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-300 font-medium' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}`}>

                  {opt}
                </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Preferred Collaborator Personality Tags (up to 5)
            </label>
            <div className="flex flex-wrap gap-2">
              {PERSONALITY_OPTIONS.map((opt) => {
                const active = (data.preferredPersonalityTags || []).includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggleTag('preferredPersonalityTags', opt)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-all ${active ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300' : 'bg-white dark:bg-[#1f1f23] border-gray-300 dark:border-[#3f3f46] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a]'}`}>

                    {opt}
                  </button>);

              })}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {(data.preferredPersonalityTags || []).length}/5 selected
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Primary Working Language
            </label>
            <select
              value={data.primaryLanguage || ''}
              onChange={(e) => updateData('primaryLanguage', e.target.value)}
              className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500">

              <option value="">Select language</option>
              {LANGUAGE_OPTIONS.map((opt) =>
              <option key={opt} value={opt}>
                  {opt}
                </option>
              )}
            </select>
          </div>
        </div>
      </div>
    </div>);

}
