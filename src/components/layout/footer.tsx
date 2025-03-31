import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

interface FooterProps {
  className?: string
  style?: React.CSSProperties
}
const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <div
      className={twMerge(
        'flex flex-col justify-center bg-white min-h-[57px]',
        className,
      )}
      {...props}
    >
      <p className="text-center text-gray-500 text-sm">
        All rights reserved &copy; {new Date().getFullYear()}
      </p>
    </div>
  )
}

export default memo(Footer)
