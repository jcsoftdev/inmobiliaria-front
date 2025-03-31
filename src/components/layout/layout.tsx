import { FunctionComponent, useMemo, Suspense } from 'react'
import { Outlet } from 'react-router'

interface LayoutProps {
  header: FunctionComponent<{
    className?: string
    style?: React.CSSProperties
  }>
  sidebar: FunctionComponent<{
    className?: string
    style?: React.CSSProperties
  }>
  footer: FunctionComponent<{
    className?: string
    style?: React.CSSProperties
  }>
  children?: React.ReactNode
}

const Layout = ({
  footer: Footer,
  header: Header,
  sidebar: Sidebar,
  children,
}: LayoutProps) => {
  const gridAreas = useMemo(
    () => `'sidebar header''sidebar main''sidebar footer'`,
    [],
  )

  const sidebarProps = useMemo(
    () => ({
      className: 'bg-sky-900 text-white',
      style: { gridArea: 'sidebar' },
    }),
    [],
  )

  const headerProps = useMemo(
    () => ({
      className: 'bg-white text-center',
      style: { gridArea: 'header' },
    }),
    [],
  )

  const footerProps = useMemo(
    () => ({
      className: 'bg-white text-center',
      style: { gridArea: 'footer' },
    }),
    [],
  )

  return (
    <div
      className="grid grid-cols-[255px_1fr] grid-rows-[64px_1fr_57px] gap-0 ] h-[100dvh] max-h-[100dvh] overflow-hidden"
      style={{ gridTemplateAreas: gridAreas }}
    >
      <Sidebar {...sidebarProps} />
      <Header {...headerProps} />
      <div
        className="bg-gray-100 text-center p-4 md:px-10 overflow-scroll"
        style={{ gridArea: 'main' }}
      >
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-700"></div>
            </div>
          }
        >
          <div className="max-w-[70vw] mx-auto">
            {children}
            <Outlet />
          </div>
        </Suspense>
      </div>
      <Footer {...footerProps} />
    </div>
  )
}

export default Layout
