import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { AddTodo } from './components/AddTodo';
import { FilterBar } from './components/FilterBar';
import { TodoItem } from './components/TodoItem';
import type { Filter } from './types';
import './App.css';

export default function App() {
  const { todos, dispatch } = useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  const counts = {
    all: todos.length,
    active: todos.filter(t => !t.done).length,
    done: todos.filter(t => t.done).length,
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">TODO</h1>

        <AddTodo onAdd={text => dispatch({ type: 'ADD', text })} />

        <FilterBar current={filter} counts={counts} onChange={setFilter} />

        {filtered.length === 0 ? (
          <p className="empty">
            {filter === 'done' ? '完了済みタスクはありません' :
             filter === 'active' ? 'すべて完了しています！' :
             'タスクを追加してください'}
          </p>
        ) : (
          <ul className="todo-list">
            {filtered.map(todo => (
              <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
            ))}
          </ul>
        )}

        {counts.done > 0 && (
          <div className="footer">
            <span className="remaining">{counts.active} 件残り</span>
            <button className="clear-btn" onClick={() => dispatch({ type: 'CLEAR_DONE' })}>
              完了済みを削除 ({counts.done})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
