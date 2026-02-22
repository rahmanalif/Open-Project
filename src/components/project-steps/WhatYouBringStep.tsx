import React, { useState } from 'react';
import { ROLE_OPTIONS, SCOPE_OPTIONS, HOURS_OPTIONS } from './constants';

interface WhatYouBringStepProps {
  data: any;
  updateData: (key: string, value: any) => void;
}

export function WhatYouBringStep({ data, updateData }: WhatYouBringStepProps) {
  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value) return;
    const existing = data.yourSkills || [];
    if (!existing.some((item: string) => item.toLowerCase() === value.toLowerCase())) {
      updateData('yourSkills', [...existing, value]);
    }
    setSkillInput('');
  };

  const removeSkill = (skill: string) => {
    updateData('yourSkills', (data.yourSkills || []).filter((item: string) => item !== skill));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Role in This Project
          </label>
          <select
            value={data.ownerRole || ''}
            onChange={(e) => updateData('ownerRole', e.target.value)}
            className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500">

            <option value="">Select your role</option>
            {ROLE_OPTIONS.map((role) =>
            <option key={role} value={role}>
                {role}
              </option>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Scope
          </label>
          <select
            value={data.ownerScope || ''}
            onChange={(e) => updateData('ownerScope', e.target.value)}
            className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500">

            <option value="">Select scope</option>
            {SCOPE_OPTIONS.map((scope) =>
            <option key={scope} value={scope}>
                {scope}
              </option>
            )}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Skills on This Project
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {(data.yourSkills || []).map((skill: string) =>
          <span
            key={skill}
            className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-sm rounded-full border border-blue-100 dark:border-blue-500/20 flex items-center gap-2">

              {skill}
              <button
              onClick={() => removeSkill(skill)}
              className="hover:text-blue-900 dark:hover:text-blue-300">

                x
              </button>
            </span>
          )}
        </div>

        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addSkill();
            }
          }}
          placeholder="Add a tool/skill and press Enter (e.g., React, Figma, Unity)"
          className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />

      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Your Weekly Commitment
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
          {HOURS_OPTIONS.map((option) =>
          <button
            key={option}
            onClick={() => updateData('ownerHours', option)}
            className={`p-2 rounded-lg border text-sm text-center transition-all ${data.ownerHours === option ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-300 font-medium' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}`}>

            {option}
          </button>
          )}
        </div>
      </div>
    </div>);

}
