import { FunctionComponent } from 'react'

interface LayoutProps {
  children: React.ReactNode
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
}

const Layout = ({
  children,
  footer: Footer,
  header: Header,
  sidebar: Sidebar,
}: LayoutProps) => {
  const gridAreas = `'sidebar header''sidebar main''sidebar footer'`
  return (
    <div
      className="grid grid-cols-[255px_1fr] grid-rows-[64px_1fr_57px] gap-0 ] h-[100dvh] "
      style={{ gridTemplateAreas: gridAreas }}
    >
      <Sidebar
        className="bg-sky-900 text-white"
        style={{ gridArea: 'sidebar' }}
      />
      <Header className="bg-white text-center" style={{ gridArea: 'header' }} />
      <div
        className="bg-gray-100 text-center p-4 md:px-10"
        style={{ gridArea: 'main' }}
      >
        <div className="max-w-[70vw] mx-auto">{children}</div>
      </div>
      <Footer className="bg-white text-center" style={{ gridArea: 'footer' }} />
    </div>
  )
}

export default Layout
