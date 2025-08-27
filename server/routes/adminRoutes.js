import express from "express";
import { adminLogin, approveCommentById,
    deleteCommentById, getAllBlogsAdmin,
    getAllComments, getDashboardStats }
    from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/dashboard", auth, getDashboardStats);
adminRouter.delete("/delete-comment", auth, deleteCommentById);
adminRouter.put("/approve-comment", auth, approveCommentById);

export default adminRouter;

