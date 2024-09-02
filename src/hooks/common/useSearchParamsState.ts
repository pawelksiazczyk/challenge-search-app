import { useSearchParams } from 'react-router-dom'

export const useSearchParamsState = <T extends string>(
  searchParamName: string,
  defaultValue: T
): readonly [
  searchParamsState: T,
  setSearchParamsState: (newState: T) => void,
] => {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchParamsState = (searchParams.get(searchParamName) ??
    defaultValue) as T

  const setSearchParamsState = (newState: T) => {
    const nextSearchParams = new URLSearchParams(searchParams)
    nextSearchParams.set(searchParamName, newState)
    setSearchParams(nextSearchParams)
  }

  return [searchParamsState, setSearchParamsState] as const
}
