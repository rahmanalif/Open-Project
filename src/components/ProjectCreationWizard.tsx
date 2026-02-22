import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { StepIndicator } from './StepIndicator';
import { IntentStep } from './project-steps/IntentStep';
import { RolesStep } from './project-steps/RolesStep';
import { CommitmentStep } from './project-steps/CommitmentStep';
import { WorkingStyleStep } from './project-steps/WorkingStyleStep';
import { MatchingVisibilityStep } from './project-steps/MatchingVisibilityStep';
import { MATCH_WEIGHT_ITEMS } from './project-steps/constants';

interface ProjectCreationWizardProps {
  onClose: () => void;
}

const STEPS = [
  'Intent',
  'Roles',
  'Commitment',
  'Style',
  'Matching'
];

export function ProjectCreationWizard({ onClose }: ProjectCreationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    domain: '',
    goal: '',
    stage: '',
    projectDescription: '',
    ownerRole: '',
    ownerScope: '',
    yourSkills: [] as string[],
    ownerHours: '',
    roles: [] as any[],
    hours: '',
    timeline: '',
    urgency: '',
    availabilityNote: '',
    collabModel: '',
    equalSplits: {} as Record<string, number>,
    roleOwnership: {} as Record<string, string>,
    revenueSplits: {} as Record<string, number>,
    revenueShareStarts: '',
    onboardingReadiness: '',
    dealBreakers: [] as string[],
    communication: '',
    meetings: '',
    timezoneTolerance: '',
    decisions: '',
    preferredPersonalityTags: [] as string[],
    primaryLanguage: '',
    projectName: '',
    milestone: '',
    demoLink: '',
    repoLink: '',
    designLink: '',
    collaborationExperience: '',
    matchingMode: '',
    matchWeights: MATCH_WEIGHT_ITEMS,
    applicationQuestion: '',
    invitedUsers: [] as string[],
    visibilityAfterMatching: ''
  });

  const updateData = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          Boolean(formData.domain) &&
          Boolean(formData.goal) &&
          Boolean(formData.stage) &&
          Boolean(formData.projectDescription?.trim())
        );
      case 2:
        return (formData.roles || []).length > 0;
      case 3:
        return Boolean(formData.hours) && Boolean(formData.timeline) && Boolean(formData.urgency);
      case 4:
        return (
          Boolean(formData.communication) &&
          Boolean(formData.meetings) &&
          Boolean(formData.timezoneTolerance) &&
          Boolean(formData.decisions) &&
          Boolean(formData.primaryLanguage)
        );
      case 5:
        if (!formData.matchingMode || !formData.visibilityAfterMatching) return false;
        if (formData.matchingMode === 'invite') return (formData.invitedUsers || []).length > 0;
        if (formData.matchingMode === 'open') {
          return (formData.applicationQuestion || '').length <= 200;
        }
        return true;
      default:
        return false;
    }
  };

  const handlePublish = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('nexus:listings') || '[]');
    const payload = {
      id: `listing-${Date.now()}`,
      createdAt: new Date().toISOString(),
      data: formData
    };
    localStorage.setItem('nexus:listings', JSON.stringify([payload, ...existingDrafts]));

    if (formData.matchingMode === 'auto') {
      console.log('Published: Auto Matchmaking, redirecting to Matches scanning state');
    } else if (formData.matchingMode === 'open') {
      console.log('Published: Open Listing, redirecting to Project Dashboard');
    } else {
      console.log('Published: Invite Only, invitations sent and redirecting to Project Dashboard');
    }
    onClose();
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
      return;
    }
    handlePublish();
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#141416]">
      <StepIndicator
        currentStep={currentStep}
        totalSteps={STEPS.length}
        labels={STEPS} />

      <div className="flex-1 overflow-y-auto p-8 bg-white dark:bg-[#141416]">
        <div className="max-w-3xl mx-auto">
          {currentStep === 1 &&
          <IntentStep data={formData} updateData={updateData} />
          }
          {currentStep === 2 &&
          <RolesStep data={formData} updateData={updateData} />
          }
          {currentStep === 3 &&
          <CommitmentStep data={formData} updateData={updateData} />
          }
          {currentStep === 4 &&
          <WorkingStyleStep data={formData} updateData={updateData} />
          }
          {currentStep === 5 &&
          <div className="space-y-6">
              <MatchingVisibilityStep data={formData} updateData={updateData} />
              <div className="rounded-lg border border-gray-200 dark:border-[#27272a] p-4 bg-gray-50 dark:bg-[#0a0a0b]">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Quick Review
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white">Domain:</span>{' '}
                    {formData.domain || 'Not set'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white">Stage:</span>{' '}
                    {formData.stage || 'Not set'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white">Roles:</span>{' '}
                    {(formData.roles || []).length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white">Commitment:</span>{' '}
                    {formData.hours || 'Not set'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white">Timeline:</span>{' '}
                    {formData.timeline || 'Not set'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white">Matching:</span>{' '}
                    {formData.matchingMode || 'Not set'}
                  </p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-[#27272a] p-4 bg-white dark:bg-[#141416] flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${currentStep === 1 ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#27272a]'}`}>

          <ChevronLeft size={16} />
          Back
        </button>

        <div className="flex items-center gap-3">
          {currentStep === STEPS.length &&
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-md transition-colors">

              <Save size={16} />
              Save as Draft
            </button>
          }

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex items-center gap-2 px-6 py-2 text-sm font-medium rounded-md transition-all shadow-sm ${!isStepValid() ? 'bg-gray-100 dark:bg-[#27272a] text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'}`}>

            {currentStep === STEPS.length ? 'Publish Project' : 'Next'}
            {currentStep !== STEPS.length && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>);

}
