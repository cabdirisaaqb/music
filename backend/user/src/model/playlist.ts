import db from "../config/db.js";


const playlist = async () => {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS playlist (
            id_playlist SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL ,
            user_id INTEGER REFERENCES users(id_user),
            created_at_playlist TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at_playlist TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS Playlist_item (
            id_playlist_item SERIAL PRIMARY KEY,
            id_playlist INTEGER REFERENCES playlist(id_playlist),
            id_song INTEGER REFERENCES songs(id_song),
            created_at_playlist_item TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at_playlist_item TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE INDEX IF NOT EXISTS idx_playlist_name ON playlist(name);
        CREATE INDEX IF NOT EXISTS idx_playlist_item_id_playlist ON Playlist_item(id_playlist);
        `
        await db.query(query)
        console.log("✅ playlist created successfully");
        
    } catch (error: any) {
        console.error("❌ playlist not created:", error.message);
        
    }
    
}
export default playlist;