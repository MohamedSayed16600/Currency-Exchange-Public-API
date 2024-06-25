// Exchange rates implementation

const axios = require('axios');
const Cache = require('./cache');

// ExchangeRates class
class ExchangeRates {
  // Constructor
  constructor(apiKey, apiEndpoint, cache) {
    // Initialization
    this.apiKey = apiKey;
    this.apiEndpoint = apiEndpoint;
    this.cache = cache;
  }

  // Get exchange rates for currencies
  async getExchangeRates(from, to) {
    // Generate a cache key 
    const cacheKey = `exchange-rates-${from}-${to}`;
    
    // Check if the cache has a response for this key
    const cachedResponse = this.cache.get(cacheKey);

    // If the cache has a response, return it immediately
    if (cachedResponse) {
      return cachedResponse;
    }

    // Make a POST request to the ApyHub API to retrieve the exchange rate
    try {
      const response = await axios.post(this.apiEndpoint, {
        source: from,
        targets: [to]
      }, {
        headers: {
          'Content-Type': 'application/json',
          'apy-token': this.apiKey
        }
      });

      // Extract the exchange rate data from the response
      const exchangeRates = response.data;
      
      // Cache the response for 1 hour
      this.cache.set(cacheKey, exchangeRates, 3600);
      
      // Return the exchange rate data
      return exchangeRates;
    } catch (error) {
      // Log any errors to the console
      console.error(error);
      
      // Rethrow the error
      throw error;
    }
  }
}

// Export the ExchangeRates class
module.exports = ExchangeRates;