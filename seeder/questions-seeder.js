var connectDatabase  = require('./../db-connection');

var QuestionModel      = require('../models/QuestionModel');

var questions = [
	{
		"surveyId" : 1,
		"questionId" : 1,
		"type" : "mcq",
		"question" : "What do you want?",
		"options" : [
			{
				"id" : 1,
				"text" : "I want coffee"
			},
			{
				"id" : 2,
				"text" : "I want ice cream"
			}
		]
	},
	{
		"surveyId" : 1,
		"questionId" : 2,
		"type" : "yn",
		"question" : "Is today Monday?",
		"options" : [
			{
				"id" : 1,
				"text" : "Yes"
			},
			{
				"id" : 0,
				"text" : "No"
			}
		]
	},
	{
		"surveyId" : 1,
		"questionId" : 3,
		"type" : "ol",
		"question" : "What is your name?"
	},
	{
		"surveyId" : 1,
		"questionId" : 4,
		"type" : "scq",
		"question" : "When do you shop?",
		"options" : [
			{
				"id" : 1,
				"text" : "Whenever I feel happy"
			},
			{
				"id" : 2,
				"text" : "Whenever I feel sad"
			},
			{
				"id" : 3,
				"text" : "Whenever I want to"
			}
		]
	},
	{
		"surveyId" : 1,
		"questionId" : 5,
		"type" : "yn",
		"question" : "Did you enjoyed this survey?",
		"options" : [
			{
				"id" : 1,
				"text" : "Yes, very much"
			},
			{
				"id" : 0,
				"text" : "No, not really"
			}
		]
	}
];

var main = () => {
	return connectDatabase()
	.then(() => {
		return QuestionModel.create(questions)
		.then(function() {
			console.log("Questions Cerated");
			process.exit();
		});
	});
};

main();