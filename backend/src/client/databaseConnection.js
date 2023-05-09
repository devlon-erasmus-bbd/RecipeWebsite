const sql = require('mssql')

require('dotenv').config();

const config = {
    server: 'localhost',
    database: "RecipeDB",
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
}

async function getPool() {
    return await sql.connect(config);
}

module.exports = {
    getPool
};
