const mysql = require('mysql');
const config = require('./config/dbConfig');

const reactConnection = mysql.createPool({
	host: config.react.host,
	port: config.react.port,
	user: config.react.user,
	password: config.react.password,
	database: config.react.database,
});

const serverConnection = mysql.createPool({
	host: config.server.host,
	port: config.server.port,
	user: config.server.user,
	password: config.server.password,
	database: config.server.database,
});

module.exports.mysqlReact = reactConnection;
module.exports.mysqlServer = serverConnection;
