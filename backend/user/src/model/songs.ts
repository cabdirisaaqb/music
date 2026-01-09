import db from "../config/db.js";


const songs = async () => {
    try {
        const query =  `
        CREATE TABLE IF NOT EXISTS songs(
            id_song SERIAL PRIMARY KEY,
            name_song VARCHAR(255) NOT NULL,
            description_song VARCHAR(255) NOT NULL,
            album_id INTEGER REFERENCES album(id_album) ON DELETE SET NULL,
            duration_song VARCHAR(255) NOT NULL,
            genre_song_id INTEGER REFERENCES genre(id_genre) ON DELETE SET NULL,
        
            audio_url TEXT NOT NULL,
            image_url_song TEXT NOT NULL,
            search_song TEXT[] NOT NULL,
            created_at_song TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at_song TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
      
        CREATE INDEX IF NOT EXISTS idx_songs_album_id ON songs(album_id);   
        `;
    await db.query(query);

    console.log("✅ songs created successfully");
        
    } catch (error: any) {
        console.error("❌ songs not created:", error.message);
        
    }
}
export default songs;