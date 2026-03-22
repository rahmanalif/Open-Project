import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ProjectTable } from './components/ProjectTable';
import { MatchesPage } from './pages/MatchesPage';
import { MyListingsPage } from './pages/MyListingsPage';
import { SettingsPage } from './pages/SettingsPage';
import { QuickAutoMatchPage } from './pages/QuickAutoMatchPage';
import { Tab } from './components/Sidebar';
import { ProjectCreationModal } from './components/ProjectCreationModal';
import { ThemeProvider } from './hooks/useTheme';
import { ProjectWorkspaceLayout } from './components/project-workspace/ProjectWorkspaceLayout';
import { ProjectTab } from './components/project-workspace/ProjectSidebar';
import { ProjectOverview } from './pages/project/ProjectOverview';
import { ProjectTasks } from './pages/project/ProjectTasks';
import { ProjectChannels } from './pages/project/ProjectChannels';
import { ProjectMembers } from './pages/project/ProjectMembers';
import { ProjectFiles } from './pages/project/ProjectFiles';
import { ProjectSettings } from './pages/project/ProjectSettings';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { VerificationPage } from './pages/auth/VerificationPage';
import { OnboardingPage } from './pages/auth/OnboardingPage';
import { FilterState, SortOption } from './components/TopBar';
import { LandingPage } from './pages/LandingPage';

type AuthView = 'landing' | 'login' | 'register' | 'forgot-password' | 'verification' | 'onboarding' | null;

type UserProfile = {
  name: string;
  initials: string;
  role: string;
};

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<AuthView>('landing');
  const [viewMode, setViewMode] = useState<'browse' | 'workspace'>('browse');
  const [activeTab, setActiveTab] = useState<Tab>('matchmaking');
  const [projectTab, setProjectTab] = useState<ProjectTab>('overview');
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    roles: [],
    commitment: [],
    matchScore: [0, 100]
  });
  const [sortOption, setSortOption] = useState<SortOption>('relevance');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    name: 'New Member',
    initials: 'NM',
    role: 'Collaborator'
  });
  const handleProjectClick = (id: string) => {
    setViewMode('workspace');
    setProjectTab('overview');
  };
  const handleBackToBrowse = () => {
    setViewMode('browse');
  };
  const handleNavigateToSettings = () => {
    setProjectTab('settings');
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthView('landing');
    setViewMode('browse');
    setActiveTab('matchmaking');
  };
  const handleLogin = () => {
    setIsAuthenticated(true);
    setAuthView(null);
  };

  const handleOnboardingComplete = (profile: {
    skills: string[];
    preferredRole: string;
  }) => {
    const role = profile.preferredRole || 'Collaborator';
    setCurrentUser((prev) => ({
      ...prev,
      role
    }));
    setAuthView('login');
  };

  // Show authentication pages if not authenticated
  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        {(authView === 'landing' || authView === null) &&
        <LandingPage
          onGetStarted={() => setAuthView('register')}
          onSignIn={() => setAuthView('login')} />
        }
        {authView === 'register' &&
        <RegisterPage
          onSignInClick={() => setAuthView('login')}
          onRegisterSuccess={() => setAuthView('onboarding')} />
        }
        {authView === 'forgot-password' &&
        <ForgotPasswordPage onBackToLoginClick={() => setAuthView('login')} />
        }
        {authView === 'verification' &&
        <VerificationPage onContinueClick={() => setAuthView('login')} />
        }
        {authView === 'onboarding' &&
        <OnboardingPage onContinue={handleOnboardingComplete} />
        }
        {authView === 'login' &&
        <LoginPage
          onLoginSuccess={handleLogin}
          onRegisterClick={() => setAuthView('register')}
          onForgotPasswordClick={() => setAuthView('forgot-password')} />
        }
      </ThemeProvider>);

  }
  if (viewMode === 'workspace') {
    return (
      <ThemeProvider>
        <ProjectWorkspaceLayout
          activeTab={projectTab}
          onTabChange={setProjectTab}
          onBack={handleBackToBrowse}
          onNavigateToSettings={handleNavigateToSettings}>

          {projectTab === 'overview' && <ProjectOverview />}
          {projectTab === 'tasks' && <ProjectTasks />}
          {projectTab === 'channels' && <ProjectChannels />}
          {projectTab === 'members' && <ProjectMembers />}
          {projectTab === 'files' && <ProjectFiles />}
          {projectTab === 'settings' && <ProjectSettings />}
        </ProjectWorkspaceLayout>
      </ThemeProvider>);

  }
  return (
    <ThemeProvider>
      <Layout
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onNewProject={() => setIsCreationModalOpen(true)}
        isMatchingActive={activeTab === 'matchmaking'}
        onLogout={handleLogout}
        currentUser={currentUser}
        onFilterChange={setFilters}
        onSortChange={setSortOption}
        onSearchChange={setSearchQuery}>

        {activeTab === 'projects' &&
        <>
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="premium-kicker mb-2">Discover</p>
                <h1 className="font-display text-3xl text-[var(--text)] sm:text-4xl">
                  Open Projects
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-muted)] sm:text-base">
                  Browse serious collaboration opportunities matched to your skills, availability, and working style.
                </p>
              </div>
              <div className="premium-soft-panel flex flex-col gap-2 rounded-[24px] px-4 py-3 text-sm sm:flex-row sm:flex-wrap sm:gap-4">
                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--success)] shadow-[0_0_10px_rgba(91,191,167,0.8)]"></span>
                  <span>High Match (80%+)</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--danger)] shadow-[0_0_10px_rgba(242,168,75,0.55)]"></span>
                  <span>Medium Match (50-79%)</span>
                </div>
              </div>
            </div>
            <ProjectTable
            onProjectClick={handleProjectClick}
            filters={filters}
            sortOption={sortOption}
            searchQuery={searchQuery} />

          </>
        }

        {activeTab === 'matches' && <MatchesPage />}
        {activeTab === 'matchmaking' && <QuickAutoMatchPage />}

        {activeTab === 'listings' && <MyListingsPage />}

        {activeTab === 'settings' && <SettingsPage />}
      </Layout>

      <ProjectCreationModal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)} />

    </ThemeProvider>);

}
