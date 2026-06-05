import { Lightbulb, MapPinned, MessageSquareWarning, PlusCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { activeCitizen, activeComplaints, activeLocalitySignals, generatedComplaints } from '../data/dataset.js';

export default function ComplaintPortal() {
  const topComplaints = generatedComplaints.slice(0, 12);

  return (
    <>
      <PageHeader
        eyebrow="Civic grievance"
        title="Complaint portal"
        description="Register locality complaints and view intelligence-led suggestions based on synthetic complaint trends."
        actions={
          <button className="inline-flex items-center gap-2 rounded bg-civic-700 px-4 py-2 text-sm font-bold text-white hover:bg-civic-900">
            <PlusCircle size={17} aria-hidden="true" />
            New complaint
          </button>
        }
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
        <aside className="grid gap-6">
          <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 font-bold text-slate-950">
              <MapPinned size={20} className="text-civic-700" aria-hidden="true" />
              Locality suggestions
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Current profile locality: {activeCitizen.address.locality}, {activeCitizen.address.district}.
            </p>
            <div className="mt-4 grid gap-3">
              {activeLocalitySignals.map((signal) => (
                <div key={`${signal.locality}-${signal.topIssue}`} className="rounded bg-slate-50 p-3">
                  <p className="font-bold text-slate-950">{signal.locality}</p>
                  <p className="mt-1 text-sm text-slate-600">{signal.suggestion}</p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-civic-700">
                    {signal.riskSignal}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 font-bold text-slate-950">
              <Lightbulb size={20} className="text-civic-700" aria-hidden="true" />
              Smart filing assist
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Based on nearby reports, pre-select the ward, suggest photo evidence, and route sanitation, lighting, or
              water issues to the correct civic team.
            </p>
          </div>
        </aside>

        <div className="grid gap-6">
          <div className="rounded border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-950">Register complaint</h2>
              <p className="mt-1 text-sm text-slate-600">Mock form with locality-aware defaults.</p>
            </div>
            <div className="grid gap-4 p-5 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-bold text-slate-800">Complaint category</span>
                <select className="rounded border border-slate-300 px-3 py-3 text-sm font-semibold text-slate-700">
                  <option>{activeLocalitySignals[0]?.topIssue || 'Water supply disruption'}</option>
                  <option>Street light not working</option>
                  <option>Garbage not collected</option>
                  <option>Road pothole</option>
                </select>
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-bold text-slate-800">Locality</span>
                <input
                  className="rounded border border-slate-300 px-3 py-3 text-sm font-semibold text-slate-700"
                  defaultValue={`${activeCitizen.address.locality}, ${activeCitizen.address.pincode}`}
                />
              </label>
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm font-bold text-slate-800">Description</span>
                <textarea
                  className="min-h-28 rounded border border-slate-300 px-3 py-3 text-sm text-slate-700"
                  defaultValue="Repeated issue observed near the main road. Please assign ward staff for inspection."
                />
              </label>
            </div>
          </div>

          <div className="rounded border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-200 p-5">
              <MessageSquareWarning size={20} className="text-civic-700" aria-hidden="true" />
              <h2 className="text-lg font-bold text-slate-950">Complaint queue</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Complaint</th>
                    <th className="px-5 py-3">Locality</th>
                    <th className="px-5 py-3">Severity</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[...activeComplaints, ...topComplaints].slice(0, 10).map((complaint) => (
                    <tr key={complaint.id}>
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-950">{complaint.category}</p>
                        <p className="mt-1 text-xs text-slate-500">{complaint.id}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {complaint.locality}, {complaint.district}
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-700">{complaint.severity}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={complaint.status} />
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
