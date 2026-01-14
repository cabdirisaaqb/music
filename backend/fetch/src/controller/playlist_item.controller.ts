import { Request, Response } from "express";
import db from "../config/db.js";

export const getPlaylistItem = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if(!id){
        return res.status(400).json({massage:"please enter id"})

    }
    const { page, limit, search } = req.query;
    const limitNumber = parseInt(limit as string) || 10;
    const pageNumber = parseInt(page as string) || 1;
    const offset = (pageNumber - 1) * limitNumber;
    let result;
    let countResult;

    if (search) {
      const searchQuery = `
      SELECT  Pl.*, 
      (SELECT json_agg(playlist_item)
       FROM (SELECT * FROM Playlist_item WHERE playlist_id = Pl.id_playlist 
       JOIN songs ON Playlist_item.song_id = songs.id_song
       AND array_to_string(search_song,' ') ILIKE $1
        ORDER BY id_playlist_item ASC LIMIT $2 OFFSET $3) AS playlist_item)
         AS playlist_item
      FROM Playlist AS Pl
      WHERE Pl.id_playlist = $1
      ORDER BY id_playlist_item ASC
      LIMIT $2 OFFSET $3
      `;
     
      countResult = await db.query(
        `
         SELECT COUNT(*) FROM Playlist_item
         WHERE array_to_string
         (search_playlist_item,' ') ILIKE
         $1
         `,
        [search]
      );
      result = await db.query(searchQuery, [
        `%${search}%`,  
        limitNumber,
        offset,
      ]);
    } else {
      const query = `
            SELECT * FROM Playlist_item
            ORDER BY id_playlist_item ASC
            LIMIT $1 OFFSET $2
            `;
      countResult = await db.query(`
            SELECT COUNT(*) FROM Playlist_item
            `);
      result = await db.query(query, [limitNumber, offset]);
    }
    res.status(200).json({
      message: "playlist item retrieved successfully",
      total_playlist_item: countResult.rows[0].count,
      page: pageNumber,
      limit: limitNumber,
      playlist_item: result.rows,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
    console.log(error);
  }
};
