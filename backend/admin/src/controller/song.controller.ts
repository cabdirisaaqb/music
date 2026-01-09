import { Response, Request } from "express";
import db from "../config/db.js";
import axios from "axios";
import Env from "../config/env.js";
import formdata from "form-data";


export const createSong = async (req: Request, res: Response) => {
    try {
        const { name, description, album_id, genre, search } = req.body;
        if (!name || !description || !album_id || !genre || !search) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const queryCheck = `SELECT * FROM album WHERE id_album=$1`;
        const valuesCheck = [album_id];
        const resultCheck = db.query(queryCheck, valuesCheck);
        if ((await resultCheck).rows.length === 0) {
            return res.status(400).json({ message: "Album does not exist" });
        }
        const  genreQuery =`
        SELECT * FROM genre WHERE id_genre = $1
        `;
        const genreResult = await db.query(genreQuery, [genre]);
        if (genreResult.rows.length === 0) {
            return res.status(400).json({ message: "Genre does not exist" });
        }
       

       
        let audio_url: string | undefined;
        let image_url_song: string | undefined;



        const audio = req.files && (req.files as { [fieldname: string]: Express.Multer.File[] })['audio'] ? (req.files as { [fieldname: string]: Express.Multer.File[] })['audio'][0] : null;
        const image = req.files && (req.files as { [fieldname: string]: Express.Multer.File[] })['img'] ? (req.files as { [fieldname: string]: Express.Multer.File[] })['img'][0] : null;
        if (!audio) {
            return res.status(400).json({ message: "Audio file is required" });
        }
        if (!image) {
            return res.status(400).json({ message: "Image file is required" });
        }

        if (audio) {
            const form = new formdata();
            form.append("audio", audio.buffer, {
                filename: audio.originalname,
                contentType: audio.mimetype,
            });
            form.append("img", image.buffer, {
                filename: image.originalname,
                contentType: image.mimetype,
            });
            const { data } = await axios.post(
                `${Env.SERVER_UPLOAD_PATH}/upload/audio`,
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            audio_url = data.audioUrl;
            image_url_song = data.imgUrl;
        }
        const duration =  audio.size; // in bytes

  function formatDuration(ms: number): string {
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let hours = Math.floor((ms / (1000 * 60 * 60)));

  return `${hours}:${minutes}:${seconds}`;
}


 const query = `INSERT INTO songs(name_song, description_song, album_id, duration_song, genre_song, audio_url, image_url_song, search_song) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
        const values = [name, description, album_id, formatDuration(duration), genre, audio_url, image_url_song, JSON.parse(search)];
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            return res.status(500).json({ message: "Song not created" });
        }


        res.status(201).json({ message: "Song created successfully", 
        song: result.rows[0]
           
        });

    

      

        
    } catch (error: any) {

        res.status(500).json({ message: error.message });
        console.log(`error:${error}`);
    }
}

export const UpdateSong = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        let audio_url: string | undefined;
        let image_url_song: string | undefined;
        const { name, description,  search ,genre,album_id} = req.body;

        const queryCheck = `SELECT * FROM songs WHERE id_song=$1`;
        const valuesCheck = [id];
        const resultCheck = db.query(queryCheck, valuesCheck);
        if ((await resultCheck).rows.length === 0) {
            return res.status(404).json({ message: "Song not found" });
        }
        if (album_id) {
            const queryCheckAlbum = `SELECT * FROM album WHERE id_album=$1`;
            const valuesCheckAlbum = [album_id];
            const resultCheckAlbum = db.query(queryCheckAlbum, valuesCheckAlbum);
            if ((await resultCheckAlbum).rows.length === 0) {
                return res.status(404).json({ message: "Album not found" });
            }
        }
        if (genre) {
            const  genreQuery =`
            SELECT * FROM genre WHERE id_genre = $1
            `;
            const genreResult = await db.query(genreQuery, [genre]);
            if (genreResult.rows.length === 0) {
                return res.status(400).json({ message: "Genre does not exist" });
            }
        }

        const audio = req.files && (req.files as { [fieldname: string]: Express.Multer.File[] })['audio'] ? (req.files as { [fieldname: string]: Express.Multer.File[] })['audio'][0] : null;
        const image = req.files && (req.files as { [fieldname: string]: Express.Multer.File[] })['img'] ? (req.files as { [fieldname: string]: Express.Multer.File[] })['img'][0] : null;
     
        if (audio) {
            const form = new formdata();
            form.append("audio", audio.buffer, {
                filename: audio.originalname,
                contentType: audio.mimetype,
            });
          
            const { data } = await axios.post(
                `${Env.SERVER_UPLOAD_PATH}/upload/audio`,
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            audio_url = data.audioUrl;
           
        }
        if (image) {
            const form = new formdata();
            form.append("img", image.buffer, {
                filename: image.originalname,
                contentType: image.mimetype,
            });
            const { data } = await axios.post(
                `${Env.SERVER_UPLOAD_PATH}/upload/audio`,
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            image_url_song = data.imgUrl;
        }

        const duration = audio ? audio.size : (await resultCheck).rows[0].duration_song; // in bytes

  function formatDuration(ms: number): string {
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let hours = Math.floor((ms / (1000 * 60 * 60)));

  return `${hours}:${minutes}:${seconds}`;
}
        const update = {
            name: name || (await resultCheck).rows[0].name_song,
            description: description || (await resultCheck).rows[0].description_song,
            genre_song: genre || (await resultCheck).rows[0].genre_song,
            search: search ? JSON.parse(search) : (await resultCheck).rows[0].search_song,
            audio_url: audio_url || (await resultCheck).rows[0].audio_url,
            image_url_song: image_url_song || (await resultCheck).rows[0].image_url_song,
            duration_song: audio ? formatDuration(duration) : (await resultCheck).rows[0].duration_song,
        };

        const queryUpdate = `UPDATE songs SET name_song=$1,description_song=$2,genre_song_id=$3,search_song=$4,audio_url=$5,image_url_song=$6,duration_song=$7 WHERE id_song=$8 RETURNING *`;
        const valuesUpdate = [
            update.name,
            update.description,
            update.genre_song,
            update.search,
            update.audio_url,
            update.image_url_song,
            update.duration_song,
            id
        ];
        const resultUpdate = await db.query(queryUpdate, valuesUpdate);
        if (resultUpdate.rows.length === 0) {
            return res.status(500).json({ message: "Song not updated" });
        }
        res
            .status(200)
            .json({
                message: "Song updated successfully",
                song: resultUpdate.rows[0],
            }); 

    } catch (error: any) {

        res.status(500).json({ message: error.message });
        console.log(`error:${error}`);
    }
}

export const DeleteSong = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Song id is required" });
        }
        const queryCheck = `SELECT * FROM songs WHERE id_song=$1`;
        const valuesCheck = [id];
        const resultCheck = db.query(queryCheck, valuesCheck);
        if ((await resultCheck).rows.length === 0) {
            return res.status(404).json({ message: "Song not found" });
        }

        const queryDelete = `DELETE FROM songs WHERE id_song=$1 RETURNING *`;
        const valuesDelete = [id];
        const resultDelete = await db.query(queryDelete, valuesDelete);
        if (resultDelete.rows.length === 0) {
            return res.status(500).json({ message: "Song not deleted" });
        }
        res
            .status(200)
            .json({
                message: "Song deleted successfully",
               
            });

    } catch (error: any) {

        res.status(500).json({ message: error.message });
        console.log(`error:${error}`);
    }
}

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