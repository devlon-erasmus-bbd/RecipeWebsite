'use strict';
const { getUserId, getUserDetails } = require('../service/index');

async function getUser(req, res) {

  const data = await getUserId(req.query.username);

  res.json(data[0]);
  res.end();
}

async function userDeatils(req, res) {

  const data = await getUserDetails(req.params.email);
  console.log(req.params.email);

  if (data) {
    return res.send({
      user_id: data.user_id,
      username: data.username,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email
    });
  }

  return res.send({
    message: 'user does not exist'
  });
}

module.exports = {
  getUser,
  userDeatils
};
