import { ArrowRight, CheckCircle2, Clock3, FileText, LockKeyhole, MessageSquareText, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard.jsx';
import { serviceCategories } from '../data/mockData.js';

const metrics = [
  { label: 'Services unified', value: '120+', icon: FileText },
  { label: 'District offices', value: '38', icon: UsersRound },
  { label: 'Avg. status updates', value: '24h', icon: Clock3 },
  { label: 'Secure mock flows', value: '100%', icon: LockKeyhole },
];

export default function LandingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 subtle-grid opacity-70" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-civic-700">Unified citizen portal</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              NagrikSeva 2.0
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              A professional government-tech interface for discovering services, filing applications, tracking progress,
              raising complaints, and supporting officers with clear administrative workflows.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded bg-civic-700 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-civic-900"
              >
                Open citizen dashboard
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                to="/track"
                className="inline-flex items-center justify-center gap-2 rounded border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50"
              >
                Track application
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded border border-slate-200 bg-white shadow-civic">
              <div className="border-b border-slate-200 px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Service command center</p>
                    <h2 className="mt-1 text-xl font-bold text-slate-950">Citizen request overview</h2>
                  </div>
                  <span className="rounded bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                    Live mock
                  </span>
                </div>
              </div>
              <div className="grid gap-4 p-5">
                <div className="grid grid-cols-3 gap-3">
                  {metrics.slice(0, 3).map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <div key={metric.label} className="rounded border border-slate-200 bg-slate-50 p-3">
                        <Icon className="text-civic-700" size={18} aria-hidden="true" />
                        <p className="mt-3 text-2xl font-bold text-slate-950">{metric.value}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-600">{metric.label}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="rounded border border-slate-200 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 text-civic-700" size={20} aria-hidden="true" />
                    <div>
                      <h3 className="font-bold text-slate-950">Income Certificate</h3>
                      <p className="mt-1 text-sm text-slate-600">Officer review is in progress for APP-2026-01428.</p>
                    </div>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded bg-slate-100">
                    <div className="h-full w-[58%] rounded bg-civic-600" />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded bg-slate-50 p-3">
                      <p className="text-slate-500">Next action</p>
                      <p className="font-bold text-slate-950">Officer verification</p>
                    </div>
                    <div className="rounded bg-slate-50 p-3">
                      <p className="text-slate-500">ETA</p>
                      <p className="font-bold text-slate-950">2 working days</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded bg-civic-700 p-4 text-white">
                  <MessageSquareText size={22} aria-hidden="true" />
                  <p className="text-sm font-semibold">AI assistant ready with service guidance and status help.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-civic-700">Government services</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Find the right department faster</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Browse public services by category and move directly into a citizen workflow.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
