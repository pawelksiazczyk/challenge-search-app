import { ITEMS_PER_PAGE } from '../constants'
import { useGetPosts } from '../hooks/posts/useGetPosts'
import ErrorMessage from './common/ErrorMessage'
import LoadingMessage from './common/LoadingMessage'
import NoResultsMessage from './common/NoResultsMessage'
import Pagination from './Pagination'

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
  })

  const posts = data?.posts ?? []
  const totalCount = data?.total ?? 0
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  if (isLoading) return <LoadingMessage />
  if (error) return <ErrorMessage error={error} />

  const filteredPosts =
    posts?.filter((post) =>
      post?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? []

  if (filteredPosts.length === 0) {
    return <NoResultsMessage searchQuery={searchQuery} itemType="posts" />
  }

  return (
    <>
      <ul className="list-none pl-5">
        {filteredPosts.map((post) => (
          <li key={post.id} className="border-b border-gray-300 p-4">
            {post.title}
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="my-8">
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
