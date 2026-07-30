import React, { useState } from 'react';
import { Bell, Check } from 'lucide-react';

const NotificationBell = ({ notifications = [], onMarkAsRead, onMarkAllAsRead }) => {
  const [isOpen, setIsOpen] = useState(false);

  const safeNotifs = Array.isArray(notifications) ? notifications : [];
  const unreadCount = safeNotifs.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
        title="Notifikasi"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl z-50 max-h-96 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">Notifikasi</h3>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={onMarkAllAsRead}
                  className="text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium cursor-pointer"
                >
                  Tandai Semua Dibaca
                </button>
              )}
            </div>

            <div className="overflow-y-auto flex-1">
              {safeNotifs.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-sm">
                  <Bell className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p>Tidak ada notifikasi baru</p>
                </div>
              ) : (
                safeNotifs.map((notif) => (
                  <div
                    key={notif.id || Math.random()}
                    className={`p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                      !notif.read ? 'bg-emerald-50/30 dark:bg-emerald-950/20' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                        !notif.read ? 'bg-emerald-600' : 'bg-gray-300'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {notif.title || 'Pemberitahuan'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {notif.message}
                        </p>
                        {notif.timestamp && (
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(notif.timestamp).toLocaleString('id-ID')}
                          </p>
                        )}
                      </div>
                      {!notif.read && (
                        <button
                          type="button"
                          onClick={() => onMarkAsRead && onMarkAsRead(notif.id)}
                          className="shrink-0 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer"
                        >
                          <Check className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;