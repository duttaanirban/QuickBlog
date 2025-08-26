import e from "express";
import { addBlog } from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = e.Router();

blogRouter.post("/add", upload.single("image"), auth, addBlog);




export default blogRouter;