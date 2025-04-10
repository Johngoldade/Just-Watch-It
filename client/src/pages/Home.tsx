import { useEffect, useState } from 'react'
import { fetchQuote } from '../api/quoteAPI'

// interface Quote {
//   quote: string;
//   author: string;
// }

interface Quote {
  joke: string | null;
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
          {/* <blockquote>"{quote.quote}"</blockquote>
          <p>- {quote.author}</p> */}
          <blockquote >"{quote.joke}"</blockquote>
        <div>
          <blockquote>'{quote.quote}'</blockquote>
          <p>- {quote.author}</p>
        </div>
      )}
    </div>
  )
}

// export default function HomePage() {


//     return (
//         <>
//             <div>
//                 <section id='quotes'></section>
//                 <div className='d-flex justify-content-around'>
//                     <article id='just-describe-it'></article>
//                     <section id='group-pick'></section>
//                 </div>
//             </div>
//         </>
//     )
// >>>>>>> main
// }