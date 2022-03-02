const DBQuery = {

	getDBList: `select * from db_list`,
	getDBByNum: `select * from db_list where num=(?)`,
	insertDBInfo: `insert into db_list(name, src, host, port, db, des) values (?,?,?,?,?,?)`,
	deleteDBByNum: `delete from db_list where num=(?)`,
	modifyDB: `update db_list set (name, src, host, port, db, des) = (?,?,?,?,?,?) where num=(?)`,
}


const jsonQuery = {

	getJsonList: `select json from json_list`,
	getUserJsonById: `select json from json_list where id = (?)`,
	saveUserJson: `insert into json_list(id, name, des, json) values (?,?,?,?)`,
	updateUserJson: `update json_list set (name, des, json) = (?,?,?) where id=(?)`,
}


module.exports.DBQuery = DBQuery;
module.exports.jsonQuery = jsonQuery;
