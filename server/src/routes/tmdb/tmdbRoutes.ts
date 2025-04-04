import type { Request, Response } from 'express'
import express from 'express'

const router = express.Router()

// GET request to fetch movies
router.get('/', async (_req: Request, res: Response) =>{
    try {
        const response = await fetch ('https://api.themoviedb.org/3/discover/movie?region=United%20States&sort_by=popularity.desc',
            {
                headers: {
                    Authorization: `Bearer ${process.env.API_TOKEN}`
                }
            }
        )

        if (!response.ok) {
            throw new Error ('Invalid API response')
        }

        const movies = response.json()
        res.sendStatus(200)
        return movies

    } catch (err) {
        res.send(500).json({ message: err })
    }
})

// Example return...

// {
//     "adult": false,
//     "backdrop_path": "/1w8kutrRucTd3wlYyu5QlUDMiG1.jpg",
//     "genre_ids": [
//         12,
//         10751,
//         16
//     ],
//     "id": 762509,
//     "original_language": "en",
//     "original_title": "Mufasa: The Lion King",
//     "overview": "Mufasa, a cub lost and alone, meets a sympathetic lion named Taka, the heir to a royal bloodline. The chance meeting sets in motion an expansive journey of a group of misfits searching for their destiny.",
//     "popularity": 199.8527,
//     "poster_path": "/lurEK87kukWNaHd0zYnsi3yzJrs.jpg",
//     "release_date": "2024-12-18",
//     "title": "Mufasa: The Lion King",
//     "video": false,
//     "vote_average": 7.449,
//     "vote_count": 1837
// },


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

        const movies = response.json()
        res.sendStatus(200)
        return movies

    } catch (err) {
        res.send(500).json({ message: err })
    }
})







// image base path
// https://image.tmdb.org/t/p/w100