import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import BlogPage from './pages/BlogPage.jsx'

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog/:id" element={<BlogPage />} />
    </Routes>
    </>
  )
}

export default App