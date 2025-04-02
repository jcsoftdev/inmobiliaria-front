import React, { Suspense, useState, useEffect } from 'react'

const loadedComponents = new Set()

export interface CachedSuspenseProps {
  children: React.ReactNode
  fallback: React.ReactNode
  componentKey: string
}

export const CachedSuspense = ({
  children,
  fallback,
  componentKey,
}: CachedSuspenseProps) => {
  const [isLoaded, setIsLoaded] = useState(loadedComponents.has(componentKey))

  useEffect(() => {
    if (!isLoaded) {
      loadedComponents.add(componentKey)
      setIsLoaded(true)
    }
  }, [componentKey, isLoaded])

  if (isLoaded) {
    return children
  }

  return <Suspense fallback={fallback}>{children}</Suspense>
}

export const FallbackLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-700"></div>
  </div>
)
