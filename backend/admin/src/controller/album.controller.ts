import { Response, Request } from "express";
import db from "../config/db.js";
import axios from "axios";
import Env from "../config/env.js";
import formdata from "form-data";

export const createAlbum = async (req: Request, res: Response) => {
  try {
    let image_url: string | undefined;
    const { name, description, genre, search, background } = req.body;
    if (!name || !description || !genre || !search || !background) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const queryCheck = `SELECT * FROM genre WHERE id_genre=$1`;
    const valuesCheck = [genre];
    const resultCheck = db.query(queryCheck, valuesCheck);
    if ((await resultCheck).rows.length === 0) {
      return res.status(404).json({ message: "Genre not found" });
    }
    const image = req.file as Express.Multer.File;
    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }
    if (image) {
      const form = new formdata();
      form.append("img", image.buffer, {
        filename: image.originalname,
        contentType: image.mimetype,
      });
      const { data } = await axios.post(
        `${Env.SERVER_UPLOAD_PATH}/upload/album`,
        form,
        {
          headers: {
            ...form.getHeaders(),
          },
        }
      );
      image_url = data.album;
    }
    const query = `INSERT INTO album(name_album,description_album, genre_album_id,search_album,image_url_album,background) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`;
    const values = [
      name,
      description,
      genre,
      JSON.parse(search),
      image_url,
      background,
    ];
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res.status(500).json({ message: "Album not created" });
    }
    res
      .status(201)
      .json({ message: "Album created successfully", album: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log(`error:${error}`);
  }
};

export const UpdateAlbum = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let image_url: string | undefined;
    const { name, description, genre, search, background } = req.body;
    const image = req.file as Express.Multer.File;
    if (genre) {
      const queryCheckGenre = `SELECT * FROM genre WHERE id_genre=$1`;
      const valuesCheckGenre = [genre];
      const resultCheckGenre = db.query(queryCheckGenre, valuesCheckGenre);
      if ((await resultCheckGenre).rows.length === 0) {
        return res.status(404).json({ message: "Genre not found" });
      }
    }

    const queryCheck = `SELECT * FROM album WHERE id_album=$1`;
    const valuesCheck = [id];
    const resultCheck = db.query(queryCheck, valuesCheck);
    if ((await resultCheck).rows.length === 0) {
      return res.status(404).json({ message: "Album not found" });
    }

    if (image) {
      const form = new formdata();
      form.append("img", image.buffer, {
        filename: image.originalname,
        contentType: image.mimetype,
      });
      const { data } = await axios.post(
        `${Env.SERVER_UPLOAD_PATH}/upload/album`,
        form,
        {
          headers: {
            ...form.getHeaders(),
          },
        }
      );
      image_url = data.album;
    }

    const update = {
      name: name || (await resultCheck).rows[0].name_album,
      description: description || (await resultCheck).rows[0].description_album,
      genre: genre || (await resultCheck).rows[0].genre_album_id,
      search: search
        ? JSON.parse(search)
        : (await resultCheck).rows[0].search_album,
      image_url: image_url || (await resultCheck).rows[0].image_url_album,
      background: background || (await resultCheck).rows[0].background,
    };

    const queryUpdate = `UPDATE album SET name_album=$1,description_album=$2, genre_album_id=$3,search_album=$4,image_url_album=$5,background=$6 WHERE id_album=$7 RETURNING *`;
    const valuesUpdate = [
      update.name,
      update.description,
      update.genre,
      update.search,
      update.image_url,
      update.background,
      id,
    ];
    const resultUpdate = await db.query(queryUpdate, valuesUpdate);
    if (resultUpdate.rows.length === 0) {
      return res.status(500).json({ message: "Album not updated" });
    }
    res.status(200).json({
      message: "Album updated successfully",
      album: resultUpdate.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log(`error:${error}`);
  }
};

export const DeleteAlbum = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Album id is required" });
    }
    const queryCheck = `SELECT * FROM album WHERE id_album=$1`;
    const valuesCheck = [id];
    const resultCheck = db.query(queryCheck, valuesCheck);
    if ((await resultCheck).rows.length === 0) {
      return res.status(404).json({ message: "Album not found" });
    }

    const queryDelete = `DELETE FROM album WHERE id_album=$1 RETURNING *`;
    const valuesDelete = [id];
    const resultDelete = await db.query(queryDelete, valuesDelete);
    if (resultDelete.rows.length === 0) {
      return res.status(500).json({ message: "Album not deleted" });
    }
    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log(`error:${error}`);
  }
};
