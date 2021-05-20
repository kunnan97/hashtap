require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
	user: "postgres",
	password: process.env.dbpassword,
	host: "localhost",
	port: 5432,
	database: "uq_database"
});

module.exports = pool;