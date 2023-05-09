'use strict';

const express = require('express');
const app = express();
const { login } = require('./src/controllers/login');

require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.get('/login', login);

app.listen(PORT);
