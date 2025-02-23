import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = header.split(" ")[1];
    const secretKey = process.env.JWT_SECRET_KEY || "";
    return jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.sendStatus(401);
        }
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded;
        return next();
    });
};
