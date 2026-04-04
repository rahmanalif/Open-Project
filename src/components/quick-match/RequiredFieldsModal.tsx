import React, { useMemo, useState } from 'react';
import {
  Check,
  X,
  DoorOpen,
  Rocket,
  Info,
  BookOpen,
  Briefcase,
  Clapperboard,
  Cpu,
  Gamepad2,
  Globe,
  GraduationCap,
  Image,
  Mic2,
  Smartphone,
  Sparkles,
  TrendingUp } from
'lucide-react';
import {
  DEFAULT_ROLE_OPTIONS,
  DOMAIN_OPTIONS,
  DOMAIN_ROLE_OPTIONS } from
'../project-steps/constants';
interface RequiredFieldsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

const LEGACY_CATEGORY_MAP: Record<string, string> = {
  game: 'Games',
  web: 'Web App',
  film: 'Film & Video',
  ai: 'Other',
  design: 'Art & Illustration'
};

const DOMAIN_META: Record<string, { icon: React.ComponentType<{size?: number; className?: string;}>; desc: string }> = {
  Games: { icon: Gamepad2, desc: 'Gameplay, design, and interactive experiences' },
  'Web App': { icon: Globe, desc: 'Frontend, backend, and full-stack products' },
  'Mobile App': { icon: Smartphone, desc: 'Android, iOS, and cross-platform apps' },
  'Film & Video': { icon: Clapperboard, desc: 'Direction, editing, and production' },
  'Music & Audio': { icon: Mic2, desc: 'Composition, mixing, and sound design' },
  'Art & Illustration': { icon: Image, desc: 'Visual direction, assets, and illustration' },
  Education: { icon: GraduationCap, desc: 'Learning products and education tools' },
  'Marketing & Growth': { icon: TrendingUp, desc: 'Go-to-market, growth, and audience building' },
  'Open Source': { icon: BookOpen, desc: 'Community-driven public software projects' },
  'Hardware & IoT': { icon: Cpu, desc: 'Devices, sensors, and physical computing' },
  Other: { icon: Sparkles, desc: 'Any category outside the listed domains' }
};

const CATEGORIES = DOMAIN_OPTIONS.map((domain) => ({
  id: domain,
  label: domain,
  icon: DOMAIN_META[domain]?.icon || Briefcase,
  desc: DOMAIN_META[domain]?.desc || 'Project category'
}));

const MATCH_MODE_OPTIONS = [
  {
    value: 'join',
    label: 'Join Existing Project',
    description: 'Find an active team that already needs your contribution.',
    icon: DoorOpen
  },
  {
    value: 'start',
    label: 'Start New Project',
    description: 'Look for collaborators to build a new idea with you.',
    icon: Rocket
  }
];

const AVAILABILITY_OPTIONS = [
  { value: '1-5 hrs', label: '1-5 hrs', description: 'Light contribution window' },
  { value: '5-10 hrs', label: '5-10 hrs', description: 'Steady weekly support' },
  { value: '10-20 hrs', label: '10-20 hrs', description: 'Strong hands-on involvement' },
  { value: '20+ hrs', label: '20+ hrs', description: 'High-commitment build mode' }
];

const TIMELINE_OPTIONS = [
  { value: 'Short experiment', label: 'Short experiment' },
  { value: 'Medium-term build', label: 'Medium-term build' },
  { value: 'Long-term venture', label: 'Long-term venture' }
];

const DEFAULT_SKILL_CATEGORIES = [
{
  label: 'Core',
  skills: ['Communication', 'Problem Solving', 'Collaboration']
},
{
  label: 'Delivery',
  skills: ['Execution', 'Documentation', 'Feedback']
}];

