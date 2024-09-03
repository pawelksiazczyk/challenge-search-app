import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'
import { describe, expect, it, vi } from 'vitest'
import SearchBar from '@/components/common/SearchBar'

describe('Header', () => {
  it('renders correctly with SearchBar', () => {
    const mockSetSearchQuery = vi.fn()

    render(
      <Header>
        <SearchBar searchQuery="" setSearchQuery={mockSetSearchQuery} />
      </Header>
    )

    // Check if the header is rendered
    const headerElement = screen.getByRole('banner')
    expect(headerElement).toBeInTheDocument()

    // Check if the SearchBar is rendered within the Header
    const searchInput = screen.getByPlaceholderText(/Search.../i)
    expect(searchInput).toBeInTheDocument()
  })
})
