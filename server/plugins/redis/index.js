const redis = require('redis')
const { port, host } = require('../../config').redis

// 创建客户端
const redisClient = redis.createClient(
  port,
  host
)

redisClient.on('error', err => {
  console.log(`Redis err: ${err}`)
})


/**
 * 设置 redis
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 过期时间，单位 s
 */
function setRedis(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 *  获取 redis
 * @param {string} key 键
 */
function getRedis(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }

      try {
        resolve(
          JSON.parse(val)
        )
      } catch (ex) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  setRedis,
  getRedis
}
