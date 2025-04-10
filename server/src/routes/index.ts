import dbRouter from './DB API/index.js';
import { createRouter } from './create-user.js';
import express from 'express';
import tmdbRouter from './tmdb/index.js'
import { QuoteRouter } from './Quote/quoteRoutes.js';
import auth from './auth.js'
import authenticationToken from '../middleware/authentication.js';

const router = express.Router();

router.use('/auth', auth)
router.use('/tmdb', tmdbRouter)
router.use('/db', authenticationToken, dbRouter);
router.use('/user', createRouter)
router.use('/quote', QuoteRouter)


export default router;