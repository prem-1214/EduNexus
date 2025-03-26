import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1]; // Format: "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Use your JWT secret key
    req.user = decoded; // Attach the decoded user info to the request object

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default authenticate;