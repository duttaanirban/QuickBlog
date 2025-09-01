import { useEffect, useState } from 'react'
import { assets} from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem.jsx';
import { useAppContext } from '../../context/AppContext.jsx';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const {axios, token, loading} = useAppContext();
  console.log('Dashboard token:', token);

  const fetchDashboardData = async () => {
    // Extra guard: do not fetch if token or header is missing
    if (!token || !axios.defaults.headers.common["Authorization"]) return;
    console.log('fetchDashboardData called');
    try {
      const response = await axios.get('/api/admin/dashboard');
      console.log('Dashboard API response:', response);
      const {data} = response;
      if (data.success) {
        setDashboardData(data.dashboardData);
      }
    } catch (error) {
      console.log('Dashboard API error:', error);
      toast.error("Error fetching dashboard data:", error.message);
    }
  }

  useEffect(() => {
    if (!loading && token) {
      fetchDashboardData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, token]);

  if (loading || !token) return <Loader />;
  if (loading) return <Loader />;

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded-2xl
        shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_1} alt=''/>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light'>Blogs</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded-2xl
        shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_2} alt=''/>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.comments}</p>
            <p className='text-gray-400 font-light'>Comments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded-2xl
        shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_3} alt=''/>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
            <p className='text-gray-400 font-light'>Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
          <img src={assets.dashboard_icon_4} alt=''/>
          <p>Latest Blogs</p>
        </div>

        <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg
        scrollbar-hide bg-white'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-gray-600 text-left uppercase'>
              <tr>
                <th scope='col' className='px-2 py-4 xl:px-6'>SNo.</th>
                <th scope='col' className='px-2 py-4'>Blog Title</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                <th scope='col' className='px-2 py-4'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => {
                return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboardData} index={index + 1} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard