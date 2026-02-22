import React from 'react';
import {
  BookOpen,
  Briefcase,
  Clapperboard,
  Cpu,
  Gamepad2,
  Globe,
  GraduationCap,
  Image,
  Lightbulb,
  Mic2,
  Smartphone,
  Target,
  TrendingUp,
  Rocket,
  Search,
  FlaskConical,
  Hammer,
  Sparkles } from
'lucide-react';
import {
  DOMAIN_OPTIONS,
  GOAL_OPTIONS,
  STAGE_OPTIONS } from
'./constants';

interface IntentStepProps {
  data: any;
  updateData: (key: string, value: any) => void;
}

const DOMAIN_ICONS: Record<string, React.ComponentType<{size?: number; className?: string;}>> = {
  Games: Gamepad2,
  'Web App': Globe,
  'Mobile App': Smartphone,
  'Film & Video': Clapperboard,
  'Music & Audio': Mic2,
  'Art & Illustration': Image,
  Education: GraduationCap,
  'Marketing & Growth': TrendingUp,
  'Open Source': BookOpen,
  'Hardware & IoT': Cpu,
  Other: Sparkles
};

const GOAL_ICONS: Record<string, React.ComponentType<{size?: number; className?: string;}>> = {
  learning: Lightbulb,
  portfolio: Target,
  monetization: TrendingUp,
  startup: Rocket
};

const STAGE_ICONS: Record<string, React.ComponentType<{size?: number; className?: string;}>> = {
  idea: Lightbulb,
  validation: Search,
  prototype: FlaskConical,
  active: Hammer
};

export function IntentStep({ data, updateData }: IntentStepProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          Project Domain / Category
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Pick one domain so matching starts in the right context.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {DOMAIN_OPTIONS.map((domain) => {
            const Icon = DOMAIN_ICONS[domain] || Briefcase;
            const active = data.domain === domain;
            return (
              <button
                key={domain}
                onClick={() => updateData('domain', domain)}
                className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${active ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 ring-1 ring-blue-600 dark:ring-blue-500' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}`}>

                <div className={`p-2 rounded-md ${active ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-[#27272a] text-gray-500 dark:text-gray-400'}`}>
                  <Icon size={18} />
                </div>
                <span className={`text-sm font-medium ${active ? 'text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>
                  {domain}
                </span>
              </button>);

          })}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          Primary Goal
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Tell collaborators what success looks like for this project.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {GOAL_OPTIONS.map((goal) => {
            const Icon = GOAL_ICONS[goal.id] || Target;
            const active = data.goal === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => updateData('goal', goal.id)}
                className={`flex items-start gap-3 p-4 rounded-lg border text-left transition-all ${active ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 ring-1 ring-blue-600 dark:ring-blue-500' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}`}>

                <div className={`p-2 rounded-md ${active ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-[#27272a] text-gray-500 dark:text-gray-400'}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className={`font-medium ${active ? 'text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>
                    {goal.label}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {goal.desc}
                  </p>
                </div>
              </button>);

          })}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          Current Stage
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Choose the stage that best represents where this project is right now.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {STAGE_OPTIONS.map((stage) => {
            const Icon = STAGE_ICONS[stage.id] || Lightbulb;
            const active = data.stage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => updateData('stage', stage.id)}
                className={`p-3 rounded-lg border text-left transition-all ${active ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 ring-1 ring-blue-600 dark:ring-blue-500' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}`}>

                <div className="flex items-center gap-2 mb-1">
                  <Icon
                    size={16}
                    className={active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'} />
                  <span className={`text-sm font-medium ${active ? 'text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>
                    {stage.label}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stage.desc}</p>
              </button>);

          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Project Description
        </label>
        <textarea
          value={data.projectDescription || ''}
          onChange={(e) => updateData('projectDescription', e.target.value)}
          placeholder="Describe what you are building and what problem it solves."
          rows={4}
          maxLength={300}
          className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />

        <div className="text-right text-xs text-gray-400 dark:text-gray-500 mt-1">
          {data.projectDescription?.length || 0}/300
        </div>
      </div>
    </div>);

}
