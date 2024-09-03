import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from '@/components/Pagination'
import { describe, expect, it, vi } from 'vitest'

describe('Pagination', () => {
  it('renders correct number of page buttons', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />
    )

    const pageButtons = screen
      .getAllByRole('button')
      .filter((button) => !isNaN(Number(button.textContent)))
    expect(pageButtons).toHaveLength(5)
  })

  it('disables previous button on first page', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    )

    const prevButton = screen.getByText('<')
    expect(prevButton).toBeDisabled()
  })

  it('disables next button on last page', () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />
    )

    const nextButton = screen.getByText('>')
    expect(nextButton).toBeDisabled()
  })

  it('calls onPageChange with correct page number when a page button is clicked', () => {
    const mockOnPageChange = vi.fn()
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const pageThreeButton = screen.getByText('3')
    fireEvent.click(pageThreeButton)

    expect(mockOnPageChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange with correct page number when next button is clicked', () => {
    const mockOnPageChange = vi.fn()
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const nextButton = screen.getByText('>')
    fireEvent.click(nextButton)

    expect(mockOnPageChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange with correct page number when previous button is clicked', () => {
    const mockOnPageChange = vi.fn()
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const prevButton = screen.getByText('<')
    fireEvent.click(prevButton)

    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })
})
