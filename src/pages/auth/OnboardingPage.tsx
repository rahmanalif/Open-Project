import React, { useState } from 'react';
import { Command } from 'lucide-react';

type OnboardingPageProps = {
  onContinue?: (profile: {
    skills: string[];
    preferredRole: string;
    weeklyHours: string;
    timezone: string;
    language: string;
  }) => void;
};

const SKILL_OPTIONS = [
  'Frontend Development',
  'Backend Development',
  'UI/UX Design',
  'Product Management',
  'QA Testing',
  'Content Writing'
];

const ROLE_OPTIONS = ['Developer', 'Designer', 'Product Manager', 'QA', 'Writer'];
const HOURS_OPTIONS = ['5-10 hrs/week', '10-20 hrs/week', '20+ hrs/week'];
const TIMEZONE_OPTIONS = ['GMT+6 (Bangladesh)', 'GMT+5:30 (India)', 'UTC', 'Flexible'];
const LANGUAGE_OPTIONS = ['Bangla', 'English', 'Bangla + English'];

export function OnboardingPage({ onContinue }: OnboardingPageProps) {
  const [skills, setSkills] = useState<string[]>([]);
  const [preferredRole, setPreferredRole] = useState('');
  const [weeklyHours, setWeeklyHours] = useState('');
  const [timezone, setTimezone] = useState('');
  const [language, setLanguage] = useState('');

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((item) => item !== skill) : [...prev, skill]
    );
  };

  const isValid =
    skills.length > 0 &&
    Boolean(preferredRole) &&
    Boolean(weeklyHours) &&
    Boolean(timezone) &&
    Boolean(language);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a0a0b] dark:to-[#141416] flex items-center justify-center p-4 transition-colors duration-200">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
              <Command size={20} className="text-white dark:text-gray-900" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Nexus</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Complete your collaboration profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            This helps us give better project matches from day one.
          </p>
        </div>

        <div className="bg-white dark:bg-[#141416] rounded-xl shadow-lg border border-gray-200 dark:border-[#27272a] p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Your skills (choose at least 1)
            </label>
            <div className="flex flex-wrap gap-2">
              {SKILL_OPTIONS.map((skill) => {
                const active = skills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                      active
                        ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300'
                        : 'bg-white dark:bg-[#1f1f23] border-gray-300 dark:border-[#3f3f46] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a]'
                    }`}
                    type="button">
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred role
              </label>
              <select
                value={preferredRole}
                onChange={(e) => setPreferredRole(e.target.value)}
                className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select role</option>
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Weekly availability
              </label>
              <select
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(e.target.value)}
                className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select hours</option>
                {HOURS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timezone preference
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select timezone</option>
                {TIMEZONE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select language</option>
                {LANGUAGE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            disabled={!isValid}
            onClick={() =>
              onContinue?.({
                skills,
                preferredRole,
                weeklyHours,
                timezone,
                language
              })
            }
            className={`w-full py-2.5 rounded-lg font-medium transition-colors shadow-sm ${
              isValid
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                : 'bg-gray-100 dark:bg-[#27272a] text-gray-400 dark:text-gray-600 cursor-not-allowed'
            }`}>
            Continue to sign in
          </button>
        </div>
      </div>
    </div>
  );
}
