import emailIcon from "../../assets/email_icon.png";
import userIcon from "../../assets/user_icon.svg";

const Login = () => {



  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border bprder-primary/30
      shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'><span className='text-primary'>Admin</span> Login</h1>
            <p className='font-light'>Enter your credentials to access the admin panel</p>
          </div>
          <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-6">
                <label>Email</label>
                <div className="relative flex items-center">
                  <img src={emailIcon} alt="email icon" className="w-5 h-5 absolute left-3" />
                  <input type="email" required placeholder="Enter your email id"
                    className="border border-b-2 border-gray-300 p-3 pl-10 outline-none w-full" />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label>Password</label>
                <div className="relative flex items-center">
                  <img src={userIcon} alt="password icon" className="w-5 h-5 absolute left-3" />
                  <input type="password" required placeholder="Enter your password"
                    className="border border-b-2 border-gray-300 p-3 pl-10 outline-none w-full" />
                </div>
              </div>
              <button type="submit" className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login