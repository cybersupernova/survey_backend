const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const connectDatabase = require('./db-connection');
const apiRoutes = require('./routes');

let app = express();

app.use(logger('dev'));
app.use(cors()); // not for prod
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
connectDatabase();
apiRoutes.initialize(app);
app.get('*', function (req, res) {
	res.sendfile(__dirname + '/public/index.html');
});

module.exports = app;
