const mongoose = require('mongoose');

let schema = new mongoose.Schema({
	surveyId: Number,
	title: String,
	attempts: Number,
});

let SurveyModel = mongoose.model('survey', schema);

module.exports = SurveyModel;
