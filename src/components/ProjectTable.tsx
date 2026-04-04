import React, { useMemo } from 'react';
import { ArrowUpRight, Clock3, MoreHorizontal, Users } from 'lucide-react';
import { FilterState, SortOption } from './TopBar';
type Project = {
  id: string;
  name: string;
  roles: string[];
  commitment: string;
  matchScore: number;
  posted: string;
  teamSize: number;
  openRoles: number;
  responseTime: string;
  summary: string;
  fitLabel: string;
};
const projects: Project[] = [
{
  id: '1',
  name: 'FinTech Dashboard Redesign',
  roles: ['Product Designer', 'Frontend Developer'],
  commitment: '10-20 hrs/week',
  matchScore: 94,
  posted: '2d ago',
  teamSize: 3,
  openRoles: 2,
  responseTime: '< 24h',
  summary: 'Rebuild a complex fintech dashboard into a calmer, investor-ready experience with sharper product storytelling.',
  fitLabel: 'Strong fit'
},
{
  id: '2',
  name: 'AI Content Generator',
  roles: ['ML Engineer', 'Backend Developer'],
  commitment: 'Full-time',
  matchScore: 88,
  posted: '4h ago',
  teamSize: 2,
  openRoles: 2,
  responseTime: '< 12h',
  summary: 'Small founding team shaping an AI writing workflow and looking for technical collaborators to own the core platform.',
  fitLabel: 'Strong fit'
},
{
  id: '3',
  name: 'E-commerce Mobile App',
  roles: ['React Native Dev'],
  commitment: '10-20 hrs/week',
  matchScore: 76,
  posted: '1d ago',
  teamSize: 4,
  openRoles: 1,
  responseTime: '1-2 days',
  summary: 'Commerce-focused mobile product with active product direction, polished UX goals, and one key delivery role still open.',
  fitLabel: 'Promising fit'
},
{
  id: '4',
  name: 'Healthcare Patient Portal',
  roles: ['Full Stack Dev', 'Product Manager'],
  commitment: '20+ hrs/week',
  matchScore: 62,
  posted: '3d ago',
  teamSize: 5,
  openRoles: 2,
  responseTime: '2-3 days',
  summary: 'Healthcare portal work where delivery maturity matters and collaborators need to be comfortable with structured execution.',
  fitLabel: 'Moderate fit'
},
{
  id: '5',
  name: 'Crypto Wallet Integration',
  roles: ['Blockchain Dev', 'Security Specialist'],
  commitment: '5-10 hrs/week',
  matchScore: 45,
  posted: '5d ago',
  teamSize: 2,
  openRoles: 2,
  responseTime: '3+ days',
  summary: 'Security-sensitive blockchain integration project at an early stage with a narrower skill-match window.',
  fitLabel: 'Lower fit'
},
{
  id: '6',
  name: 'SaaS Marketing Site',
  roles: ['Frontend Developer', 'Copywriter'],
  commitment: 'Project-based',
  matchScore: 91,
  posted: '12h ago',
  teamSize: 3,
  openRoles: 1,
  responseTime: '< 24h',
  summary: 'Fast-moving SaaS team looking for a web collaborator who can tighten launch quality across frontend and messaging.',
  fitLabel: 'Strong fit'
},
{
  id: '7',
  name: 'Internal Tools Migration',
  roles: ['DevOps Engineer'],
  commitment: 'Full-time',
  matchScore: 58,
  posted: '1w ago',
  teamSize: 6,
  openRoles: 1,
  responseTime: '2-3 days',
  summary: 'Migration-heavy internal tooling effort for someone comfortable with infrastructure ownership and careful transitions.',
  fitLabel: 'Moderate fit'
},
{
  id: '8',
  name: 'Social Media Analytics',
  roles: ['Data Scientist', 'Frontend Developer'],
  commitment: '20+ hrs/week',
  matchScore: 82,
  posted: '2d ago',
  teamSize: 4,
  openRoles: 2,
  responseTime: '< 24h',
  summary: 'Analytics product balancing data depth with a polished UI, with room for both technical and product-minded contributors.',
  fitLabel: 'Strong fit'
},
{
  id: '9',
  name: 'Legacy System Refactor',
  roles: ['Backend Developer'],
  commitment: '20+ hrs/week',
  matchScore: 35,
  posted: '4d ago',
  teamSize: 5,
  openRoles: 1,
  responseTime: '3+ days',
  summary: 'Legacy platform cleanup with heavier maintenance needs and less alignment with your current collaboration pattern.',
  fitLabel: 'Lower fit'
}];

