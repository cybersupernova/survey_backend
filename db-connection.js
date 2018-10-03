const mongoose = require('mongoose');
const Promise = require('bluebird');

const mongodb_url = 'mongodb://localhost/survey';

let connectDatabase = function () {
	return mongoose.connect(mongodb_url, {
		useNewUrlParser: true,
		promiseLibrary: Promise
	})
		.then(() => {
			/** ready to use. The `mongoose.connect()` promise resolves to undefined. */
			console.info("Connected to MongoDB", mongodb_url);
			return Promise.resolve({ msg: "Connected to MongoDB" });
		},
			err => {
				console.error("Could not connect to MongoDB:", err);
				return Promise.reject({ msg: "Could not connect to MongoDB:", err });
				/** handle initial connection error */
			}
		);
};

module.exports = connectDatabase;