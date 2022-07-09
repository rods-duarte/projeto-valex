import pg from 'pg';

const { Pool } = pg;

export const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.MODE === 'PROD' ? { rejectUnauthorized: false } : null,
});
