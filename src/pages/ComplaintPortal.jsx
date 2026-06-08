import { useMemo, useState } from 'react';
import { FiCheckCircle, FiChevronLeft, FiChevronRight, FiMapPin, FiSend } from 'react-icons/fi';
import { MdOutlineReportProblem } from 'react-icons/md';
import FileUploadPreview from '../components/FileUploadPreview.jsx';
import PageHeader from '../components/PageHeader.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { useApp } from '../context/AppContext.jsx';
import { activeCitizen, activeComplaints, activeLocalitySignals, generatedComplaints } from '../data/dataset.js';

const categories = ['Water supply disruption', 'Street light not working', 'Garbage not collected', 'Road pothole'];

export default function ComplaintPortal() {
  const { t } = useApp();
  const [step, setStep] = useState(0);
  const [locality, setLocality] = useState(`${activeCitizen.address.locality}, ${activeCitizen.address.pincode}`);
  const suggestedCategory = useMemo(() => {
    const signal = activeLocalitySignals.find((item) => locality.includes(item.locality)) || activeLocalitySignals[0];
    return signal?.topIssue || categories[0];
  }, [locality]);
  const [category, setCategory] = useState(suggestedCategory);
  const [file, setFile] = useState(null);
  const topComplaints = generatedComplaints.slice(0, 12);
  const wizardSteps = [t('stepLocality'), t('stepCategory'), t('stepUpload'), t('stepReview')];

  function nextStep() {
    setStep((current) => Math.min(current + 1, wizardSteps.length - 1));
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 0));
  }

  return (
    <>
      <PageHeader
        eyebrow={t('complaintEyebrow')}
        title={t('complaintTitle')}
        description={t('complaintDescription')}
        actions={
          <button className="inline-flex items-center gap-2 rounded bg-civic-700 px-4 py-2 text-sm font-bold text-white hover:bg-civic-900">
            <MdOutlineReportProblem size={18} aria-hidden="true" />
            {t('newComplaint')}
          </button>
        }
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
        <aside className="grid gap-6">
          <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 font-bold text-slate-950">
              <FiMapPin className="text-civic-700" aria-hidden="true" />
              {t('localitySuggestions')}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {activeCitizen.address.locality}, {activeCitizen.address.district}
            </p>
            <div className="mt-4 grid gap-3">
              {activeLocalitySignals.map((signal) => (
                <button
                  key={`${signal.locality}-${signal.topIssue}`}
                  className="rounded bg-slate-50 p-3 text-left hover:bg-civic-50 focus:outline-none focus:ring-4 focus:ring-civic-100"
                  onClick={() => {
                    setLocality(`${signal.locality}, ${activeCitizen.address.pincode}`);
                    setCategory(signal.topIssue);
                    setStep(1);
                  }}
                >
                  <p className="font-bold text-slate-950">{signal.locality}</p>
                  <p className="mt-1 text-sm text-slate-600">{signal.suggestion}</p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-civic-700">{signal.riskSignal}</p>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="grid gap-6">
          <div className="rounded border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-950">{t('complaintWizard')}</h2>
              <div className="mt-4 grid gap-2 sm:grid-cols-4">
                {wizardSteps.map((label, index) => (
                  <div
                    key={label}
                    className={`rounded p-3 text-sm font-bold ${
                      index === step ? 'bg-civic-700 text-white' : index < step ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-50 text-slate-600'
                    }`}
                  >
                    {index < step && <FiCheckCircle className="mr-1 inline" aria-hidden="true" />}
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5">
              {step === 0 && (
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-800">{t('locality')}</span>
                  <select
                    value={locality}
                    onChange={(event) => setLocality(event.target.value)}
                    className="rounded border border-slate-300 px-3 py-4 text-base font-semibold text-slate-700"
                  >
                    {[`${activeCitizen.address.locality}, ${activeCitizen.address.pincode}`, ...activeLocalitySignals.map((s) => `${s.locality}, ${activeCitizen.address.pincode}`)].map(
                      (item) => (
                        <option key={item}>{item}</option>
                      ),
                    )}
                  </select>
                </label>
              )}

              {step === 1 && (
                <div className="grid gap-4">
                  <div className="rounded bg-civic-50 p-4 text-civic-900">
                    <p className="text-sm font-bold">{t('autoSuggestion')}</p>
                    <p className="mt-1">{suggestedCategory}</p>
                  </div>
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-slate-800">{t('complaintCategory')}</span>
                    <select
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      className="rounded border border-slate-300 px-3 py-4 text-base font-semibold text-slate-700"
                    >
                      {[suggestedCategory, ...categories].filter((item, index, list) => list.indexOf(item) === index).map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                </div>
              )}

              {step === 2 && <FileUploadPreview onFile={setFile} />}

              {step === 3 && (
                <div className="grid gap-4">
                  <div className="rounded bg-slate-50 p-4">
                    <p className="text-sm font-bold text-slate-500">{t('locality')}</p>
                    <p className="mt-1 font-bold text-slate-950">{locality}</p>
                  </div>
                  <div className="rounded bg-slate-50 p-4">
                    <p className="text-sm font-bold text-slate-500">{t('complaintCategory')}</p>
                    <p className="mt-1 font-bold text-slate-950">{category}</p>
                  </div>
                  <div className="rounded bg-slate-50 p-4">
                    <p className="text-sm font-bold text-slate-500">{t('filePreview')}</p>
                    <p className="mt-1 font-bold text-slate-950">{file?.name || 'No file uploaded'}</p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-wrap justify-between gap-3">
                <button
                  className="inline-flex items-center gap-2 rounded border border-slate-300 bg-white px-5 py-3 font-bold text-slate-800 disabled:opacity-50"
                  onClick={previousStep}
                  disabled={step === 0}
                >
                  <FiChevronLeft aria-hidden="true" />
                  {t('previous')}
                </button>
                {step < wizardSteps.length - 1 ? (
                  <button className="inline-flex items-center gap-2 rounded bg-civic-700 px-5 py-3 font-bold text-white" onClick={nextStep}>
                    {t('next')}
                    <FiChevronRight aria-hidden="true" />
                  </button>
                ) : (
                  <button className="inline-flex items-center gap-2 rounded bg-civic-700 px-5 py-3 font-bold text-white">
                    <FiSend aria-hidden="true" />
                    {t('submitComplaint')}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="rounded border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-200 p-5">
              <MdOutlineReportProblem className="text-civic-700" size={22} aria-hidden="true" />
              <h2 className="text-lg font-bold text-slate-950">{t('complaintQueue')}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  <tr>
                    <th className="px-5 py-3">{t('navComplaints')}</th>
                    <th className="px-5 py-3">{t('locality')}</th>
                    <th className="px-5 py-3">{t('severity')}</th>
                    <th className="px-5 py-3">{t('status')}</th>
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
