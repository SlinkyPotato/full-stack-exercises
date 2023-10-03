const blogRouter = require('express').Router();
const blogModel = require('../models/blog.model');
const userModel = require('../models/user.model');
const { userExtractor } = require('../utils/middleware');

blogRouter.get('/', async (req, res, next) => {
  try {
    const result = await blogModel.find({}).populate('user', 'username name id');
    res.json(result);
  } catch(error) {
    next(error);
  }
});

blogRouter.post('/', userExtractor, async (req, res, next) => {
  const user = req.user;

  try {
    const blog = new blogModel({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
      user: user.id,
    });
    await blog.populate('user', 'username name id');
    const result = await blog.save();

    await userModel.findByIdAndUpdate(user, { $push: { blogs: result._id } });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', userExtractor, async (req, res, next) => {
  const user = req.user;
  try {
    const blogToDelete = await blogModel.findOne({ _id: req.params.id });
    if (!blogToDelete) {
      throw new Error('blog not found');
    }
    if (blogToDelete.user.toString() !== user._id.toString()) {
      throw new Error('unauthorized');
    }
    const result = await blogModel.findByIdAndDelete(req.params.id);
    if (result === null) {
      return new Error('blog not found');
    }
    res.status(204).json(result);
  } catch (error) {
    next(error);
  }
});

blogRouter.patch('/:id', userExtractor, async (req, res, next) => {
  const user = req.user;
  const numOfLikes = req.body.likes;

  if (numOfLikes === undefined || numOfLikes === null) {
    return next(new Error('likes is required'));
  }

  try {
    const blogToPatch = await blogModel.findOne({ _id: req.params.id });
    if (!blogToPatch) {
      throw new Error('blog not found');
    }
    if (blogToPatch.user.toString() !== user._id.toString()) {
      throw new Error('unauthorized');
    }

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
