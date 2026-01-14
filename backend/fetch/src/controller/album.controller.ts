import { Response, Request } from "express";
import db from "../config/db.js";

export const getAllAlbum = async (req: Request, res: Response) => {
  try {
    const { page, limit, search,genre } = req.query;
    const pageInt = parseInt(page as string) || 1;
    const limitInt = parseInt(limit as string) || 10;
    const offset = (pageInt - 1) * limitInt;

    let result;
    let countResult;

    if (search) {
      const searchQuery = `
       SELECT * FROM album
       WHERE array_to_string(search_album,' ') ILIKE $1
       ORDER BY id_album ASC
       LIMIT $2 OFFSET $3
      `;

      countResult = await db.query(
        `
      SELECT COUNT(*) FROM album
      WHERE array_to_string(search_album,' ') ILIKE $1 
      `,
        [`%${search}%`]
      );

      result = await db.query(searchQuery, [`%${search}%`, limitInt, offset]);
    }else if(genre){
      const genreQuery = `
       SELECT * FROM album
       WHERE genre_album_id = $1
       ORDER BY id_album ASC
       LIMIT $2 OFFSET $3
      `;

      countResult = await db.query(
        `
      SELECT COUNT(*) FROM album
      WHERE genre_album_id = $1 
      `,
        [ Number(genre)]
      );

      result = await db.query(genreQuery, [ Number(genre), limitInt, offset]);
    }else {
      const query = `
          SELECT * FROM album ORDER BY id_album ASC LIMIT
           $1 OFFSET $2
           `;
      countResult = await db.query(`SELECT COUNT(*) FROM album`);
      result = await db.query(query, [limitInt, offset]);
    }

    const totalItems = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / limitInt);

    return res.status(200).json({
      message:"Albums retrieved successfully",
      data: result.rows,
      totalItems,
      totalPages,
      currentPage: pageInt,
      limit: limitInt,
    });
  } catch (error: any) {
    console.error("Error fetching albums:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
