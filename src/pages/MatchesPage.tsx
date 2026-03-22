import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { MatchCard, MatchData } from '../components/MatchCard';
import { MatchFilters } from '../components/MatchFilters';

const MOCK_MATCHES: MatchData[] = [
  {
    id: 'm1',
    projectName: 'Indie SaaS Analytics',
    projectStage: 'Prototype',
    matchScore: 89,
    role: 'UI Designer',
    commitment: '10-15 hrs/week',
    duration: '3 months',
    status: 'new',
    complementarity: [
      'Your UI design fills their missing frontend role',
      'Your React expertise complements their backend Python skills',
      'No skill overlap with existing team'
    ],
    intentAlignment: ['Learning-focused (matches your goal)', 'Portfolio project (matches your intent)', 'Low financial risk'],
    workingStyle: {
      async: true,
      timezoneOverlap: 6,
      meetings: '1x/week'
    },
    breakdown: {
      skillFit: 92,
      availabilityFit: 84,
      styleFit: 90
    },
    reasoning: [
      'They need a UI designer to build the dashboard interface',
      'You prefer early-stage projects with learning opportunities',
      'Both prefer async collaboration with minimal meetings'
    ]
  },
  {
    id: 'm2',
    projectName: 'Open Source Doc Tool',
    projectStage: 'Active Development',
    matchScore: 84,
    role: 'Technical Writer',
    commitment: '5-8 hrs/week',
    duration: 'Ongoing',
    status: 'new',
    complementarity: [
      'Your documentation skills fill a critical gap',
      'Experience with MDX matches their stack',
      'They lack native English speakers'
    ],
    intentAlignment: ['Community impact focus', 'Long-term maintenance goal', 'Non-profit structure'],
    workingStyle: {
      async: true,
      timezoneOverlap: 4,
      meetings: 'None (Chat only)'
    },
    breakdown: {
      skillFit: 88,
      availabilityFit: 82,
      styleFit: 85
    },
    reasoning: [
      'Perfect skill match for their documentation overhaul',
      'Aligns with your desire to contribute to open source',
      'Zero-meeting culture fits your preference'
    ]
  },
  {
    id: 'm3',
    projectName: 'AI Habit Tracker',
    projectStage: 'Idea',
    matchScore: 78,
    role: 'Product Partner',
    commitment: '20 hrs/week',
    duration: '6 months',
    status: 'new',
    complementarity: [
      'You bring product strategy to their technical prototype',
      'Marketing experience fills their biggest gap',
      'Complementary domain knowledge in wellness'
    ],
    intentAlignment: ['Revenue-focused (Startup)', 'High commitment required', 'Equity split model'],
    workingStyle: {
      async: false,
      timezoneOverlap: 8,
      meetings: 'Daily standups'
    },
    breakdown: {
      skillFit: 80,
      availabilityFit: 74,
      styleFit: 79
    },
    reasoning: [
      'Strong domain fit for wellness tech',
      'They need a non-technical co-founder',
      'High commitment level matches your availability'
    ]
  }
];

export function MatchesPage() {
  const [minConfidence, setMinConfidence] = useState(80);
  const [matches, setMatches] = useState<MatchData[]>(MOCK_MATCHES);

  const handleAction = (id: string, action: 'interested' | 'maybe' | 'pass' | 'micro') => {
    setMatches((prev) =>
      prev
        .map((match) => {
          if (match.id !== id) return match;
          if (action === 'interested') return { ...match, status: 'pending' as const };
          if (action === 'pass') return { ...match, status: 'passed' as const };
          if (action === 'micro') return { ...match, status: 'micro-commitment' as const };
          return match;
        })
        .filter((match) => match.status !== 'passed')
    );
  };

  const filteredMatches = matches.filter((m) => m.matchScore >= minConfidence);

  return (
    <div className="mx-auto max-w-5xl pb-12">
      <section className="premium-panel premium-grid rounded-[34px] px-6 py-8 sm:px-8">
        <p className="premium-kicker mb-3">Weekly Recommendations</p>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl text-[var(--text)] sm:text-5xl">Matches built for real collaboration, not random outreach.</h1>
            <p className="mt-4 text-base leading-7 text-[var(--text-muted)]">
              These recommendations prioritize useful fit: where your skills fill a real gap, your availability is realistic, and the collaboration style feels sustainable.
            </p>
          </div>
          <div className="premium-soft-panel rounded-[28px] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[color:var(--accent-soft)] p-3 text-[var(--accent)]">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text)]">{filteredMatches.length} active matches</p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Every score is split by skills, timing, and working style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6">
        <MatchFilters minConfidence={minConfidence} onConfidenceChange={setMinConfidence} />
      </div>

      <div className="space-y-6">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => <MatchCard key={match.id} match={match} onAction={handleAction} />)
        ) : (
          <div className="premium-panel rounded-[30px] px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-[var(--accent)]">
              <Sparkles size={24} />
            </div>
            <h3 className="font-display text-2xl text-[var(--text)]">No matches above {minConfidence}%</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
              Try lowering your threshold or return later when more aligned projects are available.
            </p>
            <button onClick={() => setMinConfidence(70)} className="mt-5 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-strong)]">
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
