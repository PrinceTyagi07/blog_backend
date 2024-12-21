const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
       console.log(token)
        
        if (!token) {
            return res.status(401).json({ message: 'no token provided or Unauthorized' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded.userId) {
            return res.status(401).json({ message: 'Invalid token provided ' });
        }
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (error) {
        console.log("error verifying token", error);
        res.status(401).send({ message: "Invalid token" });

    }
}
module.exports = verifyToken