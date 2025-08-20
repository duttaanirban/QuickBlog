import Bloglist from '../components/Bloglist.jsx'
import Header from '../components/Header.jsx'
import Navbar from '../components/Navbar.jsx'
import Newsletter from '../components/Newsletter.jsx'

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Bloglist />
      <Newsletter />
    </>
  )
}

export default HomePage