import React from 'react';
import {
  Users,
  Briefcase,
  DollarSign,
  GraduationCap,
  AlertCircle } from
'lucide-react';
interface CollaborationStepProps {
  data: any;
  updateData: (key: string, value: any) => void;
}
export function CollaborationStep({
  data,
  updateData
}: CollaborationStepProps) {
  const models = [
  {
    id: 'equal',
    label: 'Equal Partners',
    desc: 'Shared ownership, equal decision-making',
    icon: Users
  },
  {
    id: 'role',
    label: 'Role-based Contributors',
    desc: 'Defined roles, clear responsibilities',
    icon: Briefcase
  },
  {
    id: 'revenue',
    label: 'Revenue-share',
    desc: 'Profit split based on contribution',
    icon: DollarSign
  },
  {
    id: 'learning',
    label: 'Learning Collaboration',
    desc: 'No ownership, skill development focus',
    icon: GraduationCap
  }];

  const getOwnershipOptions = (model: string) => {
    switch (model) {
      case 'equal':
        return ['50/50 split', 'Negotiable equity', 'Other'];
      case 'role':
        return ['Project lead owns IP', 'Shared ownership', 'Other'];
      case 'revenue':
        return ['% based on hours', '% based on role', 'Other'];
      case 'learning':
        return ['No ownership (open source)', 'Portfolio rights only', 'Other'];
      default:
        return [];
    }
  };
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          Collaboration Model
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          How will you work together?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {models.map((model) =>
          <button
            key={model.id}
            onClick={() => {
              updateData('collabModel', model.id);
              updateData('ownership', '');
            }}
            className={`
                flex items-start gap-3 p-4 rounded-lg border text-left transition-all
                ${data.collabModel === model.id ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 ring-1 ring-blue-600 dark:ring-blue-500' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}
              `}>

              <div
              className={`p-2 rounded-md ${data.collabModel === model.id ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-[#27272a] text-gray-500 dark:text-gray-400'}`}>

                <model.icon size={20} />
              </div>
              <div>
                <div
                className={`font-medium ${data.collabModel === model.id ? 'text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>

                  {model.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {model.desc}
                </div>
              </div>
            </button>
          )}
        </div>

        {data.collabModel &&
        <div className="animate-in fade-in slide-in-from-top-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Ownership Structure
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {getOwnershipOptions(data.collabModel).map((opt) =>
            <button
              key={opt}
              onClick={() => updateData('ownership', opt)}
              className={`
                    p-3 rounded-lg border text-sm text-center transition-all
                    ${data.ownership === opt ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-300 font-medium' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}
                  `}>

                  {opt}
                </button>
            )}
            </div>
            {!data.ownership &&
          <div className="flex items-center gap-2 mt-3 text-xs text-amber-600 dark:text-amber-400">
                <AlertCircle size={12} />
                <span>Please define ownership to avoid future conflicts.</span>
              </div>
          }
          </div>
        }
      </div>
    </div>);

}