import { favoriteRouter } from './favorite-routes.js';
// import { groupRouter } from './group-routes'
import { ratingRouter } from './rating-routes.js';
import { userRouter } from './user-routes.js';
// import { watchlistRouter } from './watchlist-routes'
import express from 'express';
const router = express.Router();
router.use('/favorites', favoriteRouter);
// router.use('/groups', groupRouter);
router.use('/ratings', ratingRouter);
router.use('/users', userRouter);
// router.use('/watchlists', watchlistRouter);
export default router;
