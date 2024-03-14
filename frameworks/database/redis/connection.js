export default function connection(redis, config) {
    const createRedisClient = function createRedisClient() {
        return redis.createClient(config.redis.uri);
    };

    createRedisClient().on('connect', () => {
        console.log('Connected to Redis!');
    });

    createRedisClient().on('error', (error) => {
        console.log(`Error in Redis: ${error}`);
    });

    return {
        createRedisClient
    };
}