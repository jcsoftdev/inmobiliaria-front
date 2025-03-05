import './App.css'

import { ToastProvider } from '@heroui/react'
import { HeroUIProvider } from '@heroui/system'
import { Router } from '@router/Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createPortal } from 'react-dom'
import { BrowserRouter } from 'react-router'

const client = new QueryClient()

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
