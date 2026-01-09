import {Pool} from "pg"
import Env from "./env.js";

export const db = new Pool({
    user: Env.POSTGRES_USER,
    password: Env.POSTGRES_PASSWORD,
    host: Env.POSTGRES_HOST,
    port: Number(Env.POSTGRES_PORT ),
    database: Env.POSTGRES_DB

})
export default db;