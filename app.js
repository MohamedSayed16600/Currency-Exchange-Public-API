const express = require('express');
const rateLimit = require('express-rate-limit');
const config = require('./config');
const Cache = require('./cache');
const ExchangeRates = require('./exchangeRates');

const app = express();
app.use(express.json());


// Create a new cache instance with the specified time to live
const cache = new Cache(config.cacheTTL);

// Create a new ExchangeRates instance
const exchangeRates = new ExchangeRates(config.apiKey, config.apiEndpoint, cache);

// Create a rate limiter instance
const limiter = rateLimit(config.rateLimit);

// applying the rare limiter
app.use('/exchange-rates', limiter);

app.get('/exchange-rates', async (req, res) => {
  const { from, to } = req.query;
  if (!from || !to) {
    return res.status(400).json({ error: 'Invalid request' });
  }
// Try to get the exchange rates from the ExchangeRates instance
  try {
    const exchangeRates = await exchangeRates.getExchangeRates(from, to);
    return res.json(exchangeRates);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

//START the server
 
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});