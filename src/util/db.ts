import "dotenv/config";
import knex from "knex";
const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: parseInt(process.env.DB_PORT as string) || 5432,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: true,
  },
  pool: { min: 0, max: 15 },
  acquireConnectionTimeout: 10000, // 10 seconds
}).on('connection-error', function(error) {
  console.log('Error connecting to database', error);
});
export default db;