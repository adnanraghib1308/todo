export type Priority = 'LOW' | 'MEDIUM' | 'HIGH'

export interface Todo {
  id: string
  title: string
  completed: boolean
  priority: Priority
  createdAt: string
}