import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Save, Sparkles } from 'lucide-react';
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

  const completedSteps = STEPS.reduce((count, _, index) => {
    const stepNumber = index + 1;
    if (stepNumber >= currentStep) return count;
    return count + 1;
  }, 0);

  return (
    <div className="flex h-full flex-col bg-transparent">
      <StepIndicator
        currentStep={currentStep}
        totalSteps={STEPS.length}
        labels={STEPS} />

      <div className="grid min-h-0 flex-1 gap-0 2xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="hidden border-b border-[var(--border)] bg-[color:var(--bg-elevated)] p-5 sm:p-6 2xl:block 2xl:min-h-0 2xl:overflow-y-auto 2xl:border-b-0 2xl:border-r">
          <div className="space-y-5 xl:sticky xl:top-0">
            <div className="rounded-[28px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Progress</p>
                  <p className="mt-2 text-3xl font-semibold text-[var(--text)]">{completedSteps}/{STEPS.length}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[color:var(--accent-soft)] text-[var(--accent)]">
                  <Sparkles size={18} />
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                Build trust fast by making the opportunity clear, realistic, and easy to understand.
              </p>
            </div>

            <div className="rounded-[28px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-5">
              <p className="text-sm font-semibold text-[var(--text)]">Current step</p>
              <p className="mt-2 text-base font-medium text-[var(--accent)]">{STEPS[currentStep - 1]}</p>
            </div>
          </div>
        </aside>

        <div className="min-h-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5 lg:px-7 lg:py-6">
          <div className="mx-auto max-w-5xl">
          <div className="mb-4 grid gap-3 2xl:hidden md:grid-cols-[minmax(0,1fr)_auto]">
            <div className="rounded-[22px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Current step</p>
                  <p className="mt-1 text-base font-semibold text-[var(--text)]">{STEPS[currentStep - 1]}</p>
                </div>
                <div className="rounded-full border border-[var(--border)] bg-[color:var(--bg-elevated)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  {completedSteps}/{STEPS.length}
                </div>
              </div>
            </div>
          </div>

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
              <div className="rounded-[28px] border border-[var(--border)] bg-[color:var(--bg-panel)] p-5">
                <h3 className="text-sm font-semibold text-[var(--text)] mb-3">
                  Quick Review
                </h3>
                <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                  <p className="text-[var(--text-muted)]">
                    <span className="font-medium text-[var(--text)]">Domain:</span>{' '}
                    {formData.domain || 'Not set'}
                  </p>
                  <p className="text-[var(--text-muted)]">
                    <span className="font-medium text-[var(--text)]">Stage:</span>{' '}
                    {formData.stage || 'Not set'}
                  </p>
                  <p className="text-[var(--text-muted)]">
                    <span className="font-medium text-[var(--text)]">Roles:</span>{' '}
                    {(formData.roles || []).length}
                  </p>
                  <p className="text-[var(--text-muted)]">
                    <span className="font-medium text-[var(--text)]">Commitment:</span>{' '}
                    {formData.hours || 'Not set'}
                  </p>
                  <p className="text-[var(--text-muted)]">
                    <span className="font-medium text-[var(--text)]">Timeline:</span>{' '}
                    {formData.timeline || 'Not set'}
                  </p>
                  <p className="text-[var(--text-muted)]">
                    <span className="font-medium text-[var(--text)]">Matching:</span>{' '}
                    {formData.matchingMode || 'Not set'}
                  </p>
                </div>
              </div>
            </div>
          }
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)] bg-[color:var(--bg-elevated)] px-4 py-3 sm:px-6 lg:px-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors sm:w-auto ${currentStep === 1 ? 'cursor-not-allowed text-[var(--text-muted)] opacity-45' : 'premium-button-secondary'}`}>
          <ChevronLeft size={16} />
          Back
        </button>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          {currentStep === STEPS.length &&
          <button
            onClick={onClose}
            className="premium-button-secondary flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium sm:w-auto">
              <Save size={16} />
              Save as Draft
            </button>
          }

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all sm:w-auto ${!isStepValid() ? 'cursor-not-allowed border border-[var(--border)] bg-[color:var(--bg-panel)] text-[var(--text-muted)] opacity-70' : 'premium-button'}`}>
            {currentStep === STEPS.length ? 'Publish Project' : 'Next'}
            {currentStep !== STEPS.length && <ChevronRight size={16} />}
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
