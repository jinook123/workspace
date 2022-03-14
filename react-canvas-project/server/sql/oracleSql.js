const oracleNodeQuery = {
	getTableList: `SELECT table_name FROM user_tables`,
	getAllTabCol: `SELECT table_name, column_name FROM user_tab_columns`,
	getColList: `SELECT column_name FROM user_tab_columns WHERE table_name=:table_name`,
}


module.exports.oracleNodeQuery = oracleNodeQuery;
