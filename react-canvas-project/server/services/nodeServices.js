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
	const poolAlias = req.name;

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
	// const {dbName} = req;
	const dbName = 'react';

	const result = await mysqlQueryExecutor.selectSql(myNodeConn, sql, [dbName]) // table_schema
		.catch(err => { throw err; })

	return callback(result);
}


const getOracleColList = async (req, callback) => {

	const sql = oracleNodeQuery.getColList;
    
	const result = await oracleQueryExecutor.execute(myNodeConn, sql, [req], callback);

	return callback(result.rows);
}


const getMyColList = async (req, callback) => {

	const sql = myNodeQuery.getColList;
	// const {dbName} = req;
	const dbName = 'react';
	// const {tableName} = req;
	const tableName = 'COMPONENT_TEST_MY';

	const result = await mysqlQueryExecutor.selectSql(myNodeConn, sql, [dbName, tableName])
		.catch(err => { throw err; })

	return callback(result);
}



module.exports.getOracleTableList = getOracleTableList;
module.exports.getMyTableList = getMyTableList;
module.exports.getOracleColList = getOracleColList;
module.exports.getMyColList = getMyColList;
