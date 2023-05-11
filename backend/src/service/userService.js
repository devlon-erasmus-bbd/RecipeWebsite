'use strict';

const connection = require('../client/databaseConnection');

async function getUserId(username) {
  const pool = await connection.getPool();
  const data = await pool.request().query(`SELECT user_id FROM Users WHERE username = '${username}'`);

  return data.recordsets;
}

async function postUser(username) {
  const pool = await connection.getPool();

  await pool.request().query(`INSERT INTO Users (username) VALUES ('${username}')`);
}

module.exports = {
  getUserId,
  postUser
};
