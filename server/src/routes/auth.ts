import { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body
    const secretKey = process.env.JWT_SECRET_KEY || ''

    const user = await User.findOne({
        where: { username },
    })

    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' })
    }

    const passwordIsValid = await bcrypt.compare(password, user.password)
    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Authentication failed' })
    }

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' })
    return res.json({ token })
}

const router = Router()

router.post('/login', login)

export default router
