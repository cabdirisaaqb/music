import db from "../config/db.js";

const genre = async () => {
  try {
    const query = `
    CREATE TABLE IF NOT EXISTS genre(
    id_genre SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
    );
        `;
    await db.query(query);
    console.log("✅ genre created successfully");
  } catch (error: any) {
    console.log("❌ genre not created:", error.message);
  }
};

export default genre;