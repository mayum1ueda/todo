export interface Todo {
  id: number;
  text: string;
  done: boolean;
  createdAt: number;
}

export type Filter = 'all' | 'active' | 'done';

export type Action =
  | { type: 'ADD'; text: string }
  | { type: 'TOGGLE'; id: number }
  | { type: 'DELETE'; id: number }
  | { type: 'EDIT'; id: number; text: string }
  | { type: 'CLEAR_DONE' };
