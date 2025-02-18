import { twMerge } from "tailwind-merge"

export type AlertVariants = 'info' | 'danger' | 'success' | 'warning' | 'dark'

interface AlertProps {
  children?: React.ReactNode
  variant?: AlertVariants
  className?: string
}




const alertColors: Record<AlertVariants, string> = {
  info: 'p-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400',
  danger: 'p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400',
  success: 'p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400',
  warning: 'p-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300',
  dark: 'p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300',
}

export const Alert = ({children, variant='info', className}: AlertProps) => {
  return (
    <div>
      <div>
        <div
          className={twMerge(alertColors[variant], className)}
          role="alert"
        >
          {children}
        </div>
        
      </div>
    </div>
  )
}

export default Alert
