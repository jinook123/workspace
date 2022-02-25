const oracledb = require('oracledb');
const config = require('../config/dbConfig')

const connection = {
	user: config.oracle.user,
	password: config.oracle.password,
	connectString: config.oracle.connectString,
	poolMax: config.oracle.poolMax,
	poolAlias: 'react'
}

module.exports.oracle = oracledb.createPool(connection, (err, pool) => {
	console.log('oracle conn');
	if (err) throw err;
});
