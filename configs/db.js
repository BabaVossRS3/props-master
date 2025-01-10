import pkg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config({ path: '../.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const db = drizzle(pool);