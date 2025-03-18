export const formatDate = (isoString?: string) => {
  if (!isoString) return ''
  try {
    const [year, month, day] = isoString.split('T')[0].split('-')
    return `${day}/${month}/${year}`
  } catch {
    return ''
  }
}

export const formatDateToISOString = (date?: string | null): string => {
  return date ? new Date(date).toISOString() : ''
}
