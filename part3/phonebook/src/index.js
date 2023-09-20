const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3001;

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

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

app.get('/api/persons', (req, res) => {
  res.json(persons);
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
  if (persons.find(p => p.name === body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    });
  }
  const maxId = persons.length > 0 ? Math.floor((Math.random() * 10000000)) : 1;
  const person = {
    id: maxId + 1,
    name: body.name,
    number: body.number
  };
  persons = persons.concat(person);
  res.json(person);
});

app.get('/info', (req, res) => {
  const newDate = new Date();
  const info = `<p>Phonebook has info for ${persons.length} people</p><p>${newDate}</p>`;
  res.send(info);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  if(person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const newPersons = persons.filter(p => p.id !== id);
  if (newPersons.length === persons.length) {
    res.status(404).end();
  } else {
    persons = newPersons;
    res.status(204).end();
  }
});
