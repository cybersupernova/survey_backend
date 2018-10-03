const connectDatabase = require('./db-connection');

const SurveyReportService = require('./services/SurveyReportService');

connectDatabase()
	.then(() => {
		let ins = new SurveyReportService();

		return ins.create(1)
			.then((data) => {
				console.log(data);
			});

		// return ins.inc(1, '1', '1')
		// .then((answers) => {
		//     console.log(answers);
		// });

		// ins.generateAndGetReport(1)
		// 	.then((answers) => {
		// 		console.log(answers);
		// 	});
	})