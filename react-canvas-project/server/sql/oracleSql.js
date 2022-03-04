const nodeQuery = {
	getTableList: `SELECT table_name FROM user_tables`,
	getAllTabCol: `SELECT table_name, column_name FROM user_tab_columns`
}



module.exports.nodeQuery = nodeQuery;
