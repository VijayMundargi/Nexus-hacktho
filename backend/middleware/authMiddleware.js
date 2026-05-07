const jwt = require('jsonwebtoken');

const isAuthenticated = async (
    req,
    res,
    next
) => {

    try {

        const token =
        req.headers.authorization;

        if (!token) {

            return res.status(401).json({
                success: false,
                message: "Login required",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
};

module.exports = isAuthenticated;