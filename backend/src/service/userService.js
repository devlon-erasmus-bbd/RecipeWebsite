const connection = require('../client/databaseConnection')

async function getUserId(username) {
    let pool = await connection.getPool();
    let data = await pool.request().query(`SELECT user_id FROM Users WHERE username = '${username}'`);
    return data.recordsets;
}

async function postUser(username) {
    let pool = await connection.getPool();
    await pool.request().query(`INSERT INTO Users (username) VALUES ('${username}')`);
}

module.exports = {
    getUserId,
    postUser
};