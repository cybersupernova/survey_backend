const Promise = require('bluebird');

const BaseService = require('./BaseService');
const answerSeeder = require('../seeder/answer-seeder');
const SurveyReportService = require('./SurveyReportService');
const SurveyModel = require('../models/SurveyModel')
const AnswerModel = require('../models/AnswerModel')

class AnswerService extends BaseService {

	insert(surveyId) {
		let data = [];
		return answerSeeder({ userCount: 1, surveyId })
			.then((answers) => {
				/*
				* In production this cache can be done asynchronously
				* so users should not wait for cache to update
				* then a batch process may persist this
				* cache in databse
				*/
				data = answers;
				let inst = new SurveyReportService();
				return Promise.map(answers, (answer) => {
					if (answer.questionType !== "ol") {
						return inst.inc(answer.surveyId, answer.questionId, answer.answer);
					}
					return Promise.resolve();
				}, { concurrency: 1 })
					.then(() => {
						return SurveyModel.updateOne({ surveyId }, { $inc: { attempts: 1 } })
					}).then(() => data);
			});
	}

	getRandomUsers() {
		// return Promise.resolve([])
		return AnswerModel.aggregate([{ $group: { _id: "$userId", surveyId: { $min: "$surveyId" } } }, { $sample: { size: 10 } }]);
	}

	getUserAttempt(userId, surveyId) {
		return AnswerModel.find({ userId, surveyId })
	}
}

module.exports = AnswerService;
