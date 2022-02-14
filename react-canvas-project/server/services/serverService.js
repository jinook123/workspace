/**
 * Admin(server) services
 */
 const DB = require('../connection/mysqlServerConnPool');

 // 전체 db 리스트
 const getDBList = callback => {
 
	 const sql = 'select * from db_list';
 
	 DB.getConnection((DBErr, conn) => {
 
		 if (DBErr) throw DBErr;
 
		 conn.query(sql, (err, rows) => {
 
			 if (err) throw err;
			 else return callback(rows);
		 });
		 conn.release();
	 });
 };
 
 // db 조회
 const selectOne = (req, callback) => {
 
	 const {num} = req;
	 const sql = 'select * from db_list where num=?';
 
	 DB.getConnection((DBErr, conn) => {
 
		 if (DBErr) throw DBErr;
 
		 conn.query(sql, [num], (err, rows) => {
 
			 if (err) throw err;
			 else return callback(rows);
		 });
		 conn.release();
	 })
 };
 
 // db 데이터 추가
 const addDb = (req, callback) => {
 
	 const {name} = req;
	 const {src} = req;
	 const {host} = req;
	 const {port} = req;
	 const {db} = req;
	 const {des} = req;
 
	 const sql = 'insert into db_list(name, src, host, port, db, des) values (?,?,?,?,?,?)';
 
	 DB.getConnection((DBErr, conn) => {
 
		 if (DBErr) throw DBErr;
 
		 conn.query(sql, [name, src, host, port, db, des], (err, result) => {
 
			 if (err) throw err;
			 else return callback(result.insertId);
		 });
		 conn.release();
	 })
 };
 
 // db 제거
 const delDb = (req, callback) => {
 
	 const {num} = req;
 
	 const sql = 'delete from db_list where num=?';
 
	 DB.getConnection((DBErr, conn) => {
 
		 if (DBErr) throw DBErr;
 
		 conn.query(sql, [num], (err, result) => {
 
			 if (err) throw err;
			 else return callback(result);
		 });
		 conn.release();
	 });
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
 
 // json load
 const jsonLoad = (req, callback) => {
 
	 const {num} = req;
	 const sql = `select json from json_list where num = (?)`;
 
	 DB.getConnection((DBErr, conn) => {
 
		 if (DBErr) throw DBErr;
 
		 conn.query(sql, [num], (err, result) => {
			 if (err) throw err;
			 else return callback(result);
		 });
		 conn.release();
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