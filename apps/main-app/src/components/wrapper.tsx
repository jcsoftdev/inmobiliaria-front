import { mergeClasses } from '@libs/utils'

export interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Wrapper = ({ children, ...rest }: WrapperProps) => {

  return (
    <div
      {...rest}
      className={mergeClasses(
        'max-w-[1024px] mx-auto px-4',
        rest.className ?? ''
      )}
    >
      {children}
    </div>
  )
}

export default Wrapper
