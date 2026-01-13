import { Response, Request } from "express";
import db from "../config/db.js";

export const GetAlbumIdSongs = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const search = req.query.search as string | undefined;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;
        const { id } = req.params; 

       
        const albumCheck = await db.query(`SELECT * FROM album WHERE id_album = $1`, [id]);
        if (albumCheck.rows.length === 0) {
            return res.status(404).json({ message: "Album not found" });
        }

    let result: any = { rows: [] };
    let countResult: any = { rows: [{ count: "0" }] };
    if (search) {
        // basic search handling: filter by title or description (case-insensitive)
        const searchQuery = `
            SELECT a.*,
 (
  SELECT json_agg(songs_paged)
  FROM (
   SELECT * FROM songs
   WHERE album_id = a.id_album 
     AND array_to_string(search_song, ' ') ILIKE $2
   ORDER BY id_song ASC
   LIMIT $3 OFFSET $4
  ) as songs_paged
 ) as song_list
FROM album a
WHERE a.id_album = $1;
        `;

        countResult = await db.query(
            `
                SELECT COUNT(*) FROM songs 
                WHERE album_id = $1 
                AND array_to_string(search_song, ' ') ILIKE $2
            `,
            [id, `%${search}%`]
        );

        result = await db.query(searchQuery, [id, `%${search}%`, limit, offset]);
    } else {
        const query = `
            SELECT 
                a.*, 
                (
                    SELECT JSON_AGG(songs_paged)
                    FROM (
                        SELECT * FROM songs 
                        WHERE album_id = a.id_album 
                        ORDER BY id_song ASC
                        LIMIT $2 OFFSET $3
                    ) AS songs_paged
                ) AS songs_list
            FROM album a
            WHERE a.id_album = $1;
        `;

        countResult = await db.query(
            `
                SELECT COUNT(*) FROM songs 
                WHERE album_id = $1
            `, 
            [id]
        );

        result = await db.query(query, [id, limit, offset]);
    }

    const totalSongs = parseInt(countResult?.rows?.[0]?.count || "0");
    const album = result?.rows?.[0] ?? null;

    res.status(200).json({ 
        message: "Songs retrieved successfully", 
        total_songs: totalSongs,
        page,
        limit,
        album
    });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
        console.log(`error: ${error}`);
    }
}

export const getAllSongs = async(req:Request,res:Response) =>{
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const offset = (page - 1) * limit
        const search = req.query.search
        const genre = req.query.genre
        let result;
        let countResult;
        if (search){
            const  searchQuery =`
             SELECT * FROM songs
             WHERE array_to_string(search_song,' ') ILIKE $1
             ORDER BY id_song ASC
             LIMIT $2 OFFSET $3
            `;
            countResult = await db.query(`
            SELECT COUNT(*) FROM songs
            WHERE array_to_string(search_song,' ') ILIKE $1 
            `, [search]);
            result = await db.query(searchQuery, [`%${search}%`, limit, offset]);
        }   else if (genre){
            const  genreQuery =`
             SELECT * FROM songs
             WHERE genre_song = $1
             ORDER BY id_song ASC
             LIMIT $2 OFFSET $3
            `;
            countResult = await db.query(`
            SELECT COUNT(*) FROM songs
            WHERE genre_song_id = $1
            `, [genre]);
            result = await db.query(genreQuery, [genre, limit, offset]);
        }else{
            const query = `
                SELECT * FROM songs ORDER BY id_song ASC LIMIT $1 OFFSET $2
            `;
            countResult = await db.query(`
                SELECT COUNT(*) FROM songs
            `);
            result = await db.query(query, [limit, offset]);
        } 
        const totalSongs = parseInt(countResult?.rows?.[0]?.count || "0");
        res.status(200).json({
            message: "Songs retrieved successfully",
            total_songs: totalSongs,
            page,
            limit,
            songs: result.rows
        });


    } catch (error:any) {
        res.status(500).json({ message: error.message });
        console.log(`error: ${error}`);
        
    }
}