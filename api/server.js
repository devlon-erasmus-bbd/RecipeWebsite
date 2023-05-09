const express = require('express');
const app = express();
const dbHandler = require('./dbHandler')

var server = app.listen(8081, '127.0.0.1', function () {
    let host = server.address().address
    let port = server.address().port
    console.log("Server listening at http://%s:%s", host, port)
})



app.post('/user', async function (req, res) {
    let data = await dbHandler.getUserDB(req.query.username);
    if (data[0].length == 0) {
        dbHandler.postUserDB(req.query.username);
        res.status(201);
    } else {
        res.status(409);
    }
    res.end();
})

app.get('/user', async function (req, res) {
    let data = await dbHandler.getUserDB(req.query.username);
    res.json(data[0]);
    res.end();
})

app.get('/recipe/list', async function (req, res) {
    let data = await dbHandler.getRecipeList();
    res.json(data[0]);
    res.end();
})

app.get('/recipe/ingredients', async function (req, res) {
    let data = await dbHandler.getRecipeIngredients(req.query.recipeName);
    res.json(data[0]);
    res.end();
})
