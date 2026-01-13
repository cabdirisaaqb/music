import { Request, Response } from "express";
import db from "../config/db.js";


export const Me = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await db.query("SELECT id_user, name, email, avatar, role FROM users WHERE id_user = $1", [userId]);
    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: user.rows[0] });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log(`error : ${error}`);
  }
}

export const AllUsers = async(req: Request, res: Response)=>{
  try {
    const {page, limit,search} = req.query
    const pageNumber = parseInt(page as string) || 1;
    const limitNumber = parseInt(limit as string) || 10;
    const offset = (pageNumber - 1) * limitNumber;
    let users;
    let cont ;

    if(search){
      users = await db.query("SELECT id_user, name, email, avatar, role, created_at_user, updated_at_user FROM users WHERE name ILIKE $1 OR email ILIKE $1 LIMIT $2 OFFSET $3", [`%${search}%`, limitNumber, offset]);
      cont = await db.query(`SELECT COUNT(*) FROM users WHERE name ILIKE $1 OR email ILIKE $1`, [`%${search}%`]);
    }else{
      users = await db.query("SELECT id_user, name, email, avatar, role ,created_at_user ,updated_at_user FROM users LIMIT $1 OFFSET $2", [limitNumber, offset]);
      cont = await db.query(`SELECT COUNT(*) FROM users`);
    }
    res.status(200).json({
      total: cont.rows[0].count,
      page: pageNumber,
      limit: limitNumber,
      users: users.rows
    });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log(`error : ${error}`);
    
  }
}
