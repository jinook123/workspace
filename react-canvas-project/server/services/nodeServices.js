/**
 * /node/* Services
 * w/f node 등 유저 서비스 관련
 */
const oracledb = require('oracledb');
const oracleQueryExecutor = require('../connection/oracleQueryExecutor');
const mysqlQueryExecutor = require('../connection/mysqlQueryExecutor');
const {oracleNodeQuery} = require('../sql/oracleSql');
const {myNodeQuery} = require('../sql/mysqlSql');

// mysql user server connector
// 추후 DB 추가에 따른 변경 필요
const myNodeConn = require('../connection/mysqlReactPool');

// oracle user server pool name
const nodePoolAlias = require('../config/dbConfig').oracle.poolAlias;           // oracle pool name

/**
 * SELECT table_name FROM user_tables
 * @param req null
 * @param callback
 * @returns {Promise<*>} table list
 */
const getOracleTableList = async (req, callback) => {

	const sql = oracleNodeQuery.getTableList;
	const poolAlias = req;

	const result = await oracleQueryExecutor.execute(poolAlias, sql, null, callback);

	return callback(result.rows);
}

/**
 *
 * @param req
 * @param callback
 * @returns {Promise<*>}
 */
const getMyTableList = async (req, callback) => {

	const sql = myNodeQuery.getTableList;
	const {db} = req;

	const result = await mysqlQueryExecutor.selectSql(myNodeConn, sql, [db]) // table_schema
		.catch(err => { throw err; })

	return callback(result);
}


const getOracleColList = async (req, callback) => {

	const sql = oracleNodeQuery.getColList;
	const poolAlias = req.db;
	const {tableName} = req;
    
	const result = await oracleQueryExecutor.execute(poolAlias, sql, [tableName], callback);

	return callback(result.rows);
}


const getMyColList = async (req, callback) => {

	const sql = myNodeQuery.getColList;
	const param = req;  // db, tableName

	const result = await mysqlQueryExecutor.selectSql(myNodeConn, sql, param)
		.catch(err => { throw err; })

	return callback(result);
}



module.exports.getOracleTableList = getOracleTableList;
module.exports.getMyTableList = getMyTableList;
module.exports.getOracleColList = getOracleColList;
module.exports.getMyColList = getMyColList;
