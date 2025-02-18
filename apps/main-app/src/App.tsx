import { useState } from 'react'
import { Button } from '@libs/ui'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button  onClick={() => setCount(count + 1)}>
        Count: {count}
      </Button>
      <Button variant='green' onClick={() => setCount(count + 1)}>
        Count: {count}
      </Button>
      <Button variant='light'  onClick={() => setCount(count + 1)}>
        Count: {count}
      </Button>
      <Button variant='alternative'  onClick={() => setCount(count + 1)}>
        Count: {count}
      </Button>
    </>
  )
}

export default App
