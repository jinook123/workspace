const mysql = require('mysql');
const dbConfig = require('../config/dbConfig');

/**
 *
 * @param connection DB Connection from pool
 * @param query select 쿼리
 * @param param where 조건
 * @returns {Promise<unknown>} select 결과
 */
const selectSql = async (connection, query, param) => {

	const promise = new Promise((resolve, reject) => {

		connection(async conn => {

			await conn.query(query, param, async (err, res) => {

				if (err) reject(err);
				else resolve(res);
			});

			conn.release();
		});
	});

	const result = await promise;

	return result;
}


/**
 *
 * @param connection DB Connection from pool
 * @param query insert 쿼리
 * @param param values
 * @returns {Promise<unknown>} affectedRows
 */
const insertSql = async (connection, query, param) => {

	const promise = new Promise ((resolve, reject) => {

		connection(async conn => {

			await conn.query(query, param, async (err, res) => {

				if (err) reject(err);
				else resolve(res.affectedRows);
			});

			conn.release();
		});
	});

	const result = await promise;

	return result;
}

/**
 *
 * @param connection DB Connection from pool
 * @param query delete 쿼리
 * @param param where 조건
 * @returns {Promise<unknown>} affectedRows
 */
const deleteSql = async (connection, query, param) => {

	const promise = new Promise((resolve, reject) => {

		connection(async conn => {

			await conn.query(query, param, async (err, res) => {

				if (err) reject(err);
				else resolve(res.affectedRows);
			});

			conn.release();
		});
	});

	const result = await promise;

	return result;
}

/**
 *
 * @param connection DB Connection from pool
 * @param query update 쿼리
 * @param param set 값
 * @returns {Promise<unknown>} changedRows
 */
const updateSql = async (connection, query, param) => {

	const promise = new Promise((resolve, reject) => {

		connection(async conn => {

			await conn.query(query, param, async (err, res) => {

				if (err) reject(err);
				else resolve(res.changedRows);
			});

			conn.release();
		});
	});

	const result = await promise;

	return result;
}


/**
 * DB 연결 테스트
 * @param param 입력한 db 정보
 * @return {Promise<unknown>} connection state
 */
const connTest = async (param) => {

	const testConnection = mysql.createConnection({
		host: param.dbHost,
		user: dbConfig.server.user,
		password: dbConfig.server.password,
		port: param.dbPort,
		database: 'pr_mngt'
	});

	// eslint-disable-next-line no-shadow
	const promise = new Promise((resolve, reject) => {

		testConnection.connect(err => {

			if (err) reject(err);
			else resolve(testConnection.state);
		});
	});

	const result = await promise;
	await testConnection.destroy();

	return result;
}

module.exports.selectSql = selectSql;
module.exports.insertSql = insertSql;
module.exports.updateSql = updateSql;
module.exports.deleteSql = deleteSql;
module.exports.connTest = connTest;
