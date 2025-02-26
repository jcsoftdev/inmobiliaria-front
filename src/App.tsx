import './App.css'

import { ToastProvider } from '@heroui/react'
import { HeroUIProvider } from '@heroui/system'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createPortal } from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router'

import { Footer, Header, Layout, Sidebar } from '@components/layout'
import { Dashboard } from '@components/modules/dashboard'
import { PropertiesModule } from '@components/modules/properties'

const client = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <HeroUIProvider>
          {createPortal(<ToastProvider placement="top-right" />, document.body)}
          <Layout footer={Footer} header={Header} sidebar={Sidebar}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/properties" element={<PropertiesModule />} />
            </Routes>
          </Layout>
        </HeroUIProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