const ROLE_SKILL_RULES = [
{
  matches: ['frontend', 'web', 'react', 'full-stack', 'full stack'],
  categories: [
  { label: 'Frontend', skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
  { label: 'Workflow', skills: ['Responsive Design', 'State Management', 'API Integration'] }]
},
{
  matches: ['backend', 'database', 'api'],
  categories: [
  { label: 'Backend', skills: ['Node.js', 'Python', 'SQL', 'REST APIs'] },
  { label: 'Infra', skills: ['Authentication', 'Database Design', 'System Design'] }]
},
{
  matches: ['mobile', 'ios', 'android', 'react native', 'flutter'],
  categories: [
  { label: 'Mobile', skills: ['React Native', 'Flutter', 'Swift', 'Kotlin'] },
  { label: 'App Delivery', skills: ['Mobile UI', 'API Integration', 'Performance Optimization'] }]
},
{
  matches: ['game', 'level designer'],
  categories: [
  { label: 'Game Dev', skills: ['Unity', 'Unreal Engine', 'Gameplay Systems', 'Level Design'] },
  { label: 'Production', skills: ['Balancing', 'Rapid Prototyping', 'Playtesting'] }]
},
{
  matches: ['ui/ux', 'ui designer', 'designer', 'illustrator', 'artist', 'concept', 'storyboard', 'brand identity', 'graphic designer', '3d modeler', 'technical artist'],
  categories: [
  { label: 'Design', skills: ['Figma', 'Visual Design', 'Prototyping', 'Design Systems'] },
  { label: 'Creative', skills: ['Illustration', 'Composition', 'Storytelling', 'Motion Graphics'] }]
},
{
  matches: ['animator', 'motion graphics'],
  categories: [
  { label: 'Animation', skills: ['After Effects', 'Blender', '2D Animation', '3D Animation'] },
  { label: 'Creative', skills: ['Storyboarding', 'Timing', 'Motion Design'] }]
},
{
  matches: ['sound', 'audio', 'music', 'vocalist', 'singer', 'lyricist', 'podcast', 'foley', 'composer'],
  categories: [
  { label: 'Audio', skills: ['Sound Design', 'Mixing', 'Mastering', 'Recording'] },
  { label: 'Creative', skills: ['Composition', 'Voice Work', 'Audio Editing'] }]
},
{
  matches: ['writer', 'scriptwriter', 'narrative', 'content', 'technical writer', 'voiceover'],
  categories: [
  { label: 'Writing', skills: ['Storytelling', 'Copywriting', 'Scriptwriting', 'Editing'] },
  { label: 'Content', skills: ['Research', 'Documentation', 'Content Strategy'] }]
},
{
  matches: ['marketing', 'seo', 'social media', 'email marketer', 'paid ads', 'growth', 'brand designer'],
  categories: [
  { label: 'Growth', skills: ['SEO', 'Content Strategy', 'Paid Ads', 'Analytics'] },
  { label: 'Brand', skills: ['Messaging', 'Campaign Planning', 'Social Media'] }]
},
{
  matches: ['product manager', 'producer', 'project lead', 'community manager', 'project maintainer', 'curriculum', 'instructional', 'researcher'],
  categories: [
  { label: 'Leadership', skills: ['Roadmapping', 'Planning', 'Stakeholder Communication', 'Research'] },
  { label: 'Execution', skills: ['Prioritization', 'Documentation', 'Facilitation'] }]
},
{
  matches: ['qa', 'security', 'accessibility'],
  categories: [
  { label: 'Quality', skills: ['Testing', 'Bug Reporting', 'Automation', 'Accessibility'] },
  { label: 'Review', skills: ['Quality Assurance', 'Security Review', 'Regression Testing'] }]
},
{
  matches: ['devops', 'firmware', 'embedded', 'hardware', 'pcb'],
  categories: [
  { label: 'Systems', skills: ['CI/CD', 'Linux', 'Infrastructure', 'Monitoring'] },
  { label: 'Engineering', skills: ['Firmware', 'Debugging', 'Hardware Integration'] }]
}];

function getSkillCategoriesForRole(role: string) {
  if (!role) return DEFAULT_SKILL_CATEGORIES;
  const normalizedRole = role.toLowerCase();
  const matchedRule = ROLE_SKILL_RULES.find((rule) =>
  rule.matches.some((match) => normalizedRole.includes(match))
  );
  return matchedRule?.categories || DEFAULT_SKILL_CATEGORIES;
}

export function RequiredFieldsModal({
  isOpen,
  onClose,
  onSave,
  initialData
}: RequiredFieldsModalProps) {
  const normalizeCategory = (category: string) => {
    if (DOMAIN_OPTIONS.includes(category)) return category;
    return LEGACY_CATEGORY_MAP[category] || '';
  };

  const [formData, setFormData] = useState({
    category: normalizeCategory(initialData?.category || ''),
    matchMode: initialData?.matchMode || '',
    role: initialData?.role || '',
    availability: initialData?.availability || '',
    timeline: initialData?.timeline || '',
    skills: initialData?.skills || [] as string[]
  });
  const skillCategories = useMemo(
    () => getSkillCategoriesForRole(formData.role),
    [formData.role]
  );
  const updateField = (field: string, value: any) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        [field]: value
      };
      // Reset role if category changes
      if (field === 'category' && prev.category !== value) {
        newData.role = '';
        newData.skills = [];
      }
      if (field === 'role' && prev.role !== value) {
        newData.skills = [];
      }
      return newData;
    });
  };
  const toggleSkill = (skill: string) => {
    setFormData((prev) => {
      const skills = prev.skills.includes(skill) ?
      prev.skills.filter((s: string) => s !== skill) :
      [...prev.skills, skill];
      return {
        ...prev,
        skills
      };
    });
  };
  const missingFields = useMemo(() => {
    const missing = [];
    if (!formData.category) missing.push('Category');
    if (!formData.matchMode) missing.push('Match Mode');
    if (!formData.role) missing.push('Role');
    if (!formData.availability) missing.push('Availability');
    if (!formData.timeline) missing.push('Timeline');
    if (formData.skills.length === 0) missing.push('Skills');
    return missing;
  }, [formData]);
  const progress = (6 - missingFields.length) / 6 * 100;
  const completedCount = 6 - missingFields.length;
  const isComplete = missingFields.length === 0;
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <div className="absolute inset-0 bg-[rgba(8,8,10,0.82)] backdrop-blur-md" onClick={onClose} />

      <div className="premium-panel premium-grid relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[32px] animate-in fade-in zoom-in-95 duration-200">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(208,164,106,0.15),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(243,237,226,0.06),transparent_32%)]" />

        <div className="relative border-b border-[var(--border)] px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="max-w-3xl">
              <p className="premium-kicker mb-2">Match Setup</p>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-3xl text-[var(--text)] sm:text-4xl">Required Fields</h2>
                <div className="rounded-full border border-[var(--border)] bg-[color:var(--bg-elevated)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  {completedCount}/6 complete
                </div>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-muted)] sm:text-base">
                Give the matcher enough signal to suggest collaborators that fit your role, pace, and project intent.
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-full border border-[var(--border)] bg-[color:var(--bg-panel)] p-2.5 text-[var(--text-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text)]"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-[color:var(--bg-muted)]">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent-strong),var(--accent),var(--success))] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="relative grid min-h-0 flex-1 gap-0 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="border-b border-[var(--border)] bg-[color:var(--bg-elevated)] p-5 sm:p-6 lg:min-h-0 lg:overflow-y-auto lg:border-b-0 lg:border-r">
            <div className="space-y-5 lg:sticky lg:top-0">
              <div className="rounded-[28px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Profile readiness</p>
                    <p className="mt-2 text-3xl font-semibold text-[var(--text)]">{Math.round(progress)}%</p>
                  </div>
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full border ${
                      isComplete
                        ? 'border-[color:var(--success)] bg-[rgba(91,191,167,0.12)] text-[var(--success)]'
                        : 'border-[var(--border)] bg-[color:var(--bg-muted)] text-[var(--accent)]'
                    }`}
                  >
                    {isComplete ? <Check size={18} /> : <Info size={18} />}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                  {isComplete
                    ? 'Everything needed for higher-confidence matching is in place.'
                    : 'Complete the remaining signals so the system can rank better-fit projects.'}
                </p>
              </div>

              <div className="rounded-[28px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Still needed</p>
                {missingFields.length === 0 ? (
                  <div className="mt-3 rounded-2xl border border-[rgba(91,191,167,0.22)] bg-[rgba(91,191,167,0.08)] px-4 py-3 text-sm font-medium text-[var(--success)]">
                    Ready to save and start matching.
                  </div>
                ) : (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {missingFields.map((field) => (
                      <span
                        key={field}
                        className="rounded-full border border-[var(--border)] bg-[color:var(--bg-muted)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-[28px] border border-[var(--border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--bg-panel)_92%,transparent),color-mix(in_srgb,var(--accent-soft)_38%,transparent))] p-5">
                <p className="text-sm font-semibold text-[var(--text)]">What the matcher uses</p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                  Role fit, project type, time commitment, and the skills you want to contribute all shape the recommendations.
                </p>
              </div>
            </div>
          </aside>

          <div className="min-h-0 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
            <div className="space-y-5 pb-24">
              <section className="premium-soft-panel rounded-[28px] p-5 sm:p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                      <span>01</span>
                      <span>Project type</span>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text)]">What kind of project do you want to join?</h3>
                  </div>
                  {formData.category && (
                    <span className="rounded-full border border-[rgba(91,191,167,0.22)] bg-[rgba(91,191,167,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--success)]">
                      Selected
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
              <button
                key={cat.id}
                onClick={() => updateField('category', cat.id)}
                className={`group flex min-h-[144px] flex-col items-start rounded-[24px] border p-4 text-left transition-all duration-200 ${
                  formData.category === cat.id
                    ? 'border-[color:var(--accent)] bg-[color:var(--accent-soft)] shadow-[0_18px_40px_rgba(0,0,0,0.18)]'
                    : 'border-[var(--border)] bg-[color:var(--bg-panel)] hover:-translate-y-0.5 hover:border-[var(--border-strong)]'
                }`}>

                  <div className={`mb-4 rounded-2xl p-3 transition-colors ${
                    formData.category === cat.id
                      ? 'bg-[rgba(255,248,239,0.16)] text-[var(--accent)]'
                      : 'bg-[color:var(--bg-muted)] text-[var(--text-muted)] group-hover:text-[var(--text)]'
                  }`}>
                    <Icon size={22} />
                  </div>
                  <span
                  className={`mb-1 text-base font-semibold ${formData.category === cat.id ? 'text-[var(--text)]' : 'text-[var(--text)]'}`}>

                    {cat.label}
                  </span>
                  <span className="text-sm leading-6 text-[var(--text-muted)]">{cat.desc}</span>
                </button>
              );
              })}
                </div>
              </section>

              <section className="premium-soft-panel rounded-[28px] p-5 sm:p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                      <span>02</span>
                      <span>Intent</span>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text)]">What do you want to do right now?</h3>
                  </div>
                  {formData.matchMode && (
                    <span className="rounded-full border border-[rgba(91,191,167,0.22)] bg-[rgba(91,191,167,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--success)]">
                      Selected
                    </span>
                  )}
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {MATCH_MODE_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const isSelected = formData.matchMode === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => updateField('matchMode', option.value)}
                        className={`group flex min-h-[164px] flex-col justify-between rounded-[24px] border p-5 text-left transition-all duration-200 ${
                          isSelected
                            ? 'border-[color:var(--accent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent-soft)_80%,transparent),color-mix(in_srgb,var(--bg-panel)_96%,transparent))] shadow-[0_18px_40px_rgba(0,0,0,0.18)]'
                            : 'border-[var(--border)] bg-[color:var(--bg-panel)] hover:-translate-y-0.5 hover:border-[var(--border-strong)]'
                        }`}
                      >
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                          isSelected ? 'bg-[rgba(255,248,239,0.16)] text-[var(--accent)]' : 'bg-[color:var(--bg-muted)] text-[var(--text-muted)]'
                        }`}>
                          <Icon size={24} />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-[var(--text)]">{option.label}</p>
                          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{option.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section
                className={`premium-soft-panel rounded-[28px] p-5 sm:p-6 ${!formData.category ? 'opacity-60' : ''}`}
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                      <span>03</span>
                      <span>Role</span>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text)]">What is your role?</h3>
                  </div>
                  {formData.role && (
                    <span className="rounded-full border border-[rgba(91,191,167,0.22)] bg-[rgba(91,191,167,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--success)]">
                      Selected
                    </span>
                  )}
                </div>

                {!formData.category ?
            <div className="rounded-[22px] border border-dashed border-[var(--border-strong)] bg-[color:var(--bg-panel)] px-4 py-4 text-sm italic text-[var(--text-muted)]">
                    Select a project type first to unlock role suggestions.
                  </div> :

            <div className="flex flex-wrap gap-2.5">
                {(DOMAIN_ROLE_OPTIONS[formData.category] || DEFAULT_ROLE_OPTIONS).map((role) =>
              <button
                key={role}
                onClick={() => updateField('role', role)}
                className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-all ${
                  formData.role === role
                    ? 'border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[var(--text)] shadow-[0_10px_24px_rgba(0,0,0,0.16)]'
                    : 'border-[var(--border)] bg-[color:var(--bg-panel)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'
                }`}>

                    {role}
                  </button>
              )}
              </div>
            }
              </section>

              <section className="premium-soft-panel rounded-[28px] p-5 sm:p-6">
                <div className="mb-5">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                    <span>04</span>
                    <span>Availability</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text)]">How many hours per week can you give?</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {AVAILABILITY_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateField('availability', option.value)}
                      className={`rounded-[22px] border p-4 text-left transition-all ${
                        formData.availability === option.value
                          ? 'border-[color:var(--accent)] bg-[color:var(--accent-soft)] shadow-[0_14px_32px_rgba(0,0,0,0.16)]'
                          : 'border-[var(--border)] bg-[color:var(--bg-panel)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <p className="text-base font-semibold text-[var(--text)]">{option.label}</p>
                      <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">{option.description}</p>
                    </button>
                  ))}
                </div>
              </section>

              <section className="premium-soft-panel rounded-[28px] p-5 sm:p-6">
                <div className="mb-5">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                    <span>05</span>
                    <span>Timeline</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text)]">How long are you available?</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {TIMELINE_OPTIONS.map((option) =>
              <button
                key={option.value}
                onClick={() => updateField('timeline', option.value)}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                  formData.timeline === option.value
                    ? 'border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[var(--text)] shadow-[0_10px_24px_rgba(0,0,0,0.16)]'
                    : 'border-[var(--border)] bg-[color:var(--bg-panel)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'
                }`}>

                      {option.label}
                    </button>
                  )}
                </div>
              </section>

              <section className="premium-soft-panel rounded-[28px] p-5 sm:p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                      <span>06</span>
                      <span>Skills</span>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text)]">Your key skills</h3>
                  </div>
                  {formData.skills.length > 0 && (
                    <span className="rounded-full border border-[rgba(91,191,167,0.22)] bg-[rgba(91,191,167,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--success)]">
                      {formData.skills.length} selected
                    </span>
                  )}
                </div>

                {!formData.role ?
            <div className="rounded-[22px] border border-dashed border-[var(--border-strong)] bg-[color:var(--bg-panel)] px-4 py-4 text-sm italic text-[var(--text-muted)]">
                    Select a role first to unlock suggested skills.
                  </div> :
            <div className="space-y-6">
              {skillCategories.map((category) =>
              <div key={category.label}>
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    {category.label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => {
                    const isSelected = formData.skills.includes(skill);
                    return (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`rounded-full border px-3.5 py-2 text-sm transition-all ${isSelected ? 'border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[var(--text)] shadow-[0_10px_24px_rgba(0,0,0,0.14)]' : 'border-[var(--border)] bg-[color:var(--bg-panel)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'}`}>

                          {skill}
                        </button>);

                  })}
                  </div>
                </div>
              )}
            </div>
            }
              </section>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col gap-3 border-t border-[var(--border)] bg-[color:var(--bg-elevated)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="text-sm text-[var(--text-muted)]">
            {isComplete ? 'Everything looks good. You can start matching now.' : `${missingFields.length} field${missingFields.length === 1 ? '' : 's'} still needed before matching.`}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="premium-button-secondary rounded-full px-5 py-2.5 text-sm font-medium"
            >
              Cancel
            </button>

            <div className="relative group">
              <button
                onClick={() => isComplete && onSave(formData)}
                disabled={!isComplete}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  isComplete
                    ? 'premium-button'
                    : 'cursor-not-allowed border border-[var(--border)] bg-[color:var(--bg-panel)] text-[var(--text-muted)] opacity-70'
                }`}
              >
                Save and Start Matching
              </button>

              {!isComplete &&
            <div className="pointer-events-none absolute bottom-full right-0 mb-3 w-56 rounded-[20px] border border-[var(--border)] bg-[color:var(--surface-0)] p-3 text-xs shadow-[var(--shadow-md)] opacity-0 transition-opacity group-hover:opacity-100 dark:bg-[color:var(--bg-panel)]">
                  <div className="mb-2 flex items-center gap-1.5 font-semibold text-[var(--accent)]">
                    <Info size={14} /> Finish these first
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {missingFields.map((field) => (
                      <span
                        key={field}
                        className="rounded-full bg-[color:var(--bg-muted)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
            }
            </div>
          </div>
        </div>
      </div>
    </div>);

}
