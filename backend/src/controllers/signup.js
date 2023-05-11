'use strict';

const bcrypt = require('bcryptjs');
const { postUser, getUserDetails } = require('../service/index');

async function signup(req, res, next) {

  const { username, firstname, lastname, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await getUserDetails(email);

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the new user
    const newUser = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword
    };

    // save to database
    postUser(newUser);

    // send response
    res.status(201).json({ message: 'User created' });

  } catch (error) {
    return next(error);
  }
}

module.exports = {
  signup
};
