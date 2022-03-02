const oracledb = require('oracledb');
const config = require('../config/dbConfig')

const connection = {
	user: config.oracle.user,
	password: config.oracle.password,
	connectString: config.oracle.connectString,
	poolMax: config.oracle.poolMax,
}

oracledb.createPool(connection, (err, pool) => {
	console.log('pool');
	if (err) throw err;
});
