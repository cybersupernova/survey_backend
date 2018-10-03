const express = require('express');
const reportsRoutes = require('./reports.rest');

let apiRouter = express.Router();

let initialize = (app) => {

	reportsRoutes.initialize(apiRouter);
	app.use('/api', apiRouter);
}

module.exports = {
	initialize
};
