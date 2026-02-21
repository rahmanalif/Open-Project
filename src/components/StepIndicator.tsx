import React from 'react';
import { Check } from 'lucide-react';
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}
export function StepIndicator({
  currentStep,
  totalSteps,
  labels
}: StepIndicatorProps) {
  return (
    <div className="w-full py-4 px-6 border-b border-gray-100 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#0a0a0b]">
      <div className="flex items-center justify-between relative">
        {/* Progress Bar Background */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-200 dark:bg-[#27272a] -z-10" />

        {/* Progress Bar Fill */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-blue-600 dark:bg-blue-500 -z-10 transition-all duration-300"
          style={{
            width: `${(currentStep - 1) / (totalSteps - 1) * 100}%`
          }} />


        {labels.map((label, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          return (
            <div
              key={label}
              className="flex flex-col items-center gap-2 bg-gray-50/50 dark:bg-[#0a0a0b] px-2">

              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-all duration-200
                  ${isCompleted ? 'bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500 text-white' : ''}
                  ${isCurrent ? 'bg-white dark:bg-[#141416] border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400' : ''}
                  ${!isCompleted && !isCurrent ? 'bg-white dark:bg-[#141416] border-gray-300 dark:border-[#3f3f46] text-gray-400 dark:text-gray-600' : ''}
                `}>

                {isCompleted ? <Check size={14} /> : stepNum}
              </div>
              <span
                className={`
                  text-[10px] font-medium uppercase tracking-wider absolute -bottom-6 w-20 text-center
                  ${isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-600'}
                `}>

                {isCurrent ? label : ''}
              </span>
            </div>);

        })}
      </div>
    </div>);

}