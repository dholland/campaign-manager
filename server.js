const express = require("express");
const expressJwt = require("express-jwt");
require("dotenv").config();
require("mongoose").connect(
	process.env.DB_URL,
	{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
).then(() => console.log("Connected to the database."))
.catch(err => console.error(err));

const app = express();
app.use(require("morgan")("dev"));
app.use(express.json());

// Public routes
app.use("/auth", require("./routes/authRouter"));

// Protected routes
app.use("/api", expressJwt({secret: process.env.SECRET, algorithms: ["HS256"]}));

// Catch errors
app.use((err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		res.status(err.status);
	} else if (err.statusCode === 200) {
		res.status(500);
	}
	console.error(err.message);
	res.send({error: err.message});
});

const port = process.env.PORT;
app.listen(port, () => console.log(`The server is listening on port ${port}`));