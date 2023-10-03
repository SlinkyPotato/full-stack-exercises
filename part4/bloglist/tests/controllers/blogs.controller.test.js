const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const api = supertest(app);
const blogModel = require('../../models/blog.model');
const userModel = require('../../models/user.model');

describe('blogs.controller.js', () => {
  let token = null;

  beforeAll(async () => {
    await api.post('/api/users').send({
      username: 'test',
      name: 'test name',
      password: 'password'
    });
    const loginResponse = await api.post('/api/login').send({
      username: 'test',
      password: 'password'
    });
    token = loginResponse.body.token;
    if (!token) {
      throw new Error('token not found');
    }
  });

  afterEach(async () => {
    await blogModel.deleteMany({});
  });

  afterAll(async () => {
    await userModel.deleteMany({});
    await blogModel.deleteMany({});
    await mongoose.connection.close();
  });

  describe('GET /api/blogs', () => {

    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('no blogs', async () => {
      const response = await api.get('/api/blogs');
      expect(response.body).toHaveLength(0);
    });

    test('one blog', async () => {
      const user = await userModel.findOne({ username: 'test' });
      await blogModel.insertMany({
        title: 'A cool blog Post',
        author: 'Brian Patino',
        url: 'http://google.com',
        likes: 1,
        user: user,
      });
      const response = await api.get('/api/blogs');
      expect(response.body).toHaveLength(1);
      expect(response.body[0].id).toBeDefined();
      await blogModel.findByIdAndDelete(response.body[0].id);
    });

    test('two blogs', async () => {
      const user = await userModel.findOne({ username: 'test' });
      const post1 = await blogModel.insertMany({
        title: 'A cool blog Post',
        author: 'Brian Patino',
        url: 'http://google.com',
        likes: 1,
        user,
      });
      const post2 = await blogModel.insertMany({
        title: 'Another cool blog Post',
        author: 'Brian Patino',
        url: 'http://google.com',
        likes: 10,
        user,
      });
      const response = await api.get('/api/blogs');
      expect(response.body).toHaveLength(2);
      await blogModel.findByIdAndDelete(post1._id);
      await blogModel.findByIdAndDelete(post2._id);
    });

  });

  describe('POST /api/blogs', () => {
    test('a valid blog can be added', async () => {
      const result = await api
        .post('/api/blogs')
        .send({
          title: 'A cool blog Post',
          author: 'Brian Patino',
          url: 'http://google.com',
          likes: 1
        })
        .set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
        .expect(201)
        .expect('Content-Type', /application\/json/);
      expect(result.body.id).toBeDefined();
      await blogModel.findByIdAndDelete(result.body.id);
    });

    test('request without likes defult to 0', async () => {
      const result = await api
        .post('/api/blogs')
        .send({
          title: 'A cool blog Post',
          author: 'Brian Patino',
          url: 'http://google.com'
        })
        .set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
        .expect(201)
        .expect('Content-Type', /application\/json/);
      expect(result.body.likes).toBe(0);
      await blogModel.findByIdAndDelete(result.body.id);
    });

    test('request without title nor author', async () => {
      const result = await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + token)
        .send({
          author: 'Brian Patino',
          likes: 15
        });
      expect(result.status).toBe(400);
    });
  });

  describe('DELETE /api/blogs/:id', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const result = await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + token)
        .send({
          title: 'A cool blog Post',
          author: 'Brian Patino',
          url: 'http://google.com',
          likes: 15
        });
      await api
        .delete(`/api/blogs/${result.body.id}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(204);
    });

    test('fails with status code 400 if id is invalid', async () => {
      await api
        .delete('/api/blogs/123')
        .set('Authorization', 'Bearer ' + token)
        .expect(400);
    });

    test('fails with status code 404 if blog does not exist', async () => {
      await api
        .delete('/api/blogs/5f5b8f0b1c9d440000b9a6d9')
        .set('Authorization', 'Bearer ' + token)
        .expect(404);
    });
  });

  describe('PATCH /api/blogs/:id', () => {

    test('succeeds with status code 200 if id is valid', async () => {
      const result = await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + token)
        .send({
          title: 'A cool blog Post',
          author: 'Brian Patino',
          url: 'http://google.com',
          likes: 15
        });

      await api
        .patch(`/api/blogs/${result.body.id}`)
        .set('Authorization', 'Bearer ' + token)
        .send({ likes: 10 })
        .expect(200);
    });

    test('fails with status code 400 if id is invalid', async () => {
      await api
        .patch('/api/blogs/123')
        .set('Authorization', 'Bearer ' + token)
        .send({ likes: 10 })
        .expect(400);
    });

    test('fails with status code 404 if blog does not exist', async () => {
      await api
        .patch('/api/blogs/5f5b8f0b1c9d440000b9a6d9')
        .set('Authorization', 'Bearer ' + token)
        .send({ likes: 10 })
        .expect(404);
    });
  });
});
