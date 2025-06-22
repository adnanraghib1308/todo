import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as storage from 'lib/storage.server'
import  { loader, action } from '../routes/_index'

vi.mock('lib/storage.server', () => ({
  getAllTodos: vi.fn(),
  createTodo: vi.fn(),
  toggleTodo: vi.fn(),
  deleteTodo: vi.fn(),
}))

describe('loader', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('returns todos and stats', async () => {
    vi.spyOn(storage, 'getAllTodos').mockResolvedValue([
      { id: 1, title: 'A', completed: false, priority: 'HIGH', createdAt: new Date() },
      { id: 2, title: 'B', completed: true, priority: 'LOW', createdAt: new Date() }
    ])
    const request = new Request('http://localhost/?sort=priority-asc')
    const result = await loader({ request } as any)
    expect(result.todos).toHaveLength(2)
    expect(result.stats.total).toBe(2)
    expect(result.stats.completed).toBe(1)
    expect(result.stats.pending).toBe(1)
    expect(result.sort).toBe('priority-asc')
  })
})

describe('action', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('creates a todo with valid data', async () => {
    const formData = new FormData()
    formData.set('_action', 'create')
    formData.set('title', 'Test')
    formData.set('priority', 'HIGH')
    vi.spyOn(storage, 'createTodo').mockResolvedValue({ id: 1, title: 'Test', priority: 'HIGH', completed: false, createdAt: new Date() })
    const request = { formData: () => Promise.resolve(formData) }
    const result = await action({ request } as any)
    expect(storage.createTodo).toHaveBeenCalledWith('Test', 'HIGH')
    expect(result).toEqual({ message: 'Action completed successfully' })
  })

  it('throws error on invalid data', async () => {
    const formData = new FormData()
    formData.set('_action', 'create')
    formData.set('title', '')
    formData.set('priority', 'HIGH')
    const request = { formData: () => Promise.resolve(formData) }
    await expect(action({ request } as any)).rejects.toThrow(/Title is required/)
  })

  it('toggles a todo', async () => {
    const formData = new FormData()
    formData.set('_action', 'toggle')
    formData.set('todoId', '5')
    vi.spyOn(storage, 'toggleTodo').mockResolvedValue({
      id: 5,
      title: 'Test Todo',
      completed: true,
      priority: 'MEDIUM',
      createdAt: new Date()
      })
    const request = { formData: () => Promise.resolve(formData) }
    const result = await action({ request } as any)
    expect(storage.toggleTodo).toHaveBeenCalledWith(5)
    expect(result).toEqual({ message: 'Action completed successfully' })
  })

  it('deletes a todo', async () => {
    const formData = new FormData()
    formData.set('_action', 'delete')
    formData.set('todoId', '7')
    vi.spyOn(storage, 'deleteTodo').mockResolvedValue()
    const request = { formData: () => Promise.resolve(formData) }
    const result = await action({ request } as any)
    expect(storage.deleteTodo).toHaveBeenCalledWith(7)
    expect(result).toEqual({ message: 'Action completed successfully' })
  })
})