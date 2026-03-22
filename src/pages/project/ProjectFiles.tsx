import React from 'react';
import { Upload, Folder, FileText, Image, MoreHorizontal } from 'lucide-react';
import { EmptyState } from '../../components/project-workspace/EmptyState';

const MOCK_FILES = [
  { id: '1', name: 'Q4_Roadmap.pdf', type: 'pdf', size: '2.4 MB', uploadedBy: 'John Doe', date: '2 days ago' },
  { id: '2', name: 'Dashboard_Mockups.fig', type: 'figma', size: '15 MB', uploadedBy: 'Sarah Chen', date: '5 days ago' },
  { id: '3', name: 'API_Spec_v1.md', type: 'markdown', size: '45 KB', uploadedBy: 'Mike Wilson', date: '1 week ago' },
  { id: '4', name: 'Logo_Assets.zip', type: 'zip', size: '8.2 MB', uploadedBy: 'Alex Kim', date: '2 weeks ago' }
];

export function ProjectFiles() {
  const getIcon = (type: string) => {
    if (type.includes('image') || type === 'figma') return <Image size={20} className="text-[var(--accent)]" />;
    if (type === 'pdf') return <FileText size={20} className="text-[var(--danger)]" />;
    if (type === 'zip') return <Folder size={20} className="text-[var(--success)]" />;
    return <FileText size={20} className="text-[var(--accent)]" />;
  };

  return (
    <div className="space-y-6">
      <section className="premium-panel premium-grid rounded-[34px] px-6 py-7 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="premium-kicker mb-2">Assets</p>
            <h2 className="font-display text-4xl text-[var(--text)]">Files</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">
              Keep project docs, designs, specs, and shared resources organized in one place.
            </p>
          </div>
          <button className="premium-button flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold">
            <Upload size={16} />
            Upload File
          </button>
        </div>
      </section>

      {MOCK_FILES.length > 0 ? (
        <div className="premium-panel overflow-hidden rounded-[30px]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[rgba(255,255,255,0.02)]">
              <tr>
                <th className="w-[40%] px-6 py-3 font-medium text-[var(--text-muted)]">Name</th>
                <th className="px-6 py-3 font-medium text-[var(--text-muted)]">Size</th>
                <th className="px-6 py-3 font-medium text-[var(--text-muted)]">Uploaded By</th>
                <th className="px-6 py-3 font-medium text-[var(--text-muted)]">Date</th>
                <th className="w-[5%] px-6 py-3 font-medium text-[var(--text-muted)]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {MOCK_FILES.map((file) => (
                <tr key={file.id} className="group hover:bg-[color:var(--bg-muted)]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--bg-muted)]">
                        {getIcon(file.type)}
                      </div>
                      <span className="font-medium text-[var(--text)]">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-[var(--text-muted)]">{file.size}</td>
                  <td className="px-6 py-4 text-[var(--text)]">{file.uploadedBy}</td>
                  <td className="px-6 py-4 text-[var(--text-muted)]">{file.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[var(--text-muted)] opacity-0 transition-opacity group-hover:opacity-100 hover:text-[var(--text)]">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon={Folder}
          title="No files uploaded"
          description="Share documents, designs, and assets with your team."
          actionLabel="Upload First File"
          onAction={() => {}}
        />
      )}
    </div>
  );
}
