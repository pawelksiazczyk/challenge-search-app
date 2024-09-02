import { useQuery, UseQueryResult } from '@tanstack/react-query'
import axios from 'axios'
import { API_BASE_URL } from '../../constants'

interface Post {
  id: number
  title: string
}

interface PaginationProps {
  start: number
  limit: number
}

interface GetPostsResponse {
  posts: Post[]
  total: number
}

const fetchPosts = async ({
  start,
  limit,
}: PaginationProps): Promise<GetPostsResponse> => {
  const { data, headers } = await axios.get(`${API_BASE_URL}/posts`, {
    params: {
      _start: start,
      _limit: limit,
    },
  })

  const total = parseInt(headers['x-total-count'], 10)
  return { posts: data, total }
}

export const useGetPosts = (
  params: PaginationProps
): UseQueryResult<GetPostsResponse, Error> => {
  return useQuery<GetPostsResponse, Error>({
    queryKey: ['posts', params],
    queryFn: () => fetchPosts(params),
  })
}
