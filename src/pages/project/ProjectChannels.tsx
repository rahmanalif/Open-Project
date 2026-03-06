import React, { useMemo, useState } from 'react';
import {
  AtSign,
  Ellipsis,
  Headphones,
  Phone,
  Plus,
  ScreenShare,
  Search,
  Send,
  Smile,
  Users,
  Video,
  Mic,
  Reply,
  UserPlus,
  X
} from 'lucide-react';

type Presence = 'online' | 'away' | 'offline';
type ConversationType = 'group' | 'dm';
type CallMode = 'none' | 'voice' | 'video';

type Member = {
  id: string;
  name: string;
  initials: string;
  color: string;
  presence: Presence;
};

type Conversation = {
  id: string;
  type: ConversationType;
  name: string;
  memberIds: string[];
  unread: number;
  preview: string;
};

type Reaction = {
  emoji: string;
  count: number;
  users: string[];
};

type Message = {
  id: string;
  senderId: string;
  time: string;
  text: string;
  reactions?: Reaction[];
};

type MessageSection = {
  label: string;
  messages: Message[];
};

const CURRENT_USER_ID = 'john';

const MEMBERS: Member[] = [
  { id: 'john', name: 'John Doe', initials: 'JD', color: 'bg-indigo-500', presence: 'online' },
  { id: 'sarah', name: 'Sarah Chen', initials: 'SC', color: 'bg-emerald-500', presence: 'online' },
  { id: 'mike', name: 'Mike Wilson', initials: 'MW', color: 'bg-blue-500', presence: 'away' },
  { id: 'alex', name: 'Alex Kim', initials: 'AK', color: 'bg-slate-500', presence: 'offline' }
];

const CONVERSATIONS: Conversation[] = [
  {
    id: 'everyone',
    type: 'group',
    name: 'Everyone',
    memberIds: ['john', 'sarah', 'mike', 'alex'],
    unread: 3,
    preview: 'Mike Wilson: Awesome, I will take a look at them now. @John can you verify the API endpoints...'
  },
  {
    id: 'dm-sarah',
    type: 'dm',
    name: 'Sarah Chen',
    memberIds: ['john', 'sarah'],
    unread: 0,
    preview: 'Can we lock the design review agenda before noon?'
  },
  {
    id: 'dm-mike',
    type: 'dm',
    name: 'Mike Wilson',
    memberIds: ['john', 'mike'],
    unread: 2,
    preview: 'Need a quick check on endpoint timeout values.'
  },
  {
    id: 'dm-alex',
    type: 'dm',
    name: 'Alex Kim',
    memberIds: ['john', 'alex'],
    unread: 1,
    preview: 'I left comments on the deployment checklist.'
  }
];

const MESSAGES: Record<string, MessageSection[]> = {
  everyone: [
    {
      label: 'Yesterday',
      messages: [
        {
          id: 'e-1',
          senderId: 'john',
          time: '6:42 PM',
          text: 'Sprint planning notes are up in the docs tab. Please review before standup.'
        }
      ]
    },
    {
      label: 'Today',
      messages: [
        {
          id: 'e-2',
          senderId: 'sarah',
          time: '9:14 AM',
          text: 'Hey team! Just pushed the new UI components to the main branch',
          reactions: [{ emoji: '🚀', count: 2, users: ['John Doe', 'Mike Wilson'] }]
        },
        {
          id: 'e-3',
          senderId: 'mike',
          time: '9:20 AM',
          text: 'Awesome, I will take a look at them now. @John can you verify the API endpoints are ready for these?'
        },
        {
          id: 'e-4',
          senderId: 'john',
          time: '9:23 AM',
          text: 'On it, should be ready in an hour.'
        }
      ]
    }
  ],
  'dm-sarah': [
    {
      label: 'March 5',
      messages: [
        {
          id: 's-1',
          senderId: 'sarah',
          time: '5:18 PM',
          text: 'I drafted two variants for the onboarding card spacing.'
        },
        {
          id: 's-2',
          senderId: 'john',
          time: '5:30 PM',
          text: 'Great, share both in Files and I will compare after QA sync.'
        }
      ]
    },
    {
      label: 'Today',
      messages: [
        {
          id: 's-3',
          senderId: 'sarah',
          time: '8:54 AM',
          text: 'Can we lock the design review agenda before noon?'
        },
        {
          id: 's-4',
          senderId: 'sarah',
          time: '8:55 AM',
          text: 'Also, I want to keep this DM thread for design-only decisions.'
        },
        {
          id: 's-5',
          senderId: 'john',
          time: '9:00 AM',
          text: 'Yes. This DM stays private between us and separate from Everyone.'
        }
      ]
    }
  ],
  'dm-mike': [
    {
      label: 'Today',
      messages: [
        {
          id: 'm-1',
          senderId: 'mike',
          time: '10:08 AM',
          text: 'Need a quick check on endpoint timeout values.'
        }
      ]
    }
  ],
  'dm-alex': [
    {
      label: 'Today',
      messages: [
        {
          id: 'a-1',
          senderId: 'alex',
          time: '11:02 AM',
          text: 'I left comments on the deployment checklist.'
        }
      ]
    }
  ]
};

