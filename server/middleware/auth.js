import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
}

export default auth;
