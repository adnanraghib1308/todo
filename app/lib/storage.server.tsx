import { Todo, Priority } from '~/types/todo'

// In-memory storage for todos
let todos: Todo[] = [
  {
    id: '1',
    title: 'Complete the project documentation',
    priority: 'HIGH',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Review pull requests',
    priority: 'MEDIUM',
    completed: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: '3',
    title: 'Update dependencies',
    priority: 'LOW',
    completed: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    id: '4',
    title: 'Plan next sprint',
    priority: 'HIGH',
    completed: false,
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
  },
  {
    id: '5',
    title: 'Clean up old branches',
    priority: 'LOW',
    completed: true,
    createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
  },
]

export function getAllTodos(): Todo[] {
  return todos
}

export function createTodo(title: string, priority: Priority): Todo {
  const newTodo: Todo = {
    id: Date.now().toString(),
    title,
    priority,
    completed: false,
    createdAt: new Date().toISOString(),
  }
  
  todos.unshift(newTodo)
  return newTodo
}

export function toggleTodo(id: string): Todo | null {
  const todo = todos.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
    return todo
  }
  return null
}

export function deleteTodo(id: string): boolean {
  const index = todos.findIndex(t => t.id === id)
  if (index !== -1) {
    todos.splice(index, 1)
    return true
  }
  return false
}

export function sortTodos(sortType: string): Todo[] {
  const sortedTodos = [...todos]
  
  if (sortType === 'priority-asc') {
    return sortedTodos.sort((a, b) => {
      const priorityOrder = { LOW: 1, MEDIUM: 2, HIGH: 3 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })
  } else if (sortType === 'priority-desc') {
    return sortedTodos.sort((a, b) => {
      const priorityOrder = { LOW: 1, MEDIUM: 2, HIGH: 3 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
  }
  
  return sortedTodos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}