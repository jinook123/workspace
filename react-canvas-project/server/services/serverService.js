/**
 * Admin(server) services
 */
const DB = require('../connection/mysqlServerPool');
const mysqlServerConn = require('../connection/mysqlServerConn');
const query = require('../sql/serverSql');
const {selectDBByNum} = require("../sql/serverSql");


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
 * @param req selected num value
 * @param callback
 * @returns {Promise<*>}
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
 * @returns {Promise<*>}
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

// db 제거
const delDb = async (req, callback) => {

	const {num} = req;

	const sql = query.deleteDBByNum;

	const result = await mysqlServerConn.deleteSql(sql, [num])
		.catch(err => { throw err });

	return callback(result);
};

// db 수정
const modDb = (req, callback) => {

	const {num} = req;
	const {name} = req;
	const {src} = req;
	const {host} = req;
	const {port} = req;
	const {db} = req;
	const {des} = req;

	const sql = 'update db_list set (name, src, host, port, db, des) = (?,?,?,?,?,?) where id=?';

	DB.getConnection((DBErr, conn) => {

		if (DBErr) throw DBErr;

		conn.query(sql, [name, src, host, port, db, des, num], (err, result) => {

			if (err) throw err;
			else return callback(result);
		});
		conn.release();
	})
};

// db의 table 목록 조회
const readTb = (req, callback) => {

	const database = req.db;

	const sql = `show tables from ${database}`;

	DB.getConnection((DBErr, conn) => {

		if (DBErr) throw DBErr;

		conn.query(sql, (err, rows) => {
			if (err) return err;
			return callback(rows);
		});
		conn.release();
	})
};

// json save
const jsonSave = (req, callback) => {

	const json = JSON.stringify(req);
	const sql = `insert into json_list(json) values (?)`;

	DB.getConnection((DBErr, conn) => {

		if (DBErr) throw DBErr;

		conn.query(sql, [json], (err, result) => {
			if (err) throw err;
			else return callback(result.insertId);
		});
		conn.release();
	})
};


/**
 * select json from json_list where id = (?)
 * @param req user id
 * @param callback
 * @returns {Promise<*>} all saved w/f json list
 */
const userSavedJsonList = async (req, callback) => {

	const {id} = req;

	const sql = query.getUserJsonList;

	const result = await mysqlServerConn.selectSql(sql, [id])
		.catch(err => { throw err });

	return callback(result);
};


/**
 * select json from json_list where id = (?) and num = (?)
 * @param req user id, seleted num
 * @param callback
 * @returns {Promise<*>} saved w/f json data
 */
const getUserJson = async (req, callback) => {

	const {id} = req;
	const {num} = req;

	const sql = query.getUserJsonByIdNum;

	const result = await mysqlServerConn.selectSql(sql, [id, num])
		.catch(err => { throw err });

	return callback(result);
};

module.exports.getDBList = getDBList;
module.exports.getDBByNum = getDBByNum;
module.exports.insertDBInfo = insertDBInfo;
module.exports.delDb = delDb;
module.exports.modDb = modDb;
module.exports.readTb = readTb;
module.exports.jsonSave = jsonSave;
module.exports.userSavedJsonList = userSavedJsonList;
