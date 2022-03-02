/**
 * Mysql react DB Connection
 */
const mysql = require('mysql');
const config = require('../config/dbConfig')

const connection = {
	host: config.react.host,
	user: config.react.user,
	password: config.react.password,
	port: config.react.port,
	database: config.react.database,
	connectionLimit: config.react.connectionLimit
};

module.exports = mysql.createPool(connection);


