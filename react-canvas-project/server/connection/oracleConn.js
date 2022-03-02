const oracledb = require('oracledb');
// const connection = require('./oraclePool');

const execute = async (query) => {

	const connection = await oracledb.getConnection();

	const promise = new Promise(resolve => {

		connection.execute(query, async (err, res) => {

			if (err) throw err;
			else resolve(res);
		});

	})

	const result = await promise;
	await connection.release();

	return result;
}

module.exports.execute = execute;
