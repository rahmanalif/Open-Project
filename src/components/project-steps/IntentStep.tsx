import React from 'react';
import {
  Lightbulb,
  Target,
  TrendingUp,
  Rocket,
  Search,
  FlaskConical,
  Hammer } from
'lucide-react';
interface IntentStepProps {
  data: any;
  updateData: (key: string, value: any) => void;
}
export function IntentStep({ data, updateData }: IntentStepProps) {
  const goals = [
  {
    id: 'learning',
    label: 'Learning-focused',
    desc: 'Skill development, experimentation, no pressure',
    icon: Lightbulb
  },
  {
    id: 'portfolio',
    label: 'Portfolio-driven',
    desc: 'Showcase work, build credibility, high polish',
    icon: Target
  },
  {
    id: 'monetization',
    label: 'Monetization-oriented',
    desc: 'Generate revenue, validate business model',
    icon: TrendingUp
  },
  {
    id: 'startup',
    label: 'Startup-bound',
    desc: 'Long-term venture, equity-based, high commitment',
    icon: Rocket
  }];

  const stages = [
  {
    id: 'idea',
    label: 'Idea',
    desc: 'Concept only, needs validation',
    icon: Lightbulb
  },
  {
    id: 'validation',
    label: 'Validation',
    desc: 'Testing assumptions, early research',
    icon: Search
  },
  {
    id: 'prototype',
    label: 'Prototype',
    desc: 'MVP in progress, needs refinement',
    icon: FlaskConical
  },
  {
    id: 'active',
    label: 'Active Build',
    desc: 'Established direction, scaling up',
    icon: Hammer
  }];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          What's the primary goal?
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          This helps match you with people seeking similar outcomes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {goals.map((goal) =>
          <button
            key={goal.id}
            onClick={() => updateData('goal', goal.id)}
            className={`
                flex items-start gap-3 p-4 rounded-lg border text-left transition-all
                ${data.goal === goal.id ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 ring-1 ring-blue-600 dark:ring-blue-500' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}
              `}>

              <div
              className={`p-2 rounded-md ${data.goal === goal.id ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-[#27272a] text-gray-500 dark:text-gray-400'}`}>

                <goal.icon size={20} />
              </div>
              <div>
                <div
                className={`font-medium ${data.goal === goal.id ? 'text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>

                  {goal.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {goal.desc}
                </div>
              </div>
            </button>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          What stage is the project at?
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Be honest—early stages are great for co-creation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {stages.map((stage) =>
          <button
            key={stage.id}
            onClick={() => updateData('stage', stage.id)}
            className={`
                flex items-center gap-3 p-3 rounded-lg border text-left transition-all
                ${data.stage === stage.id ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 ring-1 ring-blue-600 dark:ring-blue-500' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46] hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}
              `}>

              <stage.icon
              size={18}
              className={
              data.stage === stage.id ?
              'text-blue-600 dark:text-blue-400' :
              'text-gray-400 dark:text-gray-500'
              } />

              <div>
                <div
                className={`text-sm font-medium ${data.stage === stage.id ? 'text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>

                  {stage.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {stage.desc}
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>);

}