/**
 * ORACLE Connection Pool 생성
 * 서버 실행과 동시에 pool 생성 필요
 *
 *
 *
 * 서버 추가시 서버 별 pool 생성, name parameter로 pool 구별 (현재 기본 default)
 */

const oracledb = require('oracledb');
const config = require('../config/dbConfig')

const connection = {
	user: config.oracle.user,
	password: config.oracle.password,
	connectString: `${config.oracle.host}:${config.oracle.port}/${config.oracle.database}`,
	poolMax: config.oracle.poolMax,
	poolAlias: config.oracle.poolAlias,
}

oracledb.createPool(connection, (err, pool) => {
	console.log('pool');
	if (err) throw err;
});