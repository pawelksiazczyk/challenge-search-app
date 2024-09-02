interface ErrorMessageProps {
  error: Error | unknown
}

const ErrorMessage = ({ error }: ErrorMessageProps) => (
  <p className="text-center text-gray-500 mt-12">
    Error: {error instanceof Error ? error?.message : 'Something went wrong'}
  </p>
)

export default ErrorMessage
