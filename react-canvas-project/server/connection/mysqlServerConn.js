const connection = require('./mysqlServerPool');

/**
 *
 * @param query select 쿼리
 * @param param where 조건
 * @returns {Promise<unknown>} select 결과
 */
const selectSql = async (query, param) => {

	const promise = new Promise(resolve => {

		connection(async conn => {

			await conn.query(query, param, async (err, res) => {

				if (err) throw err;
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
 * @param query insert 쿼리
 * @param param values
 * @returns {Promise<unknown>} affectedRows
 */
const insertSql = async (query, param) => {

	const promise = new Promise (resolve => {

		connection(async conn => {

			await conn.query(query, param, async (err, res) => {

				if (err) throw err;
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
 * @param query delete 쿼리
 * @param param where 조건
 * @returns {Promise<unknown>} affectedRows
 */
const deleteSql = async (query, param) => {

	const promise = new Promise(resolve => {

		connection(async conn => {

			await conn.query(query, param, async (err, res) => {

				if (err) throw err;
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
 * @param query update 쿼리
 * @param param set 값
 * @returns {Promise<unknown>} affectedRows
 */
const updateSql = async (query, param) => {

	const promise = new Promise(resolve => {

		connection(async conn => {

			await conn.query(query, param, async (err, res) => {

				if (err) throw err;
				else resolve(res.affectedRows);
			});

			conn.release();
		});
	});

	const result = await promise;

	return result;
}

module.exports.selectSql = selectSql;
module.exports.insertSql = insertSql;
module.exports.updateSql = updateSql;
module.exports.deleteSql = deleteSql;
