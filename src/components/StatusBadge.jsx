import { statusClass } from '../utils/status.js';

export default function StatusBadge({ status }) {
  return <span className={`inline-flex rounded px-2.5 py-1 text-xs font-bold ${statusClass(status)}`}>{status}</span>;
}
