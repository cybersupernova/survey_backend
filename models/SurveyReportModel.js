const mongoose = require('mongoose');

let schema = new mongoose.Schema({
	surveyId: {
		type: String,
		trim: true
	},
	questions: {
		type: Object
	}
});

let SurveyReportModel = mongoose.model('survey_report', schema);

module.exports = SurveyReportModel;
