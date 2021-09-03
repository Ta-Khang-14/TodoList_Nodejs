const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let authHeader = req.header("Authorization");
    let accessToken = authHeader && authHeader.split(" ")[1];

    if (!accessToken) {
        return res.status(401).json({
            success: false,
            message: "Access token not found!",
        });
    } else {
        try {
            let decodeToken = jwt.verify(
                accessToken,
                process.env.ACESS_TOKEN_SECRET
            );

            req.userId = decodeToken.id;
            next();
        } catch {
            return res.status(403).json({
                success: false,
                message: "Invalid token",
            });
        }
    }
};

module.exports = verifyToken;
