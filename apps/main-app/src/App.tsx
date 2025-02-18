import { useState } from 'react'
import { Button, Alert } from '@libs/ui'
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

      <Alert variant='warning' className='mb-4'>
        
        
        <a href="https://flowbite.com/application-ui/demo/users/list/"><span className="font-medium">Check more here</span></a>
      </Alert>
    </>
  )
}

export default App
