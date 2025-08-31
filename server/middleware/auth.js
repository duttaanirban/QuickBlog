import jwt from 'jsonwebtoken';


const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        console.log('No token provided. Header:', token);
        return res.status(401).json({ success: false, message: "No token provided" });
    }
    const extractedToken = token.split(' ')[1];
    console.log('Extracted token:', extractedToken);
    try {
        jwt.verify(extractedToken, process.env.JWT_SECRET);
        next();
    } catch (error) {
        console.log('JWT verification error:', error);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
}

export default auth;
