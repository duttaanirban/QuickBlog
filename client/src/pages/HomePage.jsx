import Bloglist from '../components/Bloglist.jsx'
import Footer from '../components/Footer.jsx'
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
      <Footer />
    </>
  )
}

export default HomePage