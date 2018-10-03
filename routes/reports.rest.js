const AnswerService = require('../services/AnswerService');
const SurveyReportService = require('../services/SurveyReportService');
const SurveyModel = require('../models/SurveyModel')
const SurveyReportModel = require('../models/SurveyReportModel');
const QuestionModel = require('../models/QuestionModel')

function initialize(router) {

	/*
	* To fetch list of all surveys by admin
	*/
	router.get('/surveys', async (req, res) => {
		try {
			let surveys = await SurveyModel.find();
			res.json(surveys);
		}
		catch (err) {
			console.log('err', err);
			res.satus(500).json({ 'status': 'fail', err });
		}
	});

	/*
	* To insert one attempt by a new user
	*/
	router.get('/survey/insert', async (req, res) => {
		try {
			let inst = new AnswerService();
			let data = await inst.insert(req.query.surveyId)
			res.json(data);
		}
		catch (err) {
			console.log('err', err);
			res.satus(500).json({ 'status': 'fail', err });
		}
	});

	/*
	* To get one survey data, questions, and summary report
	*/
	router.get('/survey/report/admin', async (req, res) => {
		try {
			let questions = await QuestionModel.find({ surveyId: req.query.surveyId });
			let report = await SurveyReportModel.findOne({ surveyId: req.query.surveyId });
			let survey = await SurveyModel.findOne({ surveyId: req.query.surveyId });
			res.json({ questions, report, survey });
		} catch (err) {
			console.log('err', err);
			res.satus(500).json({ 'status': 'fail', err });
		}
	});

	/*
	* To get one survey data, questions, and result
	*/
	router.get('/survey/report/user', async (req, res) => {
		try {
			let inst = new AnswerService();
			let questions = await QuestionModel.find({ surveyId: req.query.surveyId });
			let report = await inst.getUserAttempt(req.query.userId, req.query.surveyId);
			let survey = await SurveyModel.findOne({ surveyId: req.query.surveyId });
			res.json({ questions, report, survey });
		} catch (err) {
			console.log('err', err);
			res.satus(500).json({ 'status': 'fail', err });
		}
	});

	/*
	* To get random list of users
	*/
	router.get('/users', async (req, res) => {
		try {
			let inst = new AnswerService();
			let users = await inst.getRandomUsers();
			res.send(users);
		} catch (err) {
			console.log('err', err);
			res.satus(500).json({ 'status': 'fail', err });
		}
	})

}

module.exports = {
	initialize
};