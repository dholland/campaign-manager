const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authRouter = express.Router();
authRouter.post("/signup", (req, res, next) => {
	User.findOne({username: req.body.username}, (err, user) => {
		if (err) {
			return next(err);
		} else if (user) {
			res.status(403);
			return next(new Error("Sorry, that username is unavailable."));
		}
		const newUser = new User(req.body);
		newUser.save((err, saved) => {
			if (err) {
				return next(err);
			}
			const token = jwt.sign(saved.withoutPassword(), {secret: process.env.SECRET});
			return res.status(201).send({user: saved.withoutPassword(), token });
		});
	});
});
authRouter.post("/login", (req, res, next) => {
	const errMsg = "Username or password is incorrect.";
	User.findOne({username: req.body.username}, (err, user) => {
		if (err) {
			return next(err);
		} else if (!user) {
			res.status(404);
			return next(new Error(errMsg));
		}
		user.checkPassword(req.body.password, (err, isMatch) => {
			if (err) {
				return next(err);
			} else if (!isMatch) {
				res.status(404);
				return next(new Error(errMsg));
			}
			const token = jwt.sign(user.withoutPassword(), {secret: process.env.SECRET});
		res.status(201).send({user: user.withoutPassword(), token });
		});
	});
});

module.exports = authRouter;