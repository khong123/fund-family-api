const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

// Config
import config from './config/config';
// Webserver
import expressConfig from './frameworks/webserver/express';
import routes from './frameworks/webserver/routes';
import serverConfig from './frameworks/webserver/server';
// Database
import mongoDbConnection from './frameworks/database/mongoDB/connection';
import redisConnection from './frameworks/database/redis/connection';
// Middlewares
import errorHandlingMiddleware from './frameworks/webserver/middlewares/errorHandlingMiddleware';

dotenv.config();

const app = express();
const server = require('http').createServer(app);

// Express.js configuration
expressConfig(app);

// Server configuration and start
serverConfig(app, mongoose, server, config).startServer();

// DB configuration and connection create
mongoDbConnection(mongoose, config, {}).connectToMongo();

const redisClient = redisConnection(redis, config).createRedisClient();

// Routes for each endpoint
routes(app, express, redisClient);

// Error handling middleware
app.use(errorHandlingMiddleware);

export default app;