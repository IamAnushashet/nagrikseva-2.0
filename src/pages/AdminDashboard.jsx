import { BarChart3, CheckCircle2, ClipboardCheck, RefreshCcw, UsersRound } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { applications } from '../data/mockData.js';

const statusOptions = ['In Review', 'Documents Requested', 'Approved', 'Rejected'];

export default function AdminDashboard() {
  const [records, setRecords] = useState(applications);

  function updateStatus(id, status) {
    setRecords((current) => current.map((record) => (record.id === id ? { ...record, status } : record)));
  }

  return (
    <>
      <PageHeader
        eyebrow="Officer console"
        title="Admin dashboard"
        description="Review service applications, monitor workload, and update mock application statuses."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Total applications', value: records.length, icon: ClipboardCheck },
            { label: 'In review', value: records.filter((record) => record.status === 'In Review').length, icon: RefreshCcw },
            { label: 'Approved', value: records.filter((record) => record.status === 'Approved').length, icon: CheckCircle2 },
            { label: 'Active officers', value: '14', icon: UsersRound },
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
              <p className="mt-1 text-sm text-slate-600">Update citizen application status from mock records.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Application</th>
                    <th className="px-5 py-3">Officer</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {records.map((record) => (
                    <tr key={record.id}>
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-950">{record.service}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {record.id} · {record.department}
                        </p>
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-700">{record.officer}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={record.status} />
                      </td>
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
                <h2 className="font-bold text-slate-950">Department workload</h2>
                <p className="text-sm text-slate-600">Mock operational view</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              {records.map((record) => (
                <div key={record.id}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold text-slate-700">{record.department}</span>
                    <span className="font-bold text-civic-700">{record.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded bg-slate-100">
                    <div className="h-full rounded bg-civic-600" style={{ width: `${record.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
