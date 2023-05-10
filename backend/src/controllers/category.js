'use strict';
const categoryService = require('../service/categoryService')

async function categoryList(req, res) {
    try {
        let data = await categoryService.getCategoryList();
        res.json(data[0]);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
    res.end();
}

module.exports = {
    categoryList
}
