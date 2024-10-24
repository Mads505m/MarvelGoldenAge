const express = require('express');
const app = express();

const unexpectedError = require('./middlewares/UnexpectedError');

const heroRoutes = require('./routes/HeroRoutes');
const homeRoute = require('./routes/HomePageRoute');

require('dotenv').config({ path: '.env' });
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.static('../views/HTML'));
app.use(express.static('../views/public/CSS'));

app.use('/',heroRoutes)
app.use('/',homeRoute)


app.listen(port, () => {
    console.log(`Server kører på http://localhost:${port}`);
})