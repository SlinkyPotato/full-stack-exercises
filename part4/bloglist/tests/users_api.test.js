const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

describe('users.controller.js', () => {

  beforeEach(async () => {
    await mongoose.connection.collection('users').deleteMany({});
  });

  describe('GET /api/users', () => {
    test('users are returned as json', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('should return 1 user', async () => {
      const passwordHash = await bcrypt.hash('password', 10);
      await userModel.insertMany({
        username: 'brian',
        name: 'Brian Patino',
        passwordHash
      });
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
          expect(res.body).toHaveLength(1);
        });
    });
  });

  describe('POST /api/users', () => {

    test('should return 400 if password is less than 3 characters', async () => {
      await api
        .post('/api/users')
        .send({
          username: 'brian',
          name: 'Brian Patino',
          password: '12',
        })
        .expect(400)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
          expect(res.body.error).toContain('Password is required and must be at least 3 characters long');
        });
    });

    test('should return 201 if user is created', async () => {
      await api
        .post('/api/users')
        .send({
          username: 'brian',
          name: 'Brian Patino',
          password: '123',
        })
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
          expect(res.body.id).toBeDefined();
        });
    });

    test('should return 400 if username is missing', async () => {
      await api
        .post('/api/users')
        .send({
          name: 'Brian Patino',
          password: '123',
        })
        .expect(400)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
          expect(res.body.error).toContain('`username` is required');
        });
    });

    test('should return 400 if username is already taken', async () => {
      const passwordHash = await bcrypt.hash('password', 10);
      await userModel.insertMany({
        username: 'brian',
        name: 'Brian Patino',
        passwordHash
      });
      await api
        .post('/api/users')
        .send({
          username: 'brian',
          name: 'Brian Patino',
          password: '123',
        })
        .expect(400)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
          expect(res.body.error).toContain('E11000 duplicate key error collection: test.users index: username_1 dup key: { username: "brian" }');
        });
    });

  });
});