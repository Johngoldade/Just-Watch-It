import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
    id: number;
}


const authenticationToken = (req: Request, res: Response, next: NextFunction) => {
    const authorization: string | undefined = req.headers.authorization
    console.log(authorization)
    if (!authorization) {
        res.sendStatus(401)
        return
    }

    const token: string | undefined = authorization.split(' ').pop()
    const secretKey: string | undefined = process.env.JWT_SECRET_KEY
    console.log(token)
    console.log(secretKey)
    if (!token || !secretKey) {
        res.sendStatus(401)
        return
    }

    jwt.verify(token, secretKey, (error, user) => {
        if (error) {
            res.status(403).send(error)
            return
        }

        req.user = user as JwtPayload
        console.log(req.user)
        console.log('success')
        return next()
    })

}

export default authenticationToken