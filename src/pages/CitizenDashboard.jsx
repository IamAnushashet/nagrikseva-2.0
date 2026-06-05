import {
  Bell,
  CalendarClock,
  ClipboardList,
  IdCard,
  Link2,
  MessageSquareWarning,
  SearchCheck,
  ShieldAlert,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import {
  activeApplications,
  activeCitizen,
  activeComplaints,
  activeIdentity,
  datasetStats,
} from '../data/dataset.js';
import { serviceCategories } from '../data/mockData.js';

export default function CitizenDashboard() {
  return (
    <>
      <PageHeader
        eyebrow="Citizen workspace"
        title={`Welcome, ${activeCitizen.name}`}
        description="Manage generated citizen records, identity verification, applications, complaints, and account safety checks."
        actions={
          <>
            <Link
              to="/digilocker"
              className="inline-flex items-center gap-2 rounded bg-civic-700 px-4 py-2 text-sm font-bold text-white hover:bg-civic-900"
            >
              <Link2 size={17} aria-hidden="true" />
              Link DigiLocker
            </Link>
            <Link
              to="/assistant"
              className="inline-flex items-center gap-2 rounded border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"
            >
              <Bell size={17} aria-hidden="true" />
              Ask assistant
            </Link>
          </>
        }
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-8">
        <aside className="grid gap-6">
          <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded bg-civic-50 text-civic-700">
                <IdCard size={28} aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-950">{activeCitizen.name}</h2>
                <p className="mt-1 text-sm text-slate-600">{activeCitizen.id}</p>
                <div className="mt-3">
                  <StatusBadge status={activeCitizen.accountStatus} />
                </div>
              </div>
            </div>
            <dl className="mt-5 grid gap-3 text-sm">
              <div className="flex justify-between gap-3 border-t border-slate-100 pt-3">
                <dt className="text-slate-500">District</dt>
                <dd className="font-semibold text-slate-900">{activeCitizen.address.district}</dd>
              </div>
              <div className="flex justify-between gap-3 border-t border-slate-100 pt-3">
                <dt className="text-slate-500">Mobile</dt>
                <dd className="font-semibold text-slate-900">{activeCitizen.mobile}</dd>
              </div>
              <div className="flex justify-between gap-3 border-t border-slate-100 pt-3">
                <dt className="text-slate-500">Pincode</dt>
                <dd className="font-semibold text-slate-900">{activeCitizen.address.pincode}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 font-bold text-slate-950">
              <ShieldAlert size={18} className="text-civic-700" aria-hidden="true" />
              Verification status
            </h2>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-600">Aadhaar {activeIdentity.aadhaar.maskedNumber}</span>
                <StatusBadge status={activeIdentity.aadhaar.status} />
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-600">PAN {activeIdentity.pan.number}</span>
                <StatusBadge status={activeIdentity.pan.status} />
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-600">DigiLocker</span>
                <StatusBadge status={activeIdentity.digilocker.status} />
              </div>
            </div>
          </div>

          <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 font-bold text-slate-950">
              <MessageSquareWarning size={18} className="text-civic-700" aria-hidden="true" />
              Recent complaints
            </h2>
            <div className="mt-4 grid gap-3">
              {activeComplaints.slice(0, 3).map((complaint) => (
                <div key={complaint.id} className="rounded bg-slate-50 p-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold text-slate-950">{complaint.category}</p>
                    <StatusBadge status={complaint.status} />
                  </div>
                  <p className="mt-1 text-slate-600">
                    {complaint.locality}, {complaint.district}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: '1,000 citizens', text: `${datasetStats.identityRecords} identity records available.`, icon: IdCard },
              { title: '5,000 applications', text: `${activeApplications.length} linked to this profile sample.`, icon: SearchCheck },
              { title: '3,000 complaints', text: 'Locality intelligence is available for smart routing.', icon: MessageSquareWarning },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded border border-slate-200 bg-white p-5 shadow-sm">
                  <Icon className="text-civic-700" size={24} aria-hidden="true" />
                  <h2 className="mt-4 font-bold text-slate-950">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              );
            })}
          </div>

          <div className="rounded border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Apply for service</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Choose from frequently used service categories for {activeCitizen.address.state}.
                </p>
              </div>
              <select className="rounded border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">
                <option>{activeCitizen.address.district}</option>
                <option>Bengaluru Urban</option>
                <option>Chennai</option>
              </select>
            </div>
            <div className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-3">
              {serviceCategories.slice(0, 6).map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    className="flex items-start gap-3 rounded border border-slate-200 p-4 text-left transition hover:border-civic-300 hover:bg-civic-50/40"
                  >
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded ${service.color}`}>
                      <Icon size={19} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-bold text-slate-950">{service.title}</span>
                      <span className="mt-1 block text-sm leading-5 text-slate-600">{service.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-200 p-5">
              <ClipboardList size={20} className="text-civic-700" aria-hidden="true" />
              <h2 className="text-lg font-bold text-slate-950">Ongoing applications with deadlines</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Application</th>
                    <th className="px-5 py-3">Department</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Deadline</th>
                    <th className="px-5 py-3">Risk</th>
                    <th className="px-5 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeApplications.map((application) => (
                    <tr key={application.id}>
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-950">{application.service}</p>
                        <p className="mt-1 text-xs text-slate-500">{application.id}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{application.department}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={application.status} />
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        <span className="inline-flex items-center gap-1">
                          <CalendarClock size={15} aria-hidden="true" />
                          {application.deadline}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={application.riskLevel} />
                      </td>
                      <td className="px-5 py-4">
                        <Link to="/track" className="font-bold text-civic-700">
                          View timeline
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
