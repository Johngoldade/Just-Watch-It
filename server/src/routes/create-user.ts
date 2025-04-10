import express from "express";
import { Request, Response } from "express";
import { User } from "../models/Index.js";

const router = express.Router();



router.post("/create", async (req: Request, res: Response) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        res.status(400).json({ message: "Username, email, and password are required." });
    }

    try {
        const newUser = await User.create({
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


export { router as createRouter }