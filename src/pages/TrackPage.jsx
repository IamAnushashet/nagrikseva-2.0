import { CheckCircle2, Circle, Clock3, Download, FileSearch } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { activeApplications, activeCitizen } from '../data/dataset.js';

const activeApplication = activeApplications[0];

const timeline = [
  {
    title: 'Application Submitted',
    date: activeApplication.submittedOn,
    description: `${activeCitizen.name} submitted ${activeApplication.service} from ${activeApplication.district}, ${activeApplication.state}.`,
    state: 'complete',
  },
  {
    title: 'Aadhaar/PAN Pre-check',
    date: activeApplication.submittedOn,
    description: 'Synthetic identity records were checked for name, pincode, Aadhaar, PAN, and DigiLocker linkage.',
    state: 'complete',
  },
  {
    title: activeApplication.status,
    date: 'Current step',
    description: `${activeApplication.department} is handling the request. Officer ${activeApplication.officer} is assigned.`,
    state: activeApplication.status === 'Approved' || activeApplication.status === 'Rejected' ? 'complete' : 'current',
  },
  {
    title: 'Deadline',
    date: activeApplication.deadline,
    description: 'Deadline monitoring is simulated from generated application service-level rules.',
    state: activeApplication.status === 'Approved' ? 'complete' : 'pending',
  },
];

export default function TrackPage() {
  return (
    <>
      <PageHeader
        eyebrow="Application tracking"
        title="Track application progress"
        description="View a transparent step-by-step timeline for citizen service requests."
        actions={
          <button className="inline-flex items-center gap-2 rounded bg-civic-700 px-4 py-2 text-sm font-bold text-white hover:bg-civic-900">
            <Download size={17} aria-hidden="true" />
            Download receipt
          </button>
        }
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
        <aside className="rounded border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded bg-civic-50 text-civic-700">
              <FileSearch size={23} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Selected application</p>
              <h2 className="mt-1 font-bold text-slate-950">{activeApplication.id}</h2>
            </div>
          </div>
          <dl className="mt-6 grid gap-4 text-sm">
            <div>
              <dt className="text-slate-500">Service</dt>
              <dd className="mt-1 font-bold text-slate-950">{activeApplication.service}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Department</dt>
              <dd className="mt-1 font-bold text-slate-950">{activeApplication.department}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Submitted</dt>
              <dd className="mt-1 font-bold text-slate-950">{activeApplication.submittedOn}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Deadline</dt>
              <dd className="mt-1 font-bold text-slate-950">{activeApplication.deadline}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Officer</dt>
              <dd className="mt-1 font-bold text-slate-950">{activeApplication.officer}</dd>
            </div>
            <div>
              <dt className="text-slate-500">District / Pincode</dt>
              <dd className="mt-1 font-bold text-slate-950">
                {activeApplication.district} - {activeApplication.pincode}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Current status</dt>
              <dd className="mt-2">
                <StatusBadge status={activeApplication.status} />
              </dd>
            </div>
          </dl>
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-slate-700">Completion</span>
              <span className="font-bold text-civic-700">{activeApplication.progress}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded bg-slate-100">
              <div className="h-full rounded bg-civic-600" style={{ width: `${activeApplication.progress}%` }} />
            </div>
          </div>
        </aside>

        <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Progress timeline</h2>
          <div className="mt-6 grid gap-0">
            {timeline.map((item, index) => {
              const isLast = index === timeline.length - 1;
              const Icon = item.state === 'complete' ? CheckCircle2 : item.state === 'current' ? Clock3 : Circle;
              const iconClass =
                item.state === 'complete'
                  ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                  : item.state === 'current'
                    ? 'bg-sky-50 text-sky-700 ring-sky-200'
                    : 'bg-slate-50 text-slate-400 ring-slate-200';

              return (
                <div key={item.title} className="grid grid-cols-[44px_1fr] gap-4">
                  <div className="flex flex-col items-center">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-full ring-1 ${iconClass}`}>
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    {!isLast && <span className="h-full min-h-12 w-px bg-slate-200" />}
                  </div>
                  <div className={`pb-7 ${isLast ? 'pb-0' : ''}`}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-bold text-slate-950">{item.title}</h3>
                      <p className="text-sm font-semibold text-slate-500">{item.date}</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
