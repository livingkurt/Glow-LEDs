// import express from 'express';
// import Product from '../models/productModel';
// import { isAuth, isAdmin } from '../util';

const express = require('express');
const Product = require('../models/product');
const { isAuth, isAdmin } = require('../util');
const fs = require("fs")
const path = require('path');

const router = express.Router();

router.get("/", async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const searchKeyword = req.query.searchKeyword ? {
    name: {
      $regex: req.query.searchKeyword,
      $options: 'i'
    }
  } : {};
  const sortOrder = req.query.sortOrder ?
    (req.query.sortOrder === 'lowest' ? { price: 1 } : { price: -1 })
    :
    { _id: -1 };
  const products = await Product.find({ ...category, ...searchKeyword }).sort(sortOrder);
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
});



router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.display_image = req.body.display_image;
    product.video = req.body.video;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.facts = req.body.facts;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Product.' });

});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: "Product Deleted" });
  } else {
    res.send("Error in Deletion.");
  }
});


router.post("/", isAuth, isAdmin, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    display_image: req.body.display_image,
    video: req.body.video,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    facts: req.body.facts,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res.status(201).send({ message: 'New Product Created', data: newProduct });
  }
  return res.status(500).send({ message: ' Error in Creating Product.' });
})

// router.post("/images", async (req, res) => {
//   console.log("Hello")
//   // const product = await Product.findOne({ _id: req.params.id });
//   // if (product) {
//   //   res.send(product);
//   // } else {
//   //   res.status(404).send({ message: "Product Not Found." });
//   // }
// });

router.post('/images', async (req, res) => {
  // console.log(req.body)
  try {
    // let relative_directory = `./client/public` + Object.keys(req.body).join('')
    let relative_directory = path.join(".", "/client/public", Object.keys(req.body).join(''))
    // console.log("relative_directory_2 = " + relative_directory_2)
    // let full_directory = __dirname + `/client/public` + Object.keys(req.body).join('')
    let home_directory = path.join(__dirname, '..')
    // let full_directory = home_directory + `/client/public` + Object.keys(req.body).join('') 
    let full_directory = path.join(home_directory, `/client/public`, Object.keys(req.body).join(''))

    let image_directory = path.join(home_directory, `/client/public`, Object.keys(req.body).join(''))


    var relative_directory_array = relative_directory.split('/');
    relative_directory_array.pop()
    relative_directory = relative_directory_array.join('/')

    var full_directory_array = full_directory.split('/');
    full_directory_array.pop()
    full_directory = full_directory_array.join('/')
    console.log("home_directory = " + home_directory)
    console.log("relative_directory = " + relative_directory)
    console.log("full_directory = " + full_directory)
    if (full_directory === './client/public') {


    }
    else {
      fs.readdir(full_directory, function (err, files) {
        if (err) {
          return console.log('Unable to scan directory: ' + err);
        }
        let image_path = ''
        let images = []
        // console.log(files)
        //listing all files using forEach
        files.forEach(function (file) {
          // Do whatever you want to do with the file

          image_path = "./" + relative_directory + '/' + file
          var array = image_path.split('/');
          // console.log(image_path)
          var lastsegment = array[array.length - 1];
          if (lastsegment === ".DS_Store") {
          }
          else {
            images = [...images, image_path.substr(15)]
            // console.log("images = " + images)

          }

        });
        res.send(images)
      });
    }


  }

  catch (err) {
    console.log(err);
  }
})

// router.post('/images', async (req, res) => {
//   console.log(req.body)
//   try {
//     // console.log(__dirname)
//     // console.log(process.cwd())
//     // let home_directory = path.join(__dirname, '..')
//     // console.log({ home_directory })
//     // let image_directory = path.join(home_directory, Object.keys(req.body).join(''))
//     let image_directory = Object.keys(req.body).join('')
//     // console.log(image_directory)
//     // console.log(directory)
//     var directory_array = image_directory.split('/');
//     directory_array.pop()
//     directory = directory_array.join('/')
//     console.log(directory)
//     // const directoryPath = path.join('./client/public/', directory);
//     // console.log(directoryPath)
//     if (directory === '/Users/kurtlavacque/Documents/Coding/Web Development Projects') {

//     }
//     else {
//       fs.readdir(directory, (err, files) => {
//         if (err) {
//           return console.log('Unable to scan directory: ' + err);
//         }
//         let image_path = ''
//         let images = []
//         console.log(files)
//         //listing all files using forEach
//         files.forEach(function (file) {
//           // Do whatever you want to do with the file

//           image_path = directory + '/' + file
//           console.log(image_path)
//           // var array = image_path.split('/');
//           // console.log(image_path)
//           // var lastsegment = array[array.length - 1];
//           if (file === ".DS_Store") {
//           }
//           else {
//             // images = [...images, image_path.substr(15)]
//             images = [...images, "./" + image_path]
//             // console.log(images)
//           }

//         });
//         res.send(images)
//       });
//     }


//   }

//   catch (err) {
//     console.log(err);
//   }
// })


// export default router;

module.exports = router;