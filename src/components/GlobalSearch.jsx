import { useMemo, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { activeApplications, activeComplaints, localityIntelligence } from '../data/dataset.js';
import { serviceCategories } from '../data/mockData.js';

const helpArticles = [
  { title: 'How to link DigiLocker', path: '/digilocker', type: 'Help' },
  { title: 'How to file a complaint', path: '/complaints', type: 'Help' },
  { title: 'Accessibility settings for elderly citizens', path: '/accessibility', type: 'Help' },
  { title: 'Track service deadlines', path: '/track', type: 'Help' },
];

function highlight(text, query) {
  if (!query) return text;
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded bg-amber-200 px-0.5">{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  );
}

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const { t } = useApp();
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const items = [
      ...serviceCategories.map((service) => ({ title: service.title, subtitle: service.description, path: '/dashboard', type: 'Service' })),
      ...activeApplications.map((app) => ({ title: app.service, subtitle: `${app.id} ${app.status}`, path: '/track', type: 'Application' })),
      ...activeComplaints.map((complaint) => ({ title: complaint.category, subtitle: `${complaint.id} ${complaint.locality}`, path: '/complaints', type: 'Complaint' })),
      ...localityIntelligence.slice(0, 10).map((signal) => ({ title: signal.topIssue, subtitle: signal.suggestion, path: '/complaints', type: 'Locality' })),
      ...helpArticles,
    ];
    return items.filter((item) => `${item.title} ${item.subtitle || ''}`.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  return (
    <div className="relative w-full max-w-sm">
      <label className="sr-only" htmlFor="global-search">
        {t('searchPlaceholder')}
      </label>
      <div className="flex items-center gap-2 rounded border border-slate-200 bg-white px-3 py-2 focus-within:ring-4 focus-within:ring-civic-100">
        <FiSearch className="text-slate-500" aria-hidden="true" />
        <input
          id="global-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
          placeholder={t('searchPlaceholder')}
        />
      </div>
      {query && (
        <div className="absolute right-0 z-40 mt-2 w-full min-w-80 rounded border border-slate-200 bg-white shadow-civic">
          <h2 className="border-b border-slate-200 p-3 text-sm font-bold text-slate-950">{t('searchResults')}</h2>
          <div className="max-h-96 overflow-y-auto p-2">
            {results.length === 0 && <p className="p-3 text-sm text-slate-600">{t('noResults')}</p>}
            {results.map((result, index) => (
              <Link
                key={`${result.title}-${index}`}
                to={result.path}
                className="block rounded p-3 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-civic-100"
                onClick={() => setQuery('')}
              >
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-civic-700">{result.type}</p>
                <p className="mt-1 text-sm font-bold text-slate-950">{highlight(result.title, query)}</p>
                {result.subtitle && <p className="mt-1 text-xs text-slate-600">{highlight(result.subtitle, query)}</p>}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
