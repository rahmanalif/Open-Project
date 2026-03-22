import React, { useState } from 'react';
import { ArrowUpRight, Orbit, ShieldCheck, Sparkles } from 'lucide-react';
import { AutoMatchHeroCard } from '../components/quick-match/AutoMatchHeroCard';
import { MatchResultsPanel, MatchState } from '../components/quick-match/MatchResultsPanel';
import { RequiredFieldsModal } from '../components/quick-match/RequiredFieldsModal';

export function QuickAutoMatchPage() {
  const [matchState, setMatchState] = useState<MatchState>('idle');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState<any>({
    category: '',
    matchMode: '',
    role: '',
    availability: '',
    timeline: '',
    skills: []
  });

  const isProfileReady = !!(
    profileData.category &&
    profileData.matchMode &&
    profileData.role &&
    profileData.availability &&
    profileData.timeline &&
    profileData.skills.length > 0
  );

  const handleStartMatch = () => {
    if (!isProfileReady) {
      setIsModalOpen(true);
      return;
    }
    setMatchState('searching');
    setTimeout(() => {
      setMatchState('matched');
    }, 8000);
  };

  const handleResetMatch = () => {
    setMatchState('idle');
  };

  const handleSaveProfile = (data: any) => {
    setProfileData(data);
    setIsModalOpen(false);
  };

  const readinessCopy = isProfileReady
    ? 'Your profile is ready to produce higher-confidence introductions.'
    : 'Complete your profile once to get more credible, lower-friction collaboration matches.';

  return (
    <div className="mx-auto max-w-7xl pb-12">
      <section className="premium-panel premium-grid relative overflow-hidden rounded-[34px] px-6 py-8 sm:px-8 sm:py-10">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,rgba(208,164,106,0.16),transparent_66%)] lg:block" />
        <div className="relative grid gap-8 xl:grid-cols-[1.35fr_0.75fr] xl:items-end">
          <div>
            <p className="premium-kicker mb-3">Intelligent Matchmaking</p>
            <h1 className="max-w-4xl font-display text-4xl leading-[1.02] text-[var(--text)] sm:text-5xl xl:text-6xl">
              Find collaborators without having to push yourself into the room first.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-muted)] sm:text-lg">
              Open Project is built for serious makers who want a smarter, lower-pressure way to meet aligned teammates.
              The system looks for fit across role, intent, availability, and working style before you reach out.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="premium-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
                <ShieldCheck size={16} className="text-[var(--success)]" />
                Trust-first matching
              </div>
              <div className="premium-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
                <Orbit size={16} className="text-[var(--accent)]" />
                Better fit, less guesswork
              </div>
              <div className="premium-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
                <Sparkles size={16} className="text-[var(--accent)]" />
                Designed for introverts, too
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <div className="premium-soft-panel rounded-[28px] p-4">
              <p className="text-sm font-semibold text-[var(--text)]">Profile readiness</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{readinessCopy}</p>
            </div>
            <div className="premium-soft-panel rounded-[28px] p-4">
              <p className="text-sm font-semibold text-[var(--text)]">What gets matched</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                Skills, contribution style, time commitment, and project intent are weighed together.
              </p>
            </div>
            <div className="premium-soft-panel rounded-[28px] p-4">
              <p className="text-sm font-semibold text-[var(--text)]">Next step after a match</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                Review the reasoning, save promising projects, and join when the fit is right.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="flex flex-col gap-6">
          <AutoMatchHeroCard
            matchState={matchState}
            onStartMatch={handleStartMatch}
            onResetMatch={handleResetMatch}
            isProfileReady={isProfileReady}
            onFillProfile={() => setIsModalOpen(true)}
            profileData={profileData}
          />

          <div className="premium-soft-panel rounded-[30px] p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="premium-kicker mb-2">How It Works</p>
                <h2 className="font-display text-2xl text-[var(--text)]">A calmer path into collaboration</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-soft)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                <ArrowUpRight size={14} />
                Structured confidence
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                ['Set your intent', 'Tell the system what kind of project, role, and timeline you want right now.'],
                ['Review fit signals', 'Each recommendation explains where the collaboration strength comes from.'],
                ['Move when ready', 'Save, revisit, or join without the pressure of noisy outreach.']
              ].map(([title, body]) => (
                <div key={title} className="rounded-[24px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-4">
                  <p className="text-sm font-semibold text-[var(--text)]">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-full">
          <MatchResultsPanel matchState={matchState} />
        </div>
      </div>

      <RequiredFieldsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProfile}
        initialData={profileData}
      />
    </div>
  );
}
