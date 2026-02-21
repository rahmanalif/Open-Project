import React, { useState } from 'react';
import {
  User,
  Briefcase,
  Settings as SettingsIcon,
  Shield,
  CheckCircle2 } from
'lucide-react';
export function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };
  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your profile, preferences, and account.
        </p>
      </div>

      <div className="space-y-10">
        {/* Profile Section */}
        <section className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-[#27272a] rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#0a0a0b] flex items-center gap-2">
            <User size={18} className="text-gray-500 dark:text-gray-400" />
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Profile
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-[#27272a] flex items-center justify-center text-xl font-medium text-gray-500 dark:text-gray-400 border-2 border-white dark:border-[#141416] shadow-sm">
                JD
              </div>
              <div>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1f1f23] border border-gray-300 dark:border-[#3f3f46] rounded-md hover:bg-gray-50 dark:hover:bg-[#27272a] transition-colors shadow-sm">
                  Upload Photo
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  JPG, GIF or PNG. Max 1MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />

              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role / Title
                </label>
                <input
                  type="text"
                  defaultValue="Product Manager"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />

              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                rows={3}
                defaultValue="Product manager with 5 years experience in SaaS. Looking for technical co-founders to build productivity tools."
                className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />

              <div className="text-right text-xs text-gray-400 dark:text-gray-500 mt-1">
                124/200
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  defaultValue="San Francisco, CA"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />

              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Portfolio / Website
                </label>
                <input
                  type="text"
                  defaultValue="https://johndoe.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />

              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-md transition-colors shadow-sm">

                {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
                {saved && <CheckCircle2 size={16} />}
              </button>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-[#27272a] rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#0a0a0b] flex items-center gap-2">
            <Briefcase size={18} className="text-gray-500 dark:text-gray-400" />
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Skills & Experience
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {['Product Management', 'Strategy', 'User Research'].map(
                  (skill) =>
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-sm rounded-full border border-blue-100 dark:border-blue-500/20 flex items-center gap-2">

                      {skill}
                      <button className="hover:text-blue-900 dark:hover:text-blue-300">
                        ×
                      </button>
                    </span>

                )}
                <button className="px-3 py-1 bg-white dark:bg-[#1f1f23] text-gray-500 dark:text-gray-400 text-sm rounded-full border border-gray-300 dark:border-[#3f3f46] border-dashed hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  + Add Skill
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Experience Level
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm">
                  <option>Expert</option>
                  <option>Advanced</option>
                  <option>Intermediate</option>
                  <option>Beginner</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  defaultValue="5"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />

              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-md transition-colors shadow-sm">

                Save Changes
              </button>
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-[#27272a] rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#0a0a0b] flex items-center gap-2">
            <SettingsIcon
              size={18}
              className="text-gray-500 dark:text-gray-400" />

            <h2 className="font-semibold text-gray-900 dark:text-white">
              Preferences
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-3">
                Availability (Hours/Week)
              </label>
              <input
                type="range"
                min="1"
                max="40"
                defaultValue="15"
                className="w-full h-2 bg-gray-200 dark:bg-[#27272a] rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500" />

              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>1 hr</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  15 hrs
                </span>
                <span>40+ hrs</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-3">
                Communication Style
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Async-first', 'Balanced', 'Sync-preferred'].map((opt) =>
                <button
                  key={opt}
                  className={`px-3 py-2 text-sm border rounded-md transition-colors ${opt === 'Balanced' ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 font-medium' : 'bg-white dark:bg-[#1f1f23] border-gray-200 dark:border-[#3f3f46] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#27272a]'}`}>

                    {opt}
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meeting Frequency
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm">
                  <option>Weekly check-ins</option>
                  <option>Bi-weekly syncs</option>
                  <option>No meetings</option>
                  <option>Daily standups</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Timezone
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm">
                  <option>(GMT-08:00) Pacific Time</option>
                  <option>(GMT-05:00) Eastern Time</option>
                  <option>(GMT+00:00) UTC</option>
                  <option>(GMT+01:00) Central European Time</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-md transition-colors shadow-sm">

                Save Changes
              </button>
            </div>
          </div>
        </section>

        {/* Account Section */}
        <section className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-[#27272a] rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#0a0a0b] flex items-center gap-2">
            <Shield size={18} className="text-gray-500 dark:text-gray-400" />
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Account
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                disabled
                className="w-full px-3 py-2 border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#0a0a0b] text-gray-500 dark:text-gray-500 rounded-md shadow-sm text-sm cursor-not-allowed" />

            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Notifications
              </h3>
              <div className="space-y-3">
                {[
                'Email me when I get a new match',
                'Email me when someone is interested in my project',
                'Send me a weekly digest'].
                map((label, i) =>
                <label key={i} className="flex items-center gap-3">
                    <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-blue-600 dark:text-blue-500 border-gray-300 dark:border-[#3f3f46] rounded focus:ring-blue-500 bg-white dark:bg-[#0a0a0b]" />

                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {label}
                    </span>
                  </label>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-[#27272a]">
              <h3 className="text-sm font-medium text-red-600 dark:text-red-400 mb-3">
                Danger Zone
              </h3>
              <div className="flex gap-4">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1f1f23] border border-gray-300 dark:border-[#3f3f46] rounded-md hover:bg-gray-50 dark:hover:bg-[#27272a] transition-colors shadow-sm">
                  Pause All Listings
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 rounded-md transition-colors shadow-sm">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>);

}