const connection = require('../client/databaseConnection')

async function postCategory(category) {
    let pool = await connection.getPool();
    await pool.request().query(`IF NOT EXISTS (
            SELECT 1 FROM Categories WHERE category = '${category}')
            INSERT INTO Categories (category) VALUES ('${category}')`);
}

async function getCategory(category) {
    let pool = await connection.getPool();
    let data = await pool.request().query(`SELECT category_id FROM Categories
            WHERE category = '${category}'`);
    return data.recordsets;
}

async function getCategoryList() {
    let pool = await connection.getPool();
    let data = await pool.request().query(`SELECT category FROM Categories`);
    return data.recordsets;
}

module.exports = {
    postCategory,
    getCategory,
    getCategoryList
};