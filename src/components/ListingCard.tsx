import React, { useState } from 'react';
import {
  MoreHorizontal,
  Eye,
  Users,
  Target,
  Calendar,
  Edit,
  PauseCircle,
  PlayCircle,
  Archive,
  Trash2 } from
'lucide-react';
export type ListingStatus = 'active' | 'paused' | 'draft' | 'archived';
export interface ListingData {
  id: string;
  name: string;
  status: ListingStatus;
  stage: string;
  roles: string[];
  views: number;
  interests: number;
  matches: number;
  created: string;
  updated: string;
}
interface ListingCardProps {
  listing: ListingData;
  onAction: (id: string, action: string) => void;
}
export function ListingCard({ listing, onAction }: ListingCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const getStatusColor = (status: ListingStatus) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
      case 'paused':
        return 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
      case 'draft':
        return 'bg-gray-100 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-500/20';
      case 'archived':
        return 'bg-gray-50 dark:bg-gray-500/10 text-gray-500 dark:text-gray-500 border-gray-200 dark:border-gray-500/20';
    }
  };
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Idea':
        return 'bg-[rgba(180,83,9,0.08)] text-[var(--danger)] border-[rgba(180,83,9,0.18)]';
      case 'Prototype':
        return 'bg-[color:var(--accent-soft)] text-[var(--accent)] border-[color:var(--border)]';
      case 'Active Build':
        return 'bg-[rgba(91,191,167,0.12)] text-[var(--success)] border-[rgba(91,191,167,0.18)]';
      default:
        return 'bg-gray-50 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-500/20';
    }
  };
  return (
    <div className="premium-panel group relative rounded-[30px] p-6 transition-all duration-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-semibold text-[var(--text)]">
              {listing.name}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${getStatusColor(listing.status)}`}>

              {listing.status}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStageColor(listing.stage)}`}>

              {listing.stage}
            </span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl p-2 text-[var(--text-muted)] transition-colors hover:bg-[color:var(--bg-muted)] hover:text-[var(--text)]">

            <MoreHorizontal size={20} />
          </button>

          {menuOpen &&
          <>
              <div
              className="fixed inset-0 z-10"
              onClick={() => setMenuOpen(false)} />

              <div className="premium-panel absolute right-0 top-10 z-20 w-48 rounded-[22px] py-2 animate-in fade-in zoom-in-95 duration-100">
                <button
                onClick={() => {
                  onAction(listing.id, 'edit');
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-[var(--text)] hover:bg-[color:var(--bg-muted)]">

                  <Edit size={14} /> Edit Project
                </button>
                {listing.status === 'active' ?
              <button
                onClick={() => {
                  onAction(listing.id, 'pause');
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-[var(--text)] hover:bg-[color:var(--bg-muted)]">

                    <PauseCircle size={14} /> Pause Listing
                  </button> :

              <button
                onClick={() => {
                  onAction(listing.id, 'resume');
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-[var(--text)] hover:bg-[color:var(--bg-muted)]">

                    <PlayCircle size={14} /> Resume Listing
                  </button>
              }
                <button
                onClick={() => {
                  onAction(listing.id, 'matches');
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-[var(--text)] hover:bg-[color:var(--bg-muted)]">

                  <Target size={14} /> View Matches
                </button>
                <div className="my-1 h-px bg-[var(--border)]" />
                <button
                onClick={() => {
                  onAction(listing.id, 'archive');
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-[var(--text)] hover:bg-[color:var(--bg-muted)]">

                  <Archive size={14} /> Archive
                </button>
                <button
                onClick={() => {
                  onAction(listing.id, 'delete');
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-[var(--danger)] hover:bg-[rgba(180,83,9,0.08)]">

                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </>
          }
        </div>
      </div>

      {/* Roles */}
      <div className="mb-6">
        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          Missing Roles
        </div>
        <div className="flex flex-wrap gap-1.5">
          {listing.roles.slice(0, 3).map((role) =>
          <span
            key={role}
            className="rounded-full border border-[var(--border)] bg-[color:var(--bg-muted)] px-3 py-1 text-xs font-medium text-[var(--text)]">

              {role}
            </span>
          )}
          {listing.roles.length > 3 &&
          <span className="rounded-full border border-[var(--border)] bg-[color:var(--bg-panel)] px-3 py-1 text-xs font-medium text-[var(--text-muted)]">
              +{listing.roles.length - 3} more
            </span>
          }
        </div>
      </div>

      {/* Metrics */}
      <div className="mb-4 grid grid-cols-3 gap-2 border-b border-t border-[var(--border)] py-4">
        <div className="text-center">
          <div className="mb-1 flex items-center justify-center gap-1 text-[var(--text-muted)]">
            <Eye size={14} />
          </div>
          <div className="text-lg font-bold leading-none text-[var(--text)]">
            {listing.views}
          </div>
          <div className="mt-1 text-[10px] text-[var(--text-muted)]">
            Views
          </div>
        </div>
        <div className="border-l border-[var(--border)] text-center">
          <div className="mb-1 flex items-center justify-center gap-1 text-[var(--text-muted)]">
            <Users size={14} />
          </div>
          <div className="text-lg font-bold leading-none text-[var(--text)]">
            {listing.interests}
          </div>
          <div className="mt-1 text-[10px] text-[var(--text-muted)]">
            Interests
          </div>
        </div>
        <div className="border-l border-[var(--border)] text-center">
          <div className="mb-1 flex items-center justify-center gap-1 text-[var(--accent)]">
            <Target size={14} />
          </div>
          <div className="text-lg font-bold leading-none text-[var(--accent)]">
            {listing.matches}
          </div>
          <div className="mt-1 text-[10px] text-[var(--text-muted)]">
            Matches
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-1">
          <Calendar size={12} />
          Created {listing.created}
        </div>
        <div>Updated {listing.updated}</div>
      </div>
    </div>);

}
