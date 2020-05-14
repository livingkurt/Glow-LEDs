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
    "price": 230,
    "countInStock": 1,
    "rating": 0,
    "numReviews": 0,
    "name": "100x100 mm Infinity Cube",
    "image": "/images/product_images/Infinity_Cube/IMG_9236.JPG",
    "brand": "Glow LEDs",
    "category": "Infinity",
    "description": "Infinity Mirror in 6 Directions",
    "__v": 0
  },
  {
    "price": 320,
    "countInStock": 1,
    "rating": 0,
    "numReviews": 0,
    "name": "200x200 mm Infinity Cube",
    "image": "https://via.placeholder.com/300",
    "brand": "Glow LEDs",
    "category": "Infinity",
    "description": "Infinity Mirror in 6 Directions",
    "__v": 0
  },
  {
    "price": 25,
    "countInStock": 3,
    "rating": 0,
    "numReviews": 0,
    "name": "Coin Battery Holder",
    "image": [
      "/images/product_images/Coin_Battery_Storage/IMG_9318.JPG"
    ],
    "brand": "Glow LEDs",
    "category": "Accessories",
    "description": "Holds up to 60 coin batteries",
    "__v": 1
  },
  {
    "price": 15,
    "countInStock": 10,
    "rating": 0,
    "numReviews": 0,
    "name": "10x Frosted Dome Diffusers",
    "image": "/images/product_images/15mm_Frosted_Dome_Diffusers/IMG_9301.JPG",
    "brand": "Glow LEDs",
    "category": "Diffusers",
    "description": "Holds up to 60 coin batteries",
    "__v": 0
  },
  {
    "price": 10,
    "countInStock": 3,
    "rating": 0,
    "numReviews": 0,
    "name": "10x Large Frosted Dome Diffusers",
    "image": "/images/product_images/20mm_Frosted_Dome_Diffusers/IMG_9308.JPG",
    "brand": "Glow LEDss",
    "category": "Diffusers",
    "description": "Holds up to 60 coin batteries",
    "__v": 0
  },
  {
    "price": 5,
    "countInStock": 10,
    "rating": 0,
    "numReviews": 0,
    "name": "Diffuser Caps",
    "image": "/images/product_images/15mm_Frosted_Dome_Diffusers/IMG_9301.JPG",
    "brand": "Glow LEDs",
    "category": "Caps",
    "description": "Diffuser Caps",
    "__v": 0
  },
  {
    "price": 5,
    "countInStock": 10,
    "rating": 0,
    "numReviews": 0,
    "name": "Diffuser Adapters",
    "image": "https://via.placeholder.com/300",
    "brand": "Glow LEDs",
    "category": "Adapters",
    "description": "Diffuser Adapters",
    "__v": 0
  }
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


