import './App.css'

import { ToastProvider } from '@heroui/react'
import { HeroUIProvider } from '@heroui/system'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createPortal } from 'react-dom'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'

import { Footer, Header, Layout, Sidebar } from '@components/layout'
import { Dashboard } from '@components/modules/dashboard'
import { PropertiesModule } from '@components/modules/properties'
import PropertyForm from '@components/modules/properties/property-form'

const client = new QueryClient()

const Router = () => {
  const location = useLocation()
  const background = location.state?.background
  console.log({ background })
  return (
    <Layout footer={Footer} header={Header} sidebar={Sidebar}>
      <Routes location={background || location}>
        <Route path="/" element={<Dashboard />} />
        <Route path="properties" element={<PropertiesModule />} />
      </Routes>

      {/* Renderizar el modal encima si hay un background */}
      {background && (
        <Routes>
          <Route path="properties/register" element={<PropertyForm />} />
        </Routes>
      )}
    </Layout>
  )
}
function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <HeroUIProvider>
          {createPortal(<ToastProvider placement="top-right" />, document.body)}
          <Router />
        </HeroUIProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
