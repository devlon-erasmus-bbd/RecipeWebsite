'use strict';

const connection = require('../client/databaseConnection');

async function getUserId(username) {
  const pool = await connection.getPool();
  const data = await pool.request().query(`SELECT user_id FROM Users WHERE username = '${username}'`);

  return data.recordsets;
}

async function postUser(user) {

  const { username, firstname, lastname, email, password } = user;

  const pool = await connection.getPool();

  await pool.request().query(`INSERT INTO Users (username,firstname,lastname,email,hashedpassword) 
  VALUES ('${username}','${firstname}','${lastname}','${email}','${password}')`);
}

async function getUserDetails(email) {

  try {

    const pool = await connection.getPool();

    const data = await pool.request().query(`SELECT * FROM Users WHERE email = '${email}'`);

    return data.recordset[0];

  } catch (error) {
    return undefined;
  }
}

module.exports = {
  getUserId,
  postUser,
  getUserDetails
};
