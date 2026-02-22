import React, { useState } from 'react';
import {
  MATCHING_MODES,
  MATCH_WEIGHT_ITEMS,
  VISIBILITY_AFTER_MATCH_OPTIONS } from
'./constants';

interface MatchingVisibilityStepProps {
  data: any;
  updateData: (key: string, value: any) => void;
}

export function MatchingVisibilityStep({
  data,
  updateData
}: MatchingVisibilityStepProps) {
  const [inviteInput, setInviteInput] = useState('');

  const moveWeight = (fromIndex: number, toIndex: number) => {
    const weights = [...(data.matchWeights || MATCH_WEIGHT_ITEMS)];
    if (toIndex < 0 || toIndex >= weights.length) return;
    const [moved] = weights.splice(fromIndex, 1);
    weights.splice(toIndex, 0, moved);
    updateData('matchWeights', weights);
  };

  const addInvite = () => {
    const value = inviteInput.trim();
    if (!value) return;
    const existing = data.invitedUsers || [];
    if (!existing.some((item: string) => item.toLowerCase() === value.toLowerCase())) {
      updateData('invitedUsers', [...existing, value]);
    }
    setInviteInput('');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          Matching & Visibility Settings
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Choose how this project finds collaborators.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {MATCHING_MODES.map((mode) => {
            const active = data.matchingMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => updateData('matchingMode', mode.id)}
                className={`p-4 rounded-lg border text-left transition-all ${active ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 ring-1 ring-blue-600 dark:ring-blue-500' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}`}>

                <p className={`font-medium ${active ? 'text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>
                  {mode.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {mode.desc}
                </p>
              </button>);

          })}
        </div>

        {data.matchingMode === 'auto' &&
        <div className="mb-6 p-4 rounded-lg border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#1f1f23]">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Match Preference Weights
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              Reorder priorities using up/down controls.
            </p>
            <div className="space-y-2">
              {(data.matchWeights || MATCH_WEIGHT_ITEMS).map((item: string, idx: number) =>
            <div
              key={item}
              className="flex items-center justify-between p-2.5 rounded-md border border-gray-200 dark:border-[#3f3f46] bg-white dark:bg-[#141416]">

                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {idx + 1}. {item}
                  </span>
                  <div className="flex gap-2">
                    <button
                    onClick={() => moveWeight(idx, idx - 1)}
                    className="px-2 py-1 text-xs rounded border border-gray-300 dark:border-[#3f3f46] text-gray-600 dark:text-gray-300">

                      Up
                    </button>
                    <button
                    onClick={() => moveWeight(idx, idx + 1)}
                    className="px-2 py-1 text-xs rounded border border-gray-300 dark:border-[#3f3f46] text-gray-600 dark:text-gray-300">

                      Down
                    </button>
                  </div>
                </div>
            )}
            </div>
          </div>
        }

        {data.matchingMode === 'open' &&
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Application Question
            </label>
            <textarea
              value={data.applicationQuestion || ''}
              onChange={(e) => updateData('applicationQuestion', e.target.value)}
              maxLength={200}
              rows={3}
              placeholder="Tell me what excites you about this project and what you would bring to it."
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />

            <div className="text-right text-xs text-gray-400 dark:text-gray-500 mt-1">
              {data.applicationQuestion?.length || 0}/200
            </div>
          </div>
        }

        {data.matchingMode === 'invite' &&
        <div className="mb-6 p-4 rounded-lg border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#1f1f23]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Invite Users by Display Name
            </label>
            <input
              type="text"
              value={inviteInput}
              onChange={(e) => setInviteInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addInvite();
                }
              }}
              placeholder="Type display name and press Enter"
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />

            <div className="flex flex-wrap gap-2 mt-3">
              {(data.invitedUsers || []).map((name: string) =>
            <span
              key={name}
              className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 text-sm rounded-full border border-blue-100 dark:border-blue-500/20 flex items-center gap-2">

                  {name}
                  <button
                onClick={() =>
                updateData(
                  'invitedUsers',
                  (data.invitedUsers || []).filter((item: string) => item !== name)
                )
                }
                className="hover:text-blue-900 dark:hover:text-blue-200">

                    x
                  </button>
                </span>
            )}
            </div>
          </div>
        }

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Visibility After Matching
          </label>
          <select
            value={data.visibilityAfterMatching || ''}
            onChange={(e) => updateData('visibilityAfterMatching', e.target.value)}
            className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500">

            <option value="">Select visibility behavior</option>
            {VISIBILITY_AFTER_MATCH_OPTIONS.map((option) =>
            <option key={option} value={option}>
                {option}
              </option>
            )}
          </select>
        </div>
      </div>
    </div>);

}
