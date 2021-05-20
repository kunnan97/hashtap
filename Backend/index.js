const express = require("express");
const app = express();
const cors = require("cors");
const pool = require ("./db");

const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());


app.use("/auth", require("./routes/jwtAuth"));

// Routes
app.get("/api/test/:id", async(req, res) => {
	try {
		const id = parseInt(req.params.id)
		console.log(req.params);
		const getTest = await pool.query(
			"SELECT * FROM Test WHERE Test.id = ($1)",
			[id]
		)
		res.send(getTest.rows);
	} catch (err) {
		console.error(err.message);
	}
})

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}.`);
})