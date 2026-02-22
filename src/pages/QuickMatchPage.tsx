import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bookmark,
  Check,
  ChevronDown,
  ChevronUp,
  Play,
  Rocket,
  Save,
  Search,
  Timer,
  Users,
  Zap
} from 'lucide-react';

type QueueState = 'idle' | 'searching' | 'matched';
type QueueMode = 'join-existing' | 'build-new';

type SkillCategory = 'Tech' | 'Design' | 'Creative' | 'Business';

type SkillTag = {
  label: string;
  category: SkillCategory;
};

type TeamSuggestion = {
  id: string;
  name: string;
  projectType: string;
  matchScore: number;
  currentMembers: number;
  targetMembers: number;
  neededRoles: string[];
  reason: string;
  eta: string;
  breakdown: {
    skills: number;
    availability: number;
    style: number;
  };
};

type QuickMatchPageProps = {
  onMatchingStateChange?: (active: boolean) => void;
};

const PROJECT_TYPES = ['SaaS', 'Game', 'Mobile App', 'Web App', 'Open Source'];
const ROLE_OPTIONS = ['Frontend Developer', 'Backend Developer', 'UI Designer', 'Product Manager'];
const HOURS_OPTIONS = ['5-10 hrs/week', '10-20 hrs/week', '20+ hrs/week'];
const TIMELINE_OPTIONS = ['7-day sprint', '2-4 weeks', '1-3 months'];

const SKILL_OPTIONS: SkillTag[] = [
  { label: 'React', category: 'Tech' },
  { label: 'Node.js', category: 'Tech' },
  { label: 'TypeScript', category: 'Tech' },
  { label: 'UI Design', category: 'Design' },
  { label: 'Figma', category: 'Design' },
  { label: 'Branding', category: 'Creative' },
  { label: 'Content Strategy', category: 'Creative' },
  { label: 'Product Thinking', category: 'Business' },
  { label: 'Growth', category: 'Business' },
  { label: 'QA', category: 'Tech' }
];

const SCAN_MESSAGES = [
  'Scanning 240 projects in your selected domain...',
  'Filtering by availability overlap...',
  'Checking role and skill compatibility...',
  'Evaluating working style alignment...'
];

const SUGGESTION_POOL: TeamSuggestion[] = [
  {
    id: 'q1',
    name: 'Sprint Squad Alpha',
    projectType: 'SaaS',
    matchScore: 91,
    currentMembers: 3,
    targetMembers: 5,
    neededRoles: ['Frontend Developer', 'UI Designer'],
    reason: 'Your React + design profile fills their highest priority gaps.',
    eta: '~3 min',
    breakdown: { skills: 92, availability: 88, style: 90 }
  },
  {
    id: 'q2',
    name: 'Pixel Forge Team',
    projectType: 'Game',
    matchScore: 84,
    currentMembers: 2,
    targetMembers: 5,
    neededRoles: ['Backend Developer', 'Product Manager'],
    reason: 'Team needs backend and roadmap ownership now.',
    eta: '~5 min',
    breakdown: { skills: 86, availability: 79, style: 84 }
  },
  {
    id: 'q3',
    name: 'Launchpad Builders',
    projectType: 'Web App',
    matchScore: 88,
    currentMembers: 4,
    targetMembers: 5,
    neededRoles: ['Frontend Developer'],
    reason: 'Strong fit on async communication and sprint timeline.',
    eta: '~2 min',
    breakdown: { skills: 89, availability: 85, style: 90 }
  },
  {
    id: 'q4',
    name: 'Mobile Momentum',
    projectType: 'Mobile App',
    matchScore: 86,
    currentMembers: 3,
    targetMembers: 5,
    neededRoles: ['UI Designer', 'Backend Developer'],
    reason: 'High overlap across design + engineering workflow.',
    eta: '~4 min',
    breakdown: { skills: 87, availability: 82, style: 86 }
  }
];

