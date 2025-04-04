import express from "express"
import { Request, Response } from "express"
import { Favorite } from "../../models/Favorite.js"
import { User } from "../../models/User.js"

const router = express.Router()

// Get all favorites for a user
router.get("/:userId/favorites", async (req: Request, res: Response) => {
    const userId = req.params.userId

    try {
        const favorites = await Favorite.findAll({
            where: { id: userId },
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'username']
            }]
        })

        if (!favorites || favorites.length === 0) {
            return res.status(404).json({ message: "No favorites found for this user." })
        }

        return res.status(200).json(favorites)
    } catch (error) {
        console.error("Error fetching favorites:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
})

// Add a favorite for a user
router.post("/:userId/favorites", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId)
    const { movieId } = req.body

    if (!movieId) {
        return res.status(400).json({ message: "Movie ID is required." })
    }

    try {
        const existingFavorite = await Favorite.findOne({
            where: {
                userId: userId,
                movieId: movieId
            }
        })

        if (existingFavorite) {
            return res.status(409).json({ message: "This movie is already in your favorites." })
        }

        const newFavorite = await Favorite.create({
            userId: userId,
            movieId: movieId
        })

        return res.status(201).json(newFavorite)
    } catch (error) {
        console.error("Error adding favorite:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
})

// Remove a favorite for a user
router.delete("/:userId/favorites/:movieId", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId)
    const movieId = req.params.movieId

    try {
        const favorite = await Favorite.findOne({
            where: {
                userId: userId,
                movieId: movieId
            }
        })

        if (!favorite) {
            return res.status(404).json({ message: "Favorite not found." })
        }

        await favorite.destroy()

        return res.status(200).json({ message: "Favorite removed successfully." })
    } catch (error) {
        console.error("Error removing favorite:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
})

// Clear all favorites for a user
router.delete("/:userId/favorites", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId)
    try {
        const deletedCount = await Favorite.destroy({
            where: {
                userId: userId
            }
        })
        if (deletedCount === 0) {
            return res.status(404).json({ message: "No favorites found for this user." })
        }
        return res.status(200).json({ message: "All favorites removed successfully." })
    } catch (error) {
        console.error("Error clearing favorites:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
})

export default router