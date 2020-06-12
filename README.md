# GlowLEDs

<p align="center">
  <img style="text-align: center;" src="./client/public/images/Glow_Logo.png">
  <h1 style="text-align: center;">3D Printed LED toys and accessories, by a glover that just wants to light up the world</h1>
</p>


# Inspiration

I have been facinated with LEDs ever since I saw my first light show back in early 2014, and always wanted the top of the line gloves so that I could customize the modes as much as possible. I've noticed that led diffusers have not made any significant advancements and feel little bored with what is avaiable. So then I bought my Prusa i3 MK3s 3D printer, and got to work developing what I call _______!

# Features

### Admin
- Add a Product
- Edit a Product
- Delete a Product
- View Orders
- Mark Orders and Shipped and Delivered
### User
- Create an Account
- View Products
- View Cart
- Add Item to Cart
- Adjust the quantity of the product
- Remove Item from Cart
- Pay with Paypal
- View Orders
- Recieve Email Notifications based on order and account status


# Installation

First clone this repo

```shell
git clone git@github.com:livingkurt/Glow-LEDs.git
```

Install Dependancies

```shell
npm install
```

Run Electron App

```shell
npm start
```

# How it works

- Press the play button to start the timer
- Press the pause button to pause the timer and snooze the ending sound
- Press Stop to reset the timer
- You can switch back and forth between Work and Break timers manually with the toggle switch
- There are number inputs at the bottom that allow you to customize the amount of time you would like to work and break for

# Technologies

- Javascript
- MongoDB
  - mongoose.js
- Express.js
- React.js
- Node.js
- Redux
- Nodemailer
- email.js
- Axios

Or if you can run it in the [Browser](https://livingkurt.github.io/Work-Break-Timer/)

# Pictures

<div align="center" style="display:flex; flex-wrap: wrap; width:1500px;">
  <h2>Home</h2>
  <img style="text-align: center;" src="client/public/images/readme_images/Home_Top.png">
  <img style="text-align: center;" src="client/public/images/readme_images/Home_Bottom.png">
  <h2>View Products</h2>
  <img style="text-align: center;" src="client/public/images/readme_images/Products.png">
  <h2>Cart</h2>
  <img style="text-align: center;" src="client/public/images/readme_images/Cart.png">
  <h2>Contact Form</h2>
  <img style="text-align: center;" src="client/public/images/readme_images/Contact.png">
  <h2>User Profile</h2>
  <img style="text-align: center;" src="client/public/images/readme_images/Profile.png">
  <h2>Admin Products</h2>
  <img style="text-align: center;" src="client/public/images/readme_images/Admin_Products.png">
  <h2>Admin Orders</h2>
  <img style="text-align: center;" src="client/public/images/readme_images/Admin_Orders.png">
</div>