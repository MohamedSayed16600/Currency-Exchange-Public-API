# Currency-Exchange-Public-API
Implement a simple system that exposes a public API for currency exchange.

Description: This project is a simple API that retrieves exchange rates for a given from and to currency with error hndling implemented. It uses a cache to store exchange rates for a specified time to live (TTL) to reduce the number of requests to the external API. It uses also a rate limiter to prevent abuse.

Code Structure:
1) app.js: 
-This file sets up the Express.js server and defines the API endpoints.
-It imports the required dependencies, including the express, rateLimit, config file, Cache module, and ExchangeRates module.
-It defines the /exchange-rates endpoint, which retrieves exchange rates for a given from and to currency.
-It uses the rateLimit middleware to limit the number of requests to the /exchange-rates endpoint.
-It sets up the Swagger API documentation using the swaggerJsdoc and swaggerUi modules

2) config.js:
- This file stores the configuration settings for the application.
- It exports an object with the following properties:
  - apiKey: The API key for the external API provider.
  - apiEndpoint: The endpoint URL for the external API provider.
  - cacheTTL: The time to live (TTL) for the cache in seconds.
  - rateLimit: An object with the following properties:
    - a time window for the rate limit in milliseconds.
    - a maximum number of requests allowed within the time window.

3) cache.js:
-This file defines the Cache module, which stores exchange rates for a specified TTL.
-It uses the node-cache library to store the cache data.

4) exchangeRates.js:
-This file defines the ExchangeRates module, which retrieves exchange rates from an external API.
-It imports the axios library to make HTTP requests to the external API.
-It exports an ExchangeRates class

How to Run the Project:
1) install/clone this repo to your local machine
2) install required dependencies using "npm install axios, express,node-cache,express-rate-limit" in the project directory
3) run command "node app.js" in the project directory to run the application
4) open web browser and enter the following url: "http://localhost:3001/api-docs"

API end points using swagger:
 







