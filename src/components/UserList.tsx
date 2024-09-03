import { ITEMS_PER_PAGE } from '@/constants'
import { useGetUsers } from '@/hooks/users/useGetUsers'
import ErrorMessage from '@/components/common/ErrorMessage'
import LoadingMessage from '@/components/common/LoadingMessage'
import NoResultsMessage from '@/components/common/NoResultsMessage'
import Pagination from '@/components//Pagination'

interface UsersListProps {
  searchQuery: string
  currentPage: number
  onPageChange: (page: number) => void
}

const UsersList = ({
  searchQuery,
  currentPage,
  onPageChange,
}: UsersListProps) => {
  const start = (currentPage - 1) * ITEMS_PER_PAGE

  const { data, error, isLoading } = useGetUsers({
    start,
    limit: ITEMS_PER_PAGE,
    searchQuery,
  })

  const users = data?.users ?? []
  const totalCount = data?.total ?? 0
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  if (isLoading) return <LoadingMessage />
  if (error) return <ErrorMessage error={error} />

  if (users.length === 0) {
    return <NoResultsMessage searchQuery={searchQuery} itemType="users" />
  }

  return (
    <>
      <ul className="list-none pl-5 flex-grow">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex space-x-3 items-center gap-4 border-b border-gray-300 p-3"
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold"></div>
            {user.name}
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

export default UsersList
