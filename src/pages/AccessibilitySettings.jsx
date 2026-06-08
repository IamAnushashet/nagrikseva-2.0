import { FiCheckCircle } from 'react-icons/fi';
import PageHeader from '../components/PageHeader.jsx';
import { useApp } from '../context/AppContext.jsx';

const settings = [
  ['highContrast', 'highContrast'],
  ['largeText', 'largeText'],
  ['simpleNavigation', 'simpleNavigation'],
  ['voiceGuidance', 'voiceGuidance'],
  ['colorBlind', 'colorBlind'],
];

export default function AccessibilitySettings() {
  const { accessibility, setAccessibility, t } = useApp();

  return (
    <>
      <PageHeader eyebrow={t('navAccessibility')} title={t('accessibilityTitle')} description={t('accessibilityDescription')} />
      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-3">
            {settings.map(([key, label]) => (
              <label key={key} className="flex items-center justify-between gap-4 rounded bg-slate-50 p-4">
                <span className="font-bold text-slate-950">{t(label)}</span>
                <input
                  type="checkbox"
                  checked={accessibility[key]}
                  onChange={(event) => setAccessibility((current) => ({ ...current, [key]: event.target.checked }))}
                  className="h-6 w-6 rounded border-slate-300 text-civic-700"
                />
              </label>
            ))}
          </div>
          <div className="mt-6 rounded bg-civic-50 p-4 text-civic-900">
            <p className="flex items-center gap-2 font-bold">
              <FiCheckCircle aria-hidden="true" />
              {t('keyboardHelp')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
