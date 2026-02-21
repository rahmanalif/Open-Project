import React from 'react';
import { MessageSquare, Video, Globe, Users } from 'lucide-react';
interface WorkingStyleStepProps {
  data: any;
  updateData: (key: string, value: any) => void;
}
export function WorkingStyleStep({ data, updateData }: WorkingStyleStepProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          Working Style
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Define how you prefer to collaborate.
        </p>

        <div className="space-y-6">
          {/* Communication */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare
                size={16}
                className="text-gray-400 dark:text-gray-500" />

              <label className="text-sm font-medium text-gray-900 dark:text-white">
                Communication Method
              </label>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['Async-first', 'Balanced', 'Sync-preferred'].map((opt) =>
              <button
                key={opt}
                onClick={() => updateData('communication', opt)}
                className={`
                    p-2.5 rounded-lg border text-sm transition-all
                    ${data.communication === opt ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-300 font-medium' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}
                  `}>

                  {opt}
                </button>
              )}
            </div>
          </div>

          {/* Meetings */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Video size={16} className="text-gray-400 dark:text-gray-500" />
              <label className="text-sm font-medium text-gray-900 dark:text-white">
                Meeting Frequency
              </label>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {['No meetings', 'Weekly', 'Bi-weekly', 'Daily'].map((opt) =>
              <button
                key={opt}
                onClick={() => updateData('meetings', opt)}
                className={`
                    p-2.5 rounded-lg border text-sm transition-all
                    ${data.meetings === opt ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-300 font-medium' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}
                  `}>

                  {opt}
                </button>
              )}
            </div>
          </div>

          {/* Timezone */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe size={16} className="text-gray-400 dark:text-gray-500" />
              <label className="text-sm font-medium text-gray-900 dark:text-white">
                Timezone Tolerance
              </label>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
              {
                val: 'same',
                label: 'Same timezone'
              },
              {
                val: 'flexible',
                label: 'Flexible (±4h)'
              },
              {
                val: 'async',
                label: 'Fully Async'
              }].
              map((opt) =>
              <button
                key={opt.val}
                onClick={() => updateData('timezone', opt.val)}
                className={`
                    p-2.5 rounded-lg border text-sm transition-all
                    ${data.timezone === opt.val ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-300 font-medium' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}
                  `}>

                  {opt.label}
                </button>
              )}
            </div>
          </div>

          {/* Decisions */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users size={16} className="text-gray-400 dark:text-gray-500" />
              <label className="text-sm font-medium text-gray-900 dark:text-white">
                Decision Making
              </label>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['Consensus', 'Democratic', 'Lead decides'].map((opt) =>
              <button
                key={opt}
                onClick={() => updateData('decisions', opt)}
                className={`
                    p-2.5 rounded-lg border text-sm transition-all
                    ${data.decisions === opt ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-300 font-medium' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}
                  `}>

                  {opt}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

}