import  Jwt , { JwtPayload }from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Env from "./config/env.js";


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
        const token = req.headers['authorization']?.split(' ')[1] || req.cookies['token'];

        if (!token) {
            return res.status(401).json({ massage: 'Unauthorized' });
        }
      
        
        const decoded = Jwt.verify(token, Env.JWT_SECRET!);
        

        if (typeof decoded === 'string' || !decoded) {
            return res.status(401).json({ massage: 'Unauthorized' });
        }

        // ensure the payload contains the expected fields
        const { id, role } = decoded as JwtPayload & { id?: number; role?: string };

        if (!id || !role) {
            return res.status(401).json({ massage: 'Unauthorized' });
        }
        
        
        

        req.user = { id, role };
        next();
    } catch (error) {
        res.status(500).json({ massage: 'Internal Server Error', error});
        console.log(error);
        
    }
}

export const admin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = (req as any).user.role;

    if (role !== 'admin') {
      return res.status(403).json({ massage: 'admin only' });
    }

    next();
    
  } catch (error:any) {
    res.status(500).json({ massage: 'Internal Server Error' });
        console.log(error);

    
  }
}