const QUICK_ACTIONS = ['/assign', '/remind', '/poll', '/todo', '/pin'];

const getPresenceDot = (presence: Presence) => {
  if (presence === 'online') return 'bg-emerald-500';
  if (presence === 'away') return 'bg-amber-500';
  return 'bg-gray-500';
};

const getPresenceLabel = (presence: Presence) => {
  if (presence === 'online') return 'Online';
  if (presence === 'away') return 'Away';
  return 'Offline';
};

export function ProjectChannels() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConversationId, setActiveConversationId] = useState('everyone');
  const [inputValue, setInputValue] = useState('');
  const [showPinnedBanner, setShowPinnedBanner] = useState(true);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showOpenDmModal, setShowOpenDmModal] = useState(false);
  const [showGroupMembersPanel, setShowGroupMembersPanel] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedGroupMembers, setSelectedGroupMembers] = useState<string[]>(['john']);
  const [callMode, setCallMode] = useState<CallMode>('none');
  const [screenShareOn, setScreenShareOn] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  const activeConversation = CONVERSATIONS.find((conversation) => conversation.id === activeConversationId) || CONVERSATIONS[0];
  const isGroupConversation = activeConversation.type === 'group';
  const currentUser = MEMBERS.find((member) => member.id === CURRENT_USER_ID) || MEMBERS[0];

  const groupConversations = useMemo(
    () =>
      CONVERSATIONS.filter((conversation) => conversation.type === 'group').filter((conversation) =>
        conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  const directConversations = useMemo(
    () =>
      CONVERSATIONS.filter((conversation) => conversation.type === 'dm').filter((conversation) =>
        conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  const messageSections = MESSAGES[activeConversation.id] || [];
  const mentionMatch = inputValue.match(/(?:^|\s)@([\w]*)$/);
  const slashMatch = inputValue.match(/(?:^|\s)\/([\w-]*)$/);
  const showMentionMenu = Boolean(mentionMatch);
  const showSlashMenu = !showMentionMenu && Boolean(slashMatch);
  const mentionQuery = mentionMatch?.[1]?.toLowerCase() || '';
  const slashQuery = slashMatch?.[1]?.toLowerCase() || '';

  const mentionMembers = MEMBERS.filter((member) => member.id !== CURRENT_USER_ID).filter((member) =>
    member.name.toLowerCase().includes(mentionQuery)
  );
  const filteredActions = QUICK_ACTIONS.filter((action) => action.includes(slashQuery));

  const handleMentionPick = (member: Member) => {
    setInputValue((prev) => prev.replace(/(?:^|\s)@([\w]*)$/, ` @${member.name.split(' ')[0]} `));
  };

  const handleActionPick = (action: string) => {
    setInputValue((prev) => prev.replace(/(?:^|\s)\/([\w-]*)$/, ` ${action} `));
  };

  const renderMessageText = (text: string) => {
    return text.split(/(@John)/g).map((part, index) => {
      if (part === '@John') {
        return (
          <span key={`${part}-${index}`} className="inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
            {part}
          </span>
        );
      }
      return <span key={`${part}-${index}`}>{part}</span>;
    });
  };

  return (
    <div className="h-[calc(100vh-148px)] min-h-[700px] rounded-xl border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#0a0a0b] shadow-sm overflow-hidden">
      <div className="h-full grid grid-cols-[220px_1fr]">
        <aside className="border-r border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#0f1013] flex flex-col">
          <div className="p-3 border-b border-gray-200 dark:border-[#27272a]">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-8 pr-3 py-2 text-xs rounded-md border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#141416] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-5">
            <section>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                <Users size={13} />
                Team Chat
              </div>
              <div className="space-y-1">
                {groupConversations.map((conversation) => {
                  const isActive = activeConversation.id === conversation.id;
                  return (
                    <button
                      key={conversation.id}
                      onClick={() => setActiveConversationId(conversation.id)}
                      className={`w-full text-left p-2.5 rounded-md border transition-colors ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30'
                          : 'bg-white dark:bg-[#141416] border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex -space-x-1">
                          {conversation.memberIds.slice(0, 4).map((memberId) => {
                            const member = MEMBERS.find((item) => item.id === memberId);
                            if (!member) return null;
                            return (
                              <div
                                key={`${conversation.id}-${member.id}`}
                                className={`w-5 h-5 rounded-full ring-2 ring-white dark:ring-[#141416] flex items-center justify-center text-[9px] text-white font-semibold ${member.color}`}
                              >
                                {member.initials}
                              </div>
                            );
                          })}
                        </div>
                        {conversation.unread > 0 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-600 text-white font-semibold">{conversation.unread}</span>
                        )}
                      </div>
                      <p className="mt-1 text-xs font-medium text-gray-900 dark:text-gray-100 truncate">{conversation.name}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{conversation.preview}</p>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setShowCreateGroupModal(true)}
                className="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <Plus size={12} />
                Create Group
              </button>
            </section>

            <section>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                <AtSign size={13} />
                Direct Messages
              </div>
              <div className="space-y-1">
                {directConversations.map((conversation) => {
                  const isActive = activeConversation.id === conversation.id;
                  const dmMember = MEMBERS.find((member) => member.id === conversation.memberIds.find((memberId) => memberId !== CURRENT_USER_ID));
                  if (!dmMember) return null;
                  return (
                    <button
                      key={conversation.id}
                      onClick={() => setActiveConversationId(conversation.id)}
                      className={`w-full text-left p-2.5 rounded-md border transition-colors ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30'
                          : 'bg-white dark:bg-[#141416] border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="relative">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold text-white ${dmMember.color}`}>
                              {dmMember.initials}
                            </div>
                            <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-white dark:border-[#141416] ${getPresenceDot(dmMember.presence)}`} />
                          </div>
                          <p className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">{dmMember.name}</p>
                        </div>
                        {conversation.unread > 0 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-600 text-white font-semibold">{conversation.unread}</span>
                        )}
                      </div>
                      <p className="text-[11px] mt-1 text-gray-500 dark:text-gray-400 truncate">{conversation.preview}</p>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setShowOpenDmModal(true)}
                className="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <UserPlus size={12} />
                Open DM
              </button>
            </section>
          </div>

          <div className="p-3 border-t border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#121317]">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white ${currentUser.color}`}>{currentUser.initials}</div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">{currentUser.name}</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">{getPresenceLabel(currentUser.presence)}</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <button className="p-1.5 rounded text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1f1f23]">
                  <Mic size={14} />
                </button>
                <button className="p-1.5 rounded text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1f1f23]">
                  <Headphones size={14} />
                </button>
              </div>
            </div>
          </div>
        </aside>

        <section className="relative flex flex-col min-w-0 bg-white dark:bg-[#0b0c10]">
          <header className="h-14 px-4 border-b border-gray-200 dark:border-[#27272a] flex items-center justify-between">
            <div className="min-w-0">
              {isGroupConversation ? (
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {activeConversation.memberIds.map((memberId) => {
                      const member = MEMBERS.find((item) => item.id === memberId);
                      if (!member) return null;
                      return (
                        <div
                          key={`header-${member.id}`}
                          className={`w-6 h-6 rounded-full ring-2 ring-white dark:ring-[#0b0c10] flex items-center justify-center text-[9px] text-white font-semibold ${member.color}`}
                        >
                          {member.initials}
                        </div>
                      );
                    })}
                  </div>
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{activeConversation.name}</h2>
                </div>
              ) : (
                (() => {
                  const dmMember = MEMBERS.find((member) => member.id === activeConversation.memberIds.find((memberId) => memberId !== CURRENT_USER_ID));
                  if (!dmMember) return null;
                  return (
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold text-white ${dmMember.color}`}>{dmMember.initials}</div>
                      <div>
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{dmMember.name}</h2>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">{getPresenceLabel(dmMember.presence)}</p>
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setCallMode('voice');
                  setScreenShareOn(false);
                }}
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1f1f23]"
              >
                <Phone size={16} />
              </button>
              <button
                onClick={() => {
                  setCallMode('video');
                  setScreenShareOn(false);
                }}
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1f1f23]"
              >
                <Video size={16} />
              </button>
              <button
                onClick={() => {
                  if (callMode === 'none') setCallMode('video');
                  setScreenShareOn((prev) => !prev);
                }}
                className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#1f1f23] ${
                  screenShareOn ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <ScreenShare size={16} />
              </button>
              {isGroupConversation && (
                <button
                  onClick={() => setShowGroupMembersPanel((prev) => !prev)}
                  className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1f1f23]"
                >
                  <Users size={16} />
                </button>
              )}
            </div>
          </header>

          {showPinnedBanner && (
            <div className="px-4 py-2 border-b border-gray-200 dark:border-[#27272a] bg-amber-50 dark:bg-amber-500/10 text-xs text-amber-700 dark:text-amber-300 flex items-center justify-between">
              <span>📌 Pinned: Design review call — Friday 5pm</span>
              <button onClick={() => setShowPinnedBanner(false)} className="p-0.5 rounded hover:bg-amber-100 dark:hover:bg-amber-500/20">
                <X size={12} />
              </button>
            </div>
          )}

          <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4">
            {messageSections.map((section) => {
              const grouped: Array<{ senderId: string; time: string; items: Message[] }> = [];
              section.messages.forEach((message) => {
                const previous = grouped[grouped.length - 1];
                if (previous && previous.senderId === message.senderId) {
                  previous.items.push(message);
                  previous.time = message.time;
                } else {
                  grouped.push({ senderId: message.senderId, time: message.time, items: [message] });
                }
              });

              return (
                <div key={section.label} className="space-y-3">
                  <div className="flex items-center justify-center">
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-[#1f1f23] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#27272a]">
                      {section.label}
                    </span>
                  </div>

                  {grouped.map((entry) => {
                    const sender = MEMBERS.find((member) => member.id === entry.senderId);
                    if (!sender) return null;
                    return (
                      <div key={`${section.label}-${entry.items[0].id}`} className="flex gap-3">
                        <div className={`w-8 h-8 mt-0.5 rounded-full flex items-center justify-center text-[10px] font-semibold text-white ${sender.color}`}>{sender.initials}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{sender.name}</p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400">{entry.time}</p>
                          </div>
                          <div className="space-y-2">
                            {entry.items.map((message) => (
                              <div key={message.id} className="group relative">
                                <div className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{renderMessageText(message.text)}</div>
                                <div className="absolute -top-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div className="flex items-center gap-1 rounded-md border border-gray-200 dark:border-[#3f3f46] bg-white dark:bg-[#141416] shadow-sm px-1 py-0.5">
                                    <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                      <Smile size={13} />
                                    </button>
                                    <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                      <Reply size={13} />
                                    </button>
                                    <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                      <Ellipsis size={13} />
                                    </button>
                                  </div>
                                </div>
                                {message.reactions && message.reactions.length > 0 && (
                                  <div className="mt-1 flex items-center gap-1.5">
                                    {message.reactions.map((reaction) => (
                                      <button
                                        key={`${message.id}-${reaction.emoji}`}
                                        title={reaction.users.join(', ')}
                                        className="px-2 py-0.5 rounded-full text-xs border border-gray-200 dark:border-[#3f3f46] bg-gray-100 dark:bg-[#1f1f23] text-gray-700 dark:text-gray-300"
                                      >
                                        {reaction.emoji} {reaction.count}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="border-t border-gray-200 dark:border-[#27272a] p-4 relative">
            {(showMentionMenu || showSlashMenu) && (
              <div className="absolute bottom-[76px] left-4 right-4 rounded-lg border border-gray-200 dark:border-[#3f3f46] bg-white dark:bg-[#141416] shadow-lg overflow-hidden">
                {showMentionMenu &&
                  mentionMembers.map((member) => (
                    <button
                      key={`mention-${member.id}`}
                      onClick={() => handleMentionPick(member)}
                      className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-[#1f1f23]"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold text-white ${member.color}`}>{member.initials}</div>
                      <span className="text-sm text-gray-900 dark:text-gray-100">{member.name}</span>
                    </button>
                  ))}
                {showSlashMenu &&
                  filteredActions.map((action) => (
                    <button
                      key={`action-${action}`}
                      onClick={() => handleActionPick(action)}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1f1f23]"
                    >
                      {action}
                    </button>
                  ))}
              </div>
            )}
            <div className="w-full rounded-xl border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#141416] flex items-center gap-2 px-2.5 py-2">
              <button className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1f1f23]">
                <Plus size={16} />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder={isGroupConversation ? `Message ${activeConversation.name}...` : `Message ${activeConversation.name}...`}
                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-500 focus:outline-none"
              />
              <button className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1f1f23]">
                <Smile size={16} />
              </button>
              <button className="p-2 rounded-md text-white bg-blue-600 hover:bg-blue-500">
                <Send size={15} />
              </button>
            </div>
          </div>

          {showGroupMembersPanel && isGroupConversation && (
            <div className="absolute top-14 right-0 bottom-0 w-64 border-l border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#111216] z-20 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Group Members</h3>
                <button onClick={() => setShowGroupMembersPanel(false)} className="p-1 rounded text-gray-500 hover:bg-gray-100 dark:hover:bg-[#1f1f23]">
                  <X size={14} />
                </button>
              </div>
              <div className="space-y-2">
                {activeConversation.memberIds.map((memberId) => {
                  const member = MEMBERS.find((item) => item.id === memberId);
                  if (!member) return null;
                  return (
                    <div key={`member-panel-${member.id}`} className="flex items-center gap-2.5 p-2 rounded-md border border-gray-200 dark:border-[#27272a]">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold text-white ${member.color}`}>{member.initials}</div>
                      <div>
                        <p className="text-xs font-medium text-gray-900 dark:text-gray-100">{member.name}</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">{getPresenceLabel(member.presence)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {callMode !== 'none' && (
            <div
              className={`absolute z-30 right-4 ${screenShareOn ? 'top-4 w-[620px] h-[360px]' : 'top-16 w-[360px]'} rounded-xl border border-gray-200 dark:border-[#3f3f46] bg-white dark:bg-[#0f1014] shadow-xl overflow-hidden`}
            >
              {screenShareOn ? (
                <div className="h-full grid grid-cols-[1fr_160px]">
                  <div className="h-full flex items-center justify-center bg-gray-900 text-gray-100 text-sm">Shared Screen Preview</div>
                  <div className="border-l border-gray-200 dark:border-[#27272a] p-2 space-y-2 bg-[#111216]">
                    {MEMBERS.map((member) => (
                      <div key={`share-${member.id}`} className="relative h-[72px] rounded-lg border border-gray-200 dark:border-[#3f3f46] bg-[#1a1c21] p-2">
                        <div className="text-[11px] text-gray-200">{member.name}</div>
                        {member.id === 'sarah' && <div className="absolute inset-x-2 bottom-2 h-1 rounded-full bg-emerald-500 animate-pulse" />}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {MEMBERS.map((member) => (
                      <div key={`tile-${member.id}`} className="relative rounded-lg border border-gray-200 dark:border-[#3f3f46] bg-[#1a1c21] h-24 p-2 flex items-end">
                        <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-gray-700 text-white text-[10px] flex items-center justify-center font-semibold">
                          {member.initials}
                        </div>
                        <p className="text-[11px] text-gray-100">{member.name}</p>
                        {member.id === 'mike' && <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="h-12 border-t border-gray-200 dark:border-[#27272a] px-3 flex items-center justify-center gap-2 bg-white dark:bg-[#111216]">
                <button
                  onClick={() => setMicMuted((prev) => !prev)}
                  className={`p-2 rounded-md ${micMuted ? 'bg-red-500/20 text-red-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1f1f23]'}`}
                >
                  <Mic size={14} />
                </button>
                <button
                  onClick={() => setCameraOff((prev) => !prev)}
                  className={`p-2 rounded-md ${cameraOff ? 'bg-red-500/20 text-red-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1f1f23]'}`}
                >
                  <Video size={14} />
                </button>
                <button
                  onClick={() => setScreenShareOn((prev) => !prev)}
                  className={`p-2 rounded-md ${screenShareOn ? 'bg-blue-500/20 text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1f1f23]'}`}
                >
                  <ScreenShare size={14} />
                </button>
                <button
                  onClick={() => {
                    setCallMode('none');
                    setScreenShareOn(false);
                  }}
                  className="p-2 rounded-md bg-red-600 text-white hover:bg-red-500"
                >
                  <Phone size={14} />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {showCreateGroupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowCreateGroupModal(false)} />
          <div className="relative w-full max-w-md rounded-xl border border-gray-200 dark:border-[#3f3f46] bg-white dark:bg-[#141416] shadow-xl p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Create Group Chat</h3>
            <input
              type="text"
              value={groupName}
              onChange={(event) => setGroupName(event.target.value)}
              placeholder="Group name"
              className="w-full mb-4 px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {MEMBERS.map((member) => (
                <label key={`create-group-${member.id}`} className="flex items-center gap-2.5 p-2 rounded-md border border-gray-200 dark:border-[#27272a]">
                  <input
                    type="checkbox"
                    checked={selectedGroupMembers.includes(member.id)}
                    onChange={() =>
                      setSelectedGroupMembers((prev) =>
                        prev.includes(member.id) ? prev.filter((item) => item !== member.id) : [...prev, member.id]
                      )
                    }
                    className="rounded border-gray-300 dark:border-[#3f3f46] bg-white dark:bg-[#0a0a0b]"
                  />
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold text-white ${member.color}`}>{member.initials}</div>
                  <span className="text-sm text-gray-900 dark:text-gray-100">{member.name}</span>
                </label>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowCreateGroupModal(false)}
                className="px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-[#3f3f46] text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
              <button className="px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-500">Create Group</button>
            </div>
          </div>
        </div>
      )}

      {showOpenDmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowOpenDmModal(false)} />
          <div className="relative w-full max-w-sm rounded-xl border border-gray-200 dark:border-[#3f3f46] bg-white dark:bg-[#141416] shadow-xl p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Open Direct Message</h3>
            <div className="space-y-2">
              {MEMBERS.filter((member) => member.id !== CURRENT_USER_ID).map((member) => (
                <button
                  key={`open-dm-${member.id}`}
                  onClick={() => {
                    setActiveConversationId(`dm-${member.id}`);
                    setShowOpenDmModal(false);
                  }}
                  className="w-full text-left p-2 rounded-md border border-gray-200 dark:border-[#27272a] hover:bg-gray-50 dark:hover:bg-[#1f1f23] flex items-center gap-2.5"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold text-white ${member.color}`}>{member.initials}</div>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-gray-100">{member.name}</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{getPresenceLabel(member.presence)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

