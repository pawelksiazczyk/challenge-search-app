import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '@/components/common/SearchBar'
import { describe, expect, it, vi } from 'vitest'

describe('SearchBar', () => {
  it('renders correctly with initial search query', () => {
    const mockSetSearchQuery = vi.fn()
    render(
      <SearchBar searchQuery="initial" setSearchQuery={mockSetSearchQuery} />
    )

    const input = screen.getByPlaceholderText('Search...')
    expect(input).toHaveValue('initial')
  })

  it('calls setSearchQuery when input changes', () => {
    const mockSetSearchQuery = vi.fn()
    render(<SearchBar searchQuery="" setSearchQuery={mockSetSearchQuery} />)

    const input = screen.getByPlaceholderText('Search...')
    fireEvent.change(input, { target: { value: 'new search' } })

    expect(mockSetSearchQuery).toHaveBeenCalledWith('new search')
  })
})
