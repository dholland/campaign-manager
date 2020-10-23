const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema({
	username: {
		type: String,
		lowercase: true,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	displayName: String,
	settings: {
		rows: {
			type: [Number],
			default: [20, 4, 6, 8, 10, 12, 100]
		},
		hiddenRows: [Number]
	}
});

userSchema.pre("save", function (next) {
	const user = this;
	if (user.isModified("password")) {
		bcrypt.hash(user.password, 10, (err, hash) => {
			if (err) {
				return next(err);
			}
			user.password = hash;
			return next();
		});
	}
});

userSchema.methods.checkPassword = function (attempt, callback) {
	bcrypt.compare(attempt, this.password, (err, isMatch) => {
		if (err) {
			return callback(err);
		}
		return callback(null, isMatch);
	});
};

userSchema.methods.withoutPassword = function () {
	const user = this.toObject();
	delete user.password;
	return user;
};

module.exports = mongoose.model("User", userSchema);