import db from "../config/db.js";

const album = async () => {
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS album(
            id_album SERIAL PRIMARY KEY,
            name_album VARCHAR(255) NOT NULL,
            description_album VARCHAR(255) NOT NULL,
            genre_album_id INTEGER REFERENCES genre(id_genre) ON DELETE SET NULL,
            search_album TEXT[] NOT NULL,
            image_url_album TEXT NOT NULL,
            background TEXT NOT NULL,
            created_at_album TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at_album TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_album_name ON album(name_album);`;
    await db.query(query);
    console.log("✅ album created successfully");
  } catch (error: any) {
    console.error("❌ album not created:", error.message);
  }
};
export default album;
