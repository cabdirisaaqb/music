import db from "../config/db.js";

const album = async () => {
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS album(
            id_album SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            artist VARCHAR(255) NOT NULL,
            genre VARCHAR(255) NOT NULL,
            search TEXT[] NOT NULL,
            image_url TEXT NOT NULL,
            created_at_album TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at_album TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_album_name ON album(name);`;
    await db.query(query);
    console.log("✅ album created successfully");
  } catch (error: any) {
    console.error("❌ album not created:", error.message);
  }
};
export default album;
