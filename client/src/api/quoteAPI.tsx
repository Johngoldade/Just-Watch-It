import { Quote } from "../interfaces/quote"

export const fetchQuote = async (): Promise<Quote | null> => {
    try {
        const response = await fetch('/quote', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (!response.ok) {
            throw new Error('Invalid API response')
        }
        const data: Quote = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.error(`Error retrieving data... see this error => ${error}`)
        return null
    }
}