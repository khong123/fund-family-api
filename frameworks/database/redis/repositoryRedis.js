export default function RepositoryRedis() {
    return function cachingClient(redisClient) {
        const setCache = ({ key, expireTimeSec, data }) =>
            redisClient.setex(key, expireTimeSec, data);

        return {
            setCache
        };
    };
}
