import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Save } from 'lucide-react';
import { StepIndicator } from './StepIndicator';
import { IntentStep } from './project-steps/IntentStep';
import { RolesStep } from './project-steps/RolesStep';
import { CommitmentStep } from './project-steps/CommitmentStep';
import { CollaborationStep } from './project-steps/CollaborationStep';
import { WorkingStyleStep } from './project-steps/WorkingStyleStep';
import { ValidationStep } from './project-steps/ValidationStep';
import { ReviewStep } from './project-steps/ReviewStep';
interface ProjectCreationWizardProps {
  onClose: () => void;
}
const STEPS = [
'Intent',
'Roles',
'Commitment',
'Collaboration',
'Style',
'Validation',
'Review'];

export function ProjectCreationWizard({ onClose }: ProjectCreationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: '',
    stage: '',
    roles: [],
    hours: '',
    timeline: '',
    urgency: '',
    collabModel: '',
    ownership: '',
    communication: '',
    meetings: '',
    timezone: '',
    decisions: '',
    projectName: '',
    milestone: '',
    demoLink: '',
    repoLink: '',
    designLink: ''
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
        return formData.goal && formData.stage;
      case 2:
        return formData.roles.length > 0;
      case 3:
        return formData.hours && formData.timeline && formData.urgency;
      case 4:
        return formData.collabModel && formData.ownership;
      case 5:
        return (
          formData.communication &&
          formData.meetings &&
          formData.timezone &&
          formData.decisions);

      case 6:
        return true;
      // Optional step
      case 7:
        return true;
      default:
        return false;
    }
  };
  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Publish logic would go here
      onClose();
    }
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
        <div className="max-w-2xl mx-auto">
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
          <CollaborationStep data={formData} updateData={updateData} />
          }
          {currentStep === 5 &&
          <WorkingStyleStep data={formData} updateData={updateData} />
          }
          {currentStep === 6 &&
          <ValidationStep data={formData} updateData={updateData} />
          }
          {currentStep === 7 && <ReviewStep data={formData} />}
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-[#27272a] p-4 bg-white dark:bg-[#141416] flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`
            flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors
            ${currentStep === 1 ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#27272a]'}
          `}>

          <ChevronLeft size={16} />
          Back
        </button>

        <div className="flex items-center gap-3">
          {currentStep === 7 &&
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-md transition-colors">

              <Save size={16} />
              Save Draft
            </button>
          }

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`
              flex items-center gap-2 px-6 py-2 text-sm font-medium rounded-md transition-all shadow-sm
              ${!isStepValid() ? 'bg-gray-100 dark:bg-[#27272a] text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'}
            `}>

            {currentStep === STEPS.length ? 'Publish Project' : 'Next'}
            {currentStep !== STEPS.length && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>);

}