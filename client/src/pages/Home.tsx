import { useEffect, useState } from 'react'
import { fetchQuote } from '../api/quoteAPI'

interface Quote {
  quote: string;
  author: string;
}

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null)

  useEffect(() => {
    const getQuote = async () => {
      const fetchedQuote: Quote | null= await fetchQuote()
      setQuote(fetchedQuote)
    }
    getQuote()
  }, [])

  return (
    <div>
      <h1>Welcome to Movie Night!</h1>
      <p>Plan your movie nights with friends and family.</p>
      <p>Use the navigation bar to explore the app.</p>
      {quote && (
        <div className='blockquote title1'>
          <blockquote>"{quote.quote}"</blockquote>
          <p>- {quote.author}</p>
        </div>
      )}
    </div>
  )
}


