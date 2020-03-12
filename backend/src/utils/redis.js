import redis from 'redis'
import { promisify } from 'util'
import logger from './logger'

const client = redis.createClient({
  prefix: 'elastics_',
})

client.on('connect', function () {
  logger.info('Redis connected')
})

client.on('error', function (err) {
  logger.error(err)
})

export const getCacheAsync = promisify(client.get).bind(client)

export const setCacheAsync = promisify(client.set).bind(client)

export const delCacheAsync = promisify(client.del).bind(client)

export default client