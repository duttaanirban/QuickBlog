import React from 'react'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogPage />} />
    </Routes>
    </>
  )
}

export default App