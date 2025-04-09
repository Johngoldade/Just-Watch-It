import { TMDBRouter } from './tmdbRoutes.js'
import express from 'express'

const router = express.Router()

router.use('/movies', TMDBRouter)

export default router