export function statusClass(status) {
  const key = status.toLowerCase();

  if (key.includes('approved') || key.includes('resolved')) {
    return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
  }

  if (key.includes('requested') || key.includes('awaiting')) {
    return 'bg-amber-50 text-amber-800 ring-1 ring-amber-200';
  }

  if (key.includes('assigned') || key.includes('review')) {
    return 'bg-sky-50 text-sky-700 ring-1 ring-sky-200';
  }

  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
}
