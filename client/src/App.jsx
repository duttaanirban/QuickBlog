import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import Layout from './pages/admin/Layout.jsx'
import Dashboard from './pages/admin/dashboard.jsx'
import AddBlog from './pages/admin/AddBlog.jsx'
import ListBlog from './pages/admin/ListBlog.jsx'
import Comments from './pages/admin/Comments.jsx'

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog/:id" element={<BlogPage />} />
      <Route path="/admin" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='addBlog' element={<AddBlog />} />
        <Route path='listBlog' element={<ListBlog />} />
        <Route path='comments' element={<Comments />} />
      </Route>
    </Routes>
    </>
  )
}

export default App