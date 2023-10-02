const userRouter = require('express').Router();
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

userRouter.get('/', async (req, res, next) => {
  try {
    const result = await userModel.find({});
    res.json(result);
  } catch(error) {
    next(error);
  }
});

userRouter.post('/', async (req, res, next) => {
  const password = req.body.password;

  if (!password || password.length < 3) {
    return res.status(400).json({
      error: 'Password is required and must be at least 3 characters long',
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const user = new userModel({
      username: req.body.username,
      name: req.body.name,
      passwordHash,
    });
    const result = await user.save();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
