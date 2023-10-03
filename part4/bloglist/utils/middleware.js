const log = require('./log.logger');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const requestLogger = (request, response, next) => {
  log.info('Method:', request.method);
  log.info('Path:  ', request.path);
  log.info('Body:  ', request.body);
  log.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  log.error(error);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.message === 'blog not found') {
    return response.status(404).json({ error: error.message });
  } else if (error.message === 'likes is required') {
    return response.status(400).json({ error: error.message });
  } else if (error.code === 11000) {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' });
  } else if (error.message === 'unauthorized') {
    return response.status(401).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization');
  if (auth && auth.startsWith('Bearer ')) {
    request.token = auth.replace('Bearer ', '');
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: 'token missing' });
  }
  const token = jwt.verify(request.token, process.env.SECRET);
  const user = await userModel.findOne({ _id: token.id });
  if (!user) {
    return next(new Error({ name: 'TokenExpiredError' }));
  }
  request.user = user;
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
