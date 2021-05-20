const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

// Register
router.post("/register", async (req, res) => {
	try {
		// Destructure req.body into name, email, password
		const {name, password, email} = req.body;
		// Check if user exists

		const user = await pool.query(
			"SELECT * FROM testusers WHERE user_email = $1", [email]
		);
		
		// if (user.rows.length !== 0) {
		// 	// 401 is for user not authenticated. 
		// 	return res.status(401).send("User already exists.");
		// }

		// Encrypt user password
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);
		const bcryptPassword = await bcrypt.hash(password, salt);

		console.log("wad");
		// Enter use into our database :-)
		const newUser = await pool.query (
			"INSERT INTO testusers (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
			[name, email, bcryptPassword]
		);

		// Generate the JWT token
		console.log(newUser.rows[0].user_id);
		const token = jwtGenerator(newUser.rows[0].user_id);
		console.log(token);
		res.json({token});

	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;