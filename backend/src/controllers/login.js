'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const { getUserDetails } = require('../service/index');

async function login(req, res, next) {

  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await getUserDetails(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    // Compare the password
    const isValidPassword = await bcrypt.compare(password, user.hashedpassword);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }


    // private key
    const privateKey = fs.readFileSync('private.pem');


    // Create a JWT token
    const token = jwt.sign({ email: email, password: password }, privateKey, { expiresIn: '1h', algorithm: 'RS256' });

    res.set('Authorization', `Bearer ${token}`);
    res.status(200).json({ message: 'User successfully login' });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  login
};
