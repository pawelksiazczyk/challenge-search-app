export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

if (!API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not defined in environment variables')
}
