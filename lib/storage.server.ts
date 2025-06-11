import { Todo, Priority } from '~/types/todo'
import { db } from '../drizzleClient'
import { todos } from 'db/Todos';
import { asc, desc, eq, sql } from 'drizzle-orm';

export async function getAllTodos(order: 'asc' | 'desc' = 'desc') {
  const priorityOrder = order === 'asc'
    ? sql`CASE ${todos.priority} WHEN 'LOW' THEN 1 WHEN 'MEDIUM' THEN 2 WHEN 'HIGH' THEN 3 END`
    : sql`CASE ${todos.priority} WHEN 'HIGH' THEN 1 WHEN 'MEDIUM' THEN 2 WHEN 'LOW' THEN 3 END`;

  const createdAtOrder = order === 'asc' ? asc(todos.createdAt) : desc(todos.createdAt);

  return db
    .select()
    .from(todos)
    .orderBy(priorityOrder, createdAtOrder);
}

export async function createTodo(title: string, priority: Priority) {
  const newTodo = {
    title,
    priority,
    completed: false,
  }
  
  return db.insert(todos).values(newTodo).returning().then(result => result[0]);
}

export async function toggleTodo(id: number) {
  const todo = await db.select().from(todos).where(eq(todos.id, id)).limit(1).then(result => result[0]);
  return db.update(todos)
    .set({ completed: !todo.completed}).where(eq(todos.id, id))
    .returning()
    .then(result => result[0]);
}

export async function deleteTodo(id: number) {
  return db.delete(todos).where(eq(todos.id, id))
}