// Configuration file for the application
module.exports = {
    // API key for ApyHub API
    apiKey: 'APY0qZEX55olDUvFWHOeLMuzW7Itn4zOJ1ZynzY5RHHiqPoxNTQbBDdfDsrhzG9A9i4UrOrg',
    
    // ApyHub API endpoint for currency conversion
    apiEndpoint: 'https://api.apyhub.com/data/convert/currency/multiple',
    
    // time to live  in seconds
    cacheTTL: 3600, // 1 hour
    
    // Rate limiting configuration
    rateLimit: {
      // Window size in milliseconds (1 hour)
      windowMs: 1 * 60 * 60 * 1000,
      
      // Maximum number of requests per hour
      max: 100,
      
      // Delay in milliseconds (no delay)
      delayMs: 0
    }
  };