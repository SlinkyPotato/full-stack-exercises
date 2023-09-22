require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose');
const PersonModel = require('./models/persons.model');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.static('ui-dist'));

app.use(express.json());

app.use(morgan('tiny', {
  skip: (req, _) => {
    return req.method === 'POST';
  }
}));

app.use(morgan((tokens, req, res) => {
  if (req.method !== 'POST') {
    return;
  }
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body),
  ].join(' ');
}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/api/persons', (_, res) => {
  PersonModel.find({}).then(result => {
    res.json(result);
  }).catch(err => {
    console.log('Error finding persons:', err.message);
    res.status(404).end();
  });
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;
  PersonModel.find({}).then(persons => {
    console.log(`Found persons ${persons.length}`);
    const maxId = persons.length > 0 ? Math.floor((Math.random() * 10000000)) : 1;
    const person = {
      _id: new mongoose.Types.ObjectId(maxId + 1),
      name: body.name,
      number: body.number
    };
  
    PersonModel.create(person).then(result => {
      console.log('Person saved!');
      res.json(result);
    }).catch(err => {
      return next(err);
    });
  }).catch(err => {
    console.log('Error finding persons:', err.message);
    res.status(500).end();
  });
});

app.get('/info', (req, res) => {
  const newDate = new Date();
  PersonModel.find({}).then(result => {
    const info = `<p>Phonebook has info for ${result.length} people</p><p>${newDate}</p>`;
    res.send(info);
  }).catch(err => {
    console.log('Error finding persons:', err.message);
    res.status(404).end();
  });
});

app.get('/api/persons/:id', (req, res, next) => {
    PersonModel.findById(req.params.id).then(result => {
    if (!result) {
      next(new Error('Person not found'));
    }
    console.log(`Found person id: ${req.params.id}`);
    res.json(result);
  }).catch(err => {
    return next(err);
  });
});

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  PersonModel.deleteOne({ _id: id }).then(result => {
    console.log(result);
    if (result.deletedCount === 1) {
      console.log(`Deleted person id: ${id}`);
      res.status(204).end();
    } else {
      return next(new Error('Person not found'));
    }
  }).catch(err => {
    return next(err);
  });
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;

  PersonModel.findByIdAndUpdate(req.params.id,
    { number: body.number },
    { new: true, runValidators: true, context: 'query' },
  )
  .then(result => {
    if (!result) {
      return next(new Error('Person not found'));
    }
    console.log(`Updated person id: ${req.params.id}`);
    res.json(result);
  }).catch(err => {
    next(err);
  });
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.log('Error:', err.message);

  if (err.name === 'CastError' | err.name === 'BSONError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (err.message === 'Person not found') {
    return res.status(404).send();
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  } else if (err.code === 11000) {
    return res.status(400).json({ error: 'Name should be unique' });
  }
  console.log(err);
  next(err);
};

app.use(errorHandler);
