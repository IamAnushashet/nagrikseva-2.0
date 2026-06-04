import { ArrowRight, Fingerprint, LockKeyhole, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';

export default function LoginPage() {
  return (
    <>
      <PageHeader
        eyebrow="Citizen authentication"
        title="Secure citizen login"
        description="This prototype presents a mock login flow for OTP, Citizen ID, and digital identity access."
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <aside className="rounded border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Trusted access methods</h2>
          <div className="mt-6 grid gap-4">
            {[
              { icon: Smartphone, title: 'Mobile OTP', text: 'Sign in with a verified mobile number.' },
              { icon: Fingerprint, title: 'Digital Identity', text: 'Use a linked national digital identity profile.' },
              { icon: LockKeyhole, title: 'Citizen ID', text: 'Access saved applications with Citizen ID and PIN.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-3 rounded bg-slate-50 p-4">
                  <Icon className="mt-0.5 text-civic-700" size={22} aria-hidden="true" />
                  <div>
                    <h3 className="font-bold text-slate-950">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        <form className="rounded border border-slate-200 bg-white p-6 shadow-civic">
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-800">Mobile number or Citizen ID</span>
              <input
                className="rounded border border-slate-300 px-4 py-3 outline-none transition focus:border-civic-600 focus:ring-4 focus:ring-civic-100"
                placeholder="Enter mobile number or NS2 Citizen ID"
                defaultValue="NS2-CIT-48291"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-800">One-time password</span>
              <input
                className="rounded border border-slate-300 px-4 py-3 outline-none transition focus:border-civic-600 focus:ring-4 focus:ring-civic-100"
                placeholder="Enter 6-digit OTP"
                defaultValue="204826"
              />
            </label>
            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-civic-700" />
                Remember this device
              </label>
              <button type="button" className="font-bold text-civic-700">
                Resend OTP
              </button>
            </div>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded bg-civic-700 px-5 py-3 text-sm font-bold text-white hover:bg-civic-900"
            >
              Continue to dashboard
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}
