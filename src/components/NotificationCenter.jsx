import { useState } from 'react';
import { FiBell } from 'react-icons/fi';
import { useApp } from '../context/AppContext.jsx';

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markNotificationRead, markAllRead, t } = useApp();

  return (
    <div className="relative">
      <button
        className="relative flex h-10 w-10 items-center justify-center rounded border border-slate-200 text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-civic-100"
        onClick={() => setOpen((value) => !value)}
        aria-label={t('notifications')}
        title={t('notifications')}
      >
        <FiBell aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-rose-600 px-1.5 text-xs font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded border border-slate-200 bg-white shadow-civic">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 p-4">
            <h2 className="font-bold text-slate-950">{t('notifications')}</h2>
            <button className="text-xs font-bold text-civic-700" onClick={markAllRead}>
              {t('markAllRead')}
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto p-2">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                className="grid w-full gap-1 rounded p-3 text-left hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-civic-100"
                onClick={() => markNotificationRead(notification.id)}
              >
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-civic-700">{notification.type}</span>
                <span className="text-sm font-semibold text-slate-900">{notification.title}</span>
                {notification.unread && <span className="text-xs font-bold text-rose-700">{t('unread')}</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
