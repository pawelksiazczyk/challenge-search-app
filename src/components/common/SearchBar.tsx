import { ChangeEvent } from 'react'

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trimStart()
    setSearchQuery(trimmedValue)
  }

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={handleInputChange}
      placeholder="Search..."
      className="mt-2 py-2 px-4 w-full border rounded-3xl text-black outline-none"
    />
  )
}

export default SearchBar
