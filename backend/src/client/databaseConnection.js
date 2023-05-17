/* global process */

'use strict';

const sql = require('mssql');

require('dotenv').config({path:'../backend/.env'});

const config = {
  server: process.env.DB_SERVER,
  database: 'RecipeDB',
  port: parseInt(process.env.DATABASE_PORT, 10),
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
