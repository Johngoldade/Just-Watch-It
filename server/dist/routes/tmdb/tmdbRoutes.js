import express from 'express';
const router = express.Router();
// GET request to fetch movies
router.get('/', async (_req, res) => {
    try {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?region=United%20States&sort_by=popularity.desc', {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`
            }
        });
        if (!response.ok) {
            throw new Error('Invalid API response');
        }
        const movies = response.json();
        res.sendStatus(200);
        return movies;
    }
    catch (err) {
        res.send(500).json({ message: err });
    }
});
// GET request to find the information for a specific movie
router.get('/:movie', async (req, res) => {
    const { movie } = req.params;
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`
            }
        });
        if (!response.ok) {
            throw new Error('Invalid API response');
        }
        const movies = response.json();
        res.sendStatus(200);
        return movies;
    }
    catch (err) {
        res.send(500).json({ message: err });
    }
});
