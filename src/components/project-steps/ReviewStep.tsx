import React from 'react';
import { Briefcase, Clock, Layers3, Target, Users } from 'lucide-react';

interface ReviewStepProps {
  data: any;
  onEditStep: (step: number) => void;
}

const sectionConfig = [
  {
    title: 'Intent',
    step: 1,
    render: (data: any) => [
      `Domain: ${data.domain || '-'}`,
      `Goal: ${data.goal || '-'}`,
      `Stage: ${data.stage || '-'}`,
      `Description: ${data.projectDescription || '-'}`
    ]
  },
  {
    title: 'What You Bring',
    step: 2,
    render: (data: any) => [
      `Your role: ${data.ownerRole || '-'}`,
      `Scope: ${data.ownerScope || '-'}`,
      `Skills: ${(data.yourSkills || []).join(', ') || '-'}`,
      `Weekly commitment: ${data.ownerHours || '-'}`
    ]
  },
  {
    title: 'Roles Needed',
    step: 3,
    render: (data: any) =>
    (data.roles || []).length > 0 ?
    data.roles.map(
      (role: any) =>
      `${role.name} | ${role.scope} | ${role.level} | ${role.peopleNeeded || 1} needed`
    ) :
    ['-']
  },
  {
    title: 'Commitment',
    step: 4,
    render: (data: any) => [
      `Expected hours: ${data.hours || '-'}`,
      `Timeline: ${data.timeline || '-'}`,
      `Urgency: ${data.urgency || '-'}`,
      `Availability note: ${data.availabilityNote || '-'}`
    ]
  },
  {
    title: 'Collaboration Setup',
    step: 5,
    render: (data: any) => [
      `Model: ${data.collabModel || '-'}`,
      `Onboarding readiness: ${data.onboardingReadiness || '-'}`,
      `Deal-breakers: ${(data.dealBreakers || []).join(', ') || '-'}`
    ]
  },
  {
    title: 'Working Style',
    step: 6,
    render: (data: any) => [
      `Communication: ${data.communication || '-'}`,
      `Meetings: ${data.meetings || '-'}`,
      `Timezone tolerance: ${data.timezoneTolerance || '-'}`,
      `Decision style: ${data.decisions || '-'}`,
      `Language: ${data.primaryLanguage || '-'}`
    ]
  },
  {
    title: 'Validation Context',
    step: 7,
    render: (data: any) => [
      `Project name: ${data.projectName || '-'}`,
      `First milestone: ${data.milestone || '-'}`,
      `Demo: ${data.demoLink || '-'}`,
      `Repo: ${data.repoLink || '-'}`
    ]
  },
  {
    title: 'Matching & Visibility',
    step: 8,
    render: (data: any) => [
      `Matching mode: ${data.matchingMode || '-'}`,
      `Visibility after matching: ${data.visibilityAfterMatching || '-'}`,
      data.matchingMode === 'open' ? `Application question: ${data.applicationQuestion || '-'}` : '',
      data.matchingMode === 'invite' ? `Invites: ${(data.invitedUsers || []).join(', ') || '-'}` : ''
    ].filter(Boolean)
  }];

export function ReviewStep({ data, onEditStep }: ReviewStepProps) {
  const modeLabel = data.matchingMode === 'auto' ?
  'Auto' :
  data.matchingMode === 'open' ?
  'Open' :
  data.matchingMode === 'invite' ?
  'Invite Only' :
  'Unselected';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          Review & Publish
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Review everything before publishing your listing.
        </p>

        <div className="bg-white dark:bg-[#1f1f23] border border-gray-200 dark:border-[#27272a] rounded-xl overflow-hidden shadow-sm mb-6">
          <div className="p-6 border-b border-gray-100 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#0a0a0b]">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {data.projectName || 'Untitled Project'}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">
                {data.domain || 'Domain'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-[#27272a] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#3f3f46]">
                {data.goal || 'Goal'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                {modeLabel}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Layers3 size={15} className="text-gray-400 dark:text-gray-500" />
              Roles needed: {(data.roles || []).map((role: any) => role.name).join(', ') || '-'}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Briefcase size={15} className="text-gray-400 dark:text-gray-500" />
              You bring: {data.ownerRole || '-'} | {(data.yourSkills || []).join(', ') || '-'}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Clock size={15} className="text-gray-400 dark:text-gray-500" />
              Commitment: {data.hours || '-'} | {data.timeline || '-'}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Users size={15} className="text-gray-400 dark:text-gray-500" />
              Working style: {data.communication || '-'} | {data.meetings || '-'}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Target size={15} className="text-gray-400 dark:text-gray-500" />
              Deal-breakers: {(data.dealBreakers || []).join(', ') || 'None'}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {sectionConfig.map((section) =>
          <div
            key={section.title}
            className="p-4 rounded-lg border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#1f1f23]">

              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </h3>
                <button
                  onClick={() => onEditStep(section.step)}
                  className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">

                  Edit
                </button>
              </div>
              <ul className="space-y-1">
                {section.render(data).map((line: string, idx: number) =>
              <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                    {line}
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>);

}
