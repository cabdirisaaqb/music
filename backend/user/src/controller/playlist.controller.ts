import {Request,Response} from "express"
import db from "../config/db.js";

// CREATE TABLE IF NOT EXISTS playlist (
//             id_playlist SERIAL PRIMARY KEY,
//             background VARCHAR(255) DEFAULT NULL,
//             name VARCHAR(255) NOT NULL ,
//             user_id INTEGER REFERENCES users(id_user) ON DELETE CASCADE,
//             created_at_playlist TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//             updated_at_playlist TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         );

export const playlistCreate =  async(req:Request,res:Response)=>{

    try {
        const {name,background} = req.body
        const user_id = req.user?.id
        if(!user_id){
            return res.status(400).json({massage:"please login "})

        }
        if(!name){
            return res.status(400).json({massage:"name is required"})
        }
          if(!background){
            return res.status(400).json({massage:"background is required"})
        }
        const checkName = await db.query(`SELECT * FROM playlist WHERE name = $1 AND user_id = $2`,[name,user_id])
        if(checkName){
            return res.status(400).json({massage:"playlist already exists"})
        }
        const playlist = await db.query(`INSERT INTO playlist (name,user_id,background) VALUES ($1,$2) RETURNING *`,[name,user_id,background])
        if(!playlist){
            return res.status(400).json({massage:"playlist not created"})
        }
        res.status(200).json({massage:"playlist created"})



        
    } catch (error:any) {
        res.status(400).json({
            message:error.message
        })
        console.log(error);
        
    
        
    }
   
}

export const playlistDelete = async (req:Request,res:Response)=>{
    try {
        const {id} = req.params
        if(!id){
            return res.status(400).json({massage:"id is required"})
        }
    
        const user_id = req.user?.id
        if(!user_id){
            return res.status(400).json({massage:"please login "})

        }
        const  checkPlaylist = await db.query(`SELECT * FROM playlist WHERE id_playlist = $1 AND user_id = $2`,[id,user_id])
        if(!checkPlaylist){
            return res.status(400).json({massage:"playlist not found"})
        }
        const playlist =  await db.query(`DELETE FROM playlist WHERE id_playlist = $1 AND user_id = $2 RETURNING *`,[id,user_id])

        res.status(200).json({massage:"playlist deleted"})        
    } catch (error:any) {
        res.status(400).json({
            message:error.message
        })
        console.log(error);
        
    
        
    }
   
}

export const playlistUpdate =  async(req:Request,res:Response)=>{
    try {
          const {id} = req.params
        if(!id){
            return res.status(400).json({massage:"id is required"})
        }
    
        const user_id = req.user?.id
        if(!user_id){
            return res.status(400).json({massage:"please login "})

        }

        const {name,background} = req.body
        
        const checkPlaylist  =  await db.query(`SELECT Playslist FROM playlist WHERE id_playlist = $1 AND user_id = $2`,[id,user_id])
        if(!checkPlaylist){
            return res.status(400).json({massage:"playlist not found"})
        
        }
        const updatedPlaylist = {
            name:name || checkPlaylist.rows[0].name,
            background:background || checkPlaylist.rows[0].background
            }
        

        const result =  await db.query(`UPDATE playlist SET name = $1, background = $2 WHERE id_playlist = $3 AND user_id = $4 RETURNING *`,[updatedPlaylist.name,updatedPlaylist.background,id,user_id])
        if(!result){
            return res.status(400).json({massage:"playlist not updated"})
        }
        res.status(200).json({massage:"playlist updated"})

    }catch (error:any) {
        res.status(400).json({
            message:error.message
        })
        console.log(error);
        
    
        
    }
   
}

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
    