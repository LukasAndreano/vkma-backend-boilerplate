import * as mysql from "mysql";
import * as util from "util";
import { Pool } from "mysql";

const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  queueLimit: 0,
});

const query = util.promisify(pool.query).bind(pool);

export default query;
