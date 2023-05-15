/* global process */

'use strict';

const sql = require('mssql');

require('dotenv').config({path:'../backend/.env'});

const config = {
  server: 'localhost\\LOCAL',
  database: 'RecipeDB',
  port: process.env.DATABASE_PORT,
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    }
  },
  options: {
    trustServerCertificate: true,
    trustedConnection: true,
    enableArithAbort: false
  }
};

async function getPool() {
  return sql.connect(config);
}

module.exports = {
  getPool
};
