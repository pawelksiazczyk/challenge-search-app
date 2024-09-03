import { renderHook, waitFor } from '@testing-library/react'
import { useGetPosts } from '@/hooks/posts/useGetPosts'
import { describe, expect, it, vi } from 'vitest'

import axios from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

vi.mock('axios')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

describe('useGetPosts', () => {
  it('should fetch posts successfully', async () => {
    const mockData = {
      data: [{ id: 1, title: 'Test Post' }],
      headers: { 'x-total-count': '1' },
    }
    vi.mocked(axios.get).mockResolvedValueOnce(mockData)

    const { result } = renderHook(
      () => useGetPosts({ start: 0, limit: 10, searchQuery: '' }),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      }
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual({
      posts: [{ id: 1, title: 'Test Post' }],
      total: 1,
    })
  })

  it('should handle errors', async () => {
    vi.mocked(axios.get).mockRejectedValueOnce(new Error('API Error'))

    const { result } = renderHook(
      () => useGetPosts({ start: 0, limit: 10, searchQuery: '' }),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      }
    )

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error?.message).toBe('API Error')
  })
})
