import dbRouter from './DB API/index.js';
import express from 'express';
import authenticationToken from '../middleware/authentication.js';

const router = express.Router();

router.use('/db', authenticationToken, dbRouter);


export default router;