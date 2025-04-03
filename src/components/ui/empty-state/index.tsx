import { Button } from '@heroui/button'
import { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  icon?: ReactNode
}

const EmptyState = ({ title, description, action, icon }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center">
        {icon && <div className="mb-4">{icon}</div>}
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
        {action && (
          <div className="mt-6">
            <Button color="primary" onPress={action.onClick}>
              {action.label}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmptyState
