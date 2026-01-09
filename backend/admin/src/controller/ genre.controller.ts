import { Request,Response } from "express";
import db from "../config/db.js";
// id_genre SERIAL PRIMARY KEY,
//     name_genre VARCHAR(255) UNIQUE NOT NULL


export const createGenre = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const queryCheck = `SELECT * FROM genre WHERE name_genre=$1`;
    const valuesCheck = [name];
    const resultCheck = await db.query(queryCheck, valuesCheck);
    if (resultCheck.rows.length > 0) {
      return res.status(409).json({ message: "Genre already exists" });
    }
    const query = `INSERT INTO genre(name_genre) VALUES($1) RETURNING *`;
    const values = [name];
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res.status(500).json({ message: "Genre not created" });
    }
    res
      .status(201)
      .json({ message: "Genre created successfully", genre: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log(`error:${error}`);
  }
}
export const UpdateGenre = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name } = req.body;    
        const queryCheck = `SELECT * FROM genre WHERE id_genre=$1`;
        const valuesCheck = [id];
        const resultCheck = db.query(queryCheck, valuesCheck);
        if ((await resultCheck).rows.length === 0) {                               
          return res.status(404).json({ message: "Genre not found" });
        }
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        const queryCheckName = `SELECT * FROM genre WHERE name_genre=$1`;
        const valuesCheckName = [name];
        const resultCheckName = await db.query(queryCheckName, valuesCheckName);
        if (resultCheckName.rows.length > 0) {
            return res.status(409).json({ message: "Genre name already exists" });
        }
        const update = {
            name: name || (await resultCheck).rows[0].name_genre,
        };
        const queryUpdate = `UPDATE genre SET name_genre=$1 WHERE id_genre=$2 RETURNING *`;
        const valuesUpdate = [
            update.name,
            id,
        ];
        const resultUpdate = await db.query(queryUpdate, valuesUpdate);
        if (resultUpdate.rows.length === 0) {
          return res.status(500).json({ message: "Genre not updated" });
        }
        res
          .status(200)
          .json({
            message: "Genre updated successfully",
            genre: resultUpdate.rows[0],
          });
      } catch (error: any) {
        res.status(500).json({ message: error.message });
        console.log(`error:${error}`);
      }
}
export const DeleteGenre = async(req: Request, res: Response) => {

    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Genre id is required" });
      }
      const queryCheck = `SELECT * FROM genre WHERE id_genre=$1`;
      const valuesCheck = [id];
      const resultCheck = db.query(queryCheck, valuesCheck);
      if ((await resultCheck).rows.length === 0) {
        return res.status(404).json({ message: "Genre not found" });
      }
  
      const queryDelete = `DELETE FROM genre WHERE id_genre=$1 RETURNING *`;
      const valuesDelete = [id];
      const resultDelete = await db.query(queryDelete, valuesDelete);
      if (resultDelete.rows.length === 0) {
        return res.status(500).json({ message: "Genre not deleted" });
      }
      res
        .status(200)
        .json({ message: "Genre deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
      console.log(`error:${error}`);
    }
  };

  export const GetAllGenres = async(req: Request, res: Response) => {
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
      res.status(500).json({ message: error.message});
      console.log(`error${error}`);
    }
  };
  