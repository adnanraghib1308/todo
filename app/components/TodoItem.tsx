import { Form } from '@remix-run/react'
import { Priority } from '~/types/todo'
import { Check, Trash2 } from 'lucide-react'
import PriorityBadge from './PriorityBadge'

interface Todo {
  id: string
  title: string
  completed: boolean
  priority: Priority
  createdAt: string
}

interface TodoItemProps {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <div className={`glass rounded-xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01] ${
      todo.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Form method="post" className="flex-shrink-0">
            <input type="hidden" name="todoId" value={todo.id} />
            <button
              type="submit"
              name="_action"
              value="toggle"
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                todo.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-white/40 hover:border-white/60'
              }`}
            >
              {todo.completed && <Check size={14} />}
            </button>
          </Form>
          
          <div className="flex-1">
            <h3 className={`text-white font-medium transition-all duration-200 ${
              todo.completed ? 'line-through text-white/60' : ''
            }`}>
              {todo.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <PriorityBadge priority={todo.priority} />
              <span className="text-white/50 text-xs">
                {new Date(todo.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        <Form method="post" className="flex-shrink-0">
          <input type="hidden" name="todoId" value={todo.id} />
          <button
            type="submit"
            name="_action"
            value="delete"
            className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200 hover:scale-110"
          >
            <Trash2 size={16} />
          </button>
        </Form>
      </div>
    </div>
  )
}