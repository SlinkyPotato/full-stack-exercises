const config = require('./utils/env.config');
const log = require('./utils/log.logger');
const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blog.controller');
const middleware = require('./utils/logger.middleware');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

log.info('connecting to db');
mongoose.connect(config.MONGODB_SRV)
  .then(() => {
    log.info('connected to MongoDB');
  }).catch((error) => {
    log.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
