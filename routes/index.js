var express = require("express");
var router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cryptocurrency prices API",
      version: "0.1.0",
      description: "This is a sample server for getting of cryptocurrency prices",
    },
    servers: [
      {
        url: "https://api.ccb.wtf/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(options);

/* GET home page. */
router.use("/", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;
