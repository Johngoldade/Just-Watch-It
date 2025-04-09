import dbRouter from './DB API/index.js';
import express from 'express';
import tmdbRouter from './tmdb/index.js'
import auth from './auth.js'
import authenticationToken from '../middleware/authentication.js';

const router = express.Router();

router.use('/auth', auth)
router.use('/tmdb', tmdbRouter)
router.use('/db', authenticationToken, dbRouter);


export default router;