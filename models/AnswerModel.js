const mongoose = require('mongoose');

let schema = new mongoose.Schema({
	"surveyId": {
		type: String,
		trim: true
	},
	"questionId": {
		type: String,
		trim: true
	},
	"userId": {
		type: String,
		trim: true
	},
	"questionType": {
		type: String,
		trim: true
	},
	"answer": {
		type: String,
		trim: true
	}
});

let AnswerModel = mongoose.model('answer', schema);

module.exports = AnswerModel;
