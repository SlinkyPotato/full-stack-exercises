const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const api = supertest(app);
const userModel = require('../../models/user.model');

describe('login.controller.js', () => {

  beforeEach(async () => {
    await mongoose.connection.collection('users').deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /api/login', () => {

    test('should return 400 for invalid username', async () => {
      await api
        .post('/api/login')
        .send({
          username: 'b',
          password: 'password'
        })
        .expect(401)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
          expect(res.body.error).toContain('invalid username or password');
        });
    });

    test('should return 400 for invalid password', async () => {
      await api
        .post('/api/login')
        .send({
          username: 'brian',
          password: 'p'
        })
        .expect(401)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
          expect(res.body.error).toContain('invalid username or password');
        });
    });

    test('should return 200 for valid username and password', async () => {
      await userModel.insertMany({
        username: 'brian',
        name: 'Brian Patino',
        passwordHash: '$2b$10$ZoHRlbW67jLoZXnS5B.7QuI.XmwfipdkBL4vU1U9zO7JbdCUz92JO'
      });
      await api
        .post('/api/login')
        .send({
          username: 'brian',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
          expect(res.body.token).toBeDefined();
        });
    });
  });

});