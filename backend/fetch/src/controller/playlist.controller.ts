import {Request,Response} from "express"
import db from "../config/db.js";

export const playlistGet =  async(req:Request,res:Response)=>{
    try {
        const {search,page,limit} = req.query
        const limitNumber = parseInt(limit as string) || 10;
        const pageNumber = parseInt(page as string) || 1;
        const offset = (pageNumber - 1) * limitNumber;

           const user_id = req.user?.id
        if(!user_id){
            return res.status(400).json({massage:"please login "})


        }
        const playlist =  await db.query(`SELECT * FROM playlist WHERE user_id = $1`,[user_id])
        if(!playlist){
            return res.status(400).json({massage:"playlist not found"})

        }
        let result;
        let countResult;

        if(search){
            const searchQuery = `
            SELECT * FROM playlist
            WHERE name ILIKE $1
            ORDER BY id_playlist ASC
            LIMIT $2 OFFSET $3
            `;
            countResult = await db.query(`
            SELECT COUNT(*) FROM playlist
            WHERE name ILIKE $1
            `, [search]);
            result = await db.query(searchQuery, [`%${search}%`, limitNumber, offset]);

        }else{
            const query = `
            SELECT * FROM playlist
            ORDER BY id_playlist ASC
            LIMIT $1 OFFSET$2 `
            countResult = await db.query(`
            SELECT COUNT(*) FROM playlist
            `);
            result = await db.query(query, [limitNumber, offset])
            
            
        
        }     
        res.status(200).json({massage:"playlist retrieved successfully",playlist:result.rows,total_playlist:countResult.rows[0].count})
        
    } catch (error) {
        res.status(400).json({
            message:error
        })
        console.log(error);
        
        
    }

}
    