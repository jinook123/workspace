/**
 * Workflow services
 * w/f 저장, 수정 등 관리
 */

const query = require('../sql/mysqlSql').jsonQuery;
const mysqlServerConn = require('../connection/mysqlQueryExecutor');
const adminConn = require('../connection/mysqlServerPool');


/**
 * insert into json_list(json, id) values (?,?) -- savetime 자동
 * @param req w/f json data, canvas id, w/f name, w/f desc
 * @param callback
 * @returns {Promise<*>} affectedRows
 */
const saveUserJson = async (req, callback) => {

	const {id} = req;
	const {name} = req;
	const {des} = req;
	const {json} = req;

	const sql = query.saveUserJson;

	const result = await mysqlServerConn.insertSql(adminConn, sql, [id, name, des, JSON.stringify(json)])
		.catch(err => { throw err; });

	return  callback(result);
};


/**
 * select json from json_list where id = (?)
 * @param req
 * @param callback
 * @returns {Promise<*>} all saved w/f json list
 */
const getJsonList = async (req, callback) => {

	const sql = query.getJsonList;

	const result = await mysqlServerConn.selectSql(adminConn, sql, null)
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

	const sql = query.getUserJsonById;

	const result = await mysqlServerConn.selectSql(adminConn, sql, [id])
		.catch(err => { throw err });

	return callback(result);
}


/**
 * update json_list set (name, des, json) = (?,?,?) where id=(?)
 * @param req
 * @param callback
 * @return {Promise<*>}
 */
const updateUserJson = async (req, callback) => {

	const {id} = req;
	const {name} = req;
	const {des} = req;
	const {json} = req;

	const sql = query.updateUserJson;

	const result = await mysqlServerConn.updateSql(adminConn, sql, [id, name, des, json])
		.catch(err => { throw err });

	return callback(result);
}

/**
 *
 * @param req
 * @param callback
 * @returns {Promise<*>}
 */
const deleteUserJson = async (req, callback) => {

	const {id} = req;

	const sql = query.deleteUserJson;

	const result = await mysqlServerConn.deleteSql(adminConn, sql, [id])
		.catch(err => { throw err });

	return callback(result);
}

module.exports.saveUserJson = saveUserJson;
module.exports.getJsonList = getJsonList;
module.exports.getUserJson = getUserJson;
module.exports.updateUserJson = updateUserJson;
module.exports.deleteUserJson = deleteUserJson;