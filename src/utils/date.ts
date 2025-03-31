const defaultConfig: FormatDateOptions = {
  formatOptions: {
    month: '2-digit',
    year: 'numeric',
    day: '2-digit',
    formatMatcher: 'best fit',
  },
  separator: '/',
  order: ['day', 'month', 'year'],
  locale: 'es-MX',
}

type FormatDateOptions = {
  formatOptions?: Intl.DateTimeFormatOptions
  separator?: string
  order?: ('day' | 'month' | 'year')[]
  locale?: string
}

export const formatDate = (
  isoString?: string,
  options: FormatDateOptions = defaultConfig,
) => {
  if (!isoString) return ''
  try {
    const { formatOptions, separator, order, locale } = {
      ...defaultConfig,
      ...options,
    }
    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat(locale, formatOptions)
    const formattedParts = formatter.formatToParts(date)
    const dateParts: Record<string, string> = {}
    formattedParts.forEach((part) => {
      if (!(part.type in dateParts)) {
        dateParts[part.type] = part.value
      }
    })

    return order?.map((part) => dateParts[part] || '').join(separator)
  } catch (error) {
    console.log('Error formatting date', isoString, error)
    return ''
  }
}

export const formatDateToISOString = (date?: string | null): string => {
  return date ? new Date(date).toISOString() : ''
}
