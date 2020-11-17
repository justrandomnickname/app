import redis from 'redis'
const client = redis.createClient()

client.on('error', function (error: any) {
  console.error(error)
})

export default client
