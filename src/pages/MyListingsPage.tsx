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
    <div className="mx-auto max-w-5xl pb-12">
      <div className="premium-panel premium-grid mb-8 rounded-[34px] px-6 py-8 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="premium-kicker mb-2">Project Pipeline</p>
          <h1 className="font-display text-4xl text-[var(--text)]">
            My Listings
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">
            Manage active opportunities, watch interest build, and keep your project openings credible and current.
          </p>
        </div>
        <button
          onClick={() => setShowCreateProject(true)}
          className="premium-button inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-all sm:w-auto">

          <Plus size={16} />
          New Project
        </button>
      </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex flex-col gap-3 border-b border-[var(--border)] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4 overflow-x-auto pb-2 sm:gap-6">
          {(['all', 'active', 'paused', 'draft', 'archived'] as const).map(
            (tab) =>
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`border-b-2 pb-3 text-sm font-medium capitalize transition-colors ${filter === tab ? 'border-[var(--accent)] text-[var(--text)]' : 'border-transparent text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'}`}>

                {tab}
              </button>

          )}
        </div>
        <div className="flex items-center gap-2 pb-2 text-[var(--text-muted)]">
          <button className="premium-button-secondary rounded-xl p-2">
            <LayoutGrid size={18} />
          </button>
          <button className="premium-button-secondary rounded-xl p-2">
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

      <div className="premium-panel rounded-[30px] border-dashed py-20 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-[var(--accent)]">
            <LayoutGrid size={24} />
          </div>
          <h3 className="text-lg font-medium text-[var(--text)]">
            No {filter !== 'all' ? filter : ''} listings found
          </h3>
          <p className="mb-6 mt-1 text-[var(--text-muted)]">
            Create a new project to start finding collaborators.
          </p>
          <button
          onClick={() => setShowCreateProject(true)}
          className="premium-button inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all">

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
