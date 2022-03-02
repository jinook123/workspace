/**
 * Admin(server) services
 */
const mysqlServerConn = require('../connection/mysqlServerConn');
const query = require('../sql/serverSql').DBQuery;

/**
 * select * from db_list
 * @param callback
 * @returns {Promise<*>} all DB List
 */
const getDBList = async (callback) => {

	const sql = query.getDBList;
	const result = await mysqlServerConn.selectSql(sql, null)
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
	const sql = query.getDBByNum;

	const result = await mysqlServerConn.selectSql(sql, [num])
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

	const sql = query.insertDBInfo;

	const result = await mysqlServerConn.insertSql(sql, [name, src, host, port, db, des])
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

	const sql = query.deleteDBByNum;

	const result = await mysqlServerConn.deleteSql(sql, [num])
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

	const sql = query.modifyDB;

	const result = await mysqlServerConn.updateSql(sql, [name, src, host, port, db, des, num])
		.catch(err => { throw err; });

	return callback(result);
};


// // db의 table 목록 조회
// const readTb = (req, callback) => {
//
// 	const database = req.db;
//
// 	const sql = `show tables from ${database}`;
//
// 	DB.getConnection((DBErr, conn) => {
//
// 		if (DBErr) throw DBErr;
//
// 		conn.query(sql, (err, rows) => {
// 			if (err) return err;
// 			return callback(rows);
// 		});
// 		conn.release();
// 	})
// };

const mysqlConnTest = async (req, callback) => {

	const result = await mysqlServerConn.connTest(req)
		.catch(err => { throw err; });

	return callback(result);
}

module.exports.getDBList = getDBList;
module.exports.getDBByNum = getDBByNum;
module.exports.insertDBInfo = insertDBInfo;
module.exports.delDB = delDB;
module.exports.modDb = modDb;
module.exports.mysqlConnTest = mysqlConnTest;
