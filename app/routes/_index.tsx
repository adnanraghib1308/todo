import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getAllTodos, createTodo, toggleTodo, deleteTodo } from "lib/storage.server";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import SortControls from "../components/SortControls";
import { CheckSquare } from 'lucide-react'
import { z } from "zod";

export const meta: MetaFunction = () => {
  return [
    { title: "Todo APP" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const sort = url.searchParams.get('sort') || 'priority-desc'
  
  const todos = await getAllTodos(sort === 'priority-asc' ? 'asc' : 'desc');

  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length,
  }

  return { todos, sort, stats }
}

const TodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const action = formData.get('_action');

  switch (action) {
    case 'create': {
      const rawData = {
        title: formData.get('title'),
        priority: formData.get('priority'),
      };

      const result = TodoSchema.safeParse(rawData);

      if (!result.success) {
        // You can return errors to the client if needed
        throw new Error(result.error.errors[0].message);
      }

      const { title, priority } = result.data;
      await createTodo(title.trim(), priority);
      break;
    }

    case 'toggle': {
      const todoId = formData.get('todoId') as string;
      await toggleTodo(parseInt(todoId));
      break;
    }

    case 'delete': {
      const todoId = formData.get('todoId') as string;
      await deleteTodo(parseInt(todoId));
      break;
    }
  }
  return { message: 'Action completed successfully' };
}

export default function Index() {
  const { todos, sort, stats } = useLoaderData<typeof loader>()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* <CheckSquare size={32} className="text-white" /> */}
            <h1 className="text-4xl font-bold text-white">Todo APP</h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-white/70 text-sm">Total Tasks</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
            <div className="text-white/70 text-sm">Completed</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.pending}</div>
            <div className="text-white/70 text-sm">Pending</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Todo Form */}
          <div className="lg:col-span-1">
            <TodoForm />
          </div>

          {/* Todo List */}
          <div className="lg:col-span-2 space-y-6">
            <SortControls currentSort={sort} />
            
            <div className="space-y-4">
              {todos.length === 0 ? (
                <div className="glass rounded-xl p-8 text-center">
                  <CheckSquare size={48} className="text-white/40 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No todos yet</h3>
                  <p className="text-white/60">Create your first todo to get started!</p>
                </div>
              ) : (
                todos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}