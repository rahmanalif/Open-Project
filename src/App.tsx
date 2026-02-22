import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ProjectTable } from './components/ProjectTable';
import { MatchesPage } from './pages/MatchesPage';
import { MyListingsPage } from './pages/MyListingsPage';
import { SettingsPage } from './pages/SettingsPage';
import { QuickMatchPage } from './pages/QuickMatchPage';
import { Tab } from './components/Sidebar';
import { ProjectCreationModal } from './components/ProjectCreationModal';
import { ThemeProvider } from './hooks/useTheme';
import { ProjectWorkspaceLayout } from './components/project-workspace/ProjectWorkspaceLayout';
import { ProjectTab } from './components/project-workspace/ProjectSidebar';
import { ProjectOverview } from './pages/project/ProjectOverview';
import { ProjectTasks } from './pages/project/ProjectTasks';
import { ProjectMembers } from './pages/project/ProjectMembers';
import { ProjectFiles } from './pages/project/ProjectFiles';
import { ProjectSettings } from './pages/project/ProjectSettings';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { VerificationPage } from './pages/auth/VerificationPage';
import { OnboardingPage } from './pages/auth/OnboardingPage';
import { FilterState, SortOption } from './components/TopBar';

type AuthView = 'login' | 'register' | 'forgot-password' | 'verification' | 'onboarding' | null;

type UserProfile = {
  name: string;
  initials: string;
  role: string;
};

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<AuthView>(null);
  const [viewMode, setViewMode] = useState<'browse' | 'workspace'>('browse');
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [projectTab, setProjectTab] = useState<ProjectTab>('overview');
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    roles: [],
    commitment: [],
    matchScore: [0, 100]
  });
  const [sortOption, setSortOption] = useState<SortOption>('relevance');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMatchingActive, setIsMatchingActive] = useState(false);
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
    setAuthView('login');
    setViewMode('browse');
    setActiveTab('projects');
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
        {(authView === 'login' || authView === null) &&
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
        showMatchingPulse={isMatchingActive}
        onLogout={handleLogout}
        currentUser={currentUser}
        onFilterChange={setFilters}
        onSortChange={setSortOption}
        onSearchChange={setSearchQuery}>

        {activeTab === 'projects' &&
        <>
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
                  Open Projects
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Browse and filter opportunities that match your skills.
                </p>
              </div>
              <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>High Match (80%+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
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

        {activeTab === 'quick-match' &&
        <QuickMatchPage onMatchingStateChange={setIsMatchingActive} />
        }

        {activeTab === 'listings' && <MyListingsPage />}

        {activeTab === 'settings' && <SettingsPage />}
      </Layout>

      <ProjectCreationModal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)} />

    </ThemeProvider>);

}
