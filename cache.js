// Cache implemented here using NodeCache dependency
const NodeCache = require('node-cache');

// Cache class
class Cache {
  // Constructor
  constructor(ttl) {
    // Create a new NodeCache instance with the specified TTL
    this.cache = new NodeCache({ stdTTL: ttl });
  }

  // Get a value from the cache
  get(key) {
    return this.cache.get(key);
  }

  // Set a value in the cache
  set(key, value, ttl) {
    this.cache.set(key, value, ttl);
  }
}

// Export the Cache class
module.exports = Cache;