const nodemailer = require("nodemailer");
require("dotenv").config()
const { isAuth, isAdmin } = require('../util')
const express = require('express')
const router = express.Router();
const axios = require('axios')
const User = require('../models/user')
const main_layout = require("../email_templates/App");
const shipping_confirmation_view = require("../email_templates/pages/shipping_confirmation_view");

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
    // text: 'It Works'
    html: main_layout({})
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('Error Occurs', err)
      res.send(err)
    }
    else {
      console.log('Registration Email Sent to ' + req.body.name)
      res.send("Email Successfully Sent")
    }
  })

})

router.post("/order", async (req, res) => {
  let user = {}
  let mailOptions = {
    from: process.env.EMAIL,
    to: req.body.user_data.email,
    subject: 'Glow LEDs Order Confirmation',
    html: main_layout(req.body)
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('Error Occurs', err)
      res.send(err)
    }
    else {
      console.log('Order Email Sent to ' + user.name)
      res.send("Email Successfully Sent")
    }
  })

})

router.post("/shipping", async (req, res) => {
  let user = {}
  try {
    user = await User.findOne({ _id: req.body.user })
  } catch (error) {
    res.send({ msg: error.message });
  }

  let mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Glow LEDs Shipping Confirmation',
    html: main_layout({ title: "Shipping Confirmation" })
  }
  console.log(req.body)

  // transporter.sendMail(mailOptions, (err, data) => {
  //   if (err) {
  //     console.log('Error Occurs', err)
  //     res.send(err)
  //   }
  //   else {
  //     console.log('Shipping Email Sent to ' + user.name)
  //     res.send("Email Successfully Sent")
  //   }
  // })

})

router.post("/delivery", async (req, res) => {
  let user = {}
  try {
    user = await User.findOne({ _id: req.body.user })
  } catch (error) {
    res.send({ msg: error.message });
  }

  let mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Glow LEDs Delivery Confirmation',
    html: main_layout({ title: "Delivery Confirmation" })
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('Error Occurs', err)
      res.send(err)
    }
    else {
      console.log('Delivery Email Sent to ' + user.name)
      res.send("Email Successfully Sent")
    }
  })

})




module.exports = router;