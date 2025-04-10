import { Quote } from '../interfaces/quote'

export const fetchQuote = async (): Promise<Quote | null> => {
    try {
        const response = await fetch('/quote')
        if (!response.ok) {
            throw new Error('Invalid API response')
        }
        const data: Quote = await response.json()
        return data
    } catch (error) {
        console.error(`Error retrieving data... see this error => ${error}`)
        return null
    }
}