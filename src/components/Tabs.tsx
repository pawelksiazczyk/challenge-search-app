import { NavLink } from 'react-router-dom'
import { useSearchParamsState } from '../hooks/common/useSearchParamsState'

const CustomNavLink = ({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-1/2 text-center bg-blue-300 p-4 text-white ${
          isActive ? 'font-bold bg-blue-600' : 'text-gray-700'
        }`
      }
    >
      {children}
    </NavLink>
  )
}

const Tabs = () => {
  const [searchQuery] = useSearchParamsState('searchQuery', '')

  return (
    <nav className="flex bg-gray-100">
      <CustomNavLink
        to={`${searchQuery ? '/users?searchQuery=' + searchQuery : '/users'}`}
      >
        Users
      </CustomNavLink>
      <CustomNavLink
        to={`${searchQuery ? '/posts?searchQuery=' + searchQuery : '/posts'}`}
      >
        Posts
      </CustomNavLink>
    </nav>
  )
}

export default Tabs
