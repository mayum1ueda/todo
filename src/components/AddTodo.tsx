import { useState, useRef } from 'react';

interface Props {
  onAdd: (text: string) => void;
}

export function AddTodo({ onAdd }: Props) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function submit() {
    const text = value.trim();
    if (!text) return;
    onAdd(text);
    setValue('');
    inputRef.current?.focus();
  }

  return (
    <div className="add-row">
      <input
        ref={inputRef}
        className="add-input"
        placeholder="新しいタスクを入力..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && submit()}
        autoFocus
      />
      <button className="add-btn" onClick={submit}>追加</button>
    </div>
  );
}
