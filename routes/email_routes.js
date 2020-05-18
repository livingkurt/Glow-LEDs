const nodemailer = require("nodemailer");
require("dotenv").config()
const Order = require('../models/order')
const { isAuth, isAdmin } = require('../util')
const express = require('express')
const router = express.Router();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})


router.get("/register", isAuth, async (req, res) => {
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

router.get("/order", isAuth, async (req, res) => {
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

router.get("/shipping", isAuth, async (req, res) => {
  let mailOptions = {
    from: process.env.EMAIL,
    to: req.body.email,
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