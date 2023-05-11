'use strict';

const bcrypt = require('bcryptjs');

async function signup(req, res, next) {

  const { email, password } = req.body;

  try {
    // // Check if the user already exists
    // const existingUser = await User.findOne({ email });

    // if (existingUser) {
    //   return res.status(409).json({ message: 'User already exists' });
    // }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the new user
    const newUser = {
      email,
      password: hashedPassword
    };

    // save to databasec
    console.log(newUser);

    // send response
    res.status(201).json({ message: 'User created' });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup
};
