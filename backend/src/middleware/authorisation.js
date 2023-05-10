'use strict';
const jwt = require('jsonwebtoken');
const fs = require('fs');

async function auth(req, res, next) {

  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;

  if (req.path === '/signup' || req.path === '/login') {
    return next();
  }

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header not found' });
  }

  const token = authHeader.split(' ')[1];

  try {

    const privateKey = fs.readFileSync('private.pem');

    jwt.verify(token, privateKey);

  } catch (error) {
    next(error);
  }

  return next();
}

module.exports = {
  auth
};
