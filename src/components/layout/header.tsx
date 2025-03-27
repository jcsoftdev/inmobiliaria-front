import { twMerge } from 'tailwind-merge'

import Profile from '@components/ui/profile/profile'

interface HeaderProps {
  className?: string
  style?: React.CSSProperties
}

const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <div className={twMerge('', className)} {...props}>
      <Profile />
    </div>
  )
}

export default Header
