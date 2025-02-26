import { twMerge } from 'tailwind-merge'

export interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Wrapper = ({ children, ...rest }: WrapperProps) => {
  return (
    <div
      {...rest}
      className={twMerge('max-w-[1024px] mx-auto px-4', rest.className ?? '')}
    >
      {children}
    </div>
  )
}

export default Wrapper
