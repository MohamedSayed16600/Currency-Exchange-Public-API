// Import the Express.js framework
const express = require('express'); 

// Import the rate limiter middleware
const rateLimit = require('express-rate-limit'); 

// Import the configuration file
const config = require('./config');

// Import the cache module
const Cache = require('./cache'); 

// Import the exchange rates module
const ExchangeRates = require('./exchangeRates'); 

// Import the Swagger documentation generator
const swaggerJsdoc = require('swagger-jsdoc'); 

// Import the Swagger UI middleware
const swaggerUi = require('swagger-ui-express'); 

// Create a new Express.js app
const app = express(); 

// Enable JSON parsing for request bodies
app.use(express.json()); 

/**
 * @swagger
 * definitions:
 *   ExchangeRate:
 *     type: object
 *     properties:
 *       rate:
 *         type: number
 *         description: Exchange rate
 *       from:
 *         type: string
 *         description: From currency code
 *       to:
 *         type: string
 *         description: To currency code
 */
// Define the ExchangeRate model using Swagger annotations

/**
 * @swagger
 * /exchange-rates:
 *   get:
 *     summary: Get exchange rates
 *     description: Retrieve exchange rates for a given from and to currency
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         description: From currency code (e.g. USD)
 *       - in: query
 *         name: to
 *         required: true
 *         description: To currency code (e.g. EUR)
 *     responses:
 *       200:
 *         description: Exchange rate data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ExchangeRate'
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal Server Error
 */
// Define the /exchange-rates endpoint using Swagger annotations

// Create a new cache instance with the specified time to live
const cache = new Cache(config.cacheTTL);

// Create a new ExchangeRates instance
const exchangeRates = new ExchangeRates(config.apiKey, config.apiEndpoint, cache);

// Create a rate limiter instance
const limiter = rateLimit(config.rateLimit);

// Apply the rate limiter to the /exchange-rates endpoint
app.use('/exchange-rates', limiter);

app.get('/exchange-rates', async (req, res) => {
  const { from, to } = req.query;
  if (!from ||!to) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  try {
    // Try to get the exchange rates from the ExchangeRates instance
    const exchangeRate = await exchangeRates.getExchangeRates(from, to); 
    // If successful, return the exchange rate data
    return res.json(exchangeRate); 
  } catch (error) {
    // If an error occurs, handle it appropriately
    console.error('Error fetching exchange rates:', error); // Log the error for debugging
    return res.status(500).json({ error: 'Internal Server Error' }); // Send a 500 error response
  }
});

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Exchange Rates API',
      description: 'API for retrieving exchange rates',
      version: '1.0.0'
    },
    host: 'localhost:3001',
    basePath: '/'
  },
  apis: ['./app.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// START the server
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
