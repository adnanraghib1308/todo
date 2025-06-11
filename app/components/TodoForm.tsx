import { Form } from '@remix-run/react'
import { Plus } from 'lucide-react'

export default function TodoForm() {
  return (
    <div className="glass rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-white mb-4">Add New Todo</h2>
      
      <Form method="post" className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-white/90 mb-2">
            Todo Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-white/90 mb-2">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            defaultValue="MEDIUM"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
          >
            <option value="LOW" className="bg-gray-800">Low Priority</option>
            <option value="MEDIUM" className="bg-gray-800">Medium Priority</option>
            <option value="HIGH" className="bg-gray-800">High Priority</option>
          </select>
        </div>
        
        <button
          type="submit"
          name="_action"
          value="create"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transform hover:scale-[1.02] transition-all duration-200"
        >
          <Plus size={18} />
          Add Todo
        </button>
      </Form>
    </div>
  )
}