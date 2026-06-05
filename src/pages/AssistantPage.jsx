import { Bot, Send, Sparkles, UserRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import {
  activeApplications,
  activeCitizen,
  activeIdentity,
  activeLocalitySignals,
  datasetStats,
} from '../data/dataset.js';

const quickPrompts = [
  { label: 'How do I apply for a certificate?', key: 'certificate' },
  { label: 'What is my application status?', key: 'status' },
  { label: 'How do I register a complaint?', key: 'complaint' },
  { label: 'Is my Aadhaar/PAN verified?', key: 'identity' },
  { label: 'What complaints are trending near me?', key: 'locality' },
  { label: 'What if a citizen is deceased?', key: 'deceased' },
];

export default function AssistantPage() {
  const responseMap = {
    certificate:
      'Open Apply for Service, choose the category, and use DigiLocker-linked Aadhaar/PAN records to pre-fill identity fields. The synthetic dataset includes income, domicile, caste, tax, welfare, and civic services.',
    status: `${activeApplications[0].id} is currently ${activeApplications[0].status}. The deadline is ${activeApplications[0].deadline}, and the assigned officer is ${activeApplications[0].officer}.`,
    complaint: `Use the Complaint Portal with locality ${activeCitizen.address.locality}, pincode ${activeCitizen.address.pincode}. The portal suggests categories from ${datasetStats.complaints.toLocaleString('en-IN')} generated complaints.`,
    identity: `Aadhaar is ${activeIdentity.aadhaar.status}, PAN is ${activeIdentity.pan.status}, and DigiLocker is ${activeIdentity.digilocker.status} for ${activeCitizen.name}.`,
    locality: `${activeLocalitySignals[0]?.topIssue || 'Civic issues'} is trending near ${activeCitizen.address.district}. Suggested action: ${activeLocalitySignals[0]?.suggestion || 'Route to ward staff.'}`,
    deceased:
      'The admin console simulates deceased citizen account deactivation using a mock Civil Registration System flag. Officers can review the account, freeze new applications, and preserve audit history.',
  };

  const initialMessages = useMemo(
    () => [
      {
        from: 'assistant',
        text: `Namaste. I can query synthetic records for ${datasetStats.citizens.toLocaleString('en-IN')} citizens, ${datasetStats.applications.toLocaleString('en-IN')} applications, and ${datasetStats.complaints.toLocaleString('en-IN')} complaints.`,
      },
    ],
    [datasetStats.applications, datasetStats.citizens, datasetStats.complaints],
  );
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  function respond(key, customText) {
    const citizenMessage = customText || quickPrompts.find((prompt) => prompt.key === key)?.label || input;
    const response =
      responseMap[key] ||
      'I can help with certificates, deadlines, Aadhaar/PAN verification, DigiLocker linking, complaints, locality trends, and account deactivation simulation.';

    setMessages((current) => [
      ...current,
      { from: 'citizen', text: citizenMessage },
      { from: 'assistant', text: response },
    ]);
    setInput('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    const lowered = text.toLowerCase();
    const key = lowered.includes('status')
      ? 'status'
      : lowered.includes('complaint')
        ? 'complaint'
        : lowered.includes('aadhaar') || lowered.includes('pan') || lowered.includes('digilocker')
          ? 'identity'
          : lowered.includes('locality') || lowered.includes('near')
            ? 'locality'
            : lowered.includes('deceased') || lowered.includes('deactivation')
              ? 'deceased'
          : lowered.includes('certificate') || lowered.includes('apply')
            ? 'certificate'
            : undefined;

    respond(key, text);
  }

  return (
    <>
      <PageHeader
        eyebrow="AI service assistant"
        title="Citizen help chatbot"
        description="A mock chatbot interface with predefined responses for common government service questions."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-8">
        <aside className="rounded border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded bg-civic-50 text-civic-700">
              <Sparkles size={22} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-bold text-slate-950">Quick actions</h2>
              <p className="text-sm text-slate-600">Predefined help topics</p>
            </div>
          </div>
          <div className="mt-5 grid gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt.key}
                className="rounded border border-slate-200 px-3 py-3 text-left text-sm font-semibold text-slate-700 hover:border-civic-300 hover:bg-civic-50"
                onClick={() => respond(prompt.key)}
              >
                {prompt.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="flex min-h-[620px] flex-col rounded border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded bg-civic-700 text-white">
                <Bot size={21} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-bold text-slate-950">NagrikSeva AI</h2>
                <p className="text-sm text-slate-600">Mock response engine</p>
              </div>
            </div>
            <span className="rounded bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
              Online
            </span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-5">
            {messages.map((message, index) => {
              const isAssistant = message.from === 'assistant';
              return (
                <div key={`${message.from}-${index}`} className={`flex gap-3 ${isAssistant ? '' : 'justify-end'}`}>
                  {isAssistant && (
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-civic-700 text-white">
                      <Bot size={18} aria-hidden="true" />
                    </span>
                  )}
                  <p
                    className={`max-w-[760px] rounded px-4 py-3 text-sm leading-6 shadow-sm ${
                      isAssistant ? 'bg-white text-slate-700' : 'bg-civic-700 text-white'
                    }`}
                  >
                    {message.text}
                  </p>
                  {!isAssistant && (
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-slate-200 text-slate-700">
                      <UserRound size={18} aria-hidden="true" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <form className="flex gap-3 border-t border-slate-200 p-4" onSubmit={handleSubmit}>
            <input
              className="min-w-0 flex-1 rounded border border-slate-300 px-4 py-3 outline-none focus:border-civic-600 focus:ring-4 focus:ring-civic-100"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about certificates, status, complaints, or login"
            />
            <button
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-civic-700 text-white hover:bg-civic-900"
              type="submit"
              aria-label="Send message"
              title="Send message"
            >
              <Send size={19} aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
