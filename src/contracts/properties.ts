export interface Property {
  id: number
  title: string
  description: string
  type: string
  price: string
  location: {
    type: 'Point'
    coordinates: [number, number]
    address: string
  }
  features: {
    name: string
    value: string
  }[]
  status: string
  user_id: number
  created_at: string
}
