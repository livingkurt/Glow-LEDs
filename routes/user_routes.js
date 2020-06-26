const express = require('express');
const User = require('../models/user');
const { getToken, isAuth } = require('../util');
const bcrypt = require("bcryptjs");
require("dotenv")

const router = express.Router();

router.put('/resetpassword', async (req, res) => {
  console.log({ resetpassword: req.body })
  try {
    const user = await User.findOne({ _id: req.body.user_id });
    if (!user) {
      return res.status(400).json({ email: "User Does Not Exist" });
    }
    else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          if (err) throw err;
          user.password = hash;
          await user.save()
          res.status(202).send({ msg: 'Password Saved' });
        });
      });
    }
  } catch (error) {
    console.log(error)
    res.send(error)
  }

})

router.post('/passwordreset', async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  console.log({ user })
  if (user) {
    res.send(user)
  } else {
    res.status(404).send({ msg: 'User Not Found' });
  }
});



router.put('/update/:id', isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        if (err) throw err;
        user.password = hash;
        await user.save()
      });
    });
    user.isVerified = req.body.isVerified || user.isVerified;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isVerified: updatedUser.isVerified,
      token: getToken(updatedUser)
    });
  } else {
    res.status(404).send({ msg: 'User Not Found' });
  }
});

router.put('/verify/:id', async (req, res) => {

  const userId = req.params.id;
  console.log({ verify: userId })
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.isVerified = true;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      // isVerified: updatedUser.isVerified,
      // token: getToken(updatedUser)
    });
    // res.status(202).send({ msg: 'Verified Account' });
  } else {
    res.status(404).send({ msg: 'User Not Found' });
  }
});



router.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const login_user = await User.findOne({ email });
    if (!login_user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    if (!login_user.isVerified) {
      return res.status(404).json({ emailnotfound: "Account not Verified" });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, login_user.password)
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
  } catch (error) {
    console.log(error)
    res.send(error)
  }
});

router.post('/register', async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    const user = await User.findOne({ email: newUser.email });
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }
    else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          await newUser.save()
          res.json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            isVerified: newUser.isVerified,
            token: getToken(newUser)
          })
        });
      });
    }
  } catch (error) {
    console.log(error)
    res.send(error)
  }

})

router.post("/getuser/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).json({ email: "User Doesn't Exist" });
    }
    // Check password
    const isMatch = await bcrypt.compare(req.body.current_password, user.password)
    if (isMatch) {
      // console.log({ user })
      res.send({
        _id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        token: getToken(user)
      });
    }
    else {
      return res.send(false);
    }
  } catch (error) {
    console.log(error)
    res.send(error)
  }

});

router.get("/createadmin", async (req, res) => {
  try {
    const admin = new User({
      name: 'Kurt',
      email: 'lavacquek@icloud.com',
      password: "admin",
      isVerified: true,
      isAdmin: true
    });
    const user = await User.findOne({ email: admin.email });
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }
    else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(admin.password, salt, async (err, hash) => {
          if (err) throw err;
          admin.password = hash;
          await admin.save()
          res.json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            isAdmin: admin.isAdmin,
            isVerified: admin.isVerified,
            token: getToken(admin)
          })
        });
      });
    }
  } catch (error) {
    console.log(error)
    res.send(error)
  }

});

// export default router;
module.exports = router;