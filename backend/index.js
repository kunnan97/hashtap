const express = require("express");
const app = express();
const cors = require("cors");
const pool = require ("./db");

const PORT = 3001;
// Middleware
app.use(cors());
app.use(express.json());


app.use("/api/auth", require("./routes/jwtAuth"));
app.use("/api/scrape", require("./routes/scrape"));

// Routes

app.get("/api/test")
app.get("/api/test/:id", async(req, res) => {
	try {
		const id = parseInt(req.params.id)
		console.log(req.params);
		// const getTest = await pool.query(
		// 	"SELECT * FROM Test WHERE Test.id = ($1)",
		// 	[id]
		// )
		res.send({user: "BOO!"});
	} catch (err) {
		console.error(err.message);
	}
})

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}.`);
})