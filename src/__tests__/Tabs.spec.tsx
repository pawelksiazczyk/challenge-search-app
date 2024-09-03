import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { useSearchParamsState } from '@/hooks/common/useSearchParamsState'
import Tabs from '@/components/Tabs'

vi.mock('@/hooks/common/useSearchParamsState', () => ({
  useSearchParamsState: vi.fn(),
}))

describe('Tabs', () => {
  const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="*" element={ui} />
        </Routes>
      </MemoryRouter>
    )
  }

  beforeEach(() => {
    ;(useSearchParamsState as Mock).mockReturnValue([''])
  })

  it('renders both tabs', () => {
    renderWithRouter(<Tabs />)
    expect(screen.getByText('Users')).toBeDefined()
    expect(screen.getByText('Posts')).toBeDefined()
  })

  it('applies correct styles to active tab', () => {
    renderWithRouter(<Tabs />, { route: '/users' })
    expect(screen.getByText('Users')).toHaveClass('font-bold bg-blue-600')
    expect(screen.getByText('Posts')).not.toHaveClass('font-bold bg-blue-600')
  })

  it('includes searchQuery in URLs when present', () => {
    ;(useSearchParamsState as Mock).mockReturnValue(['testQuery'])
    renderWithRouter(<Tabs />)
    expect(screen.getByText('Users').closest('a')).toHaveAttribute(
      'href',
      '/users?searchQuery=testQuery'
    )
    expect(screen.getByText('Posts').closest('a')).toHaveAttribute(
      'href',
      '/posts?searchQuery=testQuery'
    )
  })

  it('does not include searchQuery in URLs when empty', () => {
    renderWithRouter(<Tabs />)
    expect(screen.getByText('Users').closest('a')).toHaveAttribute(
      'href',
      '/users'
    )
    expect(screen.getByText('Posts').closest('a')).toHaveAttribute(
      'href',
      '/posts'
    )
  })
})
