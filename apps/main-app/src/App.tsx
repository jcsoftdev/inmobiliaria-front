import './App.css'
import { HeroUIProvider } from '@heroui/system'

import Wrapper from '@components/wrapper'
import PropertiesList from '@modules/properties/properties-list'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <Wrapper className="py-8">
          <h2 className="text-xl">Propiedades</h2>
          <PropertiesList />
        </Wrapper>
      </HeroUIProvider>
    </QueryClientProvider>
  )
}

export default App
