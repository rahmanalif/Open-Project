import React, { useState } from 'react';
import { AutoMatchHeroCard } from '../components/quick-match/AutoMatchHeroCard';
import {
  MatchResultsPanel,
  MatchState } from
'../components/quick-match/MatchResultsPanel';
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
  profileData.skills.length > 0);

  const handleStartMatch = () => {
    if (!isProfileReady) {
      setIsModalOpen(true);
      return;
    }
    setMatchState('searching');
    // Simulate finding matches after 8 seconds
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
  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-6 sm:mb-8">
        <h1 className="flex items-center gap-3 text-2xl font-bold tracking-wide text-white sm:text-3xl">
          <span className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse" />
          Quick Auto Match
        </h1>
        <p className="mt-2 text-base font-mono text-gray-400 sm:text-lg">
          Find your next collaboration in minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <AutoMatchHeroCard
            matchState={matchState}
            onStartMatch={handleStartMatch}
            onResetMatch={handleResetMatch}
            isProfileReady={isProfileReady}
            onFillProfile={() => setIsModalOpen(true)}
            profileData={profileData} />

        </div>

        {/* Right Column */}
        <div className="h-full">
          <MatchResultsPanel matchState={matchState} />
        </div>
      </div>

      <RequiredFieldsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProfile}
        initialData={profileData} />

    </div>);

}
