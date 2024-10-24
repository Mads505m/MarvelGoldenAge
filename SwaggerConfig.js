const swaggerJsDoc = require('swagger-jsdoc');

// Swagger-konfiguration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
            description: "API dokumentation for mit projekt",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"], // Stien til dine rute-filer
};

// Generer Swagger-specifikationer
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
