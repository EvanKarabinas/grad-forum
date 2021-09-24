const Pool = require("pg").Pool;
const pool = new Pool({
  user: "<YOUR USERNAME>",
  host: "localhost",
  database: "<YOUR DATABASE NAME>",
  password: "<YOUR PASSWORD>",
  port: "<PSQL RUNNING PORT (DEFAULT 5432)>"
});

export default pool;
