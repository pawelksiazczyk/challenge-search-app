import { API_BASE_URL } from '@/config'
import { Post } from '@/models/post'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import axios from 'axios'

interface PaginationProps {
  start: number
  limit: number
  searchQuery: string
}

interface GetPostsResponse {
  posts: Post[]
  total: number
}

const fetchPosts = async ({
  start,
  limit,
  searchQuery,
}: PaginationProps): Promise<GetPostsResponse> => {
  const { data, headers } = await axios.get(`${API_BASE_URL}/posts`, {
    params: {
      _start: start,
      _limit: limit,
      title_like: searchQuery,
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
