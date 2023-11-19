const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const router = express.Router();

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for your API endpoints',
    },
  },
  apis: ['./routes/*.js'], // Ruta a tus archivos de definición de rutas
};

const specs = swaggerJsdoc(options);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;
