import { Router } from "express";
import User from "../models/user.model.js";
import authenticate from "../middlewares/auth.middleware.js"; // Import authentication middleware

const router = Router();

// Protect the route with authentication middleware
router.get('/dashboard', authenticate, (req, res) => {
    const userId = req.user.id; // Assuming `authenticate` adds the user's ID to `req.user`

    console.log("userid in /dashboard", userId)

    User.findById(userId) // Fetch only the logged-in user's data
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        })
        .catch((error) => {
            console.error("Error fetching user:", error);
            res.status(500).json({ message: "Error fetching user", error });
        });
});

export default router;