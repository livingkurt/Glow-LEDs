const nodemailer = require("nodemailer");
require("dotenv").config()
const { isAuth, isAdmin } = require('../util')
const express = require('express')
const router = express.Router();
const User = require('../models/user')
const main_layout = require("../email_templates/App");
// const shipping_confirmation_view = require("../email_templates/pages/shipping_confirmation_view");
// const delivery_confirmation_view = require("../email_templates/pages/delivery_confirmation_view");
const order_view = require("../email_templates/pages/order_view");
const verified_account_view = require("../email_templates/pages/verified_account_view");
const contact_view = require("../email_templates/pages/contact_view");

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

router.post("/contact", async (req, res) => {

  const data = req.body.user_name
  console.log(data)

  let mailOptions = {
    from: data.email,
    to: process.env.DISPLAY_EMAIL,
    subject: `New message from ${data.user_name} - ${data.order_number} - ${data.reason_for_contact}`,
    html: main_layout(contact_view(data))
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('Error Occurs', err)
      res.send(err)
    }
    else {
      console.log('Contact Email Sent to ' + data.user_name)
      res.send("Email Successfully Sent")
    }
  })

})

router.post("/register", async (req, res) => {
  console.log({ register: req.body })

  let mailOptions = {
    from: process.env.DISPLAY_EMAIL,
    to: req.body.email,
    subject: 'Glow LEDs Account Confirmation',
    html: main_layout(verified_account_view({ ...req.body, title: "Thank you For Joining Glow LEDs" }))
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
  console.log({ order: req.body })
  let user = {}
  let mailOptions = {
    from: process.env.DISPLAY_EMAIL,
    to: req.body.user_data.email,
    subject: 'Glow LEDs Order Confirmation',
    html: main_layout(order_view({ ...req.body, title: "Your Order Has Been Placed" }))
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('Error Occurs', err)
      res.send(err)
    }
    else {
      console.log('Order Email Sent to ' + req.body.user_data.name)
      res.send("Email Successfully Sent")
    }
  })

})

router.post("/shipping", async (req, res) => {
  console.log({ shipping: req.body })
  let user = {}
  try {
    user = await User.findOne({ _id: req.body.user })
  } catch (error) {
    res.send({ msg: error.message });
  }

  let mailOptions = {
    from: process.env.DISPLAY_EMAIL,
    // from: 'Kurt LaVacque <lavacquek@gmail.com>',
    to: user.email,
    subject: 'Glow LEDs Shipping Confirmation',
    html: main_layout(order_view({ ...req.body, title: "Your Item has Shipped!" }))
  }
  console.log(req.body)

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('Error Occurs', err)
      res.send(err)
    }
    else {
      console.log('Shipping Email Sent to ' + user.name)
      res.send("Email Successfully Sent")
    }
  })

})

router.post("/delivery", async (req, res) => {
  console.log({ delivery: req.body })
  let user = {}
  try {
    user = await User.findOne({ _id: req.body.user })
  } catch (error) {
    res.send({ msg: error.message });
  }

  let mailOptions = {
    from: process.env.DISPLAY_EMAIL,
    to: user.email,
    subject: 'Glow LEDs Delivery Confirmation',
    html: main_layout(order_view({ ...req.body, title: "Your Item has Been Delivered!" }))
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