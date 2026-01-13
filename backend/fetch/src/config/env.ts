import   "dotenv/config";


const Env = {
    PORT:process.env.PORT,
    POSTGRES_USER:process.env.POSTGRES_USER,
    POSTGRES_PASSWORD:process.env.POSTGRES_PASSWORD,
    POSTGRES_HOST:process.env.POSTGRES_HOST,
    POSTGRES_PORT:process.env.POSTGRES_PORT,
    POSTGRES_DB:process.env.POSTGRES_DB,
    JWT_SECRET:process.env.JWT_SECRET,
    SERVER_UPLOAD_PATH:process.env.SERVER_UPLOAD
}
export default Env