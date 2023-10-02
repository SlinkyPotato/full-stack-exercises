const log = require('./log.logger');

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
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
