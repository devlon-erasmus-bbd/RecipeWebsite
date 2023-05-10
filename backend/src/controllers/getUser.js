'use strict';
const userService = require('../service/userService');

async function getUserId(req, res) {

  const data = await userService.getUserId(req.query.username);

  res.json(data[0]);
  res.end();
}

module.exports = {
  getUserId
};
