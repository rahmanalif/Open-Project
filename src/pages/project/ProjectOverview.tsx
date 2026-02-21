import React, { useState } from 'react';
import { X, CheckCircle2, Clock, BarChart3 } from 'lucide-react';
import { ActivityFeed } from '../../components/project-workspace/ActivityFeed';
import { NextActionsPanel } from '../../components/project-workspace/NextActionsPanel';
import { CreateTaskModal } from '../../components/modals/CreateTaskModal';
import { InviteMemberModal } from '../../components/modals/InviteMemberModal';
export function ProjectOverview() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showInviteMember, setShowInviteMember] = useState(false);
  const handleCreateTask = (taskData: any) => {
    console.log('Task created:', taskData);
    // In a real app, would add to state/backend
  };
  const handleInviteMember = (inviteData: any) => {
    console.log('Member invited:', inviteData);
    // In a real app, would send invitation
  };
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      {showWelcome &&
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white relative shadow-lg animate-in fade-in slide-in-from-top-4">
          <button
          onClick={() => setShowWelcome(false)}
          className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10 p-1 rounded-md transition-colors">

            <X size={18} />
          </button>
          <h2 className="text-2xl font-bold mb-2">
            Welcome to your new project! 👋
          </h2>
          <p className="text-indigo-100 max-w-2xl mb-6">
            This is your command center. Start by creating your first task,
            inviting team members, or setting up your project roadmap.
          </p>
          <div className="flex gap-3">
            <button
            onClick={() => setShowCreateTask(true)}
            className="px-4 py-2 bg-white text-indigo-600 font-medium rounded-lg shadow-sm hover:bg-indigo-50 transition-colors">

              Create First Task
            </button>
            <button
            onClick={() => setShowInviteMember(true)}
            className="px-4 py-2 bg-indigo-700/50 text-white font-medium rounded-lg hover:bg-indigo-700/70 transition-colors border border-white/20">

              Invite Team
            </button>
          </div>
        </div>
      }

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Card */}
          <div className="bg-white dark:bg-[#1f1f23] border border-gray-200 dark:border-[#27272a] rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Project Summary
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Created Oct 12, 2023 • 45 days remaining
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20">
                Development Phase
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Building a privacy-focused analytics platform for indie hackers
              and small teams. The goal is to provide simple, actionable
              insights without compromising user privacy.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-[#27272a]">
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Owner
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-[10px] font-bold text-white">
                    JD
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    John Doe
                  </span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Team Velocity
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 size={16} className="text-emerald-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    12 pts/week
                  </span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Tasks
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-blue-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    11/24 Done
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="bg-white dark:bg-[#1f1f23] border border-gray-200 dark:border-[#27272a] rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white">
                Progress
              </h3>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                45% Complete
              </span>
            </div>

            <div className="w-full h-3 bg-gray-100 dark:bg-[#27272a] rounded-full overflow-hidden mb-8">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                style={{
                  width: '45%'
                }} />

            </div>

            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 dark:bg-[#27272a] -z-10" />
              <div className="flex justify-between">
                {[
                {
                  label: 'Planning',
                  status: 'done'
                },
                {
                  label: 'Design',
                  status: 'done'
                },
                {
                  label: 'Development',
                  status: 'current'
                },
                {
                  label: 'Testing',
                  status: 'upcoming'
                },
                {
                  label: 'Launch',
                  status: 'upcoming'
                }].
                map((milestone, i) =>
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 bg-white dark:bg-[#1f1f23] px-2">

                    <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors
                      ${milestone.status === 'done' ? 'bg-emerald-500 border-emerald-500 text-white' : ''}
                      ${milestone.status === 'current' ? 'bg-white dark:bg-[#1f1f23] border-blue-500 text-blue-500' : ''}
                      ${milestone.status === 'upcoming' ? 'bg-white dark:bg-[#1f1f23] border-gray-200 dark:border-[#3f3f46] text-gray-300 dark:text-gray-600' : ''}
                    `}>

                      {milestone.status === 'done' &&
                    <CheckCircle2 size={16} />
                    }
                      {milestone.status === 'current' &&
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />
                    }
                      {milestone.status === 'upcoming' &&
                    <div className="w-2.5 h-2.5 bg-gray-200 dark:bg-[#3f3f46] rounded-full" />
                    }
                    </div>
                    <span
                    className={`text-xs font-medium ${milestone.status === 'current' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>

                      {milestone.label}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <ActivityFeed />
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          <NextActionsPanel />

          {/* Quick Stats / Mini Widgets */}
          <div className="bg-white dark:bg-[#1f1f23] border border-gray-200 dark:border-[#27272a] rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Upcoming Deadlines
            </h3>
            <div className="space-y-3">
              {[
              {
                title: 'Design Review',
                date: 'Tomorrow',
                urgent: true
              },
              {
                title: 'API Integration',
                date: 'Oct 24',
                urgent: false
              },
              {
                title: 'Beta Launch',
                date: 'Nov 01',
                urgent: false
              }].
              map((item, i) =>
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-[#27272a] transition-colors">

                  <div className="flex items-center gap-3">
                    <div
                    className={`w-1.5 h-1.5 rounded-full ${item.urgent ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'}`} />

                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {item.title}
                    </span>
                  </div>
                  <span
                  className={`text-xs font-medium ${item.urgent ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>

                    {item.date}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateTaskModal
        isOpen={showCreateTask}
        onClose={() => setShowCreateTask(false)}
        onCreateTask={handleCreateTask} />

      <InviteMemberModal
        isOpen={showInviteMember}
        onClose={() => setShowInviteMember(false)}
        onInvite={handleInviteMember} />

    </div>);

}