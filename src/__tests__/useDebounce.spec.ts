import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '@/hooks/common/useDebounce'
import { describe, expect, it, vi } from 'vitest'

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500))
    expect(result.current).toBe('initial')
  })

  it('should debounce the value change', async () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    )

    rerender({ value: 'changed', delay: 500 })
    expect(result.current).toBe('initial')

    act(() => {
      vi.advanceTimersByTime(400)
    })
    expect(result.current).toBe('initial')

    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(result.current).toBe('changed')

    vi.useRealTimers()
  })
})
