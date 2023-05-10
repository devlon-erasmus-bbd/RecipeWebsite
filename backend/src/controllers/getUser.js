'use strict';
const databaseService = require('../service/databaseService');

async function getUserId(req, res) {

  const data = await databaseService.getUserDB(req.query.username);

  res.json(data[0]);
  res.end();
}

module.exports = {
  getUserId
};
