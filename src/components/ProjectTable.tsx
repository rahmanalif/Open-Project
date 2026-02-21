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
};
const projects: Project[] = [
{
  id: '1',
  name: 'FinTech Dashboard Redesign',
  roles: ['Product Designer', 'Frontend Dev'],
  commitment: '20h/week',
  matchScore: 94,
  posted: '2d ago'
},
{
  id: '2',
  name: 'AI Content Generator',
  roles: ['ML Engineer', 'Backend Developer'],
  commitment: 'Full-time',
  matchScore: 88,
  posted: '4h ago'
},
{
  id: '3',
  name: 'E-commerce Mobile App',
  roles: ['React Native Dev'],
  commitment: '15h/week',
  matchScore: 76,
  posted: '1d ago'
},
{
  id: '4',
  name: 'Healthcare Patient Portal',
  roles: ['Full Stack Dev', 'Product Manager'],
  commitment: '30h/week',
  matchScore: 62,
  posted: '3d ago'
},
{
  id: '5',
  name: 'Crypto Wallet Integration',
  roles: ['Blockchain Dev', 'Security Specialist'],
  commitment: '10h/week',
  matchScore: 45,
  posted: '5d ago'
},
{
  id: '6',
  name: 'SaaS Marketing Site',
  roles: ['Frontend Developer', 'Copywriter'],
  commitment: 'Project-based',
  matchScore: 91,
  posted: '12h ago'
},
{
  id: '7',
  name: 'Internal Tools Migration',
  roles: ['DevOps Engineer'],
  commitment: 'Full-time',
  matchScore: 58,
  posted: '1w ago'
},
{
  id: '8',
  name: 'Social Media Analytics',
  roles: ['Data Scientist', 'Frontend Developer'],
  commitment: '25h/week',
  matchScore: 82,
  posted: '2d ago'
},
{
  id: '9',
  name: 'Legacy System Refactor',
  roles: ['Backend Developer'],
  commitment: '40h/week',
  matchScore: 35,
  posted: '4d ago'
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
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#0a0a0b] border-b border-gray-200 dark:border-[#27272a]">
                <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[35%]">
                  Project Name
                </th>
                <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[25%]">
                  Roles Needed
                </th>
                <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[20%]">
                  Commitment
                </th>
                <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[15%]">
                  Match Score
                </th>
                <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[5%]"></th>
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

          <div className="px-4 py-3 border-t border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#0a0a0b] flex items-center justify-between">
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