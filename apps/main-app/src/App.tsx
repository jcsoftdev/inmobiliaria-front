import { Layout } from '@components/layout'
import './App.css'
import { HeroUIProvider } from '@heroui/system'
import Footer from '@components/layout/footer'
import Header from '@components/layout/header'
import Sidebar from '@components/layout/sidebar'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Dashboard } from '@components/modules/dashboard'
import { PropertiesModule } from '@components/modules/properties'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <HeroUIProvider>
          <Layout footer={Footer} header={Header} sidebar={Sidebar}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/properties" element={<PropertiesModule />} />
              {/* <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<RecentActivity />} />
              <Route path="project/:id" element={<Project />} />
              </Route> */}
            </Routes>
          </Layout>
        </HeroUIProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
