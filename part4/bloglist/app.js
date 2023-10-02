const config = require('./utils/env.config');
const log = require('./utils/log.logger');
const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blog.controller');
const userRouter = require('./controllers/user.controller');
const middleware = require('./utils/logger.middleware');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

mongoose.set('strictQuery', true);

if (process.env.NODE_ENV === 'test') {
  MongoMemoryServer.create()
    .then((mongoServer) => {
      mongoose.connect(mongoServer.getUri(), {
        dbName: 'test',
      }).then(() => {
        log.info('connected to in-memory MongoDB');
      }).catch((error) => {
        log.error('error connecting to in-memory MongoDB:', error.message);
      });
    });
} else {
  mongoose.connect(config.MONGODB_SRV)
    .then(() => {
      log.info('connected to MongoDB');
    }).catch((error) => {
      log.error('error connecting to MongoDB:', error.message);
    });
}

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