function getScoreColor(score: number) {
  if (score >= 80)
  return 'text-[var(--accent)] bg-[color:var(--accent-soft)] border-[color:var(--border)]';
  if (score >= 50)
  return 'text-[var(--danger)] bg-[rgba(180,83,9,0.08)] border-[rgba(180,83,9,0.18)]';
  return 'text-[var(--text-muted)] bg-[color:var(--bg-muted)] border-[var(--border)]';
}
function getScoreBarColor(score: number) {
  if (score >= 80) return 'bg-[var(--accent)]';
  if (score >= 50) return 'bg-[var(--danger)]';
  return 'bg-[color:var(--border-strong)]';
}
interface ProjectTableProps {
  onProjectClick?: (id: string) => void;
  filters?: FilterState;
  sortOption?: SortOption;
  searchQuery?: string;
}
export function ProjectTable({
  onProjectClick,
  filters,
  sortOption = 'relevance',
  searchQuery = ''
}: ProjectTableProps) {
  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];
    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.roles.some((r) =>
        r.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    // Apply role filter
    if (filters?.roles && filters.roles.length > 0) {
      result = result.filter((p) =>
      p.roles.some((role) => filters.roles.includes(role))
      );
    }
    // Apply commitment filter
    if (filters?.commitment && filters.commitment.length > 0) {
      result = result.filter((p) => filters.commitment.includes(p.commitment));
    }
    // Apply match score filter
    if (filters?.matchScore && filters.matchScore[0] > 0) {
      result = result.filter((p) => p.matchScore >= filters.matchScore[0]);
    }
    // Apply sorting
    switch (sortOption) {
      case 'match-score':
        result.sort((a, b) => b.matchScore - a.matchScore);
        break;
      case 'recent':
        // Simple sorting by posted time (would need proper date parsing in real app)
        result.sort((a, b) => {
          const getHours = (posted: string) => {
            if (posted.includes('h')) return parseInt(posted);
            if (posted.includes('d')) return parseInt(posted) * 24;
            if (posted.includes('w')) return parseInt(posted) * 24 * 7;
            return 0;
          };
          return getHours(a.posted) - getHours(b.posted);
        });
        break;
      case 'relevance':
      default:
        // Keep default order (already sorted by relevance)
        break;
    }
    return result;
  }, [filters, sortOption, searchQuery]);
  return (
    <div className="premium-panel overflow-hidden rounded-[30px] transition-colors duration-200">
      {filteredAndSortedProjects.length === 0 ?
      <div className="px-6 py-16 text-center sm:px-8">
          <p className="text-[var(--text-muted)]">
            No projects match your filters.
          </p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Try adjusting your search or filters.
          </p>
        </div> :

      <>
          <div className="md:hidden divide-y divide-[var(--border)]">
            {filteredAndSortedProjects.map((project) =>
          <div
            key={project.id}
            onClick={() => onProjectClick?.(project.id)}
            className="space-y-4 px-4 py-4 cursor-pointer transition-colors hover:bg-[color:var(--bg-muted)]">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold leading-tight text-[var(--text)]">
                      {project.name}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-[var(--text-muted)]">
                      ID: {project.id.padStart(4, '0')} • {project.posted}
                    </p>
                  </div>
                  <div
                    className={`shrink-0 flex min-w-11 items-center justify-center rounded border px-1.5 py-1 text-xs font-bold font-mono ${getScoreColor(project.matchScore)}`}>
                    {project.matchScore}%
                  </div>
                </div>

                <p className="text-sm leading-6 text-[var(--text-muted)]">{project.summary}</p>

                <div>
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                    Roles Needed
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.roles.map((role) =>
                <span
                  key={role}
                  className="inline-flex items-center rounded-full border border-[var(--border)] bg-[color:var(--bg-panel)] px-2.5 py-1 text-xs font-medium font-mono text-[var(--text-muted)]">
                        {role}
                      </span>
                )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                      Commitment
                    </p>
                    <p className="mt-1 font-mono text-[var(--text)]">
                      {project.commitment}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                      Response
                    </p>
                    <p className="mt-1 font-mono text-[var(--text)]">
                      {project.responseTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                      Team Size
                    </p>
                    <p className="mt-1 font-mono text-[var(--text)]">
                      {project.teamSize}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                      Open Roles
                    </p>
                    <p className="mt-1 font-mono text-[var(--text)]">
                      {project.openRoles}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                      Match Strength
                    </p>
                    <span className="text-xs font-mono text-[var(--text-muted)]">
                      {project.matchScore}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--bg-muted)]">
                    <div
                      className={`h-full rounded-full ${getScoreBarColor(project.matchScore)}`}
                      style={{ width: `${project.matchScore}%` }} />
                  </div>
                </div>
              </div>
          )}
          </div>

          <div className="hidden md:block">
            <div className="border-b border-[var(--border)] px-6 py-4 sm:px-8">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_280px_170px] lg:items-stretch">
                <div className="flex h-full flex-col justify-end rounded-[24px] border border-transparent px-1 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Browse queue</p>
                  <h2 className="mt-2 font-display text-2xl text-[var(--text)]">Projects ranked by collaboration fit</h2>
                </div>
                <div className="flex h-full flex-col justify-between rounded-[24px] border border-[var(--border)] bg-[color:var(--bg-panel)] px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">Visible projects</p>
                  <p className="mt-2 text-3xl font-semibold text-[var(--text)]">{filteredAndSortedProjects.length}</p>
                </div>
                <div className="flex h-full flex-col justify-between rounded-[24px] border border-[var(--border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--bg-panel)_92%,transparent),color-mix(in_srgb,var(--accent-soft)_34%,transparent))] px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">Top band</p>
                  <p className="mt-2 text-lg font-semibold text-[var(--accent)]">80%+ alignment</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-[var(--border)]">
              {filteredAndSortedProjects.map((project) =>
            <article
              key={project.id}
              onClick={() => onProjectClick?.(project.id)}
              className="group cursor-pointer px-6 py-5 transition-colors hover:bg-[color:var(--bg-muted)] sm:px-8">
                  <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(240px,0.8fr)_210px] xl:items-stretch">
                    <div className="flex min-w-0 h-full flex-col">
                      <div className="flex min-h-[3.75rem] items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-xl font-semibold leading-tight text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
                              {project.name}
                            </h3>
                            <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${getScoreColor(project.matchScore)}`}>
                              {project.fitLabel}
                            </span>
                          </div>
                          <p className="mt-1 font-mono text-xs text-[var(--text-muted)]">
                        ID: {project.id.padStart(4, '0')} • {project.posted}
                          </p>
                        </div>
                        <button className="rounded-full border border-transparent p-2 text-[var(--text-muted)] opacity-0 transition-all group-hover:border-[var(--border)] group-hover:opacity-100 hover:text-[var(--text)]">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>

                      <div className="mt-3 min-h-[4.5rem]">
                        <p className="max-w-2xl text-sm leading-6 text-[var(--text-muted)]">{project.summary}</p>
                      </div>

                      <div className="mt-4 flex min-h-[3.25rem] flex-wrap content-start gap-2">
                        {project.roles.map((role) =>
                    <span
                      key={role}
                      className="inline-flex items-center rounded-full border border-[var(--border)] bg-[color:var(--bg-panel)] px-3 py-1.5 text-xs font-medium font-mono text-[var(--text-muted)]">

                            {role}
                          </span>
                    )}
                      </div>
                    </div>

                    <div className="grid h-full auto-rows-fr gap-3 sm:grid-cols-3 xl:grid-cols-1">
                      <div className="h-full rounded-[22px] border border-[var(--border)] bg-[color:var(--bg-panel)] px-4 py-3">
                        <div className="flex items-center gap-2 text-[var(--text-muted)]">
                          <Clock3 size={14} />
                          <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">Commitment</span>
                        </div>
                        <p className="mt-2 font-mono text-sm text-[var(--text)]">{project.commitment}</p>
                      </div>

                      <div className="h-full rounded-[22px] border border-[var(--border)] bg-[color:var(--bg-panel)] px-4 py-3">
                        <div className="flex items-center gap-2 text-[var(--text-muted)]">
                          <Users size={14} />
                          <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">Team health</span>
                        </div>
                        <div className="mt-2 space-y-1 text-sm font-mono text-[var(--text)]">
                          <p>Team: {project.teamSize}</p>
                          <p>Open: {project.openRoles}</p>
                          <p className="text-[var(--text-muted)]">Reply: {project.responseTime}</p>
                        </div>
                      </div>

                      <div className="h-full rounded-[22px] border border-[var(--border)] bg-[color:var(--bg-panel)] px-4 py-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">Next step</span>
                          <ArrowUpRight size={14} className="text-[var(--accent)]" />
                        </div>
                        <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">Open the project to review fit reasoning and decide whether to reach out.</p>
                      </div>
                    </div>

                    <div className="flex h-full flex-col justify-between gap-4 rounded-[24px] border border-[var(--border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--bg-panel)_92%,transparent),color-mix(in_srgb,var(--accent-soft)_26%,transparent))] p-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Match score</p>
                        <div className="mt-3 flex items-center gap-3">
                          <div
                        className={`flex h-9 min-w-[3.5rem] items-center justify-center rounded-full border px-2 text-sm font-bold font-mono ${getScoreColor(project.matchScore)}`}>

                            {project.matchScore}%
                          </div>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[color:var(--bg-muted)]">
                            <div
                          className={`h-full rounded-full ${getScoreBarColor(project.matchScore)}`}
                          style={{
                            width: `${project.matchScore}%`
                          }} />

                          </div>
                        </div>
                      </div>

                      <div className="rounded-[18px] border border-[var(--border)] bg-[color:var(--bg-panel)] px-3 py-2.5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">Status</p>
                        <p className="mt-1 text-sm font-medium text-[var(--text)]">{project.fitLabel}</p>
                      </div>
                    </div>
                  </div>
                </article>
            )}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-[var(--border)] bg-[color:var(--bg-elevated)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
            <span className="font-mono text-xs text-[var(--text-muted)]">
              Showing {filteredAndSortedProjects.length} of {projects.length}{' '}
              projects
            </span>
            <div className="flex gap-2">
              <button className="premium-button-secondary rounded-full px-3.5 py-1.5 text-xs font-medium">
                Previous
              </button>
              <button className="premium-button-secondary rounded-full px-3.5 py-1.5 text-xs font-medium">
                Next
              </button>
            </div>
          </div>
        </>
      }
    </div>
  );
}
