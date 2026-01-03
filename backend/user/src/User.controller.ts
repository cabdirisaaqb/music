import { Request, Response } from "express";
import db from "./config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Env from "./config/env.js";
import { UserSchema } from "./config/zod.js";

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ massage: "please all fields are required" });
    const validation = UserSchema.safeParse({ name, email, password });
    if (!validation.success)
      return res
        .status(400)
        .json({ massage: validation.error.issues[0].message });
    const user = await db.query("SELECT email FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length > 0)
      return res.status(400).json({ massage: "user already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    if ((await newUser).rows.length === 0)
      return res.status(400).json({ massage: "user not created" });
    
    res
      .status(200)
      .json({ massage: "user created", data: (await newUser).rows[0] });
  } catch (error: any) {
    res.status(500).json({ massage: error.message });
    console.log(`error : ${error}`);
  } 
};

export const LoginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ massage: "please email and password are required" });
    }
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0){
        res.status(400).json({ massage: "user not found" });

    }
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if(!isMatch){
        res.status(400).json({ massage: "invalid password" });

    }
    const token = jwt.sign({ id: user.rows[0].id,role:user.rows[0].role }, Env.JWT_SECRET!, {
      expiresIn: "30d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({ massage: "user logged in", token });
  } catch (error: any) {
    res.status(500).json({ massage: error.message });
    console.log(`error : ${error}`);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ massage: "please id is required" });
    }
    const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    const { name, email } = req.body;
    const avatar = req.file as Express.Multer.File | undefined;

    const update = {
      name: name || user.rows[0].name,
      email: email || user.rows[0].email,
      avatar: avatar ? (avatar.filename || (avatar as any).path) : user.rows[0].avatar
    };


    

 
    
  } catch (error: any) {
    res.status(500).json({ massage: error.message });
    console.log(`error : ${error}`);
  }
};
