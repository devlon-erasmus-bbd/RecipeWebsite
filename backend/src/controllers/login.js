'use strict';
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

async function login(req, res, next) {

  // const { email, password } = req.body;

  try {
    // // Check if the user exists
    // const user = await User.findOne({ email });

    // if (!user) {
    //   return res.status(401).json({ message: 'Invalid email or password' });
    // }

    // // Compare the password
    // const isValidPassword = await bcrypt.compare(password, user.password);

    // if (!isValidPassword) {
    //   return res.status(401).json({ message: 'Invalid email or password' });
    // }

    // // Create a JWT token
    // const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    // res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login
};
