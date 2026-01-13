import { Request, Response } from "express";
import db from "../config/db.js";

export const GetAllGenres = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const countResult = await db.query(`SELECT COUNT(*) FROM genre`);
    const totalItems = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);
    const query = `SELECT * FROM genre ORDER BY id_genre ASC LIMIT $1 OFFSET $2`;
    const values = [limit, offset];
    const result = await db.query(query, values);
    res.status(200).json({
      page,
      limit,
      totalItems,
      totalPages,
      genres: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log(`error${error}`);
  }
};
