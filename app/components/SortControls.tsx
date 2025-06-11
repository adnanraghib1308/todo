import { Form } from '@remix-run/react'

interface SortControlsProps {
  currentSort: string
}

export default function SortControls({ currentSort }: SortControlsProps) {

  return (
    <div className="glass rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-white/90 font-medium">Sort Options</span>
        
        <div className="flex gap-2">
          <Form method="get">
            <input type="hidden" name="sort" value="priority-desc" />
            <button
              type="submit"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                currentSort === 'priority-desc'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              High → Low
            </button>
          </Form>
          
          <Form method="get">
            <input type="hidden" name="sort" value="priority-asc" />
            <button
              type="submit"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                currentSort === 'priority-asc'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              Low → High
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}