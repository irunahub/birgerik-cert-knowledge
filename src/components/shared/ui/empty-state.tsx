import { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('text-center py-12 px-4', className)}>
      {icon && (
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      
      {description && (
        <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
          {description}
        </p>
      )}
      
      {action && <div>{action}</div>}
    </div>
  )
}