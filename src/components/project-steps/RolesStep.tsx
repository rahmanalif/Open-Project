import React from 'react';
import { Plus, X, AlertCircle } from 'lucide-react';
interface RolesStepProps {
  data: any;
  updateData: (key: string, value: any) => void;
}
const ROLE_TAXONOMY = [
'Frontend Developer',
'Backend Developer',
'UI/UX Designer',
'Mobile Developer',
'DevOps Engineer',
'Product Manager',
'Marketing/Growth',
'Copywriter',
'Sound Designer',
'3D Artist'];

export function RolesStep({ data, updateData }: RolesStepProps) {
  const selectedRoles = data.roles || [];
  const toggleRole = (roleName: string) => {
    if (selectedRoles.some((r: any) => r.name === roleName)) {
      updateData(
        'roles',
        selectedRoles.filter((r: any) => r.name !== roleName)
      );
    } else {
      updateData('roles', [
      ...selectedRoles,
      {
        name: roleName,
        scope: 'Contributor',
        level: 'Intermediate'
      }]
      );
    }
  };
  const updateRoleDetail = (
  roleName: string,
  field: 'scope' | 'level',
  value: string) =>
  {
    updateData(
      'roles',
      selectedRoles.map((r: any) =>
      r.name === roleName ?
      {
        ...r,
        [field]: value
      } :
      r
      )
    );
  };
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          What roles do you need?
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Select the specific skills missing from your project.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {ROLE_TAXONOMY.map((role) => {
            const isSelected = selectedRoles.some((r: any) => r.name === role);
            return (
              <button
                key={role}
                onClick={() => toggleRole(role)}
                className={`
                  px-3 py-1.5 rounded-full text-sm font-medium border transition-all
                  ${isSelected ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30' : 'bg-white dark:bg-[#1f1f23] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] hover:bg-gray-50 dark:hover:bg-[#27272a]'}
                `}>

                {isSelected ?
                <span className="flex items-center gap-1">
                    <X size={14} /> {role}
                  </span> :

                <span className="flex items-center gap-1">
                    <Plus size={14} /> {role}
                  </span>
                }
              </button>);

          })}
        </div>

        {selectedRoles.length > 0 ?
        <div className="space-y-4 border-t border-gray-100 dark:border-[#27272a] pt-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Define expectations for each role:
            </h3>
            {selectedRoles.map((role: any) =>
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Scope
                    </label>
                    <select
                  value={role.scope}
                  onChange={(e) =>
                  updateRoleDetail(role.name, 'scope', e.target.value)
                  }
                  className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500">

                      <option value="Lead">Lead (Owns the domain)</option>
                      <option value="Contributor">Contributor (Tasks)</option>
                      <option value="Advisor">Advisor (Guidance)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Experience Level
                    </label>
                    <select
                  value={role.level}
                  onChange={(e) =>
                  updateRoleDetail(role.name, 'level', e.target.value)
                  }
                  className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500">

                      <option value="Beginner-friendly">
                        Beginner-friendly
                      </option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
              </div>
          )}
          </div> :

        <div className="text-center py-8 bg-gray-50 dark:bg-[#1f1f23] rounded-lg border border-dashed border-gray-300 dark:border-[#3f3f46] text-gray-400 dark:text-gray-500 text-sm">
            Select at least one role to proceed
          </div>
        }

        {selectedRoles.length >= 5 &&
        <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 rounded-md text-sm mt-4 border border-amber-100 dark:border-amber-900/30">
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            <p>
              Consider starting with fewer roles to increase match quality. You
              can add more later.
            </p>
          </div>
        }
      </div>
    </div>);

}