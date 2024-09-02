import { ITEMS_PER_PAGE } from '../constants'
import { useGetUsers } from '../hooks/users/useGetUsers'
import ErrorMessage from './common/ErrorMessage'
import LoadingMessage from './common/LoadingMessage'
import NoResultsMessage from './common/NoResultsMessage'
import Pagination from './Pagination'

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
  })

  const users = data?.users ?? []
  const totalCount = data?.total ?? 0
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  if (isLoading) return <LoadingMessage />
  if (error) return <ErrorMessage error={error} />

  const filteredUsers =
    users?.filter((user) =>
      user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? []

  if (filteredUsers.length === 0) {
    return <NoResultsMessage searchQuery={searchQuery} itemType="users" />
  }

  return (
    <>
      <ul className="list-none pl-5">
        {filteredUsers.map((user) => (
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

export default UsersList
