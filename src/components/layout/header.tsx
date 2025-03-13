import { twMerge } from 'tailwind-merge'

interface HeaderProps {
  className?: string
  style?: React.CSSProperties
}

const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <div className={twMerge('', className)} {...props}>
      header
    </div>
  )
}

export default Header
