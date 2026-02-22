import React, { useState } from 'react';
import { MatchCard, MatchData } from '../components/MatchCard';
import { MatchFilters } from '../components/MatchFilters';
import { Sparkles } from 'lucide-react';
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
  'No skill overlap with existing team'],

  intentAlignment: [
  'Learning-focused (matches your goal)',
  'Portfolio project (matches your intent)',
  'Low financial risk'],

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
  'Both prefer async collaboration with minimal meetings']

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
  'They lack native English speakers'],

  intentAlignment: [
  'Community impact focus',
  'Long-term maintenance goal',
  'Non-profit structure'],

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
  'Zero-meeting culture fits your preference']

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
  'Complementary domain knowledge in wellness'],

  intentAlignment: [
  'Revenue-focused (Startup)',
  'High commitment required',
  'Equity split model'],

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
  'High commitment level matches your availability']

}];

export function MatchesPage() {
  const [minConfidence, setMinConfidence] = useState(80);
  const [matches, setMatches] = useState<MatchData[]>(MOCK_MATCHES);
  const handleAction = (
  id: string,
  action: 'interested' | 'maybe' | 'pass' | 'micro') =>
  {
    setMatches((prev) =>
    prev.
    map((match) => {
      if (match.id !== id) return match;
      if (action === 'interested')
      return {
        ...match,
        status: 'pending' as const
      };
      if (action === 'pass')
      return {
        ...match,
        status: 'passed' as const
      };
      if (action === 'micro')
      return {
        ...match,
        status: 'micro-commitment' as const
      };
      return match;
    }).
    filter((match) => match.status !== 'passed')
    );
  };
  const filteredMatches = matches.filter((m) => m.matchScore >= minConfidence);
  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
          <Sparkles className="text-blue-600 dark:text-blue-400" size={24} />
          Your Weekly Matches
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">
          We've found {filteredMatches.length} projects where your skills fill a
          critical gap and working styles align. These matches are curated to
          minimize wasted time.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Transparency: each match score is split by skill fit, availability fit, and working style fit.
        </p>
      </div>

      <MatchFilters
        minConfidence={minConfidence}
        onConfidenceChange={setMinConfidence} />


      <div className="space-y-6">
        {filteredMatches.length > 0 ?
        filteredMatches.map((match) =>
        <MatchCard key={match.id} match={match} onAction={handleAction} />
        ) :

        <div className="text-center py-16 bg-white dark:bg-[#141416] rounded-xl border border-dashed border-gray-300 dark:border-[#3f3f46]">
            <div className="w-12 h-12 bg-gray-50 dark:bg-[#27272a] rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 dark:text-gray-500">
              <Sparkles size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No matches above {minConfidence}%
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Try lowering your confidence threshold or check back next week.
            </p>
            <button
            onClick={() => setMinConfidence(70)}
            className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">

              Reset filters
            </button>
          </div>
        }
      </div>

      {filteredMatches.length > 0 &&
      <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-medium">
            End of list
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Check back next Monday for new matches.
          </p>
        </div>
      }
    </div>);

}
