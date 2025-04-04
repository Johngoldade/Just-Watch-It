import express from "express";
import { Request, Response } from "express";
import { User } from "../../models/User.js";

const router = express.Router();

// Get all users
router.get("/", async (_req: Request, res: Response) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        console.error("Error fetching users:", error)
        res.status(500).json({ message: "Internal server error" })
    }
})

// Get a user by ID
router.get("/:id", async (req: Request, res: Response) => {
    const userId = req.params.id

    try {
        const user = await User.findByPk(userId)
        if (!user) {
            res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(user)
    } catch (error) {
        console.error("Error fetching user:", error)
        res.status(500).json({ message: "Internal server error" })
    }
})

// Create a new user
router.post("/", async (req: Request, res: Response) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        res.status(400).json({ message: "Username, email, and password are required." });
    }

    try {
        const newUser = await User.create({
            name: req.body.name,
            username,
            email,
            password
        })

        res.status(201).json(newUser)
    } catch (error) {
        console.error("Error creating user:", error)
        res.status(500).json({ message: "Internal server error" })
    }
})

// Update a user by ID
router.put("/:id", async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { name, username, email, password } = req.body;

    if (!name && !username && !email && !password) {
        return res.status(400).json({ message: "No fields to update." });
    }

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (name !== undefined) user.name = name;
        if (username !== undefined) user.username = username;
        if (email !== undefined) user.email = email;
        if (password !== undefined) user.password = password;

        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

// Delete a user by ID
router.delete("/:id", async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.destroy();
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;