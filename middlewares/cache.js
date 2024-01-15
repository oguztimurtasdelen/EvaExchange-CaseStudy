// redisMiddleware.js

const { getCachedData, setCachedData } = require('../functions/cache');

const redisMiddleware = (key) => {
  return async (req, res, next) => {
    try {
      // Anahtarı kullanarak önbellekten veriyi al
      const cachedData = await getCachedData(key);

      if (cachedData) {
        // Önbellekte varsa, önbellekten veriyi kullan
        req.cachedData = cachedData;
      } else {
        // Önbellekte yoksa, veritabanından veriyi al ve önbelleğe ekle
        next();
        await setCachedData(key, req.cachedData);
      }
    } catch (error) {
      console.error('Redis middleware error:', error);
      next();
    }
  };
};

module.exports = redisMiddleware;
