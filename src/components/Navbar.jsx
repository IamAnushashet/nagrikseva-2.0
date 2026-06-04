import { Menu, Search, ShieldCheck, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Services' },
  { to: '/dashboard', label: 'Citizen Dashboard' },
  { to: '/track', label: 'Track' },
  { to: '/assistant', label: 'AI Assistant' },
  { to: '/admin', label: 'Admin' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-civic-700 text-white">
            <ShieldCheck size={22} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-bold text-slate-950 sm:text-lg">NagrikSeva 2.0</span>
            <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-slate-500 sm:block">
              Digital India Services
            </span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded px-3 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-civic-50 text-civic-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50"
            aria-label="Search services"
            title="Search services"
          >
            <Search size={18} aria-hidden="true" />
          </button>
          <NavLink
            to="/login"
            className="rounded bg-civic-700 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-civic-900"
          >
            Citizen Login
          </NavLink>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 text-slate-700 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          title="Toggle navigation"
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded px-3 py-2 text-sm font-semibold ${
                    isActive ? 'bg-civic-50 text-civic-700' : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-2 rounded bg-civic-700 px-3 py-2 text-center text-sm font-bold text-white"
            >
              Citizen Login
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
