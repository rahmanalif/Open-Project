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
  assignee: {
    name: 'Sarah Chen',
    initials: 'SC',
    color: '#10b981'
  },
  dueDate: 'Tomorrow',
  comments: 3,
  subtasks: {
    completed: 2,
    total: 5
  }
},
{
  id: '2',
  title: 'Set up authentication',
  priority: 'high',
  status: 'done',
  assignee: {
    name: 'Mike Wilson',
    initials: 'MW',
    color: '#3b82f6'
  },
  dueDate: 'Yesterday',
  comments: 1,
  subtasks: {
    completed: 3,
    total: 3
  }
},
{
  id: '3',
  title: 'Create API documentation',
  priority: 'medium',
  status: 'todo',
  comments: 0,
  subtasks: {
    completed: 0,
    total: 0
  }
},
{
  id: '4',
  title: 'User testing round 1',
  priority: 'high',
  status: 'review',
  assignee: {
    name: 'John Doe',
    initials: 'JD',
    color: '#8b5cf6'
  },
  dueDate: 'Oct 25',
  comments: 5,
  subtasks: {
    completed: 4,
    total: 6
  }
},
{
  id: '5',
  title: 'Fix navigation bug on mobile',
  priority: 'low',
  status: 'todo',
  comments: 0,
  subtasks: {
    completed: 0,
    total: 0
  }
}];

export function ProjectTasks() {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    priority: [] as string[],
    status: [] as string[]
  });
  const handleCreateTask = (taskData: any) => {
    const newTask: Task = {
      id: String(tasks.length + 1),
      title: taskData.title,
      priority: taskData.priority,
      status: taskData.status,
      assignee: taskData.assignee ?
      MOCK_TASKS.find((t) => t.assignee?.initials)?.assignee :
      undefined,
      dueDate: taskData.dueDate,
      comments: 0,
      subtasks: {
        completed: 0,
        total: 0
      }
    };
    setTasks([...tasks, newTask]);
  };
  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.
    toLowerCase().
    includes(searchQuery.toLowerCase());
    const matchesPriority =
    filters.priority.length === 0 || filters.priority.includes(task.priority);
    const matchesStatus =
    filters.status.length === 0 || filters.status.includes(task.status);
    return matchesSearch && matchesPriority && matchesStatus;
  });
  const columns = [
  {
    id: 'todo',
    label: 'To Do',
    color: 'bg-gray-200 dark:bg-gray-700'
  },
  {
    id: 'in-progress',
    label: 'In Progress',
    color: 'bg-blue-200 dark:bg-blue-700'
  },
  {
    id: 'review',
    label: 'Review',
    color: 'bg-amber-200 dark:bg-amber-700'
  },
  {
    id: 'done',
    label: 'Done',
    color: 'bg-emerald-200 dark:bg-emerald-700'
  }];

  return (
    <div className="h-full flex flex-col">
      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={16} />

            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white dark:bg-[#1f1f23] border border-gray-200 dark:border-[#27272a] rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64" />

          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1f1f23] border border-gray-200 dark:border-[#27272a] rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a]">

              <SlidersHorizontal size={16} />
              Filter
            </button>
            {showFilter &&
            <>
                <div
                className="fixed inset-0 z-10"
                onClick={() => setShowFilter(false)} />

                <div className="absolute left-0 top-12 w-64 bg-white dark:bg-[#1f1f23] border border-gray-200 dark:border-[#27272a] rounded-lg shadow-lg z-20 p-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Priority
                    </h4>
                    {['high', 'medium', 'low'].map((p) =>
                  <label key={p} className="flex items-center gap-2 mb-1">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                          {p}
                        </span>
                      </label>
                  )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Status
                    </h4>
                    {['todo', 'in-progress', 'review', 'done'].map((s) =>
                  <label key={s} className="flex items-center gap-2 mb-1">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                          {s.replace('-', ' ')}
                        </span>
                      </label>
                  )}
                  </div>
                </div>
              </>
            }
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 dark:bg-[#1f1f23] p-1 rounded-md border border-gray-200 dark:border-[#27272a]">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded ${viewMode === 'kanban' ? 'bg-white dark:bg-[#27272a] shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>

              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white dark:bg-[#27272a] shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>

              <List size={16} />
            </button>
          </div>
          <button
            onClick={() => setShowCreateTask(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 shadow-sm">

            <Plus size={16} />
            New Task
          </button>
        </div>
      </div>

      {filteredTasks.length === 0 ?
      <EmptyState
        icon={LayoutGrid}
        title={searchQuery ? 'No tasks found' : 'No tasks yet'}
        description={
        searchQuery ?
        'Try adjusting your search or filters.' :
        'Tasks help you track work and collaborate with your team. Create your first task to get started.'
        }
        actionLabel="Create First Task"
        onAction={() => setShowCreateTask(true)} /> :

      viewMode === 'kanban' ?
      <div className="flex-1 overflow-x-auto">
          <div className="flex gap-6 min-w-max pb-4">
            {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.id);
            return (
              <div key={col.id} className="w-80 flex-shrink-0">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${col.color}`} />
                      <span className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
                        {col.label}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 font-medium bg-gray-100 dark:bg-[#1f1f23] px-1.5 py-0.5 rounded">
                        {colTasks.length}
                      </span>
                    </div>
                    <button
                    onClick={() => setShowCreateTask(true)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">

                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {colTasks.map((task) =>
                  <TaskCard key={task.id} task={task} />
                  )}
                    <button
                    onClick={() => setShowCreateTask(true)}
                    className="w-full py-2 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f23] rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-[#27272a] border-dashed transition-all">

                      + Add Task
                    </button>
                  </div>
                </div>);

          })}
          </div>
        </div> :

      <div className="bg-white dark:bg-[#1f1f23] border border-gray-200 dark:border-[#27272a] rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-[#141416] border-b border-gray-200 dark:border-[#27272a]">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                  Task
                </th>
                <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                  Priority
                </th>
                <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                  Assignee
                </th>
                <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#27272a]">
              {filteredTasks.map((task) =>
            <tr
              key={task.id}
              className="hover:bg-gray-50 dark:hover:bg-[#27272a]">

                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {task.title}
                  </td>
                  <td className="px-4 py-3">
                    <span className="capitalize px-2 py-0.5 rounded bg-gray-100 dark:bg-[#27272a] text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#3f3f46]">
                      {task.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="capitalize px-2 py-0.5 rounded bg-gray-100 dark:bg-[#27272a] text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#3f3f46]">
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {task.assignee ?
                <div className="flex items-center gap-2">
                        <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] text-white"
                    style={{
                      backgroundColor: task.assignee.color
                    }}>

                          {task.assignee.initials}
                        </div>
                        <span className="text-gray-600 dark:text-gray-300">
                          {task.assignee.name}
                        </span>
                      </div> :

                <span className="text-gray-400">Unassigned</span>
                }
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {task.dueDate || '-'}
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      }

      <CreateTaskModal
        isOpen={showCreateTask}
        onClose={() => setShowCreateTask(false)}
        onCreateTask={handleCreateTask} />

    </div>);

}