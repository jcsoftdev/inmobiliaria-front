import { usePropertiesStore } from '@store/properties.store'

const Dashboard = () => {
  const properties = usePropertiesStore()
  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Properties</h2>
      <pre>{JSON.stringify(properties, null, 2)}</pre>
    </div>
  )
}

export default Dashboard
