import React, { useState } from 'react';
import { Plus, Search, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import { TaskCard, Task } from '../../components/project-workspace/TaskCard';
import { EmptyState } from '../../components/project-workspace/EmptyState';
import { CreateTaskModal } from '../../components/modals/CreateTaskModal';

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design dashboard wireframes',
    priority: 'high',
    status: 'in-progress',
    assignee: { name: 'Sarah Chen', initials: 'SC', color: '#10b981' },
    dueDate: 'Tomorrow',
    comments: 3,
    subtasks: { completed: 2, total: 5 }
  },
  {
    id: '2',
    title: 'Set up authentication',
    priority: 'high',
    status: 'done',
    assignee: { name: 'Mike Wilson', initials: 'MW', color: '#3b82f6' },
    dueDate: 'Yesterday',
    comments: 1,
    subtasks: { completed: 3, total: 3 }
  },
  {
    id: '3',
    title: 'Create API documentation',
    priority: 'medium',
    status: 'todo',
    comments: 0,
    subtasks: { completed: 0, total: 0 }
  },
  {
    id: '4',
    title: 'User testing round 1',
    priority: 'high',
    status: 'review',
    assignee: { name: 'John Doe', initials: 'JD', color: '#8b5cf6' },
    dueDate: 'Oct 25',
    comments: 5,
    subtasks: { completed: 4, total: 6 }
  },
  {
    id: '5',
    title: 'Fix navigation bug on mobile',
    priority: 'low',
    status: 'todo',
    comments: 0,
    subtasks: { completed: 0, total: 0 }
  }
];

export function ProjectTasks() {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const handleCreateTask = (taskData: any) => {
    const newTask: Task = {
      id: String(tasks.length + 1),
      title: taskData.title,
      priority: taskData.priority,
      status: taskData.status,
      assignee: taskData.assignee ? MOCK_TASKS.find((t) => t.assignee?.initials)?.assignee : undefined,
      dueDate: taskData.dueDate,
      comments: 0,
      subtasks: { completed: 0, total: 0 }
    };
    setTasks([...tasks, newTask]);
  };

  const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const columns = [
    { id: 'todo', label: 'To Do', color: 'bg-[color:var(--border-strong)]' },
    { id: 'in-progress', label: 'In Progress', color: 'bg-[var(--accent)]' },
    { id: 'review', label: 'Review', color: 'bg-[var(--danger)]' },
    { id: 'done', label: 'Done', color: 'bg-[var(--success)]' }
  ];

  return (
    <div className="flex h-full flex-col space-y-6">
      <section className="premium-panel premium-grid rounded-[34px] px-6 py-7 sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="premium-kicker mb-2">Execution</p>
            <h2 className="font-display text-4xl text-[var(--text)]">Tasks</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">
              Keep priorities visible, reduce ambiguity, and make ownership obvious across the team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="group relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="premium-input w-64 rounded-2xl py-3 pl-10 pr-4 text-sm"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="premium-button-secondary flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium"
              >
                <SlidersHorizontal size={16} />
                Filter
              </button>
              {showFilter && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowFilter(false)} />
                  <div className="premium-panel absolute left-0 top-14 z-20 w-64 rounded-[24px] p-4">
                    <p className="text-sm font-semibold text-[var(--text)]">Filters coming next</p>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                      Priority and status filters can sit here without breaking the new workspace look.
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="premium-button-secondary flex rounded-2xl p-1">
              <button
                onClick={() => setViewMode('kanban')}
                className={`rounded-xl p-2 ${viewMode === 'kanban' ? 'bg-[color:var(--accent-soft)] text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`rounded-xl p-2 ${viewMode === 'list' ? 'bg-[color:var(--accent-soft)] text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}
              >
                <List size={16} />
              </button>
            </div>

            <button onClick={() => setShowCreateTask(true)} className="premium-button flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold">
              <Plus size={16} />
              New Task
            </button>
          </div>
        </div>
      </section>

      {filteredTasks.length === 0 ? (
        <EmptyState
          icon={LayoutGrid}
          title={searchQuery ? 'No tasks found' : 'No tasks yet'}
          description={
            searchQuery
              ? 'Try adjusting your search.'
              : 'Tasks help the team turn intent into momentum. Create the first task to get started.'
          }
          actionLabel="Create First Task"
          onAction={() => setShowCreateTask(true)}
        />
      ) : viewMode === 'kanban' ? (
        <div className="flex-1 overflow-x-auto">
          <div className="flex min-w-max gap-6 pb-4">
            {columns.map((col) => {
              const colTasks = filteredTasks.filter((t) => t.status === col.id);
              return (
                <div key={col.id} className="w-80 flex-shrink-0">
                  <div className="mb-3 flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
                      <span className="text-sm font-semibold text-[var(--text)]">{col.label}</span>
                      <span className="rounded-full bg-[color:var(--bg-muted)] px-2 py-0.5 text-xs font-medium text-[var(--text-muted)]">
                        {colTasks.length}
                      </span>
                    </div>
                    <button onClick={() => setShowCreateTask(true)} className="text-[var(--text-muted)] hover:text-[var(--text)]">
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="space-y-3 rounded-[28px] border border-[var(--border)] bg-[rgba(255,255,255,0.04)] p-3">
                    {colTasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                    <button
                      onClick={() => setShowCreateTask(true)}
                      className="w-full rounded-[20px] border border-dashed border-[var(--border-strong)] px-4 py-3 text-sm text-[var(--text-muted)] transition-colors hover:bg-[color:var(--bg-muted)] hover:text-[var(--text)]"
                    >
                      + Add Task
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="premium-panel overflow-hidden rounded-[30px]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[rgba(255,255,255,0.02)]">
              <tr>
                <th className="px-4 py-3 font-medium text-[var(--text-muted)]">Task</th>
                <th className="px-4 py-3 font-medium text-[var(--text-muted)]">Status</th>
                <th className="px-4 py-3 font-medium text-[var(--text-muted)]">Priority</th>
                <th className="px-4 py-3 font-medium text-[var(--text-muted)]">Assignee</th>
                <th className="px-4 py-3 font-medium text-[var(--text-muted)]">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-[color:var(--bg-muted)]">
                  <td className="px-4 py-3 font-medium text-[var(--text)]">{task.title}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-[var(--border)] bg-[color:var(--bg-muted)] px-3 py-1 text-xs font-medium capitalize text-[var(--text-muted)]">
                      {task.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-[var(--border)] bg-[color:var(--bg-muted)] px-3 py-1 text-xs font-medium capitalize text-[var(--text-muted)]">
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {task.assignee ? (
                      <div className="flex items-center gap-2">
                        <div
                          className="flex h-6 w-6 items-center justify-center rounded-full text-[9px] text-white"
                          style={{ backgroundColor: task.assignee.color }}
                        >
                          {task.assignee.initials}
                        </div>
                        <span className="text-[var(--text)]">{task.assignee.name}</span>
                      </div>
                    ) : (
                      <span className="text-[var(--text-muted)]">Unassigned</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{task.dueDate || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CreateTaskModal isOpen={showCreateTask} onClose={() => setShowCreateTask(false)} onCreateTask={handleCreateTask} />
    </div>
  );
}
