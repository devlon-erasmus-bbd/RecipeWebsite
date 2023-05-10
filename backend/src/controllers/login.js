'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');

async function login(req, res, next) {

  const { email, password } = req.body;

  try {
    // // Check if the user exists
    // const user = await User.findOne({ email });

    // if (!user) {
    //   return res.status(401).json({ message: 'Invalid email or password' });
    // }

    // Compare the password
    const isValidPassword = await bcrypt.compare(password, '$2a$12$4H7MUie0AvdeE5qD9o5Fx.M58xzOEg5/f9VLeR1O5796OhWL86UKO');

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }


    // private key
    const privateKey = fs.readFileSync('private.pem');


    // Create a JWT token
    const token = jwt.sign({ email: email, password: password }, privateKey, { expiresIn: '1h', algorithm: 'RS256' });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login
};
