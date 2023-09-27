const blogRouter = require('express').Router();
const blogModel = require('../models/blog.model');

blogRouter.get('/', async (req, res) => {
  try {
    const result = await blogModel.find({});
    res.json(result);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
});

blogRouter.post('/', async (req, res) => {
  try {
    const blog = new blogModel(req.body);
    const result = await blog.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = blogRouter;
