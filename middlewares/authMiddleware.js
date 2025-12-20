const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.Authorization || req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];

            if (token) {
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
                    req.user = decoded; // Attach user info to request
                } catch (err) {
                    console.error('JWT verification failed:', err.message);
                    // Invalid token, but still let the request proceed without user
                }
            }
        }

        // Whether token was valid or not, continue to next middleware
        next();

    } catch (err) {
        console.error('Unexpected error in token verification middleware:', err.message);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = verifyToken;