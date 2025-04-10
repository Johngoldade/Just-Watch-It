// import express from 'express'
// import { Request, Response } from 'express'
// import { Rating } from '../../models/Rating.js'
// import { User } from '../../models/User.js'

// const router = express.Router()

// // Get all ratings for a user
// router.get('/:userId/ratings', async (req: Request, res: Response) => {
//     const userId = parseInt(req.params.userId)

//     if (isNaN(userId)) {
//         return res.status(400).json({ message: 'Invalid user ID.' })
//     }

//     try {
//         const ratings = await Rating.findAll({
//             where: { userId: userId },
//             include: [{
//                 model: User,
//                 as: 'user',
//                 attributes: ['id', 'username']
//             }]
//         })

//         return res.status(200).json(ratings)
//     } catch (error) {
//         console.error('Error fetching ratings:', error)
//         return res.status(500).json({ message: 'Internal server error' })
//     }
// })

// // Create a new rating
// router.post('/:userId/ratings', async (req: Request, res: Response) => {
//     const userId = parseInt(req.params.userId)
//     const { movieId, ratingValue } = req.body

//     if (isNaN(userId) || !movieId || ratingValue == null) {
//         return res.status(400).json({ message: 'Invalid input data.' })
//     }

//     try {
//         const user = await User.findByPk(userId)
//         if (!user) {
//             return res.status(404).json({ message: 'User not found.' })
//         }

//         const newRating = await Rating.create({
//             userId: userId,
//             movieId: movieId,
//             rating: ratingValue
//         })

//         return res.status(201).json(newRating)
//     } catch (error) {
//         console.error('Error creating rating:', error)
//         return res.status(500).json({ message: 'Internal server error' })
//     }
// })

// // Update an existing rating
// router.put('/:userId/ratings/:ratingId', async (req: Request, res: Response) => {
//     const userId = parseInt(req.params.userId)
//     const ratingId = parseInt(req.params.ratingId)
//     const { ratingValue } = req.body

//     if (isNaN(userId) || isNaN(ratingId) || ratingValue == null) {
//         return res.status(400).json({ message: 'Invalid input data.' })
//     }

//     try {
//         const rating = await Rating.findOne({
//             where: { id: ratingId, userId: userId }
//         })

//         if (!rating) {
//             return res.status(404).json({ message: 'Rating not found.' })
//         }

//         rating.rating = ratingValue
//         await rating.save()

//         return res.status(200).json(rating)
//     } catch (error) {
//         console.error('Error updating rating:', error)
//         return res.status(500).json({ message: 'Internal server error' })
//     }
// })

// // Delete a rating
// router.delete('/:userId/ratings/:ratingId', async (req: Request, res: Response) => {
//     const userId = parseInt(req.params.userId)
//     const ratingId = parseInt(req.params.ratingId)

//     try {
//         const rating = await Rating.findOne({
//             where: { id: ratingId, userId: userId }
//         })

//         if (!rating) {
//             return res.status(404).json({ message: 'Rating not found.' })
//         }

//         await rating.destroy()

//         return res.status(200).json({ message: 'Rating deleted successfully.' })
//     } catch (error) {
//         console.error('Error deleting rating:', error)
//         return res.status(500).json({ message: 'Internal server error' })
//     }
// })

// export { router as ratingRouter }