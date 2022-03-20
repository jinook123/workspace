const DBQuery = {

	getDBList: `select * from db_list`,
	getDBByNum: `select * from db_list where num=(?)`,
	insertDBInfo: `insert into db_list(name, src, host, port, db, des) values (?,?,?,?,?,?)`,
	deleteDBByNum: `delete from db_list where num=(?)`,
	modifyDB: `update db_list set (name, src, host, port, db, des) = (?,?,?,?,?,?) where num=(?)`,
	showTables: `show tables`,
}

const jsonQuery = {

	getJsonList: `select * from json_list`,
	getUserJsonById: `select json from json_list where id = (?)`,
	saveUserJson: `insert into json_list(id, name, des, json) values (?,?,?,?)`,
	updateUserJson: `update json_list set (name, des, json) = (?,?,?) where id=(?)`,
	deleteUserJson: `delete * from json_list where id=(?)`
}

const myNodeQuery = {

	getTableList: `SELECT TABLE_NAME, TABLE_COMMENT
                     FROM INFORMATION_SCHEMA.TABLES
                    WHERE TABLE_SCHEMA=(?)`,

	getColList: `SELECT COLUMN_NAME, COLUMN_COMMENT
                   FROM INFORMATION_SCHEMA.COLUMNS
                  WHERE TABLE_SCHEMA=(?) AND TABLE_NAME=(?)`


}


module.exports.DBQuery = DBQuery;
module.exports.jsonQuery = jsonQuery;
module.exports.myNodeQuery = myNodeQuery;