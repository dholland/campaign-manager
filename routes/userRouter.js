const express = require("express");
const User = require("../models/User");

const userRouter = express.Router();
userRouter.get("/", (req, res, next) => {
	User.findById(req.user._id, (err, user) => {
		if (err) {
			return next(err);
		} else if (!user) {
			res.status(404);
			return next(new Error("User not found."));
		}
		return res.send({user: user.withoutPassword()});
	});
});

module.exports = userRouter;