import type { Request, Response } from 'express'
import express from 'express'

const router = express.Router()

// GET request to fetch a quote
router.get('/', async (_req: Request, res: Response) => {
    try {
        const apiKey = process.env.QUOTES_API_KEY;
        if (!apiKey) {
            throw new Error('QUOTES_API_KEY is not defined');
        }
        const response = await fetch('https://api.api-ninjas.com/v1/chucknorris', { headers: { 'X-Api-Key': apiKey } });

        if (response.ok) {
            const data = await response.json()
            console.log(data)
            res.status(200).json(data)
        } else {
            console.error('Error:', response.status, await response.text())
            res.sendStatus(500)
        }
    } catch (error) {
        console.error('Error fetching quote:', error)
        res.sendStatus(500)
    }
})

export { router as QuoteRouter }


// 'https://api.api-ninjas.com/v1/quotes'