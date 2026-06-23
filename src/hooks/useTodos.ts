import { useReducer, useEffect } from 'react';
import type { Todo, Action } from '../types';

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD':
      return [{ id: Date.now(), text: action.text, done: false, createdAt: Date.now() }, ...state];
    case 'TOGGLE':
      return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t);
    case 'DELETE':
      return state.filter(t => t.id !== action.id);
    case 'EDIT':
      return state.map(t => t.id === action.id ? { ...t, text: action.text } : t);
    case 'CLEAR_DONE':
      return state.filter(t => !t.done);
    default:
      return state;
  }
}

const STORAGE_KEY = 'todos-v1';

function load(): Todo[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function useTodos() {
  const [todos, dispatch] = useReducer(reducer, undefined, load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  return { todos, dispatch };
}
