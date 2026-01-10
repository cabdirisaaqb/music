import { Request,Response } from "express";
import db from "../config/db.js";



// CREATE TABLE IF NOT EXISTS Playlist_item (
//             id_playlist_item SERIAL PRIMARY KEY,
//             id_playlist INTEGER REFERENCES playlist(id_playlist) ON DELETE CASCADE,
//             id_song INTEGER REFERENCES songs(id_song) ON DELETE CASCADE,
//              VARCHAR(255) DEFAULT NULL,
//             created_at_playlist_item TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//             updated_at_playlist_item TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         );


export const addPlaylistItem = async (req:Request,res:Response)=>{
    try {
        const {playlistId,songId} = req.body
        if(!playlistId || !songId){
            return res.status(400).json({massage:"playlistId and songId are required"})
        }
        const user_id = req.user?.id
        if(!user_id){
            return res.status(400).json({massage:"please login "})

        }
        const checkPlaylist = await db.query(`SELECT * FROM playlist WHERE id_playlist = $1 AND user_id = $2`,[playlistId,user_id])
        if(!checkPlaylist){
            return res.status(400).json({massage:"playlist not found"})
        }
        const checkSong = await db.query(`SELECT * FROM songs WHERE id_song = $1`,[songId])
        if(!checkSong){
            return res.status(400).json({massage:"song not found"})
        }
        const playlistItem = await db.query(`INSERT INTO Playlist_item (id_playlist,id_song) VALUES ($1,$2) RETURNING *`,[playlistId,songId])
        if(!playlistItem){
            return res.status(400).json({massage:"playlistItem not created"})
        }
        res.status(200).json({massage:"playlistItem created"})
        
    } catch (error:any) {
        res.status(400).json({
            message:error.message
        })
        console.log(error);
        
    }
}

export const DeletePlaylistItem = async (req:Request,res:Response)=>{
    try {
        const {id} = req.params 
        if(!id){
            return res.status(400).json({massage:"id is required"})
        }
        const user_id = req.user?.id
        if(!user_id){
            return res.status(400).json({massage:"please login "})
        }
        const checkPlaylistItem = await db.query(`SELECT * FROM Playlist_item WHERE id_playlist_item = $1 AND id_playlist IN (SELECT id_playlist FROM playlist WHERE user_id = $2)`,[id,user_id])
        if(!checkPlaylistItem){
            return res.status(400).json({massage:"playlistItem not found"})
        
        }  
        const playlistItem = await db.query(`DELETE FROM Playlist_item WHERE id_playlist_item = $1 RETURNING *`,[id])
        if(!playlistItem){
            return res.status(400).json({massage:"playlistItem not deleted"})

        }
        res.status(200).json({massage:"playlistItem deleted"})
    } catch (error:any) {
        res.status(400).json({
            message:error.message
        })
        console.log(error);
        
    }
}


export const getPlaylistItem =async (req:Request,res:Response)=>{
    try {
        const {page,limit,search} = req.query
        const limitNumber = parseInt(limit as string) || 10;
        const pageNumber = parseInt(page as string) || 1;
        const offset = (pageNumber - 1) * limitNumber;
        let result;
        let countResult;

        if(search){
         const searchQuery = `SELECT * FROM  Playlist_item WHERE  `

        }

        
        
    } catch (error:any) {
         res.status(400).json({
            message:error.message
        })
        console.log(error);
        
    }
    
}