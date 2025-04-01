import jwt from "jsonwebtoken"



const isAuthenticated = (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1] // Format: "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." })
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = decoded    // Attaching the decoded user info to the request

    next() 
  } catch (error) {
    console.error("Authentication Error:", error)
    res.status(401).json({ message: "Invalid or expired token." })
  }
};

export default isAuthenticated