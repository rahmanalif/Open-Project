import React, { useMemo } from 'react';
import { MoreHorizontal } from 'lucide-react';
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
  responseTime: '< 24h'
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
  responseTime: '< 12h'
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
  responseTime: '1-2 days'
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
  responseTime: '2-3 days'
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
  responseTime: '3+ days'
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
  responseTime: '< 24h'
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
  responseTime: '2-3 days'
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
  responseTime: '< 24h'
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
  responseTime: '3+ days'
}];

function getScoreColor(score: number) {
  if (score >= 80)
  return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20';
  if (score >= 50)
  return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20';
  return 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-500/10 border-gray-200 dark:border-gray-500/20';
}
function getScoreBarColor(score: number) {
  if (score >= 80) return 'bg-blue-600 dark:bg-blue-500';
  if (score >= 50) return 'bg-amber-500 dark:bg-amber-400';
  return 'bg-gray-400 dark:bg-gray-500';
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
    <div className="w-full bg-white dark:bg-[#141416] border border-gray-200 dark:border-[#27272a] rounded-lg shadow-sm overflow-hidden transition-colors duration-200">
      {filteredAndSortedProjects.length === 0 ?
      <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No projects match your filters.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Try adjusting your search or filters.
          </p>
        </div> :

      <>
          <div className="md:hidden divide-y divide-gray-100 dark:divide-[#27272a]">
            {filteredAndSortedProjects.map((project) =>
          <div
            key={project.id}
            onClick={() => onProjectClick?.(project.id)}
            className="p-4 space-y-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-[#1f1f23]">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-tight">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500 font-mono">
                      ID: {project.id.padStart(4, '0')} • {project.posted}
                    </p>
                  </div>
                  <div
                    className={`shrink-0 flex items-center justify-center min-w-11 h-6 rounded border px-1.5 text-xs font-bold font-mono ${getScoreColor(project.matchScore)}`}>
                    {project.matchScore}%
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Roles Needed
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.roles.map((role) =>
                <span
                  key={role}
                  className="inline-flex items-center rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs font-medium font-mono text-gray-600 dark:border-[#3f3f46] dark:bg-[#27272a] dark:text-gray-300">
                        {role}
                      </span>
                )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Commitment
                    </p>
                    <p className="mt-1 font-mono text-gray-700 dark:text-gray-300">
                      {project.commitment}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Response
                    </p>
                    <p className="mt-1 font-mono text-gray-700 dark:text-gray-300">
                      {project.responseTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Team Size
                    </p>
                    <p className="mt-1 font-mono text-gray-700 dark:text-gray-300">
                      {project.teamSize}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Open Roles
                    </p>
                    <p className="mt-1 font-mono text-gray-700 dark:text-gray-300">
                      {project.openRoles}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Match Strength
                    </p>
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                      {project.matchScore}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-[#27272a]">
                    <div
                      className={`h-full rounded-full ${getScoreBarColor(project.matchScore)}`}
                      style={{ width: `${project.matchScore}%` }} />
                  </div>
                </div>
              </div>
          )}
          </div>

          <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#0a0a0b] border-b border-gray-200 dark:border-[#27272a]">
                <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[28%]">
                  Project Name
                </th>
                <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[22%]">
                  Roles Needed
                </th>
                <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[14%]">
                  Commitment
                </th>
                <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[14%]">
                  Team Health
                </th>
                <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[14%]">
                  Match Score
                </th>
                <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[8%]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#27272a]">
              {filteredAndSortedProjects.map((project) =>
            <tr
              key={project.id}
              onClick={() => onProjectClick?.(project.id)}
              className="group hover:bg-gray-50 dark:hover:bg-[#1f1f23] transition-colors cursor-pointer">

                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 dark:text-white text-sm">
                        {project.name}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-0.5">
                        ID: {project.id.padStart(4, '0')} • {project.posted}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.roles.map((role) =>
                  <span
                    key={role}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-[#27272a] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#3f3f46] font-mono">

                          {role}
                        </span>
                  )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                      {project.commitment}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600 dark:text-gray-300 font-mono">
                        Team: {project.teamSize}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 font-mono">
                        Open: {project.openRoles}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                        Reply: {project.responseTime}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div
                    className={`flex items-center justify-center w-10 h-6 rounded border text-xs font-bold font-mono ${getScoreColor(project.matchScore)}`}>

                        {project.matchScore}%
                      </div>
                      <div className="w-16 h-1.5 bg-gray-100 dark:bg-[#27272a] rounded-full overflow-hidden">
                        <div
                      className={`h-full rounded-full ${getScoreBarColor(project.matchScore)}`}
                      style={{
                        width: `${project.matchScore}%`
                      }} />

                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
            )}
            </tbody>
          </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-gray-200 bg-gray-50 px-4 py-3 dark:border-[#27272a] dark:bg-[#0a0a0b] sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              Showing {filteredAndSortedProjects.length} of {projects.length}{' '}
              projects
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-[#141416] border border-gray-200 dark:border-[#27272a] rounded hover:bg-gray-50 dark:hover:bg-[#1f1f23] disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-[#141416] border border-gray-200 dark:border-[#27272a] rounded hover:bg-gray-50 dark:hover:bg-[#1f1f23]">
                Next
              </button>
            </div>
          </div>
        </>
      }
    </div>);

}
