// import express from 'express'
// import { Request, Response } from 'express'
// import { WatchList } from '../../models/WatchList.js'
// import { User } from '../../models/User.js'

// const router = express.Router()

// // Get all watchlists for a group
// router.get('/:groupId/watchlists', async (req: Request, res: Response) => {
//     const groupId = parseInt(req.params.groupId)

//     if (isNaN(groupId)) {
//         return res.status(400).json({ message: 'Invalid group ID.' })
//     }

//     try {
//         const watchlists = await WatchList.findAll({
//             where: { groupId: groupId },
//             include: [{
//                 model: User,
//                 as: 'user',
//                 attributes: ['id', 'username']
//             }]
//         })

//         return res.status(200).json(watchlists)
//     } catch (error) {
//         console.error('Error fetching watchlists:', error)
//         return res.status(500).json({ message: 'Internal server error' })
//     }
// })

// // Get a specific watchlist by ID
// router.get('/:groupId/watchlists/:watchlistId', async (req: Request, res: Response) => {
//     const groupId = parseInt(req.params.groupId)
//     const watchlistId = parseInt(req.params.watchlistId)

//     if (isNaN(groupId) || isNaN(watchlistId)) {
//         return res.status(400).json({ message: 'Invalid group ID or watchlist ID.' })
//     }
//     try {
//         const watchlist = await WatchList.findOne({
//             where: {
//                 id: watchlistId,
//                 groupId: groupId
//             },
//             include: [{
//                 model: User,
//                 as: 'user',
//                 attributes: ['id', 'username']
//             }]
//         })
//         if (!watchlist) {
//             return res.status(404).json({ message: 'Watchlist not found.' })
//         }
//         return res.status(200).json(watchlist)
//     } catch (error) {
//         console.error('Error fetching watchlist:', error)
//         return res.status(500).json({ message: 'Internal server error' })
//     }
// })

// // Create a new watchlist
// router.post('/:groupId/watchlists', async (req: Request, res: Response) => {
//     const groupId = parseInt(req.params.groupId)
//     const { priority, watched, movieId } = req.body

//     if (isNaN(groupId) || !movieId || priority == null || watched == null) {
//         return res.status(400).json({ message: 'Invalid input data.' })
//     }

//     try {
//         const newWatchlist = await WatchList.create({
//             groupId: groupId,
//             priority: priority,
//             watched: watched,
//             movieId: movieId
//         })

//         return res.status(201).json(newWatchlist)
//     } catch (error) {
//         console.error('Error creating watchlist:', error)
//         return res.status(500).json({ message: 'Internal server error' })
//     }
// })

// // Update a watchlist
// router.put('/:groupId/watchlists/:watchlistId', async (req: Request, res: Response) => {
//     const groupId = parseInt(req.params.groupId)
//     const watchlistId = parseInt(req.params.watchlistId)
//     const { priority, watched } = req.body

//     if (isNaN(groupId) || isNaN(watchlistId) || priority == null || watched == null) {
//         return res.status(400).json({ message: 'Invalid input data.' })
//     }

//     try {
//         const watchlist = await WatchList.findOne({
//             where: {
//                 id: watchlistId,
//                 groupId: groupId
//             }
//         })

//         if (!watchlist) {
//             return res.status(404).json({ message: 'Watchlist not found.' })
//         }

//         watchlist.priority = priority
//         watchlist.watched = watched
//         await watchlist.save()

//         return res.status(200).json(watchlist)
//     } catch (error) {
//         console.error('Error updating watchlist:', error)
//         return res.status(500).json({ message: 'Internal server error' })
//     }
// })

// // Delete a watchlist
// router.delete('/:groupId/watchlists/:watchlistId', async (req: Request, res: Response) => {
//     const groupId = parseInt(req.params.groupId)
//     const watchlistId = parseInt(req.params.watchlistId)

//     if (isNaN(groupId) || isNaN(watchlistId)) {
//         return res.status(400).json({ message: 'Invalid group ID or watchlist ID.' })
//     }

//     try {
//         const watchlist = await WatchList.findOne({
//             where: {
//                 id: watchlistId,
//                 groupId: groupId
//             }
//         })

//         if (!watchlist) {
//             return res.status(404).json({ message: 'Watchlist not found.' })
//         }

//         await watchlist.destroy()
//         return res.status(204).send()
//     } catch (error) {
//         console.error('Error deleting watchlist:', error)
//         return res.status(500).json({ message: 'Internal server error' })
//     }
// })

// export { router as watchlistRouter }