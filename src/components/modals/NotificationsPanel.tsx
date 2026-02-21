import React, { useState } from 'react';
import { X, Bell, Check, Trash2 } from 'lucide-react';
interface Notification {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  read: boolean;
  userColor: string;
  userInitials: string;
}
interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}
const MOCK_NOTIFICATIONS: Notification[] = [
{
  id: 1,
  user: 'Sarah Chen',
  action: 'commented on',
  target: 'API documentation',
  time: '5m ago',
  read: false,
  userColor: '#10b981',
  userInitials: 'SC'
},
{
  id: 2,
  user: 'Mike Wilson',
  action: 'completed task',
  target: 'Design wireframes',
  time: '2h ago',
  read: false,
  userColor: '#3b82f6',
  userInitials: 'MW'
},
{
  id: 3,
  user: 'Alex Kim',
  action: 'joined the project',
  target: '',
  time: '1d ago',
  read: true,
  userColor: '#f59e0b',
  userInitials: 'AK'
},
{
  id: 4,
  user: 'John Doe',
  action: 'assigned you to',
  target: 'User testing round 1',
  time: '2d ago',
  read: true,
  userColor: '#8b5cf6',
  userInitials: 'JD'
}];

export function NotificationsPanel({
  isOpen,
  onClose
}: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  if (!isOpen) return null;
  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
    prev.map((n) =>
    n.id === id ?
    {
      ...n,
      read: true
    } :
    n
    )
    );
  };
  const markAllAsRead = () => {
    setNotifications((prev) =>
    prev.map((n) => ({
      ...n,
      read: true
    }))
    );
  };
  const clearAll = () => {
    setNotifications([]);
  };
  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900/20 dark:bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose} />


      <div className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-[#141416] shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#27272a]">
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-gray-600 dark:text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notifications
            </h2>
            {unreadCount > 0 &&
            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded-full">
                {unreadCount}
              </span>
            }
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-[#27272a]">

            <X size={20} />
          </button>
        </div>

        {/* Actions */}
        {notifications.length > 0 &&
        <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-100 dark:border-[#27272a]">
            {unreadCount > 0 &&
          <button
            onClick={markAllAsRead}
            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">

                Mark all as read
              </button>
          }
            <button
            onClick={clearAll}
            className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 ml-auto">

              Clear all
            </button>
          </div>
        }

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ?
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="w-16 h-16 bg-gray-100 dark:bg-[#27272a] rounded-full flex items-center justify-center mb-4">
                <Bell size={24} className="text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                No notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You're all caught up!
              </p>
            </div> :

          <div className="divide-y divide-gray-100 dark:divide-[#27272a]">
              {notifications.map((notification) =>
            <div
              key={notification.id}
              className={`px-6 py-4 hover:bg-gray-50 dark:hover:bg-[#1f1f23] transition-colors ${!notification.read ? 'bg-blue-50/30 dark:bg-blue-500/5' : ''}`}>

                  <div className="flex gap-3">
                    <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white flex-shrink-0"
                  style={{
                    backgroundColor: notification.userColor
                  }}>

                      {notification.userInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-gray-200">
                        <span className="font-medium">{notification.user}</span>{' '}
                        <span className="text-gray-600 dark:text-gray-400">
                          {notification.action}
                        </span>{' '}
                        {notification.target &&
                    <span className="font-medium">
                            {notification.target}
                          </span>
                    }
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                    {!notification.read &&
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-1"
                  title="Mark as read">

                        <Check size={16} />
                      </button>
                }
                  </div>
                </div>
            )}
            </div>
          }
        </div>
      </div>
    </>);

}