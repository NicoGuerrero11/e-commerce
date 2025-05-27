import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/config.js';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid or expire token" });
        req.user = user;
        next();
    })
}

export default authenticateToken;