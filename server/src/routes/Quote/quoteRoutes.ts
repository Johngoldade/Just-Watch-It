import type { Request, Response } from 'express'
import express from 'express'

const router = express.Router()

// GET request to fetch a quote
router.get('/', async (_req: Request, res: Response) => {
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes', { headers: { 'X-Api-Key': process.env.QUOTES_API_KEY || '' } }
        );
        if (response.ok) {
            const data = await response.json()
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