import React from 'react';
import {
  CheckCircle2,
  Clock,
  Users,
  MessageSquare,
  Target,
  Briefcase } from
'lucide-react';
interface ReviewStepProps {
  data: any;
}
export function ReviewStep({ data }: ReviewStepProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          Review & Publish
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Check your project details before listing.
        </p>

        <div className="bg-white dark:bg-[#1f1f23] border border-gray-200 dark:border-[#27272a] rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100 dark:border-[#27272a] bg-gray-50/50 dark:bg-[#0a0a0b]">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {data.projectName || 'Untitled Project'}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 capitalize">
                {data.stage}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-[#27272a] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#3f3f46] capitalize">
                {data.goal}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Roles */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-900 dark:text-white">
                <Users size={16} className="text-gray-400 dark:text-gray-500" />
                Missing Roles
              </div>
              <div className="flex flex-wrap gap-2">
                {data.roles?.map((role: any) =>
                <div
                  key={role.name}
                  className="bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-[#3f3f46] rounded-md px-3 py-2 text-sm">

                    <div className="font-medium text-gray-900 dark:text-white">
                      {role.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {role.scope} • {role.level}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Commitment */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-900 dark:text-white">
                  <Clock
                    size={16}
                    className="text-gray-400 dark:text-gray-500" />

                  Commitment
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                    {data.hours} hrs/week
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                    {data.timeline} timeline
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                    {data.urgency} urgency
                  </li>
                </ul>
              </div>

              {/* Collaboration */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-900 dark:text-white">
                  <Briefcase
                    size={16}
                    className="text-gray-400 dark:text-gray-500" />

                  Collaboration
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                    Model: {data.collabModel}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                    Ownership: {data.ownership}
                  </li>
                </ul>
              </div>
            </div>

            {/* Working Style */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-900 dark:text-white">
                <MessageSquare
                  size={16}
                  className="text-gray-400 dark:text-gray-500" />

                Working Style
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                data.communication,
                data.meetings,
                data.timezone,
                data.decisions].

                filter(Boolean).
                map((item: string) =>
                <span
                  key={item}
                  className="px-2 py-1 bg-gray-50 dark:bg-[#27272a] text-gray-600 dark:text-gray-300 text-xs rounded border border-gray-200 dark:border-[#3f3f46]">

                      {item}
                    </span>
                )}
              </div>
            </div>

            {/* Milestone */}
            {data.milestone &&
            <div>
                <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  <Target
                  size={16}
                  className="text-gray-400 dark:text-gray-500" />

                  First Milestone
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-[#27272a] p-3 rounded-md border border-gray-200 dark:border-[#3f3f46] italic">
                  "{data.milestone}"
                </p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}