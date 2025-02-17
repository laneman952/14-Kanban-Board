import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }

    const token = header.split(" ")[1];
    const secretKey = process.env.JWT_SECRET_KEY || "";

    return jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.sendStatus(403)
      }

      if (!decoded) {
        return res.status(403).json({ message: "Invalid token" });
      }

      req.user = decoded as JwtPayload;
      return next();
    });
};
