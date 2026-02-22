export const ROLE_OPTIONS = [
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
  'Other'
];

export const DOMAIN_OPTIONS = [
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
  'Other'
];

export const GOAL_OPTIONS = [
  {
    id: 'learning',
    label: 'Learning-focused',
    desc: 'I want to grow my skills through this project'
  },
  {
    id: 'portfolio',
    label: 'Portfolio-driven',
    desc: 'I want something to show employers or clients'
  },
  {
    id: 'monetization',
    label: 'Monetization-oriented',
    desc: 'I want this project to generate income'
  },
  {
    id: 'startup',
    label: 'Startup-bound',
    desc: 'I want to build a company around this'
  }
];

export const STAGE_OPTIONS = [
  {
    id: 'idea',
    label: 'Idea',
    desc: 'I have a concept but nothing built'
  },
  {
    id: 'validation',
    label: 'Validation',
    desc: 'I am testing if this idea is worth pursuing'
  },
  {
    id: 'prototype',
    label: 'Prototype',
    desc: 'I have something early built'
  },
  {
    id: 'active',
    label: 'Active Build',
    desc: 'I am actively developing this'
  }
];

export const SCOPE_OPTIONS = ['Lead', 'Contributor', 'Advisor'];

export const EXP_LEVEL_OPTIONS = [
  'Beginner-friendly',
  'Intermediate',
  'Advanced'
];

export const HOURS_OPTIONS = [
  '1-5 hrs/week',
  '5-10 hrs/week',
  '10-20 hrs/week',
  '20-30 hrs/week',
  '30+ hrs/week'
];

export const TIMELINE_OPTIONS = [
  'Short experiment',
  'Medium-term build',
  'Long-term venture'
];

export const URGENCY_OPTIONS = ['Flexible', 'Moderate', 'High'];

export const COLLAB_MODEL_OPTIONS = [
  {
    id: 'equal',
    label: 'Equal Partners',
    desc: 'Everyone has equal say and shared ownership'
  },
  {
    id: 'role',
    label: 'Role-based Contributors',
    desc: 'Each person owns their domain, clear boundaries'
  },
  {
    id: 'revenue',
    label: 'Revenue-share',
    desc: 'Contributors earn a percentage of generated revenue'
  },
  {
    id: 'learning',
    label: 'Learning Collaboration',
    desc: 'No ownership expectations, purely for growth'
  }
];

export const ONBOARDING_OPTIONS = [
  'Jump right in',
  'Some onboarding needed',
  'Needs significant ramp-up'
];

export const DEAL_BREAKER_OPTIONS = [
  'Must be fully async',
  'Must have prior project experience',
  'Must commit to an agreed timeline',
  'No ghosting - regular check-ins required',
  'Must be in a compatible timezone',
  'Must be open to feedback'
];

export const COMMUNICATION_OPTIONS = ['Async-first', 'Balanced', 'Sync-preferred'];

export const MEETING_OPTIONS = ['No meetings at all', 'Weekly', 'Bi-weekly', 'Daily standups'];

export const TIMEZONE_TOLERANCE_OPTIONS = [
  'Same timezone only',
  'Flexible up to +/-4 hours',
  'Fully async - timezone does not matter'
];

export const DECISION_STYLE_OPTIONS = ['Consensus', 'Democratic', 'Lead decides'];

export const LANGUAGE_OPTIONS = [
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
  'Other'
];

export const PERSONALITY_OPTIONS = [
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
  'Communicates only when needed'
];

export const MATCHING_MODES = [
  {
    id: 'auto',
    label: 'Auto Matchmaking',
    desc: 'Find and suggest collaborators automatically based on compatibility.'
  },
  {
    id: 'open',
    label: 'Open Listing',
    desc: 'List publicly so anyone can apply and you review manually.'
  },
  {
    id: 'invite',
    label: 'Invite Only',
    desc: 'Not public. Manually invite specific users by display name.'
  }
];

export const MATCH_WEIGHT_ITEMS = [
  'Skills & Tools match',
  'Availability & Hours match',
  'Working Style match',
  'Timezone match',
  'Goal Alignment match',
  'Domain Interest match'
];

export const VISIBILITY_AFTER_MATCH_OPTIONS = [
  'Keep listing active after a match is found',
  'Pause listing after first match accepted',
  'Close listing after all roles are filled'
];
