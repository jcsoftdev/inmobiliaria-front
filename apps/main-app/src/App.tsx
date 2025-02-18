import './App.css'
import { HeroUIProvider } from '@heroui/system'

import { Button } from '@heroui/react'
import { formatDate } from '@libs/utils'
function App() {
  return (
    <HeroUIProvider>
      <div className="App">
      <Button color="default">Default</Button>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="danger">
        {formatDate(new Date())}
      </Button>
      </div>
    </HeroUIProvider>
  )
}

export default App
