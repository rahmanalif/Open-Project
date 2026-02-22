import React, { useEffect, useState } from 'react';
import { Plus, LayoutGrid, List as ListIcon } from 'lucide-react';
import {
  ListingCard,
  ListingData,
  ListingStatus } from
'../components/ListingCard';
import { ProjectCreationModal } from '../components/ProjectCreationModal';
const MOCK_LISTINGS: ListingData[] = [
{
  id: '1',
  name: 'Indie SaaS Analytics Tool',
  status: 'active',
  stage: 'Prototype',
  roles: ['Frontend Developer', 'UI Designer'],
  views: 124,
  interests: 8,
  matches: 3,
  created: 'Oct 12, 2023',
  updated: '2 days ago'
},
{
  id: '2',
  name: 'AI Content Generator',
  status: 'paused',
  stage: 'Idea',
  roles: ['ML Engineer', 'Backend Developer', 'Product Manager'],
  views: 45,
  interests: 2,
  matches: 0,
  created: 'Sep 28, 2023',
  updated: '1 week ago'
},
{
  id: '3',
  name: 'Community Garden App',
  status: 'draft',
  stage: 'Idea',
  roles: ['Mobile Developer', 'Community Manager'],
  views: 0,
  interests: 0,
  matches: 0,
  created: 'Nov 01, 2023',
  updated: 'Just now'
}];

export function MyListingsPage() {
  const [filter, setFilter] = useState<ListingStatus | 'all'>('all');
  const [listings, setListings] = useState<ListingData[]>(MOCK_LISTINGS);
  const [showCreateProject, setShowCreateProject] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('nexus:listings') || '[]') as Array<{
      id: string;
      createdAt: string;
      data: {
        projectName?: string;
        stage?: string;
        roles?: Array<{name?: string}>;
      };
    }>;
    if (!saved.length) return;

    const mapped: ListingData[] = saved.map((item) => {
      const created = new Date(item.createdAt);
      const roleNames = (item.data.roles || [])
        .map((role) => role.name || '')
        .filter(Boolean);
      return {
        id: item.id,
        name: item.data.projectName || 'Untitled Project',
        status: 'active',
        stage: item.data.stage ? item.data.stage[0].toUpperCase() + item.data.stage.slice(1) : 'Idea',
        roles: roleNames.length ? roleNames : ['Role not defined'],
        views: 0,
        interests: 0,
        matches: 0,
        created: created.toLocaleDateString(),
        updated: 'Just now'
      };
    });

    setListings((prev) => [...mapped, ...prev]);
  }, []);
  const handleAction = (id: string, action: string) => {
    if (action === 'pause') {
      setListings((prev) =>
      prev.map((l) =>
      l.id === id ?
      {
        ...l,
        status: 'paused' as const
      } :
      l
      )
      );
    } else if (action === 'resume') {
      setListings((prev) =>
      prev.map((l) =>
      l.id === id ?
      {
        ...l,
        status: 'active' as const
      } :
      l
      )
      );
    } else if (action === 'delete') {
      if (window.confirm('Are you sure you want to delete this listing?')) {
        setListings((prev) => prev.filter((l) => l.id !== id));
      }
    } else if (action === 'archive') {
      setListings((prev) =>
      prev.map((l) =>
      l.id === id ?
      {
        ...l,
        status: 'archived' as const
      } :
      l
      )
      );
    }
  };
  const filteredListings =
  filter === 'all' ? listings : listings.filter((l) => l.status === filter);
  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
            My Listings
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your projects and track interest.
          </p>
        </div>
        <button
          onClick={() => setShowCreateProject(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-md transition-colors shadow-sm">

          <Plus size={16} />
          New Project
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#27272a] mb-6">
        <div className="flex gap-6">
          {(['all', 'active', 'paused', 'draft', 'archived'] as const).map(
            (tab) =>
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors capitalize ${filter === tab ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}>

                {tab}
              </button>

          )}
        </div>
        <div className="flex items-center gap-2 pb-2 text-gray-400 dark:text-gray-500">
          <button className="p-1 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#27272a] rounded">
            <LayoutGrid size={18} />
          </button>
          <button className="p-1 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#27272a] rounded">
            <ListIcon size={18} />
          </button>
        </div>
      </div>

      {/* Grid */}
      {filteredListings.length > 0 ?
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredListings.map((listing) =>
        <ListingCard
          key={listing.id}
          listing={listing}
          onAction={handleAction} />

        )}
        </div> :

      <div className="text-center py-20 bg-white dark:bg-[#141416] rounded-xl border border-dashed border-gray-300 dark:border-[#3f3f46]">
          <div className="w-12 h-12 bg-gray-50 dark:bg-[#27272a] rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 dark:text-gray-500">
            <LayoutGrid size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            No {filter !== 'all' ? filter : ''} listings found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 mb-6">
            Create a new project to start finding collaborators.
          </p>
          <button
          onClick={() => setShowCreateProject(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-md transition-colors shadow-sm">

            <Plus size={16} />
            Create Project
          </button>
        </div>
      }

      <ProjectCreationModal
        isOpen={showCreateProject}
        onClose={() => setShowCreateProject(false)} />

    </div>);

}
