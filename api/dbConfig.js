const config = {
    server: 'localhost',
    database: "RecipeDB",
    authentication: {
        type: 'default',
        options: {
            userName: 'danielRecipe', // update me
            password: '1234' // update me
        }
    },
    options: {
        trustServerCertificate: true,
        trustedConnection: true,
        enableArithAbort: false
    }
}

module.exports = config;