const STATE_META: Record<QueueState, { glow: string; ring: string; label: string }> = {
  idle: {
    glow: 'bg-gray-200/70 dark:bg-gray-600/30',
    ring: 'border-gray-900 dark:border-white text-gray-900 dark:text-white',
    label: 'Start Auto Match'
  },
  searching: {
    glow: 'bg-blue-400/30 dark:bg-blue-500/30',
    ring: 'border-blue-500 text-blue-700 dark:text-blue-300',
    label: 'Matching Live'
  },
  matched: {
    glow: 'bg-emerald-400/30 dark:bg-emerald-500/30',
    ring: 'border-emerald-500 text-emerald-700 dark:text-emerald-300',
    label: 'Matches Ready'
  }
};

export function QuickMatchPage({ onMatchingStateChange }: QuickMatchPageProps) {
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [projectType, setProjectType] = useState('');
  const [role, setRole] = useState('');
  const [hours, setHours] = useState('');
  const [timeline, setTimeline] = useState('');
  const [mode, setMode] = useState<QueueMode>('join-existing');
  const [skills, setSkills] = useState<string[]>([]);
  const [skillSearch, setSkillSearch] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);
  const [queueState, setQueueState] = useState<QueueState>('idle');
  const [suggestions, setSuggestions] = useState<TeamSuggestion[]>([]);
  const [scanMessageIndex, setScanMessageIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [savedForLater, setSavedForLater] = useState<string[]>([]);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const queueTimer = useRef<number | null>(null);

  useEffect(() => {
    onMatchingStateChange?.(queueState === 'searching');
  }, [queueState, onMatchingStateChange]);

  useEffect(() => {
    return () => {
      if (queueTimer.current !== null) window.clearTimeout(queueTimer.current);
      onMatchingStateChange?.(false);
    };
  }, [onMatchingStateChange]);

  useEffect(() => {
    if (queueState !== 'searching') return;

    const tick = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    const rotateMessages = window.setInterval(() => {
      setScanMessageIndex((prev) => (prev + 1) % SCAN_MESSAGES.length);
    }, 2000);

    return () => {
      window.clearInterval(tick);
      window.clearInterval(rotateMessages);
    };
  }, [queueState]);

  const requiredFields = [
    { key: 'mode', label: 'Match Mode', done: Boolean(mode) },
    { key: 'role', label: 'Role', done: Boolean(role) },
    { key: 'projectType', label: 'Project Type', done: Boolean(projectType) },
    { key: 'hours', label: 'Availability', done: Boolean(hours) },
    { key: 'timeline', label: 'Timeline', done: Boolean(timeline) },
    { key: 'skills', label: 'Skills', done: skills.length > 0 }
  ];

  const completionCount = requiredFields.filter((field) => field.done).length;
  const completionPct = (completionCount / requiredFields.length) * 100;
  const formValid = completionCount === requiredFields.length;

  const missingLabels = requiredFields.filter((field) => !field.done).map((field) => field.label);
  const saveDisabledReason = missingLabels.length
    ? `Missing: ${missingLabels.join(', ')}`
    : 'Ready to save';

  const estimatedWaitSeconds = mode === 'build-new' ? 300 : 180;
  const estimatedWaitLabel = mode === 'build-new' ? '~4-8 min' : '~2-5 min';

  const progressArc = Math.min(elapsedSeconds / estimatedWaitSeconds, 1);
  const circumference = 2 * Math.PI * 82;
  const dashOffset = circumference * (1 - progressArc);

  const filteredSkillsByCategory = useMemo(() => {
    const query = skillSearch.trim().toLowerCase();
    const filtered = SKILL_OPTIONS.filter((skill) => skill.label.toLowerCase().includes(query));
    return {
      Tech: filtered.filter((skill) => skill.category === 'Tech'),
      Design: filtered.filter((skill) => skill.category === 'Design'),
      Creative: filtered.filter((skill) => skill.category === 'Creative'),
      Business: filtered.filter((skill) => skill.category === 'Business')
    } as Record<SkillCategory, SkillTag[]>;
  }, [skillSearch]);

  const formatElapsed = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const toggleSkill = (skill: string) => {
    setSkills((prev) => (prev.includes(skill) ? prev.filter((item) => item !== skill) : [...prev, skill]));
  };

  const saveProfile = () => {
    if (!formValid) return;
    setProfileSaved(true);
    setShowSetupModal(false);
  };

  const runMatch = () => {
    const ranked = SUGGESTION_POOL.filter((item) => {
      const projectMatch = item.projectType === projectType;
      const roleMatch = item.neededRoles.includes(role);
      return projectMatch || roleMatch;
    });

    if (mode === 'build-new') {
      setSuggestions(
        ranked.slice(0, 3).map((item, index) => ({
          ...item,
          id: `${item.id}-new-${index}`,
          name: `New ${projectType} Team ${index + 1}`,
          currentMembers: 1,
          targetMembers: 5,
          reason: 'Team is being assembled around your saved requirements.'
        }))
      );
      return;
    }

    setSuggestions(ranked.slice(0, 3));
  };

  const handleStartMatch = () => {
    if (!profileSaved) {
      setShowSetupModal(true);
      return;
    }

    setShowResetConfirm(false);
    setElapsedSeconds(0);
    setQueueState('searching');
    queueTimer.current = window.setTimeout(() => {
      runMatch();
      setQueueState('matched');
    }, 5000);
  };

  const requestReset = () => {
    setShowResetConfirm(true);
  };

  const resetMatch = () => {
    if (queueTimer.current !== null) {
      window.clearTimeout(queueTimer.current);
      queueTimer.current = null;
    }
    setQueueState('idle');
    setSuggestions([]);
    setExpandedRows([]);
    setShowResetConfirm(false);
    setElapsedSeconds(0);
  };

  const toggleRowExpand = (id: string) => {
    setExpandedRows((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const toggleSaveForLater = (id: string) => {
    setSavedForLater((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const stateMeta = STATE_META[queueState];

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {queueState === 'searching' && (
        <div className="sticky top-2 z-20 mb-4 rounded-lg border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-4 py-2 flex items-center justify-between">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Live matchmaking is running in the background.
          </p>
          <p className="text-xs font-mono text-blue-700 dark:text-blue-300">Elapsed: {formatElapsed(elapsedSeconds)}</p>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
          <Zap className="text-blue-600 dark:text-blue-400" size={24} />
          Quick Auto Match
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-3xl">
          Save required fields once, then launch matchmaking with one big action.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <section className="xl:col-span-5 bg-white dark:bg-[#141416] border border-gray-200 dark:border-[#27272a] rounded-2xl p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mt-2 mb-6">
              <div className={`absolute inset-0 blur-2xl rounded-full ${stateMeta.glow}`} />

              <button
                type="button"
                onClick={handleStartMatch}
                className={`relative w-48 h-48 rounded-full border-4 ${stateMeta.ring} bg-white/80 dark:bg-[#141416]/80 transition-all flex flex-col items-center justify-center gap-2`}>
                {queueState === 'idle' && <Play size={28} />}
                {queueState === 'searching' && (
                  <>
                    <Rocket size={28} className="animate-pulse" />
                    <span className="text-xs font-medium">Searching</span>
                  </>
                )}
                {queueState === 'matched' && <Check size={32} />}
                <span className="text-sm font-semibold">{stateMeta.label}</span>

                {queueState === 'searching' && (
                  <span className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" />
                )}
              </button>

              {queueState === 'searching' && (
                <svg className="absolute -inset-4 w-[224px] h-[224px] -rotate-90" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" strokeWidth="5" className="text-gray-200 dark:text-[#27272a]" />
                  <circle
                    cx="100"
                    cy="100"
                    r="82"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    className="text-blue-500 transition-all duration-700"
                  />
                </svg>
              )}
            </div>

            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                onClick={() => setShowSetupModal(true)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-[#3f3f46] rounded-md hover:bg-gray-50 dark:hover:bg-[#1f1f23] transition-colors">
                Fill Required Fields
              </button>

              {(queueState === 'searching' || queueState === 'matched') && (
                <button
                  type="button"
                  onClick={requestReset}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-[#3f3f46] rounded-md hover:bg-gray-50 dark:hover:bg-[#1f1f23] transition-colors">
                  Reset
                </button>
              )}
            </div>

            <div className={`px-3 py-2 text-xs rounded-md border ${profileSaved ? 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#0a0a0b] text-gray-500 dark:text-gray-400'}`}>
              {profileSaved ? 'Profile ready for auto matching' : 'Setup not complete'}
            </div>

            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {requiredFields.map((field) => (
                <span
                  key={field.key}
                  className={`px-2 py-1 rounded-full text-[11px] border ${field.done ? 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'border-gray-200 dark:border-[#3f3f46] bg-gray-50 dark:bg-[#0a0a0b] text-gray-500 dark:text-gray-400'}`}>
                  {field.label}
                </span>
              ))}
            </div>

            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <Timer size={13} className="text-blue-500" />
              {queueState === 'searching' ? `Elapsed: ${formatElapsed(elapsedSeconds)}` : `Estimated wait: ${estimatedWaitLabel}`}
            </div>

            {showResetConfirm && (
              <div className="mt-4 w-full rounded-md border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-3 text-left">
                <p className="text-xs text-amber-700 dark:text-amber-300 mb-2">Reset and lose current matches?</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={resetMatch}
                    className="px-3 py-1.5 text-xs font-medium rounded bg-amber-600 text-white hover:bg-amber-700">
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1.5 text-xs font-medium rounded border border-amber-300 dark:border-amber-500/40 text-amber-700 dark:text-amber-300">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="xl:col-span-7 bg-white dark:bg-[#141416] border border-gray-200 dark:border-[#27272a] rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Matched Projects</h2>

          {queueState === 'idle' && (
            <div className="text-center py-16 border border-dashed border-gray-300 dark:border-[#3f3f46] rounded-xl">
              <div className="w-12 h-12 bg-gray-50 dark:bg-[#27272a] rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 dark:text-gray-500">
                <Search size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No active matching yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Save required fields and press Start Auto Match.</p>
            </div>
          )}

          {queueState === 'searching' && (
            <div className="border border-gray-200 dark:border-[#27272a] rounded-xl p-5 bg-gray-50 dark:bg-[#0a0a0b]">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Scanning Panel</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 transition-opacity duration-500">{SCAN_MESSAGES[scanMessageIndex]}</p>
              <div className="mt-4 space-y-2">
                {[0, 1, 2].map((line) => (
                  <div key={line} className="h-2 rounded bg-gray-200 dark:bg-[#27272a] overflow-hidden">
                    <div className="h-full w-1/2 bg-blue-500/60 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {queueState === 'matched' && suggestions.length > 0 && (
            <div className="rounded-xl border border-gray-200 dark:border-[#27272a] overflow-hidden">
              <div className="grid grid-cols-12 px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#0a0a0b] border-b border-gray-200 dark:border-[#27272a]">
                <div className="col-span-4">Project / Team</div>
                <div className="col-span-2">Need</div>
                <div className="col-span-2">Members</div>
                <div className="col-span-2">Score</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-[#27272a]">
                {suggestions.map((team) => {
                  const expanded = expandedRows.includes(team.id);
                  const saved = savedForLater.includes(team.id);
                  return (
                    <div key={team.id}>
                      <div className="grid grid-cols-12 items-center px-4 py-4">
                        <div className="col-span-4 pr-3">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{team.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{team.projectType}</p>
                        </div>

                        <div className="col-span-2">
                          <span className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-[#27272a] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#3f3f46]">
                            {team.neededRoles[0]}
                          </span>
                        </div>

                        <div className="col-span-2 text-sm text-gray-600 dark:text-gray-300 font-mono">
                          {team.currentMembers}/{team.targetMembers}
                        </div>

                        <div className="col-span-2">
                          <span className="inline-flex items-center px-2.5 py-1 rounded border text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30">
                            {team.matchScore}%
                          </span>
                          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">ETA {team.eta}</p>
                        </div>

                        <div className="col-span-2 flex justify-end items-center gap-2">
                          <button
                            type="button"
                            className="px-3 py-1 text-xs font-medium rounded-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white hover:bg-gray-800 dark:hover:bg-gray-100">
                            Join
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleSaveForLater(team.id)}
                            className={`p-1.5 rounded border ${saved ? 'border-blue-300 dark:border-blue-500/40 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-500/10' : 'border-gray-300 dark:border-[#3f3f46] text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1f1f23]'}`}>
                            <Bookmark size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleRowExpand(team.id)}
                            className="p-1.5 rounded border border-gray-300 dark:border-[#3f3f46] text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1f1f23]">
                            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        </div>
                      </div>

                      {expanded && (
                        <div className="px-4 pb-4">
                          <div className="rounded-md border border-gray-200 dark:border-[#3f3f46] bg-gray-50 dark:bg-[#0a0a0b] p-3">
                            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">Why this match: {team.reason}</p>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div className="p-2 rounded border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#141416]">
                                <p className="text-gray-500 dark:text-gray-400">Skills</p>
                                <p className="font-semibold text-gray-900 dark:text-white">{team.breakdown.skills}%</p>
                              </div>
                              <div className="p-2 rounded border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#141416]">
                                <p className="text-gray-500 dark:text-gray-400">Availability</p>
                                <p className="font-semibold text-gray-900 dark:text-white">{team.breakdown.availability}%</p>
                              </div>
                              <div className="p-2 rounded border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#141416]">
                                <p className="text-gray-500 dark:text-gray-400">Style</p>
                                <p className="font-semibold text-gray-900 dark:text-white">{team.breakdown.style}%</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </div>

      {showSetupModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setShowSetupModal(false)} />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white dark:bg-[#141416] border border-gray-200 dark:border-[#27272a] rounded-xl shadow-xl overflow-hidden">
              <div className="p-5 border-b border-gray-200 dark:border-[#27272a]">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Required Fields</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Complete quick setup once to unlock one-tap matching.</p>
                <div className="mt-3 h-1.5 rounded-full bg-gray-100 dark:bg-[#27272a] overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all" style={{ width: `${completionPct}%` }} />
                </div>
              </div>

              <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Match Mode</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setMode('join-existing')}
                      className={`p-3 rounded-lg border text-left ${mode === 'join-existing' ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10' : 'border-gray-200 dark:border-[#27272a]'}`}>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Join Existing</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Get placed in an active team quickly.</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('build-new')}
                      className={`p-3 rounded-lg border text-left ${mode === 'build-new' ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10' : 'border-gray-200 dark:border-[#27272a]'}`}>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Build New</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Assemble a new team from scratch.</p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {ROLE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setRole(opt)}
                        className={`px-3 py-2 rounded-lg border text-sm text-left ${role === opt ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300' : 'border-gray-200 dark:border-[#27272a] text-gray-600 dark:text-gray-300'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Type</label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select</option>
                      {PROJECT_TYPES.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Availability</label>
                    <select
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select</option>
                      {HOURS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timeline</label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full text-sm border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select</option>
                      {TIMELINE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills</label>
                  <input
                    type="text"
                    value={skillSearch}
                    onChange={(e) => setSkillSearch(e.target.value)}
                    placeholder="Search skills..."
                    className="w-full mb-3 px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md text-sm"
                  />

                  <div className="space-y-3">
                    {(['Tech', 'Design', 'Creative', 'Business'] as SkillCategory[]).map((category) => (
                      <div key={category}>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{category}</p>
                        <div className="flex flex-wrap gap-2">
                          {filteredSkillsByCategory[category].map((skill) => {
                            const active = skills.includes(skill.label);
                            return (
                              <button
                                key={skill.label}
                                type="button"
                                onClick={() => toggleSkill(skill.label)}
                                className={`px-3 py-1.5 rounded-full text-sm border ${active ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300' : 'bg-white dark:bg-[#1f1f23] border-gray-300 dark:border-[#3f3f46] text-gray-600 dark:text-gray-300'}`}>
                                {skill.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-gray-200 dark:border-[#27272a] flex items-center justify-between">
                <p className="text-xs text-gray-500 dark:text-gray-400">{completionCount}/{requiredFields.length} fields completed</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSetupModal(false)}
                    className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-[#3f3f46] rounded-md">
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={saveProfile}
                    disabled={!formValid}
                    title={saveDisabledReason}
                    className={`px-3 py-2 text-sm font-medium rounded-md inline-flex items-center gap-2 ${formValid ? 'text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100' : 'bg-gray-100 dark:bg-[#27272a] text-gray-400 dark:text-gray-600 cursor-not-allowed'}`}>
                    {profileSaved ? <Check size={14} /> : <Save size={14} />}
                    {profileSaved ? 'Update & Save' : 'Save Required Fields'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
