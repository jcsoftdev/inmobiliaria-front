import { useCallback, useEffect, useRef, useState } from 'react'

export type SetValue<T> = (newValue: T) => Promise<void>
const BROADCAST_CHANNEL_NAME = 'indexedDB-storage-channel'

const openDB = async (
  dbName: string,
  storeName: string,
): Promise<IDBDatabase> => {
  const { promise, resolve, reject } = Promise.withResolvers<IDBDatabase>()
  const request = indexedDB.open(dbName)

  request.onupgradeneeded = () => {
    const db = request.result
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName)
    }
  }

  request.onsuccess = () => resolve(request.result)
  request.onerror = () =>
    reject(new Error(request.error?.message ?? 'Unknown error occurred'))

  return promise
}

const getFromDB = async <T>(
  dbName: string,
  storeName: string,
  key: string,
): Promise<T> => {
  const db = await openDB(dbName, storeName)
  const { promise, resolve, reject } = Promise.withResolvers<T>()

  const transaction = db.transaction(storeName, 'readonly')
  const store = transaction.objectStore(storeName)
  const request = store.get(key)

  request.onsuccess = () => {
    if (request.result === undefined || request.result === null) {
      reject(new Error(`No value found for key: ${key}`))
    } else {
      resolve(request.result)
    }
  }
  request.onerror = () =>
    reject(new Error(request.error?.message ?? 'Unknown error occurred'))

  return promise
}

const setToDB = async <T>(
  dbName: string,
  storeName: string,
  key: string,
  value: T,
): Promise<void> => {
  const db = await openDB(dbName, storeName)
  const { promise, resolve, reject } = Promise.withResolvers<void>()

  const transaction = db.transaction(storeName, 'readwrite')
  const store = transaction.objectStore(storeName)
  const request = store.put(value, key)

  request.onsuccess = () => resolve()
  request.onerror = () =>
    reject(new Error(request.error?.message ?? 'Unknown error occurred'))

  return promise
}

const DB_NAME = 'myAppDB'
const STORE_NAME = 'myStore'

export const useIndexedDBStorage = <T>(
  key: string,
  initialValue: T | null = null,
  dbName: string = DB_NAME,
  storeName: string = STORE_NAME,
): {
  value: T | null
  setValue: SetValue<T>
  error: boolean
} => {
  const [value, setValue] = useState<T | null>(initialValue)
  const initialValueRef = useRef(initialValue)
  const [error, setError] = useState<boolean>(false)
  useEffect(() => {
    const initialize = async () => {
      try {
        const storedValue = await getFromDB<T>(dbName, storeName, key)
        setValue(storedValue)
      } catch (error) {
        setError(true)
        console.error('Error accessing IndexedDB:', error)
        try {
          const db = await openDB(dbName, storeName)
          const transaction = db.transaction(storeName, 'readwrite')
          transaction.objectStore(storeName)
          await setToDB(dbName, storeName, key, initialValueRef.current)
          setError(false)
        } catch (recreateError) {
          setError(true)
          console.error('Failed to recreate IndexedDB:', recreateError)
        }
      }
    }
    initialize()

    const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME)
    channel.onmessage = async (event) => {
      if (event.data.key === key) {
        try {
          const updatedValue = await getFromDB<T>(dbName, storeName, key)
          setValue(updatedValue)
        } catch (error) {
          setError(true)
          console.error('Error fetching updated value from IndexedDB:', error)
        }
      }
    }

    return () => {
      channel.close()
    }
  }, [dbName, storeName, key])

  const setValueAndStore = useCallback(
    async (newValue: T) => {
      setValue(newValue)
      await setToDB(dbName, storeName, key, newValue)

      const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME)
      channel.postMessage({ key, newValue })
      channel.close()
    },
    [dbName, storeName, key],
  )

  return {
    value,
    setValue: setValueAndStore,
    error,
  }
}

export const getFromIndexedDB = async <T>(key: string): Promise<T | null> => {
  return getFromDB<T>(DB_NAME, STORE_NAME, key)
}

export const saveInIndexedDB = async <T>(
  key: string,
  value: T,
): Promise<void> => {
  if (!value) {
    return
  }
  await setToDB(DB_NAME, STORE_NAME, key, value)

  const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME)
  channel.postMessage({ key, newValue: value })
  channel.close()
}
