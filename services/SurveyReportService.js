const _ = require('lodash');

const BaseService = require('./BaseService');
const AnswerModel = require('../models/AnswerModel');
const QuestionModel = require('../models/QuestionModel');
const SurveyReportModel = require('../models/SurveyReportModel');

class SurveyReportService extends BaseService {
    generateAndGetReport(surveyId) {
        return AnswerModel.find({ surveyId, questionType: { $ne: "ol" } }, null)
            .then((answers) => {
                let answersGroupedByQuestions = _.groupBy(answers, 'questionId');
                for (let index in answersGroupedByQuestions) {
                    answersGroupedByQuestions[index] = this.structReport(answersGroupedByQuestions[index]);
                }
                return answersGroupedByQuestions;
            });
    }

    structReport(answers) {
        let answerGroups = _.groupBy(answers, 'answer');
        for (let index in answerGroups) {
            answerGroups[index] = answerGroups[index].length;
        }
        return answerGroups;
    }

    findBySurveyId(surveyId) {
        return SurveyReportModel.findOne({ surveyId });
    }

    create(surveyId) {
        return QuestionModel.find({ surveyId, type: { $ne: "ol" } })
            .then((questions) => {
                let report = {};
                for (let x = 0; x < questions.length; x++) {
                    report[questions[x].questionId] = {};
                    for (let y = 0; y < questions[x].options.length; y++) {
                        report[questions[x].questionId][questions[x].options[y]['id']] = 0;
                    }
                }
                return SurveyReportModel.create({ surveyId, questions: report });
            });

    }

    inc(surveyId, questionId, optionId) {
        return SurveyReportModel.findOne({ surveyId })
            .then((report) => {
                if (report) {
                    return report;
                }
                return this.create(surveyId);
            })
            .then((report) => {
                report.questions[questionId][optionId] += 1;
                report.markModified('questions');
                return report.save();
            });
    }
}

module.exports = SurveyReportService;