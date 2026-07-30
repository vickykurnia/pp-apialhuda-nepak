import React, { useState } from "react";
import {
  Home,
  Book,
  Users,
  Calendar,
  Image as ImageIcon,
  Video,
  ChevronsRight,
  Moon,
  Sun,
  LogOut,
  BarChart3,
  User
} from "lucide-react";
import NotificationBell from "../notifications/NotificationBell";

export function DashboardLayout({ 
  children, 
  activePage, 
  onNavClick, 
  isDarkMode, 
  setIsDarkMode, 
  counters, 
  notifications = [], 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onAdminClick 
}) {
  // Handler Perbaikan Toggle Dark Mode
  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className={`flex min-h-screen w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200 ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar Navigation */}
      <Sidebar activePage={activePage} onNavClick={onNavClick} counters={counters} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar Header */}
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 flex items-center justify-between shrink-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari data berita, santri, agenda..."
                className="w-full h-9 pl-10 pr-4 text-sm border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Tombol Toggle Dark / Light Mode - FIXED */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Ganti Mode Tampilan (Terang/Gelap)"
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Komponen Lonceng Notifikasi */}
            <NotificationBell 
              notifications={notifications} 
              onMarkAsRead={onMarkAsRead} 
              onMarkAllAsRead={onMarkAllAsRead} 
            />

            {/* Profil Admin Utama */}
            <button
              type="button"
              onClick={onAdminClick}
              className={`flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-2 py-1 transition-colors cursor-pointer ${
                activePage === 'admin-profile' ? 'bg-emerald-50 dark:bg-emerald-950/40 ring-1 ring-emerald-500' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-emerald-800 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs font-semibold hidden sm:inline-block text-gray-900 dark:text-gray-100">Admin Utama</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content Workspace */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
          {children}
        </main>
      </div>
    </div>
  );
}

const Sidebar = ({ activePage, onNavClick, counters }) => {
  const [open, setOpen] = useState(true);

  const handleExit = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar dari Dashboard Admin?")) {
      window.location.href = '/login';
    }
  };

  return (
    <nav className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out ${open ? 'w-64' : 'w-20'} border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 shadow-sm flex flex-col justify-between`}>
      <div className="overflow-y-auto">
        <div className="mb-4 border-b border-gray-200 dark:border-gray-800 pb-3">
          <div className="flex items-center gap-3 overflow-hidden p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
            <div className="grid size-9 shrink-0 place-content-center rounded-lg bg-emerald-800 shadow-sm text-white font-bold text-sm">
              🏠
            </div>
            {open && (
              <div className="truncate">
                <span className="block text-sm font-bold text-emerald-900 dark:text-emerald-400">PP API Al-Huda</span>
                <span className="block text-xs text-gray-500 dark:text-gray-400">Nepak</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-1 mb-6">
          <div className={`px-3 py-1.5 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider ${!open && 'sr-only'}`}>Manajemen</div>
          <Option Icon={Home} title="Kelola Berita" target="berita" activePage={activePage} onNavClick={onNavClick} open={open} notifs={counters?.countBerita} />
          <Option Icon={Users} title="Pendaftar PSB" target="pendaftar" activePage={activePage} onNavClick={onNavClick} open={open} notifs={counters?.countPendaftar} />
          <Option Icon={Calendar} title="Agenda Pondok" target="agenda" activePage={activePage} onNavClick={onNavClick} open={open} notifs={counters?.countAgenda} />
          <Option Icon={ImageIcon} title="Galeri Foto" target="galeri-foto" activePage={activePage} onNavClick={onNavClick} open={open} notifs={counters?.countGaleriFoto} />
          <Option Icon={Video} title="Galeri Video" target="galeri-video" activePage={activePage} onNavClick={onNavClick} open={open} notifs={counters?.countGaleriVideo} />
          <Option Icon={Book} title="Kurikulum" target="kurikulum" activePage={activePage} onNavClick={onNavClick} open={open} notifs={counters?.countKurikulum} />

          <div className={`pt-4 px-3 py-1.5 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider ${!open && 'sr-only'}`}>Laporan</div>
          <Option Icon={BarChart3} title="Statistik" target="statistik" activePage={activePage} onNavClick={onNavClick} open={open} />
        </div>
      </div>

      <div className="space-y-2">
        <a
          href="/"
          className="relative flex h-10 w-full items-center rounded-lg transition-all text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 font-medium cursor-pointer"
        >
          <div className="grid h-full w-14 place-content-center shrink-0"><Home className="h-4 w-4" /></div>
          <span className={`text-sm truncate transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0 w-0'}`}>Lihat Web Utama</span>
        </a>

        <button
          type="button"
          onClick={handleExit}
          className="relative flex h-10 w-full items-center rounded-lg transition-all text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 font-medium cursor-pointer"
        >
          <div className="grid h-full w-14 place-content-center shrink-0"><LogOut className="h-4 w-4" /></div>
          <span className={`text-sm truncate transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0 w-0'}`}>Keluar Panel</span>
        </button>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full border-t border-gray-200 dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
        >
          <div className="flex items-center p-2 h-10">
            <div className="grid size-9 place-content-center shrink-0">
              <ChevronsRight className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${open ? "rotate-180" : ""}`} />
            </div>
            <span className={`text-sm font-medium text-gray-400 transition-opacity duration-200 ml-2 ${open ? 'opacity-100' : 'opacity-0 w-0'}`}>Sembunyikan</span>
          </div>
        </button>
      </div>
    </nav>
  );
};

const Option = ({ Icon, title, target, activePage, onNavClick, open, notifs }) => {
  const isSelected = activePage === target;

  return (
    <button
      type="button"
      onClick={() => onNavClick(target)}
      className={`relative flex h-10 w-full items-center rounded-lg transition-all duration-150 cursor-pointer ${
        isSelected
          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold shadow-sm border-l-2 border-emerald-600"
          : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-200"
      }`}
    >
      <div className="grid h-full w-14 place-content-center shrink-0"><Icon className="h-4 w-4" /></div>
      <span className={`text-sm transition-opacity duration-200 truncate ${open ? 'opacity-100' : 'opacity-0 w-0'}`}>{title}</span>
      {notifs ? (
        <span className="absolute right-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white font-bold px-1">{notifs}</span>
      ) : null}
    </button>
  );
};