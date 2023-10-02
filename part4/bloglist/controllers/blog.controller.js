const blogRouter = require('express').Router();
const blogModel = require('../models/blog.model');

blogRouter.get('/', async (req, res, next) => {
  try {
    const result = await blogModel.find({});
    res.json(result);
  } catch(error) {
    next(error);
  }
});

blogRouter.post('/', async (req, res, next) => {
  try {
    const blog = new blogModel(req.body);
    const result = await blog.save();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    const result = await blogModel.findByIdAndDelete(req.params.id);
    if (result === null) {
      return next(new Error('blog not found'));
    }
    res.status(204).json(result);
  } catch (error) {
    next(error);
  }
});

blogRouter.patch('/:id', async (req, res, next) => {
  const numOfLikes = req.body.likes;

  if (numOfLikes === undefined || numOfLikes === null) {
    return next(new Error('likes is required'));
  }

  try {
    const result = await blogModel.findByIdAndUpdate(req.params.id, { likes: numOfLikes }, { new: true });
    if (result === null) {
      return next(new Error('blog not found'));
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
