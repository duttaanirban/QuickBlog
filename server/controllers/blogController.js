import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";

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