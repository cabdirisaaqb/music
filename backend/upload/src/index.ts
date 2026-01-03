import  express,{type Express } from "express";
import Env from "./config/env.js";
import FileRouter from "./router.js";
import path from "path";



const app:Express = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/",FileRouter)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.listen(Env.PORT,()=>{
    console.log(`Server is running http://localhost:${Env.PORT} ` )
})