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

// db 리스트 단일 조회
const selectOne = (req, callback) => {
	const num = req.body.num;

	const sql = 'select * from db_list where num=?';

	conn.query(sql, [num], (err, rows) => {
		if (err) {
			throw err;
		}
		return callback(rows);
	});
};

// db 데이터 추가
const addDb = (req, callback) => {
	//const host = req.dbHost;
	//const id = req.dbId;
	//const port = req.dbPort;
	//const pw = req.dbPw;
	//const query = req.dbQuery;
	//const value = [[id, pw, host, port, 'mysql', query]];
	const name = req.body.name;
	const src = req.body.src;
	const host = req.body.host;
	const port = req.body.port;
	const db = req.body.db;
	const des = req.body.des;

	const sql = 'insert into db_list(name, src, host, port, db, des) values (?,?,?,?,?,?)';

	conn.query(sql, [name, src, host, port, db, des], (err, result) => {
		if (err) {
			throw err;
		}
		return callback(result.insertId);
	});
};

// db 제거
const delDb = (req, callback) => {
	const num = req.body.num;
	console.log(num);

	const sql = 'delete from db_list where num=?';

	conn.query(sql, [num], (err, result) => {
		if (err) {
			throw err;
		}
		return callback(result);
	});
};

// db 수정
const modDb = (req, callback) => {
	const num = req.body.num;
	const name = req.body.name;
	const src = req.body.src;
	const host = req.body.host;
	const port = req.body.port;
	const db = req.body.db;
	const des = req.body.des;

	const sql = 'update db_list set (name, src, host, port, db, des) = (?,?,?,?,?,?) where id=?';

	conn.query(sql, [name, src, host, port, db, des, num], (err, result) => {
		if (err) {
			throw err;
		}
		return callback(result);
	});
};

// db의 table 목록 조회
const readTb = (req, callback) => {
	const database = req.db;

	const sql = `show tables from ${database}`;

	conn.query(sql, (err, rows) => {
		if (err) {
			return err;
		}
		return callback(rows);
	});
};

// json save
const jsonSave = (req, callback) => {
	const json = JSON.stringify(req);
	const sql = `insert into json_list(json) values (?)`;

	conn.query(sql, [json], (err, result) => {
		if (err) {
			throw err;
		}
		return callback(result.insertId);
	});
};

// json load
const jsonLoad = (req, callback) => {
	const sql = `select json
                 from json_list
                 where num = ?`;

	conn.query(sql, [req], (err, result) => {
		if (err) {
			throw err;
		}
		return callback(result);
	});
};

module.exports.getDBList = getDBList;
module.exports.selectOne = selectOne;
module.exports.addDb = addDb;
module.exports.delDb = delDb;
module.exports.modDb = modDb;
module.exports.readTb = readTb;
module.exports.jsonSave = jsonSave;
module.exports.jsonLoad = jsonLoad;
