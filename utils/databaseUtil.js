const mySQL = require("mysql2");
const pool = mySQL.createPool({
  host: "localhost",
  user: "root",
  password: "223221",
  database: "airbnb",
});

module.exports = pool.promise();
