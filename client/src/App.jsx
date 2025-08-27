/* eslint-disable no-constant-condition */
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import Layout from './pages/admin/Layout.jsx'
import Dashboard from './pages/admin/dashboard.jsx'
import AddBlog from './pages/admin/AddBlog.jsx'
import ListBlog from './pages/admin/ListBlog.jsx'
import Comments from './pages/admin/Comments.jsx'
import Login from './components/admin/Login.jsx'
import 'quill/dist/quill.snow.css';
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext.jsx'

const App = () => {

  const { token } = useAppContext();

  return (
    <>
    <Toaster />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog/:id" element={<BlogPage />} />
      // eslint-disable-next-line no-constant-condition, no-constant-condition, no-constant-condition
      <Route path="/admin" element={token ? <Layout /> : <Login />}>
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