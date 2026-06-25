const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  failOnErrors: true,

  definition: {
    openapi: "3.0.0",

    info: {
      title: "DBW Accident Analytics API",
      version: "1.0.0",
      description:
        "REST API for German Road Accident Analytics, Traffic Statistics and Official Municipality (AGS/ARS) Data"
    },

    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },

  apis: [
    path.resolve(__dirname, "routes", "accidentRoutes.js"),
    path.resolve(__dirname, "routes", "statsRoutes.js"),
    path.resolve(__dirname, "routes", "trafficStatisticsRoutes.js"),
    path.resolve(__dirname, "routes", "regionRoutes.js"),
    path.resolve(__dirname, "routes", "metadataRoutes.js")
  ]
};

const swaggerSpec = swaggerJsdoc(options);

console.log("Swagger files:");
console.log(options.apis);

console.log("Swagger paths:");
console.log(Object.keys(swaggerSpec.paths || {}));

module.exports = swaggerSpec;