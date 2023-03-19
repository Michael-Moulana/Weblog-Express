const redis = require('redis')
module.exports = (session) =>  {
    let RedisStore = require("connect-redis")(session)
    let redisClient = redis.createClient()
    return new RedisStore({
        client: redisClient,
        prefix: "myapp:"
      })
}