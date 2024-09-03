import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import UsersPage from '@/pages/UsersPage'
import PostsPage from '@/pages/PostsPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="*" element={<Navigate to="/users" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
