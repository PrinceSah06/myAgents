import Redis from 'ioredis'


const redis = new Redis(process.env.REDIS_URL)

try {
    redis.on("connect",()=>{
    console.log("Redis Connected ")
})

    
} catch (error) {
    console.log('error while connecting Redis  : ',error)
    
}


export default  redis