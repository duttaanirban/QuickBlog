import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
      try {
        const {data} = await axios.get("/api/blog/all");
        data.success ? setBlogs(data.blogs) : toast.error(data.message);
      } catch (error) {
        toast.error("Error fetching blogs");
        console.error("Error fetching blogs:", error);
      }
    };


    useEffect(() => {
      fetchBlogs();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      } else {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      if (token !== null) {
        setLoading(false);
      }
    }, [token]);

    // Always set axios Authorization header when token changes
    useEffect(() => {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        delete axios.defaults.headers.common["Authorization"];
      }
    }, [token]);

  if (loading) return <Loader />;
  // Logout function: clears token everywhere
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
    navigate("/admin"); // redirect to login or admin page
  };

  return (
    <AppContext.Provider value={{ axios, token, setToken, navigate, blogs, setBlogs, input, setInput, fetchBlogs, logout }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContext;