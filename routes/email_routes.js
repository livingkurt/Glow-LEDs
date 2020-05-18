const nodemailer = require("nodemailer");
require("dotenv").config()
const { isAuth, isAdmin } = require('../util')
const express = require('express')
const router = express.Router();
const axios = require('axios')
const User = require('../models/user')

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})


router.post("/register", async (req, res) => {
  let mailOptions = {
    from: process.env.EMAIL,
    to: req.body.email,
    subject: 'Glow LEDs Account Confirmation',
    text: 'It Works'
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('Error Occurs', err)
    }
    else {
      console.log('It Works')
    }
  })

})

router.post("/order", async (req, res) => {
  let mailOptions = {
    from: process.env.EMAIL,
    to: req.body.email,
    subject: 'Glow LEDs Order Confirmation',
    text: 'It Works'
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('Error Occurs', err)
    }
    else {
      console.log('It Works')
    }
  })

})

router.post("/shipping", async (req, res) => {
  // console.log(req.body.user)
  let user = {}
  try {
    user = await User.findOne({ _id: req.body.user })
  } catch (error) {
    res.send({ msg: error.message });
  }
  console.log({ user })

  // try {
  //   const user = await axios.get("/api/users/" + req.body.user);
  //   console.log(user)
  //   res.json(user);
  // }
  // catch (error) {
  //   console.log(error)
  // }


  let mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Glow LEDs Shipping Confirmation',
    text: 'It Works'
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('Error Occurs', err)
    }
    else {
      console.log('It Works')
    }
  })

})




module.exports = router;