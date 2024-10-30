const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();

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
                url: `http://localhost:${process.env.PORT || 8080}`,
            },
        ],
        components: {
            schemas: {
                Hero: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            description: "The unique identifier for the hero",
                            example: 4
                        },
                        name: {
                            type: "string",
                            description: "The name of the hero",
                            example: "Tony Stark"
                        },
                        alias: {
                            type: "string",
                            description: "The alias of the hero",
                            example: "Jens Jensen"
                        },
                        powers: {
                            type: "array",
                            items: {
                                type: "string"
                            },
                            description: "A list of hero powers",
                            example: ["Powers"]
                        }
                    },
                    required: ["name", "alias", "powers"]
                }
            }
        }
    },
    apis: ["./routes/*.js"],
};

// Generer Swagger-specifikationer
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
