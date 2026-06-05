import { BarChart3, CheckCircle2, ClipboardCheck, RefreshCcw, ShieldAlert, UsersRound } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { citizens, datasetStats, generatedApplications, generatedComplaints, localityIntelligence } from '../data/dataset.js';

const statusOptions = ['Submitted', 'In Review', 'Documents Requested', 'Field Verification', 'Approved', 'Rejected'];

export default function AdminDashboard() {
  const [records, setRecords] = useState(generatedApplications.slice(0, 30));
  const deactivationQueue = citizens.filter((citizen) => citizen.accountStatus !== 'Active').slice(0, 5);

  function updateStatus(id, status) {
    setRecords((current) => current.map((record) => (record.id === id ? { ...record, status } : record)));
  }

  return (
    <>
      <PageHeader
        eyebrow="Officer console"
        title="Admin dashboard"
        description="Review generated applications, monitor locality intelligence, and simulate account deactivation workflows."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Generated citizens', value: datasetStats.citizens.toLocaleString('en-IN'), icon: UsersRound },
            { label: 'Applications', value: datasetStats.applications.toLocaleString('en-IN'), icon: ClipboardCheck },
            { label: 'Complaints', value: datasetStats.complaints.toLocaleString('en-IN'), icon: RefreshCcw },
            { label: 'Deactivation reviews', value: datasetStats.deactivationReviews, icon: ShieldAlert },
          ].map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="rounded border border-slate-200 bg-white p-5 shadow-sm">
                <Icon className="text-civic-700" size={22} aria-hidden="true" />
                <p className="mt-4 text-3xl font-bold text-slate-950">{metric.value}</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">{metric.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-950">Applications queue</h2>
              <p className="mt-1 text-sm text-slate-600">Showing 30 records from the 5,000 generated application dataset.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Application</th>
                    <th className="px-5 py-3">Citizen</th>
                    <th className="px-5 py-3">Officer</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Deadline</th>
                    <th className="px-5 py-3">Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {records.map((record) => (
                    <tr key={record.id}>
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-950">{record.service}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {record.id} - {record.department}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">{record.citizenName}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {record.district}, {record.pincode}
                        </p>
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-700">{record.officer}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={record.status} />
                      </td>
                      <td className="px-5 py-4 text-slate-600">{record.deadline}</td>
                      <td className="px-5 py-4">
                        <select
                          value={record.status}
                          onChange={(event) => updateStatus(record.id, event.target.value)}
                          className="rounded border border-slate-300 px-3 py-2 font-semibold text-slate-700 outline-none focus:border-civic-600 focus:ring-4 focus:ring-civic-100"
                        >
                          {statusOptions.map((status) => (
                            <option key={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="rounded border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded bg-civic-50 text-civic-700">
                <BarChart3 size={22} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-bold text-slate-950">Locality intelligence</h2>
                <p className="text-sm text-slate-600">Top complaint clusters</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              {localityIntelligence.slice(0, 6).map((signal) => (
                <div key={`${signal.locality}-${signal.district}`}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold text-slate-700">{signal.locality}</span>
                    <span className="font-bold text-civic-700">{signal.totalComplaints}</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{signal.topIssue}</p>
                  <div className="mt-2 h-2 overflow-hidden rounded bg-slate-100">
                    <div className="h-full rounded bg-civic-600" style={{ width: `${Math.min(signal.totalComplaints, 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-950">
              <ShieldAlert size={20} className="text-rose-700" aria-hidden="true" />
              Deceased account deactivation queue
            </h2>
            <div className="mt-4 grid gap-3">
              {deactivationQueue.map((citizen) => (
                <div key={citizen.id} className="flex items-center justify-between gap-3 rounded bg-rose-50 p-3 text-sm">
                  <div>
                    <p className="font-bold text-rose-950">{citizen.name}</p>
                    <p className="mt-1 text-rose-800">
                      {citizen.id} - {citizen.address.district}
                    </p>
                  </div>
                  <StatusBadge status={citizen.accountStatus} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-950">
              <CheckCircle2 size={20} className="text-civic-700" aria-hidden="true" />
              Complaint intelligence sample
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {generatedComplaints.length.toLocaleString('en-IN')} generated complaints are available for routing,
              escalation, and locality suggestions.
            </p>
            <div className="mt-4 grid gap-3">
              {localityIntelligence.slice(6, 10).map((signal) => (
                <div key={`${signal.locality}-${signal.riskSignal}`} className="rounded bg-slate-50 p-3 text-sm">
                  <p className="font-bold text-slate-950">
                    {signal.locality}, {signal.district}
                  </p>
                  <p className="mt-1 text-slate-600">{signal.suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
