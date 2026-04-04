import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Briefcase,
  CheckCircle2,
  Globe,
  Link as LinkIcon,
  Shield,
  User } from
'lucide-react';

type SaveSectionKey = 'profile' | 'skills' | 'preferences' | 'trust';
type SaveState = 'idle' | 'saving' | 'saved';

type FormState = {
  displayName: string;
  fullName: string;
  primaryRole: string;
  bio: string;
  primaryLanguage: string;
  location: string;
  portfolioUrl: string;
  primarySkills: string[];
  toolsStack: string[];
  experienceLevel: string;
  yearsExperience: number | '';
  domainInterests: string[];
  goalAlignment: string[];
  activeStatus: string;
  availability: string;
  timelinePreference: string;
  communicationStyle: string;
  meetingFrequency: string;
  timezone: string;
  timezoneFlexibility: string;
  aboutYouTags: string[];
  bestWithTags: string[];
  dealBreakers: string[];
  githubUrl: string;
  behanceUrl: string;
  dribbbleUrl: string;
  linkedinUrl: string;
  demoProjectUrl: string;
  otherLinkUrl: string;
  collaborationExperience: string;
  profileVisibility: string;
  requestPermission: string;
};

const PRIMARY_ROLE_OPTIONS = [
'Frontend Developer',
'Backend Developer',
'UI/UX Designer',
'Mobile Developer',
'DevOps Engineer',
'Product Manager',
'Marketing/Growth',
'Copywriter',
'Sound Designer',
'3D Artist',
'Filmmaker',
'Scriptwriter',
'Illustrator',
'Composer',
'Game Designer',
'Other'];

const LANGUAGE_OPTIONS = [
'English',
'Spanish',
'French',
'German',
'Portuguese',
'Arabic',
'Hindi',
'Chinese',
'Japanese',
'Korean',
'Turkish',
'Other'];

const EXPERIENCE_LEVEL_OPTIONS = [
'Beginner (0-1 years)',
'Intermediate (1-3 years)',
'Advanced (3-6 years)',
'Expert (6+ years)'];

const DOMAIN_INTEREST_OPTIONS = [
'Games',
'Web App',
'Mobile App',
'Film & Video',
'Music & Audio',
'Art & Illustration',
'Education',
'Marketing & Growth',
'Open Source',
'Hardware & IoT',
'Other'];

const GOAL_ALIGNMENT_OPTIONS = [
'Learning-focused',
'Portfolio-driven',
'Monetization-oriented',
'Startup-bound'];

const ACTIVE_STATUS_OPTIONS = [
{
  value: 'Actively Looking',
  tone: 'bg-green-50 border-green-200 text-green-700 dark:bg-green-500/10 dark:border-green-500/30 dark:text-green-400'
},
{
  value: 'Open but Not Urgent',
  tone: 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-400'
},
{
  value: 'Not Available Right Now',
  tone: 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-[#27272a] dark:border-[#3f3f46] dark:text-gray-300'
}];

const AVAILABILITY_OPTIONS = [
'1-5 hrs/week',
'5-10 hrs/week',
'10-20 hrs/week',
'20-30 hrs/week',
'30+ hrs/week'];

const TIMELINE_OPTIONS = [
'Short experiment',
'Medium-term build',
'Long-term venture'];

const COMMUNICATION_OPTIONS = [
'Async-first',
'Balanced',
'Sync-preferred'];

const MEETING_OPTIONS = [
'No meetings',
'Weekly',
'Bi-weekly',
'Daily'];

const TIMEZONE_FLEXIBILITY_OPTIONS = [
'Same timezone',
'Flexible (±4h)',
'Fully Async'];

const PERSONALITY_OPTIONS = [
'Self-starter',
'Needs some guidance',
'Open to feedback',
'Gives detailed feedback',
'Moves fast',
'Prefers careful planning',
'Mentor-friendly',
'Detail-oriented',
'Big picture thinker',
'Communicates often',
'Communicates only when needed'];

const DEAL_BREAKER_OPTIONS = [
'Must be fully async',
'Must have prior project experience',
'Must commit to an agreed timeline',
'No ghosting - regular check-ins required',
'Must be in a compatible timezone',
'No micromanagement',
'Must be open to giving and receiving feedback'];

const TIMEZONE_FALLBACK_OPTIONS = [
'UTC+00:00 (Etc/UTC)',
'UTC-08:00 (America/Los_Angeles)',
'UTC-05:00 (America/New_York)',
'UTC+00:00 (Europe/London)',
'UTC+01:00 (Europe/Paris)',
'UTC+03:00 (Asia/Riyadh)',
'UTC+05:30 (Asia/Kolkata)',
'UTC+06:00 (Asia/Dhaka)',
'UTC+08:00 (Asia/Singapore)',
'UTC+09:00 (Asia/Tokyo)'];

function getUtcOffset(timeZone: string) {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'shortOffset'
    });
    const tzPart = formatter.formatToParts(new Date()).
    find((part) => part.type === 'timeZoneName')?.
    value;
    if (!tzPart) return 'UTC+00:00';
    if (tzPart === 'GMT') return 'UTC+00:00';
    const normalized = tzPart.replace('GMT', 'UTC');
    if (/UTC[+-]\d{1,2}$/.test(normalized)) {
      const [sign, rawHours] = normalized.slice(3).split(/(?=\d)/);
      const hours = rawHours.padStart(2, '0');
      return `UTC${sign}${hours}:00`;
    }
    return normalized;
  } catch {
    return 'UTC+00:00';
  }
}

