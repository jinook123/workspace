/**
 * Mysql react(user) DB Connection
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

const pool = mysql.createPool(connection);

const getConnection = callback => {

	pool.getConnection((err, conn) => {
		if (!err) callback(conn);
	});
}

module.exports = getConnection;
