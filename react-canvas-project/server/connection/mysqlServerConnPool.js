/**
 * Mysql server DB Connection
 */
const mysql = require('mysql');
const config = require('../config/dbConfig')

const connection = {
	host: config.server.host,
	user: config.server.user,
	password: config.server.password,
	port: config.server.port,
	database: config.server.database,
	connectionLimit: config.server.connectionLimit
};

module.exports = mysql.createPool(connection);


