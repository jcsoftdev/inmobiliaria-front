import { Input } from '@heroui/react'
import { useRef, useEffect, useState } from 'react'

import SearchIcon from '@components/icons/search'

import { useDebounce } from '@hooks/use-debounce'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Buscar...',
  className = 'max-w-sm',
}: SearchBarProps) => {
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const [localValue, setLocalValue] = useState(value)
  const debouncedValue = useDebounce(localValue, 500)
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    onChange(debouncedValue)
  }, [debouncedValue, onChange, value])

  return (
    <div className="flex-1 flex justify-center text-primary">
      <Input
        ref={searchInputRef}
        labelPlacement="outside"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        startContent={<SearchIcon className="w-4" />}
        variant="bordered"
        className={className}
        color="primary"
      />
    </div>
  )
}

export default SearchBar
