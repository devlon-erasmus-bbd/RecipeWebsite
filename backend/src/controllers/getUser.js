'use strict';
const { getUserId } = require('../service/index');

async function getUser(req, res) {

  const data = await getUserId(req.query.username);

  res.json(data[0]);
  res.end();
}

module.exports = {
  getUser
};
