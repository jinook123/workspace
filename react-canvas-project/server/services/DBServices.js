/**
 * Admin(server) services
 */
const mysqlQueryExecutor = require('../connection/mysqlQueryExecutor');
const oracleQueryExecutor = require("../connection/oracleQueryExecutor");
const mysqlDBQuery = require('../sql/mysqlSql').DBQuery;

/**
 * select * from db_list
 * @param callback
 * @returns {Promise<*>} all DB List
 */
const getDBList = async (callback) => {

	const sql = mysqlDBQuery.getDBList;
	const result = await mysqlQueryExecutor.selectSql(sql, null)
		.catch( err => { throw err } );

	return callback(result);
};


/**
 * select * from db_list where num=(?)
 * @param req selected DB num value
 * @param callback
 * @returns {Promise<*>} selected DB info data
 */
const getDBByNum = async (req, callback) => {

	const {num} = req;
	const sql = mysqlDBQuery.getDBByNum;

	const result = await mysqlQueryExecutor.selectSql(sql, [num])
		.catch(err => { throw err });

	return callback(result);
};


/**
 * insert into db_list(name, src, host, port, db, des) values (?,?,?,?,?,?)
 * @param req db name, db src, db host, db port, database name (service name), desc
 * @param callback
 * @returns {Promise<*>} affectedRows
 */
const insertDBInfo = async (req, callback) => {

	const {name} = req;
	const {src} = req;
	const {host} = req;
	const {port} = req;
	const {db} = req;
	const {des} = req;

	const sql = mysqlDBQuery.insertDBInfo;

	const result = await mysqlQueryExecutor.insertSql(sql, [name, src, host, port, db, des])
		.catch(err => { throw err });

	return callback(result);
};

/**
 * delete from db_list where num=(?)
 * @param req selected DB num
 * @param callback
 * @returns {Promise<*>} affectedRows
 */
const delDB = async (req, callback) => {

	const {num} = req;

	const sql = mysqlDBQuery.deleteDBByNum;

	const result = await mysqlQueryExecutor.deleteSql(sql, [num])
		.catch(err => { throw err });

	return callback(result);
};


/**
 * update db_list set (name, src, host, port, db, des) = (?,?,?,?,?,?) where num=(?)
 * @param req db set values, selected db num
 * @param callback
 * @returns {Promise<*>} affectedRows
 */
const modDb = async (req, callback) => {

	const {num} = req;
	const {name} = req;
	const {src} = req;
	const {host} = req;
	const {port} = req;
	const {db} = req;
	const {des} = req;

	const sql = mysqlDBQuery.modifyDB;

	const result = await mysqlQueryExecutor.updateSql(sql, [name, src, host, port, db, des, num])
		.catch(err => { throw err; });

	return callback(result);
};


/**
 * MYSQL Connection test
 * @param req db info
 * @param callback
 * @returns {Promise<*>}
 */
const mysqlConnTest = async (req, callback) => {

	let state;
	const result = await mysqlQueryExecutor.connTest(req)
		.then(res => {

			if (res === 'connected') {
				state = `${req.dbHost}:${req.dbPort}/pr_mngt Connected`;
			}

		})
		.catch(err => { throw err; });

	console.log(state);
	return callback(JSON.stringify(state));
}


/**
 * ORACLE Connection test
 * @param req db info
 * @param callback
 * @returns {Promise<*>}
 */
const oracleConnTest = async (req, callback) => {

	let state;
	const result = await oracleQueryExecutor.connTest(req)
		.then(res => {

			if (res[0][0] === 1) {
				state = `${req.dbHost}:${req.dbPort}/XE Connected`;
			}

		})
		.catch(err => { throw err; });

	return callback(JSON.stringify(state));
}

module.exports.getDBList = getDBList;
module.exports.getDBByNum = getDBByNum;
module.exports.insertDBInfo = insertDBInfo;
module.exports.delDB = delDB;
module.exports.modDb = modDb;
module.exports.mysqlConnTest = mysqlConnTest;

module.exports.oracleConnTest = oracleConnTest;
