import React from 'react';
import { Clock, Calendar, AlertTriangle } from 'lucide-react';
interface CommitmentStepProps {
  data: any;
  updateData: (key: string, value: any) => void;
}
export function CommitmentStep({ data, updateData }: CommitmentStepProps) {
  const hoursOptions = [
  {
    value: '1-5',
    label: '1-5 hrs/week',
    desc: 'Side project'
  },
  {
    value: '5-10',
    label: '5-10 hrs/week',
    desc: 'Regular side project'
  },
  {
    value: '10-20',
    label: '10-20 hrs/week',
    desc: 'Serious commitment'
  },
  {
    value: '20-30',
    label: '20-30 hrs/week',
    desc: 'Part-time'
  },
  {
    value: '30+',
    label: '30+ hrs/week',
    desc: 'Full-time'
  }];

  const timelineOptions = [
  {
    id: 'short',
    label: 'Short experiment',
    desc: '1-3 months'
  },
  {
    id: 'medium',
    label: 'Medium-term build',
    desc: '3-6 months'
  },
  {
    id: 'long',
    label: 'Long-term venture',
    desc: '6+ months'
  }];

  const urgencyOptions = [
  {
    id: 'flexible',
    label: 'Flexible',
    desc: 'No deadline pressure'
  },
  {
    id: 'moderate',
    label: 'Moderate',
    desc: 'Soft deadlines'
  },
  {
    id: 'high',
    label: 'High',
    desc: 'Time-sensitive'
  }];

  const showWarning =
  data.goal === 'learning' && data.urgency === 'high' ||
  data.stage === 'idea' && data.hours === '30+';
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          Expected time commitment
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Be realistic. It's better to under-promise and over-deliver.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Weekly Hours
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {hoursOptions.map((opt) =>
              <button
                key={opt.value}
                onClick={() => updateData('hours', opt.value)}
                className={`
                    p-2 rounded-lg border text-center transition-all
                    ${data.hours === opt.value ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 ring-1 ring-blue-600 dark:ring-blue-500' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}
                  `}>

                  <div
                  className={`text-sm font-medium ${data.hours === opt.value ? 'text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>

                    {opt.label}
                  </div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                    {opt.desc}
                  </div>
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
                {timelineOptions.map((opt) =>
                <button
                  key={opt.id}
                  onClick={() => updateData('timeline', opt.id)}
                  className={`
                      w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all
                      ${data.timeline === opt.id ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 ring-1 ring-blue-600 dark:ring-blue-500' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}
                    `}>

                    <span
                    className={`text-sm font-medium ${data.timeline === opt.id ? 'text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>

                      {opt.label}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {opt.desc}
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
                {urgencyOptions.map((opt) =>
                <button
                  key={opt.id}
                  onClick={() => updateData('urgency', opt.id)}
                  className={`
                      w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all
                      ${data.urgency === opt.id ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 ring-1 ring-blue-600 dark:ring-blue-500' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}
                    `}>

                    <span
                    className={`text-sm font-medium ${data.urgency === opt.id ? 'text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>

                      {opt.label}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {opt.desc}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {showWarning &&
        <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 rounded-md text-sm mt-6 animate-in fade-in border border-amber-100 dark:border-amber-900/30">
            <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
            <p>
              {data.goal === 'learning' && data.urgency === 'high' ?
            'Learning-focused projects with high urgency often lead to burnout. Consider lowering urgency.' :
            'Idea stage projects rarely sustain 30+ hrs/week. Consider starting with lower commitment.'}
            </p>
          </div>
        }
      </div>
    </div>);

}