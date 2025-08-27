import { createContext, useContext, useEffect, useState } from "react";
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
      const token = localStorage.getItem("token");
      if (token) {
        setToken(token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }, []);

  return (
    <AppContext.Provider value={{ axios, token, setToken, navigate, blogs, setBlogs, input, setInput, fetchBlogs }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContext;