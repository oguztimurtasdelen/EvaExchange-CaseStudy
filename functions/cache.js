// redisService.js

const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const EXPIRATION_TIME_SECONDS = 3600;

const getCachedData = async (key) => {
  try {
    const cachedData = await getAsync(key);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    return null;
  } catch (error) {
    console.error('Redis error:', error);
    return null;
  }
};

const setCachedData = async (key, data) => {
  try {
    await setAsync(key, JSON.stringify(data), 'EX', EXPIRATION_TIME_SECONDS);
  } catch (error) {
    console.error('Redis error:', error);
  }
};

module.exports = {
  getCachedData,
  setCachedData,
};
