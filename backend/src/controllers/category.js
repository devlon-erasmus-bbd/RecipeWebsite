'use strict';
const { getCategoryList } = require('../service/index');

async function categoryList(req, res) {
  try {
    const data = await getCategoryList();

    res.json(data[0]);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
  res.end();
}

module.exports = {
  categoryList
};
