import { Request,Response } from "express";
import db from "../config/db.js";





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