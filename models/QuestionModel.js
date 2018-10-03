const mongoose = require('mongoose');

let schema = new mongoose.Schema({
	surveyId: {
		type: String,
		trim: true
	},
	questionId: {
		type: String,
		trim: true
	},
	type: {
		type: String,
		enum: ["mcq", "yn", "ol", "scq"],
		trim: true
	},
	question: {
		type: String,
		trim: true
	},
	options: [
		{
			id: {
				type: String
			},
			text: {
				type: String,
				trim: true
			},
		}
	],
});

let QuestionModel = mongoose.model('question', schema);

module.exports = QuestionModel;
