import type { Filter } from '../types';

interface Props {
  current: Filter;
  counts: { all: number; active: number; done: number };
  onChange: (f: Filter) => void;
}

const LABELS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'すべて' },
  { key: 'active', label: '未完了' },
  { key: 'done', label: '完了' },
];

export function FilterBar({ current, counts, onChange }: Props) {
  return (
    <div className="filter-bar">
      {LABELS.map(({ key, label }) => (
        <button
          key={key}
          className={`filter-btn ${current === key ? 'active' : ''}`}
          onClick={() => onChange(key)}
        >
          {label}
          <span className="filter-count">{counts[key]}</span>
        </button>
      ))}
    </div>
  );
}
