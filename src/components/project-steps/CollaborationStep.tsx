import React from 'react';
import { AlertCircle, Briefcase, DollarSign, GraduationCap, Users } from 'lucide-react';
import {
  COLLAB_MODEL_OPTIONS,
  DEAL_BREAKER_OPTIONS,
  ONBOARDING_OPTIONS } from
'./constants';

interface CollaborationStepProps {
  data: any;
  updateData: (key: string, value: any) => void;
}

export function CollaborationStep({ data, updateData }: CollaborationStepProps) {
  const roleNames = (data.roles || []).map((role: any) => role.name);

  const iconMap: Record<string, React.ComponentType<{size?: number;}>> = {
    equal: Users,
    role: Briefcase,
    revenue: DollarSign,
    learning: GraduationCap
  };

  const roleOwnership = data.roleOwnership || {};
  const equalSplits = data.equalSplits || {};
  const revenueSplits = data.revenueSplits || {};

  const totalEqual = roleNames.reduce(
    (sum: number, name: string) => sum + (Number(equalSplits[name]) || 0),
    0
  );
  const totalRevenue = roleNames.reduce(
    (sum: number, name: string) => sum + (Number(revenueSplits[name]) || 0),
    0
  );

  const toggleDealBreaker = (value: string) => {
    const current = data.dealBreakers || [];
    if (current.includes(value)) {
      updateData(
        'dealBreakers',
        current.filter((item: string) => item !== value)
      );
      return;
    }
    if (current.length >= 2) return;
    updateData('dealBreakers', [...current, value]);
  };

  const setEqualSplit = (roleName: string, value: number) => {
    updateData('equalSplits', {
      ...equalSplits,
      [roleName]: value
    });
  };

  const setRoleOwnership = (roleName: string, value: string) => {
    updateData('roleOwnership', {
      ...roleOwnership,
      [roleName]: value
    });
  };

  const setRevenueSplit = (roleName: string, value: number) => {
    updateData('revenueSplits', {
      ...revenueSplits,
      [roleName]: value
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          Collaboration Setup
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Set ownership expectations clearly before collaboration begins.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {COLLAB_MODEL_OPTIONS.map((model) => {
            const Icon = iconMap[model.id] || Users;
            const active = data.collabModel === model.id;
            return (
              <button
                key={model.id}
                onClick={() => {
                  updateData('collabModel', model.id);
                  updateData('equalSplits', {});
                  updateData('roleOwnership', {});
                  updateData('revenueSplits', {});
                  updateData('revenueShareStarts', '');
                }}
                className={`flex items-start gap-3 p-4 rounded-lg border text-left transition-all ${active ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 ring-1 ring-blue-600 dark:ring-blue-500' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}`}>

                <div className={`p-2 rounded-md ${active ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-[#27272a] text-gray-500 dark:text-gray-400'}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <div className={`font-medium ${active ? 'text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>
                    {model.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {model.desc}
                  </div>
                </div>
              </button>);

          })}
        </div>

        {data.collabModel === 'equal' &&
        <div className="space-y-3 mb-6 p-4 rounded-lg border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#1f1f23]">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Ownership Structure (must total 100%)
            </h3>
            {roleNames.length === 0 &&
          <p className="text-xs text-amber-600 dark:text-amber-400">
                Add roles in the previous step to define ownership split.
              </p>
            }
            {roleNames.map((name: string) =>
          <div key={name} className="flex items-center gap-3">
                <label className="w-44 text-xs text-gray-600 dark:text-gray-300">
                  {name}
                </label>
                <input
              type="number"
              min={0}
              max={100}
              value={equalSplits[name] ?? ''}
              onChange={(e) =>
              setEqualSplit(name, Math.max(0, Math.min(100, Number(e.target.value) || 0)))
              }
              className="w-28 text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500" />

                <span className="text-xs text-gray-500 dark:text-gray-400">%</span>
              </div>
          )}
            <p className={`text-xs ${totalEqual === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
              Current total: {totalEqual}%
            </p>
          </div>
        }

        {data.collabModel === 'role' &&
        <div className="space-y-3 mb-6 p-4 rounded-lg border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#1f1f23]">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Ownership Structure by Role
            </h3>
            {roleNames.map((name: string) =>
          <div key={name}>
                <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">
                  {name}
                </label>
                <select
              value={roleOwnership[name] || ''}
              onChange={(e) => setRoleOwnership(name, e.target.value)}
              className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500">

                  <option value="">Select ownership</option>
                  <option value="Full ownership of their domain">Full ownership of their domain</option>
                  <option value="Shared ownership">Shared ownership</option>
                  <option value="No ownership claim">No ownership claim</option>
                </select>
              </div>
          )}
          </div>
        }

        {data.collabModel === 'revenue' &&
        <div className="space-y-3 mb-6 p-4 rounded-lg border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#1f1f23]">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Revenue-share Split (must total 100%)
            </h3>
            {roleNames.map((name: string) =>
          <div key={name} className="flex items-center gap-3">
                <label className="w-44 text-xs text-gray-600 dark:text-gray-300">
                  {name}
                </label>
                <input
              type="number"
              min={0}
              max={100}
              value={revenueSplits[name] ?? ''}
              onChange={(e) =>
              setRevenueSplit(
                name,
                Math.max(0, Math.min(100, Number(e.target.value) || 0))
              )
              }
              className="w-28 text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500" />

                <span className="text-xs text-gray-500 dark:text-gray-400">%</span>
              </div>
          )}
            <p className={`text-xs ${totalRevenue === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
              Current total: {totalRevenue}%
            </p>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">
                Revenue share starts when
              </label>
              <select
                value={data.revenueShareStarts || ''}
                onChange={(e) => updateData('revenueShareStarts', e.target.value)}
                className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500">

                <option value="">Select start condition</option>
                <option value="From day one">From day one</option>
                <option value="After first revenue milestone">After first revenue milestone</option>
                <option value="After agreed launch date">After agreed launch date</option>
              </select>
            </div>
          </div>
        }

        {data.collabModel === 'learning' &&
        <div className="mb-6 p-4 rounded-lg border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 text-sm">
            This project has no ownership structure. It is purely collaborative
            learning.
          </div>
        }

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Onboarding Readiness
          </label>
          <select
            value={data.onboardingReadiness || ''}
            onChange={(e) => updateData('onboardingReadiness', e.target.value)}
            className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500">

            <option value="">Select readiness level</option>
            {ONBOARDING_OPTIONS.map((option) =>
            <option key={option} value={option}>
                {option}
              </option>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Deal-breakers (up to 2)
          </label>
          <div className="flex flex-wrap gap-2">
            {DEAL_BREAKER_OPTIONS.map((option) => {
              const active = (data.dealBreakers || []).includes(option);
              return (
                <button
                  key={option}
                  onClick={() => toggleDealBreaker(option)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-all ${active ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300' : 'bg-white dark:bg-[#1f1f23] border-gray-300 dark:border-[#3f3f46] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a]'}`}>

                  {option}
                </button>);

            })}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {(data.dealBreakers || []).length}/2 selected
          </p>
          {(data.dealBreakers || []).length >= 2 &&
          <div className="flex items-center gap-2 mt-2 text-xs text-amber-600 dark:text-amber-400">
              <AlertCircle size={12} />
              <span>Maximum 2 deal-breakers.</span>
            </div>
          }
        </div>
      </div>
    </div>);

}
