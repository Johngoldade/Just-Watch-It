import type { Request, Response } from 'express'
import express from 'express'

const router = express.Router()

// GET request to fetch movies
router.get('/', async (_req: Request, res: Response) =>{
    try {
        console.log(process.env.API_TOKEN)
        const response = await fetch ('https://api.themoviedb.org/3/trending/movie/day?language=en-US',
            {
                headers: {
                    Authorization: `Bearer ${process.env.API_TOKEN}`
                }
            }
        )

        if (!response.ok) {
            throw new Error ('Invalid API response')
        }

        const movies = await response.json()
        console.log(movies)
        res.status(200).json(movies)
        return

    } catch (err) {
        res.status(500).json({ message: (err as Error).message })
        return
    }
})

// GET request to find the information for a specific movie
router.get('/:movie', async (req: Request, res: Response) =>{
    const { movie } = req.params

    try {
        const response = await fetch (`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.API_TOKEN}`
                }
            }
        )

        if (!response.ok) {
            throw new Error ('Invalid API response')
        }

        const movies = await response.json()
        res.sendStatus(200)
        return movies

    } catch (err) {
        res.send(500).json({ message: err })
    }
})

export { router as TMDBRouter }