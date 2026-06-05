import { Languages } from 'lucide-react';
import { useState } from 'react';

const languageOptions = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'kn', label: 'Kannada' },
  { code: 'ta', label: 'Tamil' },
];

export default function LanguageSelector({ compact = false }) {
  const [language, setLanguage] = useState('en');

  return (
    <label className={`flex items-center gap-2 ${compact ? 'w-full' : ''}`}>
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-slate-200 text-slate-600"
        title="Language"
      >
        <Languages size={18} aria-hidden="true" />
      </span>
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        className="h-10 rounded border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 outline-none focus:border-civic-600 focus:ring-4 focus:ring-civic-100"
        aria-label="Select language"
      >
        {languageOptions.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
