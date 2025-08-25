import e from "express";
import { addBlog } from "../controllers/blogController.js";
import upload from "../middleware/multer.js";

const blogRouter = e.Router();

blogRouter.post("/add", upload.single("image"), addBlog);

export default blogRouter;