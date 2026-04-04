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
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="premium-soft-panel rounded-[24px] p-4 sm:rounded-[28px] sm:p-6">
        <div className="mb-5">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            <span>01</span>
            <span>Domain</span>
          </div>
          <h2 className="text-xl font-semibold text-[var(--text)] mb-1">
          Project Domain / Category
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
          Pick one domain so matching starts in the right context.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {DOMAIN_OPTIONS.map((domain) => {
            const Icon = DOMAIN_ICONS[domain] || Briefcase;
            const active = data.domain === domain;
            return (
              <button
                key={domain}
                onClick={() => updateData('domain', domain)}
                className={`group flex min-h-[88px] items-center gap-3 rounded-[18px] border p-4 text-left transition-all sm:rounded-[22px] ${
                  active
                    ? 'border-[color:var(--accent)] bg-[color:var(--accent-soft)] shadow-[0_14px_32px_rgba(0,0,0,0.16)]'
                    : 'border-[var(--border)] bg-[color:var(--bg-panel)] hover:-translate-y-0.5 hover:border-[var(--border-strong)]'
                }`}>
                <div className={`rounded-2xl p-3 ${active ? 'bg-[rgba(255,248,239,0.16)] text-[var(--accent)]' : 'bg-[color:var(--bg-muted)] text-[var(--text-muted)] group-hover:text-[var(--text)]'}`}>
                  <Icon size={18} />
                </div>
                <span className="text-sm font-medium text-[var(--text)]">
                  {domain}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="premium-soft-panel rounded-[24px] p-4 sm:rounded-[28px] sm:p-6">
        <div className="mb-5">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            <span>02</span>
            <span>Goal</span>
          </div>
          <h2 className="text-xl font-semibold text-[var(--text)] mb-1">
          Primary Goal
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
          Tell collaborators what success looks like for this project.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {GOAL_OPTIONS.map((goal) => {
            const Icon = GOAL_ICONS[goal.id] || Target;
            const active = data.goal === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => updateData('goal', goal.id)}
                className={`group flex items-start gap-3 rounded-[18px] border p-4 text-left transition-all sm:rounded-[24px] ${
                  active
                    ? 'border-[color:var(--accent)] bg-[color:var(--accent-soft)] shadow-[0_14px_32px_rgba(0,0,0,0.16)]'
                    : 'border-[var(--border)] bg-[color:var(--bg-panel)] hover:-translate-y-0.5 hover:border-[var(--border-strong)]'
                }`}>
                <div className={`rounded-2xl p-3 ${active ? 'bg-[rgba(255,248,239,0.16)] text-[var(--accent)]' : 'bg-[color:var(--bg-muted)] text-[var(--text-muted)] group-hover:text-[var(--text)]'}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-medium text-[var(--text)]">
                    {goal.label}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                    {goal.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="premium-soft-panel rounded-[24px] p-4 sm:rounded-[28px] sm:p-6">
        <div className="mb-5">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            <span>03</span>
            <span>Stage</span>
          </div>
          <h2 className="text-xl font-semibold text-[var(--text)] mb-1">
          Current Stage
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
          Choose the stage that best represents where this project is right now.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {STAGE_OPTIONS.map((stage) => {
            const Icon = STAGE_ICONS[stage.id] || Lightbulb;
            const active = data.stage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => updateData('stage', stage.id)}
                className={`rounded-[18px] border p-4 text-left transition-all sm:rounded-[22px] ${
                  active
                    ? 'border-[color:var(--accent)] bg-[color:var(--accent-soft)] shadow-[0_14px_32px_rgba(0,0,0,0.16)]'
                    : 'border-[var(--border)] bg-[color:var(--bg-panel)] hover:-translate-y-0.5 hover:border-[var(--border-strong)]'
                }`}>
                <div className="mb-2 flex items-center gap-2">
                  <Icon
                    size={16}
                    className={active ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'} />
                  <span className="text-sm font-medium text-[var(--text)]">
                    {stage.label}
                  </span>
                </div>
                <p className="text-sm leading-6 text-[var(--text-muted)]">{stage.desc}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="premium-soft-panel rounded-[24px] p-4 sm:rounded-[28px] sm:p-6">
        <div className="mb-5">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            <span>04</span>
            <span>Description</span>
          </div>
          <label className="block text-xl font-semibold text-[var(--text)] mb-1">
          Project Description
          </label>
          <p className="text-sm text-[var(--text-muted)]">
            Describe what you are building and why it matters so collaborators can quickly understand the opportunity.
          </p>
        </div>
        <textarea
          value={data.projectDescription || ''}
          onChange={(e) => updateData('projectDescription', e.target.value)}
          placeholder="Describe what you are building and what problem it solves."
          rows={4}
          maxLength={300}
          className="premium-input min-h-[132px] w-full rounded-[22px] px-4 py-3 text-sm leading-6"
        />

        <div className="mt-2 text-right text-xs text-[var(--text-muted)]">
          {data.projectDescription?.length || 0}/300
        </div>
      </section>
    </div>
  );
}
