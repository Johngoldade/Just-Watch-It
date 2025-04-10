// import express from 'express'
// import { Request, Response } from 'express'
// import { Group } from '../../models/Group.js'
// import { User } from '../../models/User.js'
// import { WatchList } from '../../models/WatchList.js'

// const router = express.Router()

// // Get all groups for a user
// router.get('/:userId/groups', async (req: Request, res: Response) => {
//     const userId = req.params.userId

//     try {
//         const groups = await Group.findAll({
//             where: { userId: userId },
//             include: [{
//                 model: WatchList,
//                 as: 'watchList',
//                 attributes: ['id', 'name']
//             }]
//         })

//         if (!groups || groups.length === 0) {
//             return res.status(404).json({ message: 'No groups found for this user.' })
//         }

//         return res.status(200).json(groups)
//     } catch (error) {
//         console.error('Error fetching groups:', error)
//         return res.status(500).json({ message: 'Internal server error' })
//     }
// })

// // Get user's priority group
// router.get('/priorityGroup', async (req: Request, res: Response) => {
//     const user: string | undefined = req.user?.username

//     try {
//         if (!user) {
//             res.sendStatus(401)
//             return
//         }

//         const userInfo = await User.findOne({
//             where: {
//                 username: user
//             }
//         })

//         if (!userInfo) {
//             res.json({ message: 'No user found'})
//         }

//         const primaryGroup = await Group.findOne({
//             where: {
//                 id: userInfo?.primaryGroup,
//             }
//         })

//         if (!primaryGroup) {
//             return res.status(404).json({ message: 'No primary group found for this user.' })
//         }

//         return res.status(200).json(primaryGroup)
//     } catch(error) {
//         console.error('Error fetching priority group', error)
//         return res.status(500).json({ message: 'interal server error' })
//     }
// })

// // Create a new group
// router.post('/:userId/groups', async (req: Request, res: Response) => {
//     const userId = parseInt(req.params.userId)
//     const { watchListId } = req.body

//     if (!watchListId) {
//         return res.status(400).json({ message: 'WatchList ID is required.' })
//     }

//     try {
//         const watchList = await WatchList.findByPk(watchListId)
//         if (!watchList) {
//             return res.status(404).json({ message: 'WatchList not found.' })
//         }

//         const newGroup = await Group.create({
//             userId: userId,
//             watchList: watchListId
//         })

//         await Group.update(
//             { userId: userId },
//             { where: { id: newGroup.id } }
//         )

//         return res.status(201).json(newGroup)
//     } catch (error) {
//         console.error('Error creating group:', error)
//         return res.status(500).json({ message: 'Internal server error' })
//     }
// })

// // Add a user to an existing group
// router.post('/:groupId/users', async (req: Request, res: Response) => {
//     const groupId = parseInt(req.params.groupId)
//     const { userId } = req.body

//     if (!userId) {
//         return res.status(400).json({ message: 'User ID is required.' })
//     }

//     try {
//         const group = await Group.findByPk(groupId)
//         if (!group) {
//             return res.status(404).json({ message: 'Group not found.' })
//         }

//         const user = await User.findByPk(userId)
//         if (!user) {
//             return res.status(404).json({ message: 'User not found.' })
//         }

//         return res.status(200).json({ message: 'User removed from group successfully.' })
//     } catch (error) {
//         console.error('Error removing user from group:', error)
//         return res.status(500).json({ message: 'Internal server error' })
//     }
// })

// // Delete a group
// router.delete('/:groupId', async (req: Request, res: Response) => {
//     const groupId = parseInt(req.params.groupId)

//     try {
//         const group = await Group.findByPk(groupId)
//         if (!group) {
//             return res.status(404).json({ message: 'Group not found.' })
//         }

//         await group.destroy()

//         return res.status(200).json({ message: 'Group deleted successfully.' })
//     } catch (error) {
//         console.error('Error deleting group:', error)
//         return res.status(500).json({ message: 'Internal server error' })
//     }
// })


// export { router as groupRouter }