const Promise = require('bluebird');
const uuid = require('uuid');


const AnswerModel = require('../models/AnswerModel');
const QuestionModel = require('../models/QuestionModel');
const SurveyReportModel = require('../models/SurveyReportModel');

function randomAnswer(options) {
	let index = parseInt(Math.random() * options.length);
	return options[index] || options[options.length - 1];
}

let dataToInsert = [];
function insertAnswerInQue({ surveyId, questionId, userId, questionType, answer }) {
	dataToInsert.push({ surveyId, questionId, userId, questionType, answer });
}


let answerSeeder = ({ userCount, surveyId }) => {
	dataToInsert = [];
	return QuestionModel.find({ surveyId })
		.then((questions) => {
			for (let index = 1; index <= userCount; index++) {
				let userId = uuid();
				for (questionIndex in questions) {
					answerQuestion({ question: questions[questionIndex], userId, surveyId });
				}
			}
			return AnswerModel.create(dataToInsert)
				.then(answers => dataToInsert);
		});
};

let answerQuestion = ({ question, userId, surveyId }) => {
	let answers = [];
	switch (question.type) {
		case "mcq":
			let answer = randomAnswer(question.options);
			answers[answer.id] = answer;
			answer = randomAnswer(question.options);
			answers[answer.id] = answer;
			break;

		case "scq":
		case "yn":
			answers.push(randomAnswer(question.options));
			break;

		case "ol":
			answers.push({ id: userId });
			break;
	}
	answers.forEach((answer) => {
		insertAnswerInQue({
			surveyId,
			questionId: question.questionId,
			userId,
			questionType: question.type,
			answer: answer.id
		});
	});
}

module.exports = answerSeeder;