import { CheckCircle2, FileKey2, Link2, ShieldAlert, ShieldCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { activeCitizen, activeIdentity } from '../data/dataset.js';

export default function DigiLockerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Identity vault"
        title="DigiLocker linking"
        description="Simulate linked digital documents, Aadhaar verification, PAN verification, and account safety checks."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
        <aside className="rounded border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded bg-civic-50 text-civic-700">
              <FileKey2 size={25} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-bold text-slate-950">{activeCitizen.name}</h2>
              <p className="text-sm text-slate-600">{activeCitizen.id}</p>
            </div>
          </div>
          <dl className="mt-6 grid gap-4 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-500">Aadhaar</dt>
              <dd className="font-bold text-slate-950">{activeIdentity.aadhaar.maskedNumber}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-500">PAN</dt>
              <dd className="font-bold text-slate-950">{activeIdentity.pan.number}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-500">Account</dt>
              <dd>
                <StatusBadge status={activeCitizen.accountStatus} />
              </dd>
            </div>
          </dl>
        </aside>

        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: 'Aadhaar verification', value: activeIdentity.aadhaar.status, icon: ShieldCheck },
              { label: 'PAN verification', value: activeIdentity.pan.status, icon: CheckCircle2 },
              { label: 'DigiLocker status', value: activeIdentity.digilocker.status, icon: Link2 },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded border border-slate-200 bg-white p-5 shadow-sm">
                  <Icon className="text-civic-700" size={23} aria-hidden="true" />
                  <p className="mt-4 text-sm font-semibold text-slate-500">{item.label}</p>
                  <div className="mt-2">
                    <StatusBadge status={item.value} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-950">Linked documents</h2>
              <p className="mt-1 text-sm text-slate-600">Mock records from the synthetic DigiLocker dataset.</p>
            </div>
            <div className="grid gap-3 p-5 sm:grid-cols-3">
              {activeIdentity.digilocker.documents.length > 0 ? (
                activeIdentity.digilocker.documents.map((document) => (
                  <div key={document} className="rounded border border-slate-200 bg-slate-50 p-4">
                    <FileKey2 className="text-civic-700" size={20} aria-hidden="true" />
                    <p className="mt-3 font-bold text-slate-950">{document}</p>
                    <p className="mt-1 text-sm text-slate-600">Available for service pre-fill</p>
                  </div>
                ))
              ) : (
                <div className="rounded border border-amber-200 bg-amber-50 p-4 sm:col-span-3">
                  <p className="font-bold text-amber-950">DigiLocker is not linked for this synthetic citizen.</p>
                  <p className="mt-1 text-sm text-amber-800">
                    Use the linking simulation to connect a mock locker ID and make documents available for pre-fill.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded border border-rose-200 bg-rose-50 p-5">
            <div className="flex gap-3">
              <ShieldAlert className="mt-0.5 text-rose-700" size={22} aria-hidden="true" />
              <div>
                <h2 className="font-bold text-rose-950">Deceased citizen account deactivation simulation</h2>
                <p className="mt-1 text-sm leading-6 text-rose-800">
                  This synthetic profile is flagged from a mock Civil Registration System sync. Officers can place the
                  account into deactivation review while preserving audit history and pending benefit actions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
