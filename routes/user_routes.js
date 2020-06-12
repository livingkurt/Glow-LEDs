// import express from 'express';
// import User from '../models/userModel';
// import { getToken, isAuth } from '../util';

const express = require('express');
const User = require('../models/user');
const { getToken, isAuth } = require('../util');

const router = express.Router();

router.put('/:id', isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser)
    });
  } else {
    res.status(404).send({ msg: 'User Not Found' });
  }

});

router.post('/login', async (req, res) => {

  const loginUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });
  if (loginUser) {
    res.send({
      _id: loginUser.id,
      name: loginUser.name,
      email: loginUser.email,
      isAdmin: loginUser.isAdmin,
      token: getToken(loginUser)
    });

  } else {
    res.status(401).send({ msg: 'Invalid Email or Password.' });
  }

});

router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser)
    })
  } else {
    res.status(401).send({ msg: 'Invalid User Data.' });
  }

})

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: 'Kurt',
      email: 'lavacquek@icloud.com',
      password: 'admin',
      isAdmin: true
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// export default router;
module.exports = router;