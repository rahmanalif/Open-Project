import React from 'react';
import {
  Upload,
  Folder,
  FileText,
  Image,
  Link as LinkIcon,
  MoreHorizontal } from
'lucide-react';
import { EmptyState } from '../../components/project-workspace/EmptyState';
const MOCK_FILES = [
{
  id: '1',
  name: 'Q4_Roadmap.pdf',
  type: 'pdf',
  size: '2.4 MB',
  uploadedBy: 'John Doe',
  date: '2 days ago'
},
{
  id: '2',
  name: 'Dashboard_Mockups.fig',
  type: 'figma',
  size: '15 MB',
  uploadedBy: 'Sarah Chen',
  date: '5 days ago'
},
{
  id: '3',
  name: 'API_Spec_v1.md',
  type: 'markdown',
  size: '45 KB',
  uploadedBy: 'Mike Wilson',
  date: '1 week ago'
},
{
  id: '4',
  name: 'Logo_Assets.zip',
  type: 'zip',
  size: '8.2 MB',
  uploadedBy: 'Alex Kim',
  date: '2 weeks ago'
}];

export function ProjectFiles() {
  const getIcon = (type: string) => {
    if (type.includes('image') || type === 'figma')
    return <Image size={20} className="text-purple-500" />;
    if (type === 'pdf') return <FileText size={20} className="text-red-500" />;
    if (type === 'zip') return <Folder size={20} className="text-amber-500" />;
    return <FileText size={20} className="text-blue-500" />;
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Files & Assets
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Shared documents and resources.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 shadow-sm">
          <Upload size={16} />
          Upload File
        </button>
      </div>

      {MOCK_FILES.length > 0 ?
      <div className="bg-white dark:bg-[#1f1f23] border border-gray-200 dark:border-[#27272a] rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-[#141416] border-b border-gray-200 dark:border-[#27272a]">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 w-[40%]">
                  Name
                </th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">
                  Size
                </th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">
                  Uploaded By
                </th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">
                  Date
                </th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 w-[5%]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#27272a]">
              {MOCK_FILES.map((file) =>
            <tr
              key={file.id}
              className="hover:bg-gray-50 dark:hover:bg-[#27272a] group">

                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gray-100 dark:bg-[#27272a] flex items-center justify-center">
                        {getIcon(file.type)}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {file.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-500 dark:text-gray-400 font-mono text-xs">
                    {file.size}
                  </td>
                  <td className="px-6 py-3 text-gray-600 dark:text-gray-300">
                    {file.uploadedBy}
                  </td>
                  <td className="px-6 py-3 text-gray-500 dark:text-gray-400">
                    {file.date}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div> :

      <EmptyState
        icon={Folder}
        title="No files uploaded"
        description="Share documents, designs, and assets with your team."
        actionLabel="Upload First File"
        onAction={() => {}} />

      }
    </div>);

}