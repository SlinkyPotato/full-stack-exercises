const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);
const blogModel = require('../models/blog.model');

describe('blog_api', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('a valid blog can be added', async () => {
    const result = await api.post('/api/blogs')
      .send({
        title: 'A cool blog Post',
        author: 'Brian Patino',
        url: 'http://google.com',
        likes: 1
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(result.body.id).toBeDefined();
    await blogModel.findByIdAndDelete(result.body.id);
  });

  test('no blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(0);
  });

  test('one blog', async () => {
    await blogModel.insertMany({
      title: 'A cool blog Post',
      author: 'Brian Patino',
      url: 'http://google.com',
      likes: 1
    });
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toBeDefined();
    await blogModel.findByIdAndDelete(response.body[0].id);
  });

  test('two blogs', async () => {
    const post1 = await blogModel.insertMany({
      title: 'A cool blog Post',
      author: 'Brian Patino',
      url: 'http://google.com',
      likes: 1
    });
    const post2 = await blogModel.insertMany({
      title: 'Another cool blog Post',
      author: 'Brian Patino',
      url: 'http://google.com',
      likes: 10
    });
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(2);
    await blogModel.findByIdAndDelete(post1._id);
    await blogModel.findByIdAndDelete(post2._id);
  });

  test('request without likes defult to 0', async () => {
    const result = await api.post('/api/blogs')
      .send({
        title: 'A cool blog Post',
        author: 'Brian Patino',
        url: 'http://google.com'
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(result.body.likes).toBe(0);
    await blogModel.findByIdAndDelete(result.body.id);
  });

  test('request without title nor author', async () => {
    const result = await api.post('/api/blogs')
      .send({
        author: 'Brian Patino',
        likes: 15
      });
    expect(result.status).toBe(400);
  });

  afterEach(async () => {
    await blogModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const post = await blogModel.insertMany({
        title: 'A cool blog Post',
        author: 'Brian Patino',
        url: 'http://google.com',
        likes: 1
      });
      await api
        .delete(`/api/blogs/${post[0]._id}`)
        .expect(204);
    });

    test('fails with status code 400 if id is invalid', async () => {
      await api
        .delete('/api/blogs/123')
        .expect(400);
    });

    test('fails with status code 404 if blog does not exist', async () => {
      await api
        .delete('/api/blogs/5f5b8f0b1c9d440000b9a6d9')
        .expect(404);
    });
  });

  describe('updating a blog', () => {

    test('succeeds with status code 200 if id is valid', async () => {
      const post = await blogModel.insertMany({
        title: 'A cool blog Post',
        author: 'Brian Patino',
        url: 'http://google.com',
        likes: 1
      });

      await api
        .patch(`/api/blogs/${post[0]._id}`)
        .send({ likes: 10 })
        .expect(200);
    });

    test('fails with status code 400 if id is invalid', async () => {
      await api
        .patch('/api/blogs/123')
        .send({ likes: 10 })
        .expect(400);
    });

    test('fails with status code 404 if blog does not exist', async () => {
      await api
        .patch('/api/blogs/5f5b8f0b1c9d440000b9a6d9')
        .send({ likes: 10 })
        .expect(404);
    });
  });
});