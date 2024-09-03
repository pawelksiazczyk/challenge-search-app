import { useDebounce } from '@/hooks/common/useDebounce'
import { useSearchParamsState } from '@/hooks/common/useSearchParamsState'
import Header from '@/components/Header'
import SearchBar from '@/components/common/SearchBar'
import { useEffect, useState } from 'react'
import Tabs from '@/components/Tabs'

interface PageLayoutProps {
  ListComponent: React.ComponentType<{
    searchQuery: string
    currentPage: number
    onPageChange: (page: number) => void
  }>
}

interface PageLayoutProps {
  ListComponent: React.ComponentType<{
    searchQuery: string
    currentPage: number
    onPageChange: (page: number) => void
  }>
}

const PageLayout = ({ ListComponent }: PageLayoutProps) => {
  const [searchQuery, setSearchQuery] = useSearchParamsState<string>(
    'searchQuery',
    ''
  )
  const debouncedSearchQuery = useDebounce(searchQuery)
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchQuery])

  return (
    <div className="min-h-screen flex flex-col">
      <Header>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Header>
      <Tabs />
      <ListComponent
        searchQuery={debouncedSearchQuery}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default PageLayout
