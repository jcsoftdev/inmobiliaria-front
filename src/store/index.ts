import { useAgenciesStore } from '@store/agencies.store'
import { usePropertiesStore } from '@store/properties.store'

export const useAppStore = () => ({
  properties: usePropertiesStore(),
  agencies: useAgenciesStore(),
})

export default useAppStore
