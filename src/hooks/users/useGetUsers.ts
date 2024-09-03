import { API_BASE_URL } from '@/config'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import axios from 'axios'

interface User {
  id: number
  name: string
}

interface PaginationProps {
  start: number
  limit: number
  searchQuery: string
}

interface GetUsersResponse {
  users: User[]
  total: number
}

const fetchUsers = async ({
  start,
  limit,
  searchQuery,
}: PaginationProps): Promise<GetUsersResponse> => {
  const { data, headers } = await axios.get(`${API_BASE_URL}/users`, {
    params: { _start: start, _limit: limit, name_like: searchQuery },
  })
  const total = parseInt(headers['x-total-count'], 10)
  return { users: data, total }
}

export const useGetUsers = (
  params: PaginationProps
): UseQueryResult<GetUsersResponse, Error> => {
  return useQuery<GetUsersResponse, Error>({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
  })
}
