import jwt from 'jsonwebtoken';
const authenticationToken = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        res.sendStatus(401);
        return;
    }
    const token = authorization.split(' ').pop();
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!token || !secretKey) {
        res.sendStatus(401);
        return;
    }
    jwt.verify(token, secretKey, (error, user) => {
        if (error) {
            res.status(403).send(error);
            return;
        }
        req.user = user;
        return next();
    });
};
export default authenticationToken;
