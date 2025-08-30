import jwt from 'jsonwebtoken';


const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization header:', authHeader);
    const token = authHeader?.split(" ")[1];
    console.log('Extracted token:', token);
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        console.error('JWT verification error:', error.message);
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
}

export default auth;
