/**
 * DB Config
 */
const react = {
	host: 'localhost',
	port: 3306,
	user: 'react_test',
	password: '1234',
	database: 'react',
	connectionLimit: 50
};

const server = {
	host: 'localhost',
	port: 3306,
	user: 'react_test',
	password: '1234',
	database: 'pr_mngt',
	connectionLimit: 5
};

const oracle = {
	host: 'localhost',
	port: 1521,
	user: 'react-test',
	password: '1234',
	database: 'XE',
};

module.exports.react = react;
module.exports.server = server;
module.exports.oracle = oracle;
