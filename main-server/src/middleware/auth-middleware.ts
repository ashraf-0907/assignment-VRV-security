import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwtToken } from "common-model";

export interface AuthenticatedRequest extends Request {
  id?: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Authorization header missing or invalid" });
      return; 
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = jwt.verify(token, jwtToken.ACCESS_SECRET) as jwt.JwtPayload;

    if (!decodedToken.id) {
      res.status(401).json({ message: "Invalid token payload" });
      return;
    }

    req["id"] = decodedToken.id; 
    next(); 
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
