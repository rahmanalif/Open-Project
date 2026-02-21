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
        return 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-500/20';
      case 'Prototype':
        return 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20';
      case 'Active Build':
        return 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-500/20';
      default:
        return 'bg-gray-50 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-500/20';
    }
  };
  return (
    <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-[#27272a] rounded-xl p-6 hover:shadow-md transition-all duration-200 relative group">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
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
            className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-md transition-colors">

            <MoreHorizontal size={20} />
          </button>

          {menuOpen &&
          <>
              <div
              className="fixed inset-0 z-10"
              onClick={() => setMenuOpen(false)} />

              <div className="absolute right-0 top-8 w-48 bg-white dark:bg-[#1f1f23] border border-gray-200 dark:border-[#3f3f46] rounded-lg shadow-lg z-20 py-1 animate-in fade-in zoom-in-95 duration-100">
                <button
                onClick={() => {
                  onAction(listing.id, 'edit');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a] flex items-center gap-2">

                  <Edit size={14} /> Edit Project
                </button>
                {listing.status === 'active' ?
              <button
                onClick={() => {
                  onAction(listing.id, 'pause');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a] flex items-center gap-2">

                    <PauseCircle size={14} /> Pause Listing
                  </button> :

              <button
                onClick={() => {
                  onAction(listing.id, 'resume');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a] flex items-center gap-2">

                    <PlayCircle size={14} /> Resume Listing
                  </button>
              }
                <button
                onClick={() => {
                  onAction(listing.id, 'matches');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a] flex items-center gap-2">

                  <Target size={14} /> View Matches
                </button>
                <div className="h-px bg-gray-100 dark:bg-[#27272a] my-1" />
                <button
                onClick={() => {
                  onAction(listing.id, 'archive');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a] flex items-center gap-2">

                  <Archive size={14} /> Archive
                </button>
                <button
                onClick={() => {
                  onAction(listing.id, 'delete');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2">

                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </>
          }
        </div>
      </div>

      {/* Roles */}
      <div className="mb-6">
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
          Missing Roles
        </div>
        <div className="flex flex-wrap gap-1.5">
          {listing.roles.slice(0, 3).map((role) =>
          <span
            key={role}
            className="px-2 py-1 bg-gray-100 dark:bg-[#27272a] text-gray-600 dark:text-gray-300 text-xs rounded border border-gray-200 dark:border-[#3f3f46] font-medium">

              {role}
            </span>
          )}
          {listing.roles.length > 3 &&
          <span className="px-2 py-1 bg-gray-50 dark:bg-[#1f1f23] text-gray-400 dark:text-gray-500 text-xs rounded border border-gray-200 dark:border-[#3f3f46] font-medium">
              +{listing.roles.length - 3} more
            </span>
          }
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-gray-100 dark:border-[#27272a] mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-400 dark:text-gray-500 mb-1">
            <Eye size={14} />
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white leading-none">
            {listing.views}
          </div>
          <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
            Views
          </div>
        </div>
        <div className="text-center border-l border-gray-100 dark:border-[#27272a]">
          <div className="flex items-center justify-center gap-1 text-gray-400 dark:text-gray-500 mb-1">
            <Users size={14} />
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white leading-none">
            {listing.interests}
          </div>
          <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
            Interests
          </div>
        </div>
        <div className="text-center border-l border-gray-100 dark:border-[#27272a]">
          <div className="flex items-center justify-center gap-1 text-blue-500 dark:text-blue-400 mb-1">
            <Target size={14} />
          </div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400 leading-none">
            {listing.matches}
          </div>
          <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
            Matches
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar size={12} />
          Created {listing.created}
        </div>
        <div>Updated {listing.updated}</div>
      </div>
    </div>);

}