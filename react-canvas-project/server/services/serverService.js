const db = require('../dbconnection');

const conn = db.mysqlServer;

// 전체 db 리스트
const getDBList = callback => {
	const sql = 'select * from db_list';

	conn.query(sql, (err, rows) => {
		if (err) {
			throw err;
		}
		return callback(rows);
	});
};

// db 데이터 추가
const addDb = (req, callback) => {
	const host = req.dbHost;
	const id = req.dbId;
	const port = req.dbPort;
	const pw = req.dbPw;
	const query = req.dbQuery;
	const value = [[id, pw, host, port, 'mysql', query]];

	const sql = 'insert into db_list(name, src, host, port, db, des) values (?)';

	conn.query(sql, value, (err, result) => {
		if (err) {
			throw err;
		}
		return callback(result.insertId);
	});
};

// db 제거
const delDb = (req, callback) => {

}

// db 수정
const modDb = (req, callback) => {

}

// db의 table 목록 조회
const readTb = (req, callback) => {
	const database = req.db;

	const sql = `show tables from ${ database }`;

	conn.query(sql, (err, rows) => {
		if (err) {
			return err;
		}
		return callback(rows);
	})
}

// json save
const jsonSave = (req, callback) => {
	console.log(req);
	const sql = `insert into json_list(json) values (?)`;
	const value = [[req]];

	conn.query(sql, value, (err, result) => {
		if (err) {
			return err;
		}
		return callback(result.insertId);
	})
}

module.exports.getDBList = getDBList;
module.exports.addDb = addDb;
module.exports.delDb = delDb;
module.exports.modDb = modDb;
module.exports.readTb = readTb;
module.exports.jsonSave = jsonSave;
