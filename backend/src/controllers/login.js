'use strict';
const databaseService = require('../service/databaseService')

async function login(req, res) {

  res.send('user login');
}

async function newUser(req, res) {
  let data = await databaseService.getUserDB(req.query.username);
  if (data[0].length == 0) {
    databaseService.postUserDB(req.query.username);
    res.status(201);
  } else {
    res.status(409);
  }
  res.end();
}

async function getUserId(req, res) {
  let data = await databaseService.getUserDB(req.query.username);
  res.json(data[0]);
  res.end();
}

module.exports = {
  login,
  newUser,
  getUserId
};
