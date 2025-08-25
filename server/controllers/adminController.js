import jwt from 'jsonwebtoken';

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        return res.status(200).json({ success: true, token });
    } else {
      return res.status(401).json({ success: false, message: "Invalid Credentials" });
    }

  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
