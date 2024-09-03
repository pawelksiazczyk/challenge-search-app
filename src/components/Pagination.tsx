import { PAGES_EITHER_SIDE, PAGES_TO_SHOW } from '@/constants'
import { useMemo } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = useMemo(() => {
    let startPage = Math.max(1, currentPage - PAGES_EITHER_SIDE)
    let endPage = Math.min(totalPages, startPage + PAGES_TO_SHOW - 1)

    if (endPage - startPage + 1 < PAGES_TO_SHOW) {
      startPage = Math.max(1, endPage - PAGES_TO_SHOW + 1)
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    )
  }, [currentPage, totalPages])

  return (
    <nav className="mt-auto">
      <ul className="flex items-center justify-center">
        <li>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-l border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            &lt;
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`px-3 py-1 border border-gray-300 ${
                currentPage === number
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-r border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
