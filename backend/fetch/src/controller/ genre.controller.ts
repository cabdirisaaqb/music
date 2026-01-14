import { Request, Response } from "express";
import db from "../config/db.js";

export const GetAllGenres = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string | undefined;
    const offset = (page - 1) * limit;
    let countResult;
    let result;

   
     if (search) {
      const searchQuery = `
      SELECT * FROM genre
      WHERE name_genre ILIKE $1
      ORDER BY id_genre ASC
      LIMIT $2 OFFSET $3
      `;
      countResult = await db.query(
        `
        SELECT COUNT(*) FROM genre
        WHERE name_genre ILIKE $1
        `,
        [`%${search}%`]
      );
      result = await db.query(searchQuery, [`%${search}%`, limit, offset]);


     }else{
      const query = `
      SELECT * FROM genre
      ORDER BY id_genre ASC
      LIMIT $1 OFFSET $2
      `;
      countResult = await db.query(`
      SELECT COUNT(*) FROM genre
      `);
      result = await db.query(query, [limit, offset]);

     }
      

   console.log( "genres:" ,result?.rows,);
   
    res.status(200).json({
      page,
      limit,
      total_genres: countResult.rows[0].count,
      genres: result?.rows,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log(`error${error}`);
  }
};
