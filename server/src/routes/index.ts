import dbRouter from './DB API/index.js';
import express from 'express';

const router = express.Router();

router.use('/db', dbRouter);


export default router;