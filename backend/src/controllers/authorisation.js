'use strict';
const jwt = require('jsonwebtoken');
const fs = require('fs');

async function testAuth(req, res, next) {

  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header not found' });
  }

  const token = authHeader.split(' ')[1];

  try {

    const privateKey = fs.readFileSync('private.pem');
    const decodedToken = jwt.verify(token, privateKey);

    console.log(decodedToken);

  } catch (error) {
    next(error);
  }

  res.send('done');
}

module.exports = {
  testAuth
};
