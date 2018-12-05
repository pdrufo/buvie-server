const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User } = require("../users/models");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.put("/:id", jsonParser, (req, res, next) => {
	let { id } = req.params;

	console.log(id, "line 9", req.user.id.toString());
	if (req.user.id !== id) {
		let err = new Error("Hold up sir that is not your id");
		err.status = 401;
		next(err);
	}

	console.log(req.body, "line 16");
	let { genres, movies } = req.body;

	if (genres) {
		User.findOneAndUpdate({ _id: id }, { genres: genres }, { new: true })
			.then(user => res.json(user))
			.catch(err => {
				return next(err);
			});
	} else if (movies) {
		User.findByIdAndUpdate({ _id: id }, { movies: movies }, { new: true })
			.then(user => res.json(user))
			.catch(err => {
				return next(err);
			});
	}

	return next();
});

module.exports = { router };
