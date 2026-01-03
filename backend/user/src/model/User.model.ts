import db from "../config/db.js";
const users_table = async () => {
  try {
   
    const createEnumType = `
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
          CREATE TYPE user_role AS ENUM ('admin', 'user');
        END IF;
      END $$;
    `;
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id_user SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            avatar TEXT DEFAULT NULL,
            role user_role DEFAULT 'user',
            created_at_user TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at_user TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

    
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `;

    await db.query(createEnumType); 
    await db.query(query);        

    console.log("✅ users_table created successfully");
  } catch (error: any) {
    console.error("❌ users_table not created:", error.message);
  }
};

export default users_table;