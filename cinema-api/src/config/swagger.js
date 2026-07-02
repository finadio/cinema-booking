const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Cinema API",
            version: "1.0.0",
            description: "REST API untuk movie booking assessment",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: [path.join(__dirname, "..", "routes", "*.js").replace(/\\/g, "/")],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;