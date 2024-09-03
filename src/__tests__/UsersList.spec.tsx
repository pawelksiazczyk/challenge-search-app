import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UsersList from '@/components/UserList'
import { describe, expect, it, vi } from 'vitest'
import { useGetUsers } from '@/hooks/users/useGetUsers'

const queryClient = new QueryClient()

vi.mock('@/hooks/users/useGetUsers', () => ({
  useGetUsers: vi.fn(),
}))

describe('UsersList', () => {
  it('renders loading state', () => {
    vi.mocked(useGetUsers).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    } as any)

    render(
      <QueryClientProvider client={queryClient}>
        <UsersList searchQuery="" currentPage={1} onPageChange={() => {}} />
      </QueryClientProvider>
    )

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
  })

  it('renders error state', () => {
    vi.mocked(useGetUsers).mockReturnValue({
      data: undefined,
      error: new Error('Failed to fetch'),
      isLoading: false,
    } as any)

    render(
      <QueryClientProvider client={queryClient}>
        <UsersList searchQuery="" currentPage={1} onPageChange={() => {}} />
      </QueryClientProvider>
    )

    expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument()
  })

  it('renders users', () => {
    vi.mocked(useGetUsers).mockReturnValue({
      data: {
        users: [
          { id: 1, name: 'User 1' },
          { id: 2, name: 'User 2' },
        ],
        total: 2,
      },
      error: null,
      isLoading: false,
    } as any)

    render(
      <QueryClientProvider client={queryClient}>
        <UsersList searchQuery="" currentPage={1} onPageChange={() => {}} />
      </QueryClientProvider>
    )

    expect(screen.getByText('User 1')).toBeInTheDocument()
    expect(screen.getByText('User 2')).toBeInTheDocument()
  })

  it('renders no results message', () => {
    vi.mocked(useGetUsers).mockReturnValue({
      data: { users: [], total: 0 },
      error: null,
      isLoading: false,
    } as any)

    render(
      <QueryClientProvider client={queryClient}>
        <UsersList searchQuery="test" currentPage={1} onPageChange={() => {}} />
      </QueryClientProvider>
    )

    expect(screen.getByText(/No users found for "test"/i)).toBeInTheDocument()
  })
})
