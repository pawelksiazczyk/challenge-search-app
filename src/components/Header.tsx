interface HeaderProps {
  children: React.ReactNode
}

const Header = ({ children }: HeaderProps) => {
  return <header className="bg-blue-500 p-4 text-white">{children}</header>
}

export default Header
