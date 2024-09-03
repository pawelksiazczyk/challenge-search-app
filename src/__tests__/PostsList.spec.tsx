import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PostsList from '@/components/PostsList'
import { describe, expect, it, vi } from 'vitest'
import { useGetPosts } from '@/hooks/posts/useGetPosts'

const queryClient = new QueryClient()

vi.mock('@/hooks/posts/useGetPosts', () => ({
  useGetPosts: vi.fn(),
}))

describe('PostsList', () => {
  it('renders loading state', () => {
    vi.mocked(useGetPosts).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    } as any)

    render(
      <QueryClientProvider client={queryClient}>
        <PostsList searchQuery="" currentPage={1} onPageChange={() => {}} />
      </QueryClientProvider>
    )

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
  })

  it('renders error state', () => {
    vi.mocked(useGetPosts).mockReturnValue({
      data: undefined,
      error: new Error('Failed to fetch'),
      isLoading: false,
    } as any)

    render(
      <QueryClientProvider client={queryClient}>
        <PostsList searchQuery="" currentPage={1} onPageChange={() => {}} />
      </QueryClientProvider>
    )

    expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument()
  })

  it('renders posts', () => {
    vi.mocked(useGetPosts).mockReturnValue({
      data: {
        posts: [
          { id: 1, title: 'Post 1' },
          { id: 2, title: 'Post 2' },
        ],
        total: 2,
      },
      error: null,
      isLoading: false,
    } as any)

    render(
      <QueryClientProvider client={queryClient}>
        <PostsList searchQuery="" currentPage={1} onPageChange={() => {}} />
      </QueryClientProvider>
    )

    expect(screen.getByText('Post 1')).toBeInTheDocument()
    expect(screen.getByText('Post 2')).toBeInTheDocument()
  })

  it('renders no results message', () => {
    vi.mocked(useGetPosts).mockReturnValue({
      data: { posts: [], total: 0 },
      error: null,
      isLoading: false,
    } as any)

    render(
      <QueryClientProvider client={queryClient}>
        <PostsList searchQuery="test" currentPage={1} onPageChange={() => {}} />
      </QueryClientProvider>
    )

    expect(screen.getByText(/No posts found for "test"/i)).toBeInTheDocument()
  })
})
