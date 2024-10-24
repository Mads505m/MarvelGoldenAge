const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig');
const unexpectedError = require('./middlewares/UnexpectedError');
const urlNotFound = require('./middlewares/URLNotExistMiddleware');
const heroRoutes = require('./routes/HeroRoutes');
const homeRoute = require('./routes/HomePageRoute')
const path = require('path');
require('dotenv').config({ path: '.env' });
const port = process.env.PORT || 3000;
const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname,'views')));

app.use('/',heroRoutes)
app.use('/',homeRoute)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(urlNotFound)
app.use(unexpectedError)

app.listen(port, () => {
    console.log(`Server kører på http://localhost:${port}`);
})