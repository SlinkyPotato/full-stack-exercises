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

app.get('/api/persons', (req, res, next) => {
  PersonModel.find({}).then(result => {
    res.json(result);
  }).catch(err => {
    console.log('Error finding persons:', err.message);
    res.status(404).end();
  });
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    });
  }
  if (!body.number) {
    return res.status(400).json({
      error: 'phone number missing'
    });
  }

  PersonModel.find({}).then(persons => {
    console.log(`Found persons ${persons.length}`);

    if (persons.find(p => p.name === body.name)) {
      return res.status(400).json({
        error: 'name must be unique'
      });
    }
  
    const maxId = persons.length > 0 ? Math.floor((Math.random() * 10000000)) : 1;
    const person = {
      _id: new mongoose.Types.ObjectId(maxId + 1),
      name: body.name,
      number: body.number
    };
  
    PersonModel.create(person).then(_ => {
      console.log('Person saved!');
      res.json(person);
    }).catch(err => {
      console.log('Error saving person:', err.message);
      res.status(500).end();
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
  let id;
  try {
    id = new mongoose.Types.ObjectId(req.params.id);
  } catch (err) {
    return next(err);
  }
  
  PersonModel.findById(id).then(result => {
    if (!result) {
      next(new Error('Person not found'));
    }
    console.log(`Found person id: ${id}`);
    res.json(result);
  }).catch(err => {
    console.log('Error finding person:', err.message);
    res.status(404).end();
  });
});

app.delete('/api/persons/:id', (req, res, next) => {
  let id;
  try {
    id = new mongoose.Types.ObjectId(req.params.id);
  } catch (err) {
    return next(err);
  }
  PersonModel.deleteOne({ _id: id }).then(result => {
    console.log(result);
    if (result.deletedCount === 1) {
      console.log(`Deleted person id: ${id}`);
      res.status(204).end();
    } else {
      console.log(`Person not found id: ${id}`);
      res.status(404).end();
    }
  }).catch(err => {
    console.log('Error deleting person:', err.message);
    res.status(500).end();
  });
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    });
  }
  if (!body.number) {
    return res.status(400).json({
      error: 'phone number missing'
    });
  }

  PersonModel.findByIdAndUpdate(req.params.id, { number: body.number }, { new: true })
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
  }

  next(err);
};

app.use(errorHandler);
