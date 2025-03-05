import { useCallback, useEffect, useState } from 'react'

export type SetValue<T> = (newValue: T) => void

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] => {
  const getJsonOrString = useCallback((value: T | null) => {
    try {
      return JSON.parse((value as string) ?? '')
    } catch {
      return value
    }
  }, [])

  const initializeStorage = (value: T) => {
    if (localStorage.getItem(key) === null) {
      if (typeof value === 'string') {
        localStorage.setItem(key, value)
        return value
      } else {
        localStorage.setItem(key, JSON.stringify(value))
        return value
      }
    }
    return getJsonOrString(localStorage.getItem(key) as T)
  }
  const [value, setValue] = useState<T>(() => initializeStorage(initialValue))

  useEffect(() => {
    const storedValue = localStorage.getItem(key) as T | null
    if (storedValue) {
      setValue(getJsonOrString(storedValue))
    }
  }, [getJsonOrString, key])

  // observer to localStorage
  useEffect(() => {
    const listener = (e: StorageEvent) => {
      console.log({ e })
      if (e.key === key) {
        setValue(getJsonOrString(e.newValue as T))
      }
    }
    window.addEventListener('storage', listener)
    return () => window.removeEventListener('storage', listener)
  }, [getJsonOrString, key])

  const setValueAndStore = (newValue: T) => {
    setValue(newValue)
    localStorage.setItem(key, getJsonOrString(newValue))
  }

  return [value, setValueAndStore]
}
