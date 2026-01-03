import  express,{type Express } from "express";
import Env from "./config/env.js";



const app:Express = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(Env.PORT,()=>{
    console.log(`Server is running http://localhost:${Env.PORT} ` )
})



