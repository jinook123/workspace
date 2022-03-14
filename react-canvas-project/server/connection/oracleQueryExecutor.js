// 작업중

const oracledb = require('oracledb');
const config = require('../config/dbConfig');

/**
 * ORACLE SQL QUERY EXECUTOR
 * @param poolAlias database name (connection pool name)
 * @param query sql query
 * @param data values
 * @param callback
 * @returns {Promise<*>} rows
 */
const execute = async (poolAlias, query, data, callback) => {

	let connection;

	try {

		connection = await oracledb.getConnection(poolAlias)

		let result;

		if (data)
		    result = await connection.execute(query, data);
		else
			result = await connection.execute(query);

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

		return(result.rows);

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
