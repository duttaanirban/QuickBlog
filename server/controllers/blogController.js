import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, category, image, isPublished, description } = JSON.parse(req.body.blog);

        const imageFile = req.file;
        
        if(!title || !category || !imageFile || !description) {
            return res.status(400).json({ success: false, message: "Title, Category, Image and Description are required" });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        // optimize image
        const optimizedImage = await imagekit.url({
            path: response.filePath,
            transformation: [{
                quality: 'auto',
                width: '1280',
                format: 'webp',
            }]
        });

        const img = optimizedImage;

        await Blog.create({title, subTitle, category, image: img, isPublished, description});

        res.status(201).json({ success: true, message: "Blog added successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding blog", error: error.message });
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({isPublished: true});
        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching blogs", error: error.message });
    }
}

export const getBlogById = async (req, res) => {
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog || !blog.isPublished) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching blog", error: error.message });
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const {id} = req.body;
        await Blog.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting blog", error: error.message });
    }
}

export const togglePublishBlog = async (req, res) => {
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.status(200).json({ success: true, message: "Blog updated successfully", data: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating blog", error: error.message });
    }
}

export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body;
        await Comment.create({ blog, name, content });
        res.status(201).json({ success: true, message: "Comment added successfully", data: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding comment", error: error.message });
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: comments });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching comments", error: error.message });
    }
}