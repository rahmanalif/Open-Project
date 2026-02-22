import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { ROLE_OPTIONS, SCOPE_OPTIONS, EXP_LEVEL_OPTIONS } from './constants';

interface RolesStepProps {
  data: any;
  updateData: (key: string, value: any) => void;
}

type RoleRequirement = {
  name: string;
  scope: string;
  level: string;
  expectedTools: string[];
  peopleNeeded: number;
};

export function RolesStep({ data, updateData }: RolesStepProps) {
  const selectedRoles: RoleRequirement[] = data.roles || [];
  const [toolInputs, setToolInputs] = useState<Record<string, string>>({});

  const toggleRole = (roleName: string) => {
    if (selectedRoles.some((r) => r.name === roleName)) {
      updateData(
        'roles',
        selectedRoles.filter((r) => r.name !== roleName)
      );
      return;
    }
    updateData('roles', [
      ...selectedRoles,
      {
        name: roleName,
        scope: 'Contributor',
        level: 'Intermediate',
        expectedTools: [],
        peopleNeeded: 1
      }
    ]);
  };

  const updateRole = (roleName: string, patch: Partial<RoleRequirement>) => {
    updateData(
      'roles',
      selectedRoles.map((r) => (r.name === roleName ? { ...r, ...patch } : r))
    );
  };

  const addTool = (roleName: string) => {
    const value = (toolInputs[roleName] || '').trim();
    if (!value) return;
    const role = selectedRoles.find((item) => item.name === roleName);
    if (!role) return;
    if (!role.expectedTools.some((item) => item.toLowerCase() === value.toLowerCase())) {
      updateRole(roleName, { expectedTools: [...role.expectedTools, value] });
    }
    setToolInputs((prev) => ({ ...prev, [roleName]: '' }));
  };

  const removeTool = (roleName: string, tool: string) => {
    const role = selectedRoles.find((item) => item.name === roleName);
    if (!role) return;
    updateRole(roleName, {
      expectedTools: role.expectedTools.filter((item) => item !== tool)
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          Roles Needed
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Add one or more roles, then define expectations for each.
        </p>

        <div className="flex flex-wrap gap-2 mb-6 max-h-36 overflow-y-auto pr-1">
          {ROLE_OPTIONS.map((role) => {
            const active = selectedRoles.some((r) => r.name === role);
            return (
              <button
                key={role}
                onClick={() => toggleRole(role)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${active ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30' : 'bg-white dark:bg-[#1f1f23] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] hover:bg-gray-50 dark:hover:bg-[#27272a]'}`}>

                <span className="flex items-center gap-1">
                  {active ? <X size={14} /> : <Plus size={14} />} {role}
                </span>
              </button>);

          })}
        </div>

        {selectedRoles.length === 0 &&
        <div className="text-center py-8 bg-gray-50 dark:bg-[#1f1f23] rounded-lg border border-dashed border-gray-300 dark:border-[#3f3f46] text-gray-400 dark:text-gray-500 text-sm">
            Select at least one role to continue.
          </div>
        }

        {selectedRoles.length > 0 &&
        <div className="space-y-4 border-t border-gray-100 dark:border-[#27272a] pt-4">
            {selectedRoles.map((role) =>
          <div
            key={role.name}
            className="bg-gray-50 dark:bg-[#1f1f23] p-4 rounded-lg border border-gray-200 dark:border-[#27272a]">

                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {role.name}
                  </span>
                  <button
                onClick={() => toggleRole(role.name)}
                className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400">

                    <X size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Scope
                    </label>
                    <select
                  value={role.scope}
                  onChange={(e) => updateRole(role.name, { scope: e.target.value })}
                  className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500">

                      {SCOPE_OPTIONS.map((scope) =>
                    <option key={scope} value={scope}>
                          {scope}
                        </option>
                    )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Experience Level
                    </label>
                    <select
                  value={role.level}
                  onChange={(e) => updateRole(role.name, { level: e.target.value })}
                  className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500">

                      {EXP_LEVEL_OPTIONS.map((level) =>
                    <option key={level} value={level}>
                          {level}
                        </option>
                    )}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Tools or Stack Expected (Optional)
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {role.expectedTools.map((tool) =>
                    <span
                      key={tool}
                      className="px-2.5 py-1 bg-white dark:bg-[#141416] border border-gray-200 dark:border-[#3f3f46] rounded-full text-xs text-gray-700 dark:text-gray-300 flex items-center gap-1.5">

                          {tool}
                          <button
                        onClick={() => removeTool(role.name, tool)}
                        className="text-gray-400 hover:text-red-500">

                            x
                          </button>
                        </span>
                    )}
                    </div>
                    <input
                  type="text"
                  value={toolInputs[role.name] || ''}
                  onChange={(e) =>
                  setToolInputs((prev) => ({ ...prev, [role.name]: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTool(role.name);
                    }
                  }}
                  placeholder="Add expected tool and press Enter"
                  className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500" />

                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Number of People Needed (1-5)
                    </label>
                    <input
                  type="number"
                  min={1}
                  max={5}
                  value={role.peopleNeeded}
                  onChange={(e) => {
                    const value = Math.min(5, Math.max(1, Number(e.target.value) || 1));
                    updateRole(role.name, { peopleNeeded: value });
                  }}
                  className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500" />

                  </div>
                </div>
              </div>
          )}
          </div>
        }
      </div>
    </div>);

}
