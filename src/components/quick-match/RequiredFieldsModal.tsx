import React, { useMemo, useState } from 'react';
import {
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
  const isComplete = missingFields.length === 0;
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose} />


      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0a0a0b] border border-[#27272a] rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Progress Bar */}
        <div className="h-1 w-full bg-[#141416]">
          <div
            className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`
            }} />

        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#27272a] bg-[#141416]">
          <h2 className="text-lg font-bold text-white tracking-wide">
            Required Fields
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white p-1 rounded-md hover:bg-[#27272a] transition-colors">

            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
          {/* 1. Category */}
          <div>
            <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider mb-4">
              1. What kind of project do you want to join?{' '}
              <span className="text-blue-500">*</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
              <button
                key={cat.id}
                onClick={() => updateField('category', cat.id)}
                className={`flex flex-col items-start p-4 rounded-xl border transition-all text-left ${formData.category === cat.id ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'border-[#27272a] bg-[#141416] hover:border-[#3f3f46]'}`}>

                  <div className={`mb-3 rounded-lg p-2 ${formData.category === cat.id ? 'bg-blue-500/15 text-blue-400' : 'bg-[#0f0f10] text-gray-400'}`}>
                    <Icon size={22} />
                  </div>
                  <span
                  className={`font-bold mb-1 ${formData.category === cat.id ? 'text-blue-400' : 'text-gray-200'}`}>

                    {cat.label}
                  </span>
                  <span className="text-xs text-gray-500">{cat.desc}</span>
                </button>
              );
              })}
            </div>
          </div>

          {/* 2. Match Mode */}
          <div>
            <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider mb-4">
              2. What do you want to do?{' '}
              <span className="text-blue-500">*</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => updateField('matchMode', 'join')}
                className={`flex flex-col items-center justify-center p-6 rounded-xl border transition-all ${formData.matchMode === 'join' ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.15)] text-blue-400' : 'border-[#27272a] bg-[#141416] hover:border-[#3f3f46] text-gray-400'}`}>

                <DoorOpen size={32} className="mb-3" />
                <span className="font-bold text-gray-200 mb-1">
                  Join Existing Project
                </span>
                <span className="text-xs text-center">
                  Find a project that needs your skills
                </span>
              </button>
              <button
                onClick={() => updateField('matchMode', 'start')}
                className={`flex flex-col items-center justify-center p-6 rounded-xl border transition-all ${formData.matchMode === 'start' ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.15)] text-blue-400' : 'border-[#27272a] bg-[#141416] hover:border-[#3f3f46] text-gray-400'}`}>

                <Rocket size={32} className="mb-3" />
                <span className="font-bold text-gray-200 mb-1">
                  Start New Project
                </span>
                <span className="text-xs text-center">
                  Build something new with the right team
                </span>
              </button>
            </div>
          </div>

          {/* 3. Role */}
          <div
            className={
            !formData.category ? 'opacity-50 pointer-events-none' : ''
            }>

            <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider mb-4">
              3. What is your role? <span className="text-blue-500">*</span>
            </h3>
            {!formData.category ?
            <div className="text-sm text-gray-500 italic p-4 border border-[#27272a] border-dashed rounded-lg bg-[#141416]">
                Please select a category first to see available roles.
              </div> :

            <div className="flex flex-wrap gap-2">
                {(DOMAIN_ROLE_OPTIONS[formData.category] || DEFAULT_ROLE_OPTIONS).map((role) =>
              <button
                key={role}
                onClick={() => updateField('role', role)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${formData.role === role ? 'border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'border-[#27272a] bg-[#141416] text-gray-400 hover:border-[#3f3f46] hover:text-gray-200'}`}>

                    {role}
                  </button>
              )}
              </div>
            }
          </div>

          {/* 4. Availability */}
          <div>
            <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider mb-4">
              4. How many hours per week?{' '}
              <span className="text-blue-500">*</span>
            </h3>
            <div className="flex bg-[#141416] p-1 rounded-lg border border-[#27272a]">
              {['1-5 hrs', '5-10 hrs', '10-20 hrs', '20+ hrs'].map((opt) =>
              <button
                key={opt}
                onClick={() => updateField('availability', opt)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${formData.availability === opt ? 'bg-[#27272a] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>

                  {opt}
                </button>
              )}
            </div>
          </div>

          {/* 5. Timeline */}
          <div>
            <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider mb-4">
              5. How long are you available?{' '}
              <span className="text-blue-500">*</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
              'Short experiment',
              'Medium-term build',
              'Long-term venture'].
              map((opt) =>
              <button
                key={opt}
                onClick={() => updateField('timeline', opt)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${formData.timeline === opt ? 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.15)]' : 'border-[#27272a] bg-[#141416] text-gray-400 hover:border-[#3f3f46] hover:text-gray-200'}`}>

                  {opt}
                </button>
              )}
            </div>
          </div>

          {/* 6. Skills */}
          <div>
            <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider mb-4">
              6. Your key skills <span className="text-blue-500">*</span>
            </h3>
            {!formData.role ?
            <div className="text-sm text-gray-500 italic p-4 border border-[#27272a] border-dashed rounded-lg bg-[#141416]">
                Please select a role first to see relevant skills.
              </div> :
            <div className="space-y-6">
              {skillCategories.map((category) =>
              <div key={category.label}>
                  <div className="text-xs font-bold text-gray-500 mb-3">
                    {category.label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => {
                    const isSelected = formData.skills.includes(skill);
                    return (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1.5 rounded-md text-sm transition-all border ${isSelected ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'bg-[#141416] border-[#27272a] text-gray-400 hover:border-[#3f3f46] hover:text-gray-200'}`}>

                          {skill}
                        </button>);

                  })}
                  </div>
                </div>
              )}
            </div>
            }
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#27272a] bg-[#141416] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">

            Cancel
          </button>

          <div className="relative group">
            <button
              onClick={() => isComplete && onSave(formData)}
              disabled={!isComplete}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all ${isComplete ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-[#27272a] text-gray-500 cursor-not-allowed'}`}>

              Save and Start Matching
            </button>

            {!isComplete &&
            <div className="absolute bottom-full right-0 mb-3 w-48 p-3 bg-[#27272a] text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-[#3f3f46]">
                <div className="font-bold mb-2 flex items-center gap-1.5 text-amber-400">
                  <Info size={14} /> Missing fields:
                </div>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  {missingFields.map((f) =>
                <li key={f}>{f}</li>
                )}
                </ul>
                {/* Tooltip arrow */}
                <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#27272a] border-b border-r border-[#3f3f46] transform rotate-45"></div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}
