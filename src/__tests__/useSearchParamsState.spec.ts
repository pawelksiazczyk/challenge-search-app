import { renderHook, act } from '@testing-library/react'
import { useSearchParamsState } from '@/hooks/common/useSearchParamsState'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

describe('useSearchParamsState', () => {
  it('should return the default value when no search param is set', () => {
    const { result } = renderHook(
      () => useSearchParamsState('query', 'default'),
      {
        wrapper: MemoryRouter,
      }
    )

    expect(result.current[0]).toBe('default')
  })

  it('should update the search param when the state is set', () => {
    const { result } = renderHook(
      () => useSearchParamsState('query', 'default'),
      {
        wrapper: MemoryRouter,
      }
    )

    act(() => {
      ;(result.current[1] as (value: string) => void)('new value')
    })

    expect(result.current[0]).toBe('new value')
  })
})
