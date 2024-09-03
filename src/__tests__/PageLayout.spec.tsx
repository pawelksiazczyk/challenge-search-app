import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PageLayout from '@/layouts/PageLayout'
import { useSearchParamsState } from '@/hooks/common/useSearchParamsState'
import { useDebounce } from '@/hooks/common/useDebounce'

vi.mock('@/hooks/common/useSearchParamsState')
vi.mock('@/hooks/common/useDebounce')
vi.mock('@/components/Header', () => ({
  default: ({ children }: any) => <div data-testid="header">{children}</div>,
}))
vi.mock('@/components/Tabs', () => ({
  default: () => <div data-testid="tabs" />,
}))
vi.mock('@/components/common/SearchBar', () => ({
  default: ({ searchQuery, setSearchQuery }: any) => (
    <input
      data-testid="search-bar"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  ),
}))

const MockListComponent = vi.fn(() => <div data-testid="list-component" />)

describe('PageLayout', () => {
  const setSearchQueryMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useSearchParamsState as Mock).mockReturnValue(['', setSearchQueryMock])
    ;(useDebounce as Mock).mockImplementation((value: number) => value)
  })

  it('renders all components', () => {
    render(<PageLayout ListComponent={MockListComponent} />)
    expect(screen.getByTestId('header')).toBeDefined()
    expect(screen.getByTestId('search-bar')).toBeDefined()
    expect(screen.getByTestId('tabs')).toBeDefined()
    expect(screen.getByTestId('list-component')).toBeDefined()
  })

  it('passes correct initial props to ListComponent', () => {
    render(<PageLayout ListComponent={MockListComponent} />)
    expect(MockListComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        searchQuery: '',
        currentPage: 1,
        onPageChange: expect.any(Function),
      }),
      {}
    )
  })

  it('updates search query when typing in search bar', () => {
    render(<PageLayout ListComponent={MockListComponent} />)
    const searchBar = screen.getByTestId('search-bar')
    fireEvent.change(searchBar, { target: { value: 'test query' } })
    expect(setSearchQueryMock).toHaveBeenCalledWith('test query')
  })
})
