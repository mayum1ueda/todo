import { useState, useRef, useEffect } from 'react';
import type { Todo, Action } from '../types';

interface Props {
  todo: Todo;
  dispatch: React.Dispatch<Action>;
}

export function TodoItem({ todo, dispatch }: Props) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  function commitEdit() {
    const text = editText.trim();
    if (text && text !== todo.text) {
      dispatch({ type: 'EDIT', id: todo.id, text });
    } else {
      setEditText(todo.text);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') { setEditText(todo.text); setEditing(false); }
  }

  return (
    <li className={`todo-item ${todo.done ? 'done' : ''}`}>
      <input
        type="checkbox"
        className="todo-check"
        checked={todo.done}
        onChange={() => dispatch({ type: 'TOGGLE', id: todo.id })}
      />

      {editing ? (
        <input
          ref={inputRef}
          className="todo-edit-input"
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span
          className="todo-text"
          onDoubleClick={() => !todo.done && setEditing(true)}
          title={todo.done ? undefined : 'ダブルクリックで編集'}
        >
          {todo.text}
        </span>
      )}

      <button
        className="delete-btn"
        onClick={() => dispatch({ type: 'DELETE', id: todo.id })}
        title="削除"
      >
        ✕
      </button>
    </li>
  );
}
