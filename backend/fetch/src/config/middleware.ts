import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Env from "./env.js";


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: string;
      };
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1] || req.cookies?.['token'];
        console.log(token);
        

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

      
        const decoded = jwt.verify(token, Env.JWT_SECRET!) as JwtPayload;

        if (!decoded || typeof decoded === 'string') {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

      
        const id = decoded.id as number;
        const role = decoded.role as string;

        if (!id || !role) {
            return res.status(401).json({ message: 'Unauthorized: Token payload incomplete' });
        }

        req.user = { id, role };
        next();
    } catch (error: any) {
    console.log("--- JWT DEBUG ---");
    console.log("Error Name:", error.name);   
    console.log("Error Message:", error.message);
       
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token', error: error.message, secret: Env.JWT_SECRET,token:req.cookies?.['token']  });
    }
}

export const authorizeRole = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ 
            message: "Forbidden: Admin access required." 
        });
    }
    next();
};