function isValidUrl(value: string) {
  if (!value.trim()) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function getInitials(displayName: string, fullName: string) {
  const source = (displayName || fullName).trim();
  if (!source) return 'U';
  const tokens = source.split(/\s+/).filter(Boolean);
  return tokens.slice(0, 2).map((token) => token[0].toUpperCase()).join('');
}

const sectionClass = 'premium-panel overflow-hidden rounded-[30px]';
const sectionHeaderClass = 'flex items-center gap-2 border-b border-[var(--border)] bg-[color:var(--bg-elevated)] px-5 py-4 sm:px-6';
const sectionBodyClass = 'space-y-6 px-5 py-5 sm:px-6 sm:py-6';
const labelClass = 'mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]';
const inputClass = 'premium-input w-full rounded-[18px] px-4 py-3 text-sm';
const textareaClass = 'premium-input w-full rounded-[22px] px-4 py-3 text-sm leading-6';
const selectClass = 'premium-input w-full rounded-[18px] px-4 py-3 text-sm';
const helperClass = 'mt-2 text-xs text-[var(--text-muted)]';
const errorClass = 'mt-2 text-xs text-[var(--danger)]';
const saveButtonClass = 'premium-button inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold';
const chipSelectedClass = 'border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[var(--text)] shadow-[0_10px_24px_rgba(0,0,0,0.14)]';
const chipDefaultClass = 'border-[var(--border)] bg-[color:var(--bg-panel)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]';

export function SettingsPage() {
  const [form, setForm] = useState<FormState>({
    displayName: 'JohnD',
    fullName: 'John Doe',
    primaryRole: 'Product Manager',
    bio: 'Product manager with 5 years experience in SaaS. Looking for technical collaborators to build productivity tools.',
    primaryLanguage: 'English',
    location: 'San Francisco, USA',
    portfolioUrl: 'https://johndoe.com',
    primarySkills: ['Product Management', 'Strategy', 'User Research'],
    toolsStack: ['Figma', 'Notion', 'Google Analytics'],
    experienceLevel: 'Advanced (3-6 years)',
    yearsExperience: 5,
    domainInterests: ['Web App', 'Education'],
    goalAlignment: ['Portfolio-driven'],
    activeStatus: 'Open but Not Urgent',
    availability: '10-20 hrs/week',
    timelinePreference: 'Medium-term build',
    communicationStyle: 'Balanced',
    meetingFrequency: 'Weekly',
    timezone: 'UTC-08:00 (America/Los_Angeles)',
    timezoneFlexibility: 'Flexible (±4h)',
    aboutYouTags: ['Open to feedback', 'Detail-oriented'],
    bestWithTags: ['Self-starter', 'Communicates often'],
    dealBreakers: [],
    githubUrl: '',
    behanceUrl: '',
    dribbbleUrl: '',
    linkedinUrl: '',
    demoProjectUrl: '',
    otherLinkUrl: '',
    collaborationExperience: 'This will be my first collaboration',
    profileVisibility: 'Everyone',
    requestPermission: 'People whose projects match your preferences'
  });
  const [saveState, setSaveState] = useState<Record<SaveSectionKey, SaveState>>({
    profile: 'idle',
    skills: 'idle',
    preferences: 'idle',
    trust: 'idle'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photoError, setPhotoError] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [primarySkillInput, setPrimarySkillInput] = useState('');
  const [toolsInput, setToolsInput] = useState('');
  const [pausedListings, setPausedListings] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [notificationPrefs, setNotificationPrefs] = useState({
    newMatch: true,
    appliedToProject: true,
    applicationUpdated: true,
    milestoneReminder: true,
    newMessage: true,
    announcements: false
  });
  const onPlatformHistory = {
    projectsJoined: 0,
    projectsCompleted: 0,
    rolesFilled: [] as string[],
    reliabilityBadge: 'New'
  };

  const timezoneOptions = useMemo(() => {
    const intl = Intl as Intl.DateTimeFormatOptions & {
      supportedValuesOf?: (key: string) => string[];
    };
    const zones = intl.supportedValuesOf?.('timeZone');
    if (!zones || zones.length === 0) return TIMEZONE_FALLBACK_OPTIONS;
    return zones.map((zone) => `${getUtcOffset(zone)} (${zone})`);
  }, []);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const toggleMultiValue = (
  key: 'domainInterests' | 'goalAlignment' | 'aboutYouTags' | 'bestWithTags' | 'dealBreakers',
  value: string,
  limit?: number) =>
  {
    setForm((prev) => {
      const current = prev[key];
      if (current.includes(value)) {
        return {
          ...prev,
          [key]: current.filter((item) => item !== value)
        };
      }
      if (limit && current.length >= limit) return prev;
      return {
        ...prev,
        [key]: [...current, value]
      };
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const addTag = (key: 'primarySkills' | 'toolsStack', value: string) => {
    const normalized = value.trim();
    if (!normalized) return;
    setForm((prev) => {
      if (prev[key].some((item) => item.toLowerCase() === normalized.toLowerCase())) {
        return prev;
      }
      return {
        ...prev,
        [key]: [...prev[key], normalized]
      };
    });
  };

  const removeTag = (key: 'primarySkills' | 'toolsStack', value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].filter((item) => item !== value)
    }));
  };

  const setSectionState = (section: SaveSectionKey, state: SaveState) => {
    setSaveState((prev) => ({
      ...prev,
      [section]: state
    }));
  };

  const validateProfileSection = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.displayName.trim()) nextErrors.displayName = 'Display Name is required';
    if (form.displayName.length > 30) nextErrors.displayName = 'Maximum 30 characters';
    if (!form.fullName.trim()) nextErrors.fullName = 'Full Name is required';
    if (form.fullName.length > 60) nextErrors.fullName = 'Maximum 60 characters';
    if (!form.primaryRole) nextErrors.primaryRole = 'Primary Role is required';
    if (!form.primaryLanguage) {
      nextErrors.primaryLanguage = 'Primary Working Language is required';
    }
    if (form.portfolioUrl && !isValidUrl(form.portfolioUrl)) {
      nextErrors.portfolioUrl = 'Enter a valid URL (https://...)';
    }
    setErrors((prev) => ({
      ...prev,
      ...nextErrors
    }));
    return Object.keys(nextErrors).length === 0;
  };

  const validateSkillsSection = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.experienceLevel) nextErrors.experienceLevel = 'Experience Level is required';
    if (form.yearsExperience === '') nextErrors.yearsExperience = 'Years of Experience is required';
    if (Number(form.yearsExperience) < 0 || Number(form.yearsExperience) > 40) {
      nextErrors.yearsExperience = 'Value must be between 0 and 40';
    }
    if (form.domainInterests.length === 0) {
      nextErrors.domainInterests = 'Select at least one domain interest';
    }
    if (form.goalAlignment.length === 0) {
      nextErrors.goalAlignment = 'Select at least one goal alignment';
    }
    setErrors((prev) => ({
      ...prev,
      ...nextErrors
    }));
    return Object.keys(nextErrors).length === 0;
  };

  const validatePreferencesSection = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.activeStatus) nextErrors.activeStatus = 'Active Status is required';
    if (!form.availability) nextErrors.availability = 'Availability is required';
    if (!form.timelinePreference) {
      nextErrors.timelinePreference = 'Timeline Preference is required';
    }
    if (!form.communicationStyle) {
      nextErrors.communicationStyle = 'Communication Style is required';
    }
    if (!form.meetingFrequency) {
      nextErrors.meetingFrequency = 'Meeting Frequency Tolerance is required';
    }
    if (!form.timezone.trim()) nextErrors.timezone = 'Timezone is required';
    if (!form.timezoneFlexibility) {
      nextErrors.timezoneFlexibility = 'Timezone Flexibility is required';
    }
    setErrors((prev) => ({
      ...prev,
      ...nextErrors
    }));
    return Object.keys(nextErrors).length === 0;
  };

  const validateTrustSection = () => {
    const nextErrors: Record<string, string> = {};
    const urlFields: Array<keyof FormState> = [
    'githubUrl',
    'behanceUrl',
    'dribbbleUrl',
    'linkedinUrl',
    'demoProjectUrl',
    'otherLinkUrl'];

    urlFields.forEach((field) => {
      if (!isValidUrl(form[field])) {
        nextErrors[field] = 'Enter a valid URL (https://...)';
      }
    });
    if (!form.collaborationExperience) {
      nextErrors.collaborationExperience = 'Collaboration Experience is required';
    }
    setErrors((prev) => ({
      ...prev,
      ...nextErrors
    }));
    return Object.keys(nextErrors).length === 0;
  };

  const saveSection = (section: SaveSectionKey, isValid: boolean) => {
    if (!isValid) return;
    setSectionState(section, 'saving');
    setTimeout(() => {
      setSectionState(section, 'saved');
      setTimeout(() => setSectionState(section, 'idle'), 1600);
    }, 800);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      setPhotoError('Accepted formats: JPG, PNG, GIF');
      return;
    }
    if (file.size > 1024 * 1024) {
      setPhotoError('Maximum size is 1MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result as string);
      setPhotoError('');
    };
    reader.readAsDataURL(file);
  };

  const saveLabel = (section: SaveSectionKey) => {
    if (saveState[section] === 'saving') return 'Saving...';
    if (saveState[section] === 'saved') return 'Saved!';
    return 'Save Changes';
  };

  return (
    <div className="mx-auto max-w-5xl pb-12">
      <div className="premium-panel premium-grid relative mb-8 overflow-hidden rounded-[34px] px-6 py-7 sm:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(208,164,106,0.14),transparent_28%)]" />
        <div className="relative">
          <p className="premium-kicker mb-2">Account Center</p>
          <h1 className="font-display text-4xl text-[var(--text)] sm:text-5xl">
          Settings
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-muted)] sm:text-base">
            Manage your profile, preferences, trust signals, and account controls in one place.
          </p>
        </div>
      </div>

      <div className="space-y-10">
        <section className={sectionClass}>
          <div className={sectionHeaderClass}>
            <User size={18} className="text-[var(--accent)]" />
            <h2 className="font-semibold text-[var(--text)]">
              Section 1 - Profile
            </h2>
          </div>
          <div className={sectionBodyClass}>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[color:var(--bg-panel)] text-xl font-medium text-[var(--text)] shadow-[var(--shadow-md)]">
                {photoPreview ?
                <img src={photoPreview} alt="Profile preview" className="w-full h-full object-cover" /> :

                getInitials(form.displayName, form.fullName)
                }
              </div>
              <div>
                <label className="premium-button-secondary inline-block cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium">
                  Upload Photo
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif,image/jpeg,image/png,image/gif"
                    className="hidden"
                    onChange={handlePhotoUpload} />

                </label>
                <p className={helperClass}>
                  JPG, PNG or GIF. Max 1MB.
                </p>
                {photoError &&
                <p className={errorClass}>
                    {photoError}
                  </p>
                }
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>
                  Display Name *
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={form.displayName}
                  onChange={(e) => setField('displayName', e.target.value)}
                  className={inputClass} />

                <div className={`${helperClass} text-right`}>
                  {form.displayName.length}/30
                </div>
                {errors.displayName &&
                <p className={errorClass}>
                    {errors.displayName}
                  </p>
                }
              </div>
              <div>
                <label className={labelClass}>
                  Full Name *
                </label>
                <input
                  type="text"
                  maxLength={60}
                  value={form.fullName}
                  onChange={(e) => setField('fullName', e.target.value)}
                  className={inputClass} />

                <div className={`${helperClass} text-right`}>
                  {form.fullName.length}/60
                </div>
                {errors.fullName &&
                <p className={errorClass}>
                    {errors.fullName}
                  </p>
                }
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>
                  Primary Role *
                </label>
                <select
                  value={form.primaryRole}
                  onChange={(e) => setField('primaryRole', e.target.value)}
                  className={selectClass}>

                  <option value="">Select role</option>
                  {PRIMARY_ROLE_OPTIONS.map((role) =>
                  <option key={role} value={role}>
                      {role}
                    </option>
                  )}
                </select>
                {errors.primaryRole &&
                <p className={errorClass}>
                    {errors.primaryRole}
                  </p>
                }
              </div>
              <div>
                <label className={labelClass}>
                  Primary Working Language *
                </label>
                <select
                  value={form.primaryLanguage}
                  onChange={(e) => setField('primaryLanguage', e.target.value)}
                  className={selectClass}>

                  <option value="">Select language</option>
                  {LANGUAGE_OPTIONS.map((language) =>
                  <option key={language} value={language}>
                      {language}
                    </option>
                  )}
                </select>
                {errors.primaryLanguage &&
                <p className={errorClass}>
                    {errors.primaryLanguage}
                  </p>
                }
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Bio
              </label>
              <textarea
                rows={3}
                maxLength={200}
                value={form.bio}
                onChange={(e) => setField('bio', e.target.value)}
                placeholder="Tell collaborators who you are and what you're working toward."
                className={textareaClass} />

              <div className={`${helperClass} text-right`}>
                {form.bio.length}/200
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>
                  Location
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setField('location', e.target.value)}
                  placeholder="Dhaka, Bangladesh"
                  className={inputClass} />

              </div>
              <div>
                <label className={labelClass}>
                  Portfolio or Website
                </label>
                <input
                  type="url"
                  value={form.portfolioUrl}
                  onChange={(e) => setField('portfolioUrl', e.target.value)}
                  placeholder="https://yourportfolio.com"
                  className={inputClass} />

                {errors.portfolioUrl &&
                <p className={errorClass}>
                    {errors.portfolioUrl}
                  </p>
                }
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => saveSection('profile', validateProfileSection())}
                className={saveButtonClass}>

                {saveLabel('profile')}
                {saveState.profile === 'saved' && <CheckCircle2 size={16} />}
              </button>
            </div>
          </div>
        </section>

        <section className={sectionClass}>
          <div className={sectionHeaderClass}>
            <Briefcase size={18} className="text-[var(--accent)]" />
            <h2 className="font-semibold text-[var(--text)]">
              Section 2 - Skills & Experience
            </h2>
          </div>
          <div className={sectionBodyClass}>
            <div>
              <label className={labelClass}>
                Primary Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {form.primarySkills.map((skill) =>
                <span
                  key={skill}
                  className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[color:var(--accent-soft)] px-3 py-1 text-sm text-[var(--text)]">

                    {skill}
                    <button
                    onClick={() => removeTag('primarySkills', skill)}
                    className="hover:text-blue-900 dark:hover:text-blue-300">

                      x
                    </button>
                  </span>
                )}
              </div>
              <input
                type="text"
                value={primarySkillInput}
                onChange={(e) => setPrimarySkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag('primarySkills', primarySkillInput);
                    setPrimarySkillInput('');
                  }
                }}
                placeholder="Type a skill and press Enter"
                className={inputClass} />

              <p className={helperClass}>
                Optional but strongly recommended. Suggested display cap: 10.
              </p>
            </div>

            <div>
              <label className={labelClass}>
                Tools & Stack
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {form.toolsStack.map((tool) =>
                <span
                  key={tool}
                  className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[color:var(--bg-muted)] px-3 py-1 text-sm text-[var(--text)]">

                    {tool}
                    <button
                    onClick={() => removeTag('toolsStack', tool)}
                    className="hover:text-indigo-900 dark:hover:text-indigo-200">

                      x
                    </button>
                  </span>
                )}
              </div>
              <input
                type="text"
                value={toolsInput}
                onChange={(e) => setToolsInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag('toolsStack', toolsInput);
                    setToolsInput('');
                  }
                }}
                placeholder="Type a tool or technology and press Enter"
                className={inputClass} />

              <p className={helperClass}>
                Optional but strongly recommended. Suggested display cap: 15.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>
                  Experience Level *
                </label>
                <select
                  value={form.experienceLevel}
                  onChange={(e) => setField('experienceLevel', e.target.value)}
                  className={selectClass}>

                  <option value="">Select level</option>
                  {EXPERIENCE_LEVEL_OPTIONS.map((option) =>
                  <option key={option} value={option}>
                      {option}
                    </option>
                  )}
                </select>
                {errors.experienceLevel &&
                <p className={errorClass}>
                    {errors.experienceLevel}
                  </p>
                }
              </div>
              <div>
                <label className={labelClass}>
                  Years of Experience *
                </label>
                <input
                  type="number"
                  min={0}
                  max={40}
                  value={form.yearsExperience}
                  onChange={(e) =>
                  setField(
                    'yearsExperience',
                    e.target.value === '' ? '' : Number(e.target.value)
                  )
                  }
                  className={inputClass} />

                {errors.yearsExperience &&
                <p className={errorClass}>
                    {errors.yearsExperience}
                  </p>
                }
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Domain Interests *
              </label>
              <div className="flex flex-wrap gap-2">
                {DOMAIN_INTEREST_OPTIONS.map((option) =>
                <button
                  key={option}
                  onClick={() => toggleMultiValue('domainInterests', option)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-all ${form.domainInterests.includes(option) ? chipSelectedClass : chipDefaultClass}`}>

                  {option}
                </button>
                )}
              </div>
              {errors.domainInterests &&
              <p className={errorClass}>
                  {errors.domainInterests}
                </p>
              }
            </div>

            <div>
              <label className={labelClass}>
                Goal Alignment *
              </label>
              <div className="flex flex-wrap gap-2">
                {GOAL_ALIGNMENT_OPTIONS.map((option) =>
                <button
                  key={option}
                  onClick={() => toggleMultiValue('goalAlignment', option)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-all ${form.goalAlignment.includes(option) ? chipSelectedClass : chipDefaultClass}`}>

                  {option}
                </button>
                )}
              </div>
              {errors.goalAlignment &&
              <p className={errorClass}>
                  {errors.goalAlignment}
                </p>
              }
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => saveSection('skills', validateSkillsSection())}
                className={saveButtonClass}>

                {saveLabel('skills')}
                {saveState.skills === 'saved' && <CheckCircle2 size={16} />}
              </button>
            </div>
          </div>
        </section>

        <section className={sectionClass}>
          <div className={sectionHeaderClass}>
            <Globe size={18} className="text-[var(--accent)]" />
            <h2 className="font-semibold text-[var(--text)]">
              Section 3 - Preferences
            </h2>
          </div>
          <div className={sectionBodyClass}>
            <div>
              <label className={labelClass}>
                Active Status *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {ACTIVE_STATUS_OPTIONS.map((option) =>
                <button
                  key={option.value}
                  onClick={() => setField('activeStatus', option.value)}
                  className={`rounded-[20px] border px-3 py-3 text-sm font-medium transition-all ${form.activeStatus === option.value ? option.tone : chipDefaultClass}`}>

                  {option.value}
                </button>
                )}
              </div>
              {errors.activeStatus &&
              <p className={errorClass}>
                  {errors.activeStatus}
                </p>
              }
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Availability - Hours per Week *
                </label>
                <select
                  value={form.availability}
                  onChange={(e) => setField('availability', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm">

                  <option value="">Select availability</option>
                  {AVAILABILITY_OPTIONS.map((option) =>
                  <option key={option} value={option}>
                      {option}
                    </option>
                  )}
                </select>
                {errors.availability &&
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    {errors.availability}
                  </p>
                }
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Timeline Preference *
                </label>
                <select
                  value={form.timelinePreference}
                  onChange={(e) => setField('timelinePreference', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm">

                  <option value="">Select timeline</option>
                  {TIMELINE_OPTIONS.map((option) =>
                  <option key={option} value={option}>
                      {option}
                    </option>
                  )}
                </select>
                {errors.timelinePreference &&
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    {errors.timelinePreference}
                  </p>
                }
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Communication Style *
                </label>
                <select
                  value={form.communicationStyle}
                  onChange={(e) => setField('communicationStyle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm">

                  <option value="">Select style</option>
                  {COMMUNICATION_OPTIONS.map((option) =>
                  <option key={option} value={option}>
                      {option}
                    </option>
                  )}
                </select>
                {errors.communicationStyle &&
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    {errors.communicationStyle}
                  </p>
                }
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Meeting Frequency Tolerance *
                </label>
                <select
                  value={form.meetingFrequency}
                  onChange={(e) => setField('meetingFrequency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm">

                  <option value="">Select frequency</option>
                  {MEETING_OPTIONS.map((option) =>
                  <option key={option} value={option}>
                      {option}
                    </option>
                  )}
                </select>
                {errors.meetingFrequency &&
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    {errors.meetingFrequency}
                  </p>
                }
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Timezone *
                </label>
                <input
                  type="text"
                  list="timezone-options"
                  value={form.timezone}
                  onChange={(e) => setField('timezone', e.target.value)}
                  placeholder="UTC+6 (Asia/Dhaka)"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />

                <datalist id="timezone-options">
                  {timezoneOptions.map((option) =>
                  <option key={option} value={option} />
                  )}
                </datalist>
                {errors.timezone &&
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    {errors.timezone}
                  </p>
                }
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Timezone Flexibility *
                </label>
                <select
                  value={form.timezoneFlexibility}
                  onChange={(e) => setField('timezoneFlexibility', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm">

                  <option value="">Select flexibility</option>
                  {TIMEZONE_FLEXIBILITY_OPTIONS.map((option) =>
                  <option key={option} value={option}>
                      {option}
                    </option>
                  )}
                </select>
                {errors.timezoneFlexibility &&
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    {errors.timezoneFlexibility}
                  </p>
                }
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Personality Tags - About You (up to 5)
              </label>
              <div className="flex flex-wrap gap-2">
                {PERSONALITY_OPTIONS.map((option) =>
                <button
                  key={option}
                  onClick={() => toggleMultiValue('aboutYouTags', option, 5)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-all ${form.aboutYouTags.includes(option) ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300' : 'bg-white dark:bg-[#1f1f23] border-gray-300 dark:border-[#3f3f46] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a]'}`}>

                  {option}
                </button>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {form.aboutYouTags.length}/5 selected
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Personality Tags - Who You Work Best With (up to 5)
              </label>
              <div className="flex flex-wrap gap-2">
                {PERSONALITY_OPTIONS.map((option) =>
                <button
                  key={option}
                  onClick={() => toggleMultiValue('bestWithTags', option, 5)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-all ${form.bestWithTags.includes(option) ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300' : 'bg-white dark:bg-[#1f1f23] border-gray-300 dark:border-[#3f3f46] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a]'}`}>

                  {option}
                </button>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {form.bestWithTags.length}/5 selected
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Deal-breakers (up to 2)
              </label>
              <div className="flex flex-wrap gap-2">
                {DEAL_BREAKER_OPTIONS.map((option) =>
                <button
                  key={option}
                  onClick={() => toggleMultiValue('dealBreakers', option, 2)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-all ${form.dealBreakers.includes(option) ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300' : 'bg-white dark:bg-[#1f1f23] border-gray-300 dark:border-[#3f3f46] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a]'}`}>

                  {option}
                </button>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {form.dealBreakers.length}/2 selected
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() =>
                saveSection('preferences', validatePreferencesSection())
                }
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-md transition-colors shadow-sm">

                {saveLabel('preferences')}
                {saveState.preferences === 'saved' && <CheckCircle2 size={16} />}
              </button>
            </div>
          </div>
        </section>

        <section className={sectionClass}>
          <div className={sectionHeaderClass}>
            <LinkIcon size={18} className="text-[var(--accent)]" />
            <h2 className="font-semibold text-[var(--text)]">
              Section 4 - Trust & Presence
            </h2>
          </div>
          <div className={sectionBodyClass}>
            {[
            {
              key: 'githubUrl',
              label: 'GitHub URL'
            },
            {
              key: 'behanceUrl',
              label: 'Behance URL'
            },
            {
              key: 'dribbbleUrl',
              label: 'Dribbble URL'
            },
            {
              key: 'linkedinUrl',
              label: 'LinkedIn URL'
            },
            {
              key: 'demoProjectUrl',
              label: 'Demo or Project URL'
            },
            {
              key: 'otherLinkUrl',
              label: 'Other Link'
            }].
            map((item) =>
            <div key={item.key}>
                <label className={labelClass}>
                  {item.label}
                </label>
                <input
                type="url"
                value={form[item.key as keyof FormState] as string}
                onChange={(e) =>
                setField(item.key as keyof FormState, e.target.value as never)
                }
                placeholder="https://"
                className={inputClass} />

                {errors[item.key] &&
              <p className={errorClass}>
                    {errors[item.key]}
                  </p>
                }
              </div>
            )}

            <div>
              <label className={labelClass}>
                Collaboration Experience *
              </label>
              <select
                value={form.collaborationExperience}
                onChange={(e) => setField('collaborationExperience', e.target.value)}
                className={selectClass}>

                <option value="">Select one</option>
                <option value="This will be my first collaboration">
                  This will be my first collaboration
                </option>
                <option value="Yes I have collaborated before and it went well">
                  Yes I have collaborated before and it went well
                </option>
                <option value="Yes I have collaborated before and it was difficult">
                  Yes I have collaborated before and it was difficult
                </option>
              </select>
              {errors.collaborationExperience &&
              <p className={errorClass}>
                  {errors.collaborationExperience}
                </p>
              }
            </div>

            <div className="rounded-[24px] border border-[var(--border)] bg-[color:var(--bg-elevated)] p-4">
              <h3 className="mb-3 text-sm font-medium text-[var(--text)]">
                On-Platform History
              </h3>
              {onPlatformHistory.projectsJoined === 0 &&
              onPlatformHistory.projectsCompleted === 0 ?
              <p className="text-sm text-[var(--text-muted)]">
                  Complete your first collaboration to build your track record.
                </p> :

              <div className="space-y-1 text-sm text-[var(--text)]">
                  <p>Projects joined: {onPlatformHistory.projectsJoined}</p>
                  <p>Projects completed: {onPlatformHistory.projectsCompleted}</p>
                  <p>
                    Roles filled:{' '}
                    {onPlatformHistory.rolesFilled.length > 0 ?
                  onPlatformHistory.rolesFilled.join(', ') :
                  '-'}
                  </p>
                  <p>Reliability badge: {onPlatformHistory.reliabilityBadge}</p>
                </div>
              }
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => saveSection('trust', validateTrustSection())}
                className={saveButtonClass}>

                {saveLabel('trust')}
                {saveState.trust === 'saved' && <CheckCircle2 size={16} />}
              </button>
            </div>
          </div>
        </section>

        <section className={sectionClass}>
          <div className={sectionHeaderClass}>
            <Shield size={18} className="text-[var(--accent)]" />
            <h2 className="font-semibold text-[var(--text)]">
              Section 5 - Account
            </h2>
          </div>
          <div className={sectionBodyClass}>
            <div>
              <label className={labelClass}>
                Email Address
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="email"
                  value="john.doe@example.com"
                  disabled
                  className="w-full cursor-not-allowed rounded-[18px] border border-[var(--border)] bg-[color:var(--bg-muted)] px-4 py-3 text-sm text-[var(--text-muted)]" />

                <button className="whitespace-nowrap text-sm text-[var(--accent)] hover:underline">
                  Change email
                </button>
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Password
              </label>
              <button className={saveButtonClass}>
                Change password
              </button>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium text-[var(--text)]">
                Notification Preferences
              </h3>
              <div className="space-y-3">
                {[
                {
                  key: 'newMatch',
                  label: 'New match found'
                },
                {
                  key: 'appliedToProject',
                  label: 'Someone applied to my project'
                },
                {
                  key: 'applicationUpdated',
                  label: 'Application status updated'
                },
                {
                  key: 'milestoneReminder',
                  label: 'Project milestone reminder'
                },
                {
                  key: 'newMessage',
                  label: 'New message received'
                },
                {
                  key: 'announcements',
                  label: 'Platform announcements and updates'
                }].
                map((item) =>
                <label key={item.key} className="flex items-center gap-3 rounded-[18px] border border-[var(--border)] bg-[color:var(--bg-panel)] px-4 py-3">
                    <input
                    type="checkbox"
                    checked={notificationPrefs[item.key as keyof typeof notificationPrefs]}
                    onChange={(e) =>
                    setNotificationPrefs((prev) => ({
                      ...prev,
                      [item.key]: e.target.checked
                    }))
                    }
                    className="h-4 w-4 rounded border-[var(--border-strong)] bg-white text-[var(--accent)] focus:ring-[var(--accent)]" />

                    <span className="text-sm text-[var(--text-muted)]">
                      {item.label}
                    </span>
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>
                  Who can see your profile
                </label>
                <select
                  value={form.profileVisibility}
                  onChange={(e) => setField('profileVisibility', e.target.value)}
                  className={selectClass}>

                  <option>Everyone</option>
                  <option>Matched users only</option>
                  <option>Invite only</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>
                  Who can send collaboration requests
                </label>
                <select
                  value={form.requestPermission}
                  onChange={(e) => setField('requestPermission', e.target.value)}
                  className={selectClass}>

                  <option>Everyone</option>
                  <option>People whose projects match your preferences</option>
                  <option>Nobody (pause incoming requests)</option>
                </select>
              </div>
            </div>

            <div className="rounded-[24px] border border-[rgba(180,83,9,0.22)] bg-[rgba(180,83,9,0.08)] p-4">
              <h3 className="mb-3 text-sm font-medium text-[var(--danger)]">
                Danger Zone
              </h3>
              <div className="space-y-4">
                <div>
                  <button
                    onClick={() => setPausedListings((prev) => !prev)}
                    className="premium-button-secondary rounded-full px-4 py-2.5 text-sm font-medium">

                    {pausedListings ? 'Resume All Listings' : 'Pause All Listings'}
                  </button>
                  <p className={helperClass}>
                    Your projects will be hidden from discovery temporarily. You
                    can reactivate anytime.
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="rounded-full bg-[var(--danger)] px-4 py-2.5 text-sm font-medium text-[#1d1409] transition-opacity hover:opacity-90">

                    Delete Account
                  </button>
                  <p className={helperClass}>
                    This will permanently delete your account, profile, and all
                    project listings. This cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {showDeleteModal &&
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setShowDeleteModal(false)} />

          <div className="premium-panel relative w-full max-w-md rounded-[28px] p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-600 dark:text-red-400 mt-0.5" size={18} />
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)]">
                  Confirm account deletion
                </h3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Type your display name to confirm.
                </p>
              </div>
            </div>

            <input
            type="text"
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
            placeholder={form.displayName}
            className="premium-input mt-4 w-full rounded-[18px] px-4 py-3 text-sm" />

            <div className="flex justify-end gap-3 mt-5">
              <button
              onClick={() => {
                setShowDeleteModal(false);
                setDeleteConfirmText('');
              }}
              className="premium-button-secondary rounded-full px-4 py-2.5 text-sm font-medium">

                Cancel
              </button>
              <button
              disabled={deleteConfirmText.trim() !== form.displayName.trim()}
              className={`rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${deleteConfirmText.trim() === form.displayName.trim() ? 'bg-[var(--danger)] text-[#1d1409] hover:opacity-90' : 'cursor-not-allowed bg-[rgba(180,83,9,0.2)] text-[var(--text-muted)]'}`}>

                Delete permanently
              </button>
            </div>
          </div>
        </div>
      }
    </div>);
}
