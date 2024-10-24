const express = require('express');
const app = express();
const path = require('path');


app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, '../views/public/HTML/HomePage.html'));
})


module.exports = app;