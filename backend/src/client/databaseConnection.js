const sql = require('mssql')

require('dotenv').config();

const config = {
    server: 'localhost',
    database: "RecipeDB",
    authentication: {
        type: 'default',
        options: {
            userName: DB_USER,
            password: DB_PASSWORD
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
