import { Priority } from '~/types/todo'

interface PriorityBadgeProps {
  priority: string
  className?: string
}

const priorityConfig: any = {
  HIGH: {
    label: 'High',
    className: 'bg-red-100 text-red-800 border-red-200',
    dotClassName: 'bg-red-500'
  },
  MEDIUM: {
    label: 'Medium',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    dotClassName: 'bg-yellow-500'
  },
  LOW: {
    label: 'Low',
    className: 'bg-green-100 text-green-800 border-green-200',
    dotClassName: 'bg-green-500'
  }
}

export default function PriorityBadge({ priority, className = '' }: PriorityBadgeProps) {
  const config = priorityConfig[priority]
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.className} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClassName}`}></span>
      {config.label}
    </span>
  )
}