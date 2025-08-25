export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, category, image, isPublished, description } = JSON.parse(req.body.blog);

        const newBlog = new Blog({
            title,
            subTitle,
            category,
            image,
            isPublished,
            description
        });

        await newBlog.save();
        res.status(201).json({success: true, message: "Blog added successfully", blog: newBlog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding blog", error: error.message });
    }
}