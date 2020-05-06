const mongoose = require('mongoose')
const db = require("./models/index");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/glow_leds_db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

const user_seed = [
  {
    price: 15,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    name: "Coin Battery Holder",
    image: "https://via.placeholder.com/300",
    brand: "Glow",
    category: "Accessories",
    description: "Holds up to 60 coin batteries",
  },
  {
    price: 15,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    name: "10x Frosted Dome Diffusers",
    image: "https://via.placeholder.com/300",
    brand: "Glow",
    category: "Diffusers",
    description: "Holds up to 60 coin batteries",
  },
  {
    price: 15,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    name: "10x Large Frosted Dome Diffusers",
    image: "https://via.placeholder.com/300",
    brand: "Glow",
    category: "Diffusers",
    description: "Holds up to 60 coin batteries",
  },
  {
    price: 15,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    name: "Coin Battery Holder",
    image: "https://via.placeholder.com/300",
    brand: "Glow",
    category: "Accessories",
    description: "Holds up to 60 coin batteries",
  },
  {
    price: 15,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    name: "10x Frosted Dome Diffusers",
    image: "https://via.placeholder.com/300",
    brand: "Glow",
    category: "Diffusers",
    description: "Holds up to 60 coin batteries",
  },
  {
    price: 15,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    name: "10x Large Frosted Dome Diffusers",
    image: "https://via.placeholder.com/300",
    brand: "Glow",
    category: "Diffusers",
    description: "Holds up to 60 coin batteries",
  },
  {
    price: 15,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    name: "Coin Battery Holder",
    image: "https://via.placeholder.com/300",
    brand: "Glow",
    category: "Accessories",
    description: "Holds up to 60 coin batteries",
  },
  {
    price: 15,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    name: "10x Frosted Dome Diffusers",
    image: "https://via.placeholder.com/300",
    brand: "Glow",
    category: "Diffusers",
    description: "Holds up to 60 coin batteries",
  },
  {
    price: 15,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    name: "10x Large Frosted Dome Diffusers",
    image: "https://via.placeholder.com/300",
    brand: "Glow",
    category: "Diffusers",
    description: "Holds up to 60 coin batteries",
  },


];

db.Products.deleteMany({})
  .then(() => db.Products.insertMany(user_seed))
  .then(data => {
    console.log(data.length + ' records inserted!')
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
