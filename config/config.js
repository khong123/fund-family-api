import dotenv from 'dotenv';

dotenv.config();

export default {
    clientUrl: process.env.CLIENT_URL || '',
    port: process.env.PORT || 2000,
    ip: process.env.HOST || '0.0.0.0',
    mongo: {
        uri: process.env.MONGO_URL || 'mongodb://localhost:27017/fund_family'
    },
    redis: {
        uri: process.env.REDIS_URL || 'redis://localhost:6379'
    },
    jwtSecret: process.env.JWT_SECRET || 'CFVvf0-r6p7-V£K',
    mailHost: process.env.MAIL_HOST || '',
    mailPort: process.env.MAIL_PORT || '',
    mailUsername: process.env.MAIL_USERNAME || '',
    mailPassword: process.env.MAIL_PASSWORD || ''
};
