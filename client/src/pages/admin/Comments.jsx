import { useEffect, useState, useCallback } from "react"
import CommentTableItems from "../../components/admin/CommentTableItems";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";


const Comments = () => {

  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  const {axios, token} = useAppContext();
  const fetchComments = useCallback(async () => {
    try {
      console.log('Admin token being sent:', token);
      const {data} = await axios.get('/api/admin/comments');
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error("Error fetching comments: " + data.message);
        console.error('Backend error:', data);
      }
    } catch (error) {
      toast.error("Error fetching comments: " + (error.response?.data?.message || error.message));
      console.error('Axios error:', error);
    }
  }, [axios, token]);

  useEffect(() => {
    if (token) {
      fetchComments();
    }
  }, [token, fetchComments]);


  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm;pl-16 bg-blue-50/50">
      <div className="flex justify-between items-center max-w-3xl">
        <h1>All Comments</h1>
        <div className="flex gap-4">
          <button onClick={() => setFilter("Approved")} className={`shadow-custom-sm border rounded-full px-4 py-1
            cursor-pointer text-xs ${filter === "Approved" ? " text-primary" : " text-gray-700"}`}>Approved</button>
          <button onClick={() => setFilter("Not Approved")} className={`shadow-custom-sm border rounded-full px-4 py-1
            cursor-pointer text-xs ${filter === "Not Approved" ? " text-primary" : " text-gray-700"}`}>Not Approved</button>
        </div>
      </div>
      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white
      shadow rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr className=" ">
              <th scope="col" className="px-6 py-3 ">Blog title & Comment</th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">Date</th>
              <th scope="col" className="px-6 py-3 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.filter((comment) => {
              if (filter === "Approved") {
                return comment.isApproved === true;
              }
              return comment.isApproved === false;
            }).map((comment, index) => (
              <CommentTableItems key={comment._id} comment={comment} fetchComments={fetchComments} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments