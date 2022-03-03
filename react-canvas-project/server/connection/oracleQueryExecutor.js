// 작업중

const oracledb = require('oracledb');
const config = require('../config/dbConfig');

/**
 * ORACLE SQL QUERY EXECUTOR
 * @param query sql query
 * @param callback
 * @returns {Promise<*>} rows
 */
const execute = async (query, callback) => {

	let connection;

	try {

		connection = await oracledb.getConnection()
		const result = await connection.execute(query);

		return callback(result.rows);

	} catch (err) {

		throw err.toString();

	} finally {

		if (connection) {
			try {
				await connection.close();
			} catch (err) {
				// 에러처리
			}
		}
	}
}

/**
 * ORACLE Connection test
 * @param req   dbHost, dbPort
 * @returns {Promise<*>}
 */
const connTest = async (req) => {

	let connection;
	try {
		connection = await oracledb.getConnection({
			user: config.oracle.user,
			password: config.oracle.password,
			connectString: `${req.dbHost}:${req.dbPort}/XE`,
		});
		const result = await connection.execute(`SELECT 1 FROM dual`);

		return(result);

	} catch (err) {
		throw err.toString();

	} finally {
		if (connection) {
			try {
				await connection.close();
			} catch (err) {
				// 에러처리
			}
		}
	}
}

module.exports.execute = execute;
module.exports.connTest = connTest;
