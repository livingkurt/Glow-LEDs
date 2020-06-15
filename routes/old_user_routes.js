// import express from 'express';
// import User from '../models/userModel';
// import { getToken, isAuth } from '../util';

const express = require('express')
const User = require('../models/user')
const { getToken, isAuth } = require('../util')
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
require("dotenv")

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
  const email = req.body.email;
  const password = req.body.password;

  const login_user = await User.findOne({ email });
  if (!login_user) {
    return res.status(404).json({ emailnotfound: "Email not found" });
  }
  // Check password
  bcrypt.compare(password, login_user.password).then(isMatch => {
    if (isMatch) {
      res.send({
        _id: login_user.id,
        name: login_user.name,
        email: login_user.email,
        isAdmin: login_user.isAdmin,
        token: getToken(login_user)
      });
    }
    else {
      return res
        .status(400)
        .json({ passwordincorrect: "Password incorrect" });
    }
  });

});

router.post('/register', async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ email: "Email already exists" });
  }
  else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
          }))
          .catch(err => console.log(err));
      });
    });
  }

})

router.get("/createadmin", async (req, res) => {
  const admin = new User({
    name: 'Kurt',
    email: 'lavacquek@icloud.com',
    password: "admin",
    confirmed: true,
    isAdmin: true
  });
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ email: "Email already exists" });
  }
  else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(admin.password, salt, (err, hash) => {
        if (err) throw err;
        admin.password = hash;
        admin
          .save()
          .then(admin => res.json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            isAdmin: admin.isAdmin,
            token: getToken(admin)
          }))
          .catch(err => console.log(err));
      });
    });
  }
  // try {
  //   const user = new User({
  //     name: 'Kurt',
  //     email: 'lavacquek@icloud.com',
  //     password: '1234',
  //     confirmed: true,
  //     isAdmin: true
  //   });
  //   const newUser = await user.save();
  //   res.send(newUser);
  // } catch (error) {
  //   res.send({ msg: error.message });
  // }
});

router.get("/:id", async (req, res) => {
  console.log("userRoute")
  try {
    const user = await User.findOne({ _id: req.params.id })
    res.send(user);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// export default router;
module.exports = router;