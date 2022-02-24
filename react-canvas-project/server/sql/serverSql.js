export const getDBList = `select * from db_list`;
export const getDBByNum = `select * from db_list where num=?`;
export const insertDBInfo = `insert into db_list(name, src, host, port, db, des) values (?,?,?,?,?,?)`;
export const deleteDBByNum = `delete from db_list where num=?`;


export const getUserJsonList = `select json from json_list where id = (?)`;
export const getUserJsonByIdNum = `select json from json_list where id = (?) and num = (?)`;
