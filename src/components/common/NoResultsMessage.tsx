interface NoResultsMessageProps {
  searchQuery: string
  itemType: string
}

const NoResultsMessage = ({ searchQuery, itemType }: NoResultsMessageProps) => (
  <p className="text-center text-gray-500 mt-12">
    No {itemType} found for "{searchQuery}"
  </p>
)

export default NoResultsMessage
