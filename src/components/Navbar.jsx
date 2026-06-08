import { useState } from 'react';
import {
  FiBell,
  FiGrid,
  FiHome,
  FiLock,
  FiMenu,
  FiSettings,
  FiShield,
  FiUser,
  FiX,
} from 'react-icons/fi';
import { MdAccessibilityNew, MdOutlineAssignmentTurnedIn, MdOutlineReportProblem } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import GlobalSearch from './GlobalSearch.jsx';
import LanguageSelector from './LanguageSelector.jsx';
import NotificationCenter from './NotificationCenter.jsx';
import VoiceAssistantControl from './VoiceAssistantControl.jsx';

const linkItems = [
  { to: '/', label: 'navServices', icon: FiHome },
  { to: '/dashboard', label: 'navDashboard', icon: FiGrid },
  { to: '/track', label: 'navTrack', icon: MdOutlineAssignmentTurnedIn },
  { to: '/complaints', label: 'navComplaints', icon: MdOutlineReportProblem },
  { to: '/digilocker', label: 'navDigiLocker', icon: FiLock },
  { to: '/assistant', label: 'navAssistant', icon: FiBell },
  { to: '/admin', label: 'navAdmin', icon: FiSettings },
  { to: '/accessibility', label: 'navAccessibility', icon: MdAccessibilityNew },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, accessibility } = useApp();
  const visibleLinks = accessibility.simpleNavigation
    ? linkItems.filter((item) => ['navServices', 'navDashboard', 'navComplaints', 'navTrack', 'navAccessibility'].includes(item.label))
    : linkItems;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-civic-700 text-white">
            <FiShield size={22} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-bold text-slate-950 sm:text-lg">{t('appName')}</span>
            <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-slate-500 sm:block">{t('tagline')}</span>
          </span>
        </NavLink>

        <div className="hidden flex-1 items-center justify-center gap-1 xl:flex">
          {visibleLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded px-3 py-2 text-sm font-semibold transition ${
                    isActive ? 'bg-civic-50 text-civic-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                  }`
                }
              >
                <Icon aria-hidden="true" />
                {t(link.label)}
              </NavLink>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <GlobalSearch />
          <LanguageSelector />
          <VoiceAssistantControl />
          <NotificationCenter />
          <NavLink
            to="/login"
            className="inline-flex items-center gap-2 rounded bg-civic-700 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-civic-900"
          >
            <FiUser aria-hidden="true" />
            {t('citizenLogin')}
          </NavLink>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 text-slate-700 xl:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          title="Toggle navigation"
        >
          {open ? <FiX size={20} aria-hidden="true" /> : <FiMenu size={20} aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            <GlobalSearch />
            {visibleLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2 rounded px-3 py-2 text-sm font-semibold ${
                      isActive ? 'bg-civic-50 text-civic-700' : 'text-slate-700 hover:bg-slate-100'
                    }`
                  }
                >
                  <Icon aria-hidden="true" />
                  {t(link.label)}
                </NavLink>
              );
            })}
            <div className="flex flex-wrap items-center gap-2 px-3 py-2">
              <LanguageSelector compact />
              <VoiceAssistantControl />
              <NotificationCenter />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
