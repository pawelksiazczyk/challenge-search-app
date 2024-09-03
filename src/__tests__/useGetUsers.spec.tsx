import { renderHook, waitFor } from '@testing-library/react'
import { useGetUsers } from '@/hooks/users/useGetUsers'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'

vi.mock('axios')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

describe('useGetUsers', () => {
  beforeEach(() => {
    queryClient.clear()
  })

  it('should fetch users successfully', async () => {
    const mockData = {
      data: [{ id: 1, name: 'Test User' }],
      headers: { 'x-total-count': '1' },
    }
    vi.mocked(axios.get).mockResolvedValueOnce(mockData)

    const { result } = renderHook(
      () => useGetUsers({ start: 0, limit: 10, searchQuery: '' }),
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
      users: [{ id: 1, name: 'Test User' }],
      total: 1,
    })
  })

  it('should handle errors', async () => {
    vi.mocked(axios.get).mockRejectedValueOnce(new Error('API Error'))

    const { result } = renderHook(
      () => useGetUsers({ start: 0, limit: 10, searchQuery: '' }),
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

  it('should use search query in API call', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({
      data: [],
      headers: { 'x-total-count': '0' },
    })

    renderHook(
      () => useGetUsers({ start: 0, limit: 10, searchQuery: 'test' }),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      }
    )

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({
            name_like: 'test',
          }),
        })
      )
    })
  })

  it('should handle pagination correctly', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({
      data: [{ id: 11, name: 'User 11' }],
      headers: { 'x-total-count': '20' },
    })

    const { result } = renderHook(
      () => useGetUsers({ start: 10, limit: 10, searchQuery: '' }),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      }
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(axios.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        params: expect.objectContaining({
          _start: 10,
          _limit: 10,
        }),
      })
    )

    expect(result.current.data?.total).toBe(20)
  })
})
