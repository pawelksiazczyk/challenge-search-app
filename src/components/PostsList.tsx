import { ITEMS_PER_PAGE } from '@/constants'
import { useGetPosts } from '@/hooks/posts/useGetPosts'
import ErrorMessage from '@/components/common/ErrorMessage'
import LoadingMessage from '@/components/common/LoadingMessage'
import NoResultsMessage from '@/components/common/NoResultsMessage'
import Pagination from '@/components/Pagination'

interface PostsListProps {
  searchQuery: string
  currentPage: number
  onPageChange: (page: number) => void
}

const PostsList = ({
  searchQuery,
  currentPage,
  onPageChange,
}: PostsListProps) => {
  const start = (currentPage - 1) * ITEMS_PER_PAGE

  const { data, error, isLoading } = useGetPosts({
    start,
    limit: ITEMS_PER_PAGE,
    searchQuery,
  })

  const posts = data?.posts ?? []
  const totalCount = data?.total ?? 0
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  if (isLoading) return <LoadingMessage />
  if (error) return <ErrorMessage error={error} />

  if (posts.length === 0) {
    return <NoResultsMessage searchQuery={searchQuery} itemType="posts" />
  }

  return (
    <>
      <ul className="list-none pl-5 flex-grow">
        {posts.map((post) => (
          <li key={post.id} className="border-b border-gray-300 p-4">
            {post.title}
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="my-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  )
}

export default PostsList
