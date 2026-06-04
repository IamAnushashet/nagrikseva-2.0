import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <article className="group flex h-full flex-col rounded border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-civic-200 hover:shadow-civic">
      <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded ${service.color}`}>
        <Icon size={22} aria-hidden="true" />
      </div>
      <h3 className="text-base font-bold text-slate-950">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{service.description}</p>
      <Link to="/dashboard" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-civic-700">
        Start service
        <ArrowRight size={16} aria-hidden="true" className="transition group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
