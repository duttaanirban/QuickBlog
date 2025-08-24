import { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets"
import Quill from "quill";

const AddBlog = () => {

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState('startup');
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    // Call your AI content generation API here
    
  }
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write something amazing...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        },
      });
    }
  },[])


  return (
    <form onSubmit={onSubmitHandler} className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll">
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="upload area" className="mt-2 h-16 rounded cursor-pointer"/>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" className="hidden" required/>
        </label>

        <p className="mt-4">Blog Title</p>
        <input onChange={(e) => setTitle(e.target.value)} value={title}
        type="text"
        placeholder="Type Your Title here" required
        className="w-full max-w-lg mt-2 p-2 border
        border-gray-300 outline-none rounded"/>

        <p className="mt-4">Blog SubTitle</p>
        <input onChange={(e) => setSubTitle(e.target.value)}
        value={subTitle} type="text"
        placeholder="Type Your SubTitle here" required
        className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"/>

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}>

          </div>
          <button className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5
          rounded hover:underline cursor-pointer' type="button" onClick={generateContent}>Generate with AI</button>
        </div>
        <p className="mt-4">Blog Category</p>
        <select name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)} 
        className="mt-2 px-3 py-2 text-gray-500 border border-gray-300 outline-none rounded">
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => {
            return (
              <option key={index} value={item.value}>{item.label}</option>
            )
          })}
        </select>

        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="scale-125 cursor-pointer"/>
        </div>

        <button type="submit" className="mt-8 w-40 h-10 bg-primary text-white
        rounded cursor-pointer text-sm">Add Blog</button>
      </div>
    </form>
  )
}

export default AddBlog;