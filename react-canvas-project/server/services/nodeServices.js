const oracledb = require('oracledb');
// const connection = require('../connection/oraclePool');
const oracleConn = require('../connection/oracleConn');

const getTableList = async callback => {

	const sql = `select TABLE_NAME from USER_TABLES`;

	let connection;
	try {
		connection = await oracledb.getConnection();
		const result = await connection.execute(sql);

		return callback(result);
	} catch (err) {
		throw err.toString();
	} finally {
		if (connection) {
			try {
				await connection.close();
			} catch (err) {
				// eslint-disable-next-line no-unsafe-finally
				throw err.toString();
			}
		}
	}

}


module.exports.getTableList = getTableList;
