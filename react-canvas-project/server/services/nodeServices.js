/**
 * /node/* Services
 * w/f node 등 유저 서비스 관련
 */
const oracledb = require('oracledb');
const oracleQueryExecutor = require('../connection/oracleQueryExecutor');
const query = require('../sql/oracleSql').nodeQuery;

/**
 * ORACLE user server table list
 * select TABLE_NAME from USER_TABLES
 * @param callback
 * @returns {Promise<*>}
 */
const getTableList = async callback => {

	const sql = query.DBQuery.getTableList;

	const result = await oracleQueryExecutor.execute(sql, callback);

	return callback(result);
}

/**
 * ORACLE user server Get all tables, columns
 * SELECT table_name, column_name FROM user_tab_columns
 * @param callback
 * @returns {Promise<void>}
 */
const getAllTabCol = async callback => {

	const sql = query.getAllTabCol;
    
	const result = await oracleQueryExecutor.execute(sql, callback);

	return callback(result);
}


module.exports.getTableList = getTableList;
module.exports.getAllTabCol = getAllTabCol;
