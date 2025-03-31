export type ValidationFunction = () => boolean

export const validations = {
  hasCompanies: () => {
    // Example validation logic
    const companies = JSON.parse(localStorage.getItem('companies') ?? '[]')
    return companies.length > 0
  },
} as const

export type ValidationsKeys = keyof typeof validations
