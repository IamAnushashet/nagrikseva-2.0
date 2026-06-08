import { useState } from 'react';
import { FiFile, FiUpload } from 'react-icons/fi';
import { useApp } from '../context/AppContext.jsx';

const maxBytes = 5 * 1024 * 1024;

export default function FileUploadPreview({ onFile }) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const { addMockUpload, t } = useApp();

  function handleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > maxBytes) {
      setError('File must be 5 MB or smaller.');
      return;
    }
    const record = {
      name: file.name,
      type: file.type || 'application/octet-stream',
      size: file.size,
      uploadedAt: new Date().toISOString(),
    };
    setError('');
    setPreview(record);
    addMockUpload(record);
    onFile?.(record);
  }

  return (
    <div className="rounded border border-dashed border-slate-300 bg-slate-50 p-4">
      <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded bg-white p-6 text-center focus-within:ring-4 focus-within:ring-civic-100">
        <FiUpload className="text-civic-700" size={28} aria-hidden="true" />
        <span className="font-bold text-slate-950">{t('uploadEvidence')}</span>
        <span className="text-sm text-slate-600">{t('supportedFiles')}</span>
        <input
          type="file"
          className="sr-only"
          accept="image/*,video/*,application/pdf"
          onChange={handleFile}
          aria-label={t('uploadEvidence')}
        />
      </label>
      {error && <p className="mt-3 text-sm font-bold text-rose-700">{error}</p>}
      {preview && (
        <div className="mt-4 flex items-center gap-3 rounded border border-slate-200 bg-white p-3">
          <FiFile className="text-civic-700" aria-hidden="true" />
          <div>
            <p className="text-sm font-bold text-slate-950">{preview.name}</p>
            <p className="text-xs text-slate-600">
              {(preview.size / 1024).toFixed(1)} KB · {preview.type}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
