import db from "../config/db.js";


const songs = async () => {
    try {
        const query =  `
        CREATE TABLE IF NOT EXISTS songs(
            id_song SERIAL PRIMARY KEY,
            name_song VARCHAR(255) NOT NULL,
            artist_song VARCHAR(255) NOT NULL,
            album VARCHAR(255) NOT NULL,
            genre_song VARCHAR(255) NOT NULL,
            audio_url TEXT NOT NULL,
            image_url_song TEXT NOT NULL,
            search_song TEXT[] NOT NULL,
            created_at_song TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at_song TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_songs_name ON songs(name_song);
        `
        await db.query(query)
        console.log("✅ songs created successfully");
        
    } catch (error: any) {
        console.error("❌ songs not created:", error.message);
        
    }
}
export default songs;