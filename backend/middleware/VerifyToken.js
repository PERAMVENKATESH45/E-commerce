require('dotenv').config();
const jwt = require('jsonwebtoken');

// Middleware: Verify user token
exports.verifyToken = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: "Token missing, please login again" });
        }

        const decodedInfo = jwt.verify(token, process.env.SECRET_KEY);

        if (decodedInfo && decodedInfo._id && decodedInfo.email) {
            req.user = decodedInfo;
            next();
        } else {
            return res.status(401).json({ message: "Invalid Token, please login again" });
        }

    } catch (error) {
        console.log(error);

        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token expired, please login again" });
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid Token, please login again" });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

// Middleware: Only allow admin access
exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: "Access denied: Admins only." });
    }
};
