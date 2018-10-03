var readline         = require('readline');

var connectDatabase  = require('./../db-connection');
var answerSeeder     = require('./answer-seeder');


function exit(log) {
	console.log(log);
	process.exit();
}

function main() {
	connectDatabase()
	.then(() => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		return rl.question('Enter number of users: ', (userCount) => {
			try{
				userCount = parseInt(userCount);
				if (!userCount) {
					return exit('User count shuld be number.');
				}
			} catch(err) {
				return exit(err);
			};
			return rl.question('Enter survey ID: ', (surveyId) => {
				rl.close();
				return answerSeeder({userCount, surveyId})
				.then((data) => {
					return exit({msg : "Data Inserted: "});
				})
				.catch((err) => {
					return exit(err);
				});
			});
		});
	});
}

main();