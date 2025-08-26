import e from "express";
import { addBlog, deleteBlogById, getAllBlogs, getBlogById, togglePublishBlog } from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = e.Router();

blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.get("/all", auth, getAllBlogs);
blogRouter.get("/:blogId", auth, getBlogById);
blogRouter.post("/delete", auth, deleteBlogById);
blogRouter.post("/toggle-publish", auth, togglePublishBlog);

export default blogRouter;