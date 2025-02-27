import { useAppStore } from '@store/index'

const Dashboard = () => {
  const { properties } = useAppStore()
  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Properties</h2>
      <pre>{JSON.stringify(properties, null, 2)}</pre>
    </div>
  )
}

export default Dashboard
