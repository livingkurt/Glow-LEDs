import Product from "./product";
import Airtable from "airtable";
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base("app9vDOYXFhhQr529");
const CurrentProducts = base("Current Products");
import mongoose from "mongoose";

export default {
  findAll_products_db: async (filter, sort, limit, page) => {
    try {
      return await Product.find(filter)
        .sort(sort)
        .populate("color_products")
        .populate("secondary_color_products")
        .populate("option_products")
        .populate("secondary_products")
        .populate("categorys")
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAllGrid_products_db: async (filter, sort, limit, page) => {
    try {
      return await Product.find(filter)
        .sort(sort)
        .populate("images_object")
        .populate("color_images_object")
        .populate("secondary_color_images_object")
        .populate("option_images_object")
        .populate("secondary_images_object")
        .populate("chips")
        .populate("products")
        .populate({
          path: "color_products",
          populate: [
            {
              path: "filament",
            },
            {
              path: "images_object",
            },
            {
              path: "categorys",
            },
            {
              path: "subcategorys",
            },
            {
              path: "collections",
            },
          ],
        })
        .populate({
          path: "secondary_color_products",
          populate: [
            {
              path: "filament",
            },
            {
              path: "images_object",
            },
            {
              path: "categorys",
            },
            {
              path: "subcategorys",
            },
            {
              path: "collections",
            },
          ],
        })
        .populate({
          path: "option_products",
          populate: [
            {
              path: "filament",
            },
            {
              path: "images_object",
            },
            {
              path: "categorys",
            },
            {
              path: "subcategorys",
            },
            {
              path: "collections",
            },
          ],
        })
        .populate("filament")
        .populate({
          path: "secondary_products",
          populate: [
            {
              path: "filament",
            },
            {
              path: "images_object",
            },
            {
              path: "categorys",
            },
            {
              path: "subcategorys",
            },
            {
              path: "collections",
            },

            {
              path: "color_products",
              populate: {
                path: "filament",
              },
            },
            {
              path: "secondary_color_products",
              populate: {
                path: "filament",
              },
            },
            {
              path: "option_products",
              populate: {
                path: "filament",
              },
            },
            {
              path: "secondary_color_products",
              populate: {
                path: "filament",
              },
            },
          ],
        })
        .populate("categorys")
        .populate("subcategorys")
        .populate("collections")
        .populate("contributers")
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  aggregateAll_products_db: async () => {
    try {
      const response = await Product.aggregate([
        {
          $match: { deleted: false, hidden: false },
        },
        // Perform a $lookup (join) here
        {
          $lookup: {
            from: "images", // replace with your collection name where Image data is stored
            localField: "images_object", // this is your field in the product collection which corresponds to _id in Image collection
            foreignField: "_id", // this is usually _id in the related collection
            as: "images_object", // output alias
          },
        },
        {
          $group: {
            _id: "$category",
            data: {
              $push: "$$ROOT",
            },
          },
        },
        {
          $project: {
            data: {
              $slice: ["$data", -4],
            },
          },
        },
        {
          $unwind: "$data",
        },
        {
          $replaceRoot: {
            newRoot: "$data",
          },
        },
      ]).sort({ _id: 1 });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  findById_products_db: async id => {
    let query = {};

    try {
      if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
        query = { _id: id };
      } else {
        query = { pathname: id };
      }
      return await Product.findOne(query)
        .populate("images_object")
        .populate("color_images_object")
        .populate("secondary_color_images_object")
        .populate("option_images_object")
        .populate("secondary_images_object")
        .populate("chips")
        .populate("products")
        .populate({
          path: "color_products",
          populate: [
            {
              path: "filament",
            },
            {
              path: "images_object",
            },
            {
              path: "categorys",
            },
            {
              path: "subcategorys",
            },
            {
              path: "collections",
            },
          ],
        })
        .populate({
          path: "secondary_color_products",
          populate: [
            {
              path: "filament",
            },
            {
              path: "images_object",
            },
            {
              path: "categorys",
            },
            {
              path: "subcategorys",
            },
            {
              path: "collections",
            },
          ],
        })
        .populate({
          path: "option_products",
          populate: [
            {
              path: "filament",
            },
            {
              path: "images_object",
            },
            {
              path: "categorys",
            },
            {
              path: "subcategorys",
            },
            {
              path: "collections",
            },
          ],
        })
        .populate("filament")
        .populate({
          path: "secondary_products",
          populate: [
            {
              path: "filament",
            },
            {
              path: "images_object",
            },
            {
              path: "categorys",
            },
            {
              path: "subcategorys",
            },
            {
              path: "collections",
            },

            {
              path: "color_products",
              populate: [
                {
                  path: "filament",
                },
                {
                  path: "images_object",
                },
              ],
            },
            {
              path: "secondary_color_products",
              populate: [
                {
                  path: "filament",
                },
                {
                  path: "images_object",
                },
              ],
            },
            {
              path: "option_products",
              populate: [
                {
                  path: "filament",
                },
                {
                  path: "images_object",
                },
              ],
            },
            {
              path: "secondary_color_products",
              populate: [
                {
                  path: "filament",
                },
                {
                  path: "images_object",
                },
              ],
            },
          ],
        })
        .populate("categorys")
        .populate("subcategorys")
        .populate("collections")
        .populate("contributers");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  create_products_db: async body => {
    try {
      // const fields = [
      //   {
      //     fields: {
      //       title: body.name,
      //       description: body.description,
      //       availability: "In Stock",
      //       condition: "New",
      //       price: `${body.price} USD`,
      //       link: `https://www.glow-leds.com/collections/all/products/${body.pathname}`,
      //       image_link: body.images[0],
      //       additional_image_link: body.images[1],
      //       brand: "Glow LEDs",
      //       inventory: body.count_in_stock,
      //       fb_product_category: "toys & games > electronic toys",
      //       google_product_category: "Toys & Games > Toys > Visual Toys",
      //       sale_price: `${body.sale_price && body.sale_price.toFixed(2)} USD`,
      //       sale_price_effective_date: "",
      //       product_type: body.category,
      //       color: body.color,
      //       size: body.size,
      //       id: body._id
      //     }
      //   }
      // ];
      // CurrentProducts.create(fields, async (err, updated_records) => {
      //   if (err) {
      //
      //     return;
      //   }
      //   updated_records.forEach(function (record) {
      //
      //   });
      // });
      return await Product.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  update_products_db: async (id, body) => {
    let query = {};
    try {
      if (mongoose.isValidObjectId(id)) {
        query = { _id: id };
      } else {
        query = { pathname: id };
      }
      // if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
      //   query = { _id: id };
      // } else {
      //   query = { pathname: id };
      // }
      const product = await Product.findOne(query);
      // CurrentProducts.select({ filterByFormula: `id = "${product._id}"` }).firstPage((err, records) => {
      //   if (err) {
      //
      //     const fields = [
      //       {
      //         fields: {
      //           title: body.name,
      //           description: body.description,
      //           price: `${body.price} USD`,
      //           link: `https://www.glow-leds.com/collections/all/products/${body.pathname}`,
      //           image_link: body.images[0],
      //           additional_image_link: body.images[1],
      //           category: body.category,
      //           id: body._id
      //         }
      //       }
      //     ];
      //     CurrentProducts.create(fields, async (err, updated_records) => {
      //       if (err) {
      //
      //         return;
      //       }
      //       updated_records.forEach(function (record) {
      //
      //       });
      //     });
      //     return;
      //   }
      //   const fields = [
      //     {
      //       id: records[0].id,
      //       fields: {
      //         title: body.name,
      //         description: body.description,
      //         price: `${body.price} USD`,
      //         link: `https://www.glow-leds.com/collections/all/products/${body.pathname}`,
      //         image_link: body.images[0],
      //         additional_image_link: body.images[1],
      //         category: body.category,
      //         id: body._id
      //       }
      //     }
      //   ];
      //   try {
      //     CurrentProducts.update(fields, async (err, updated_records) => {
      //       if (err) {
      //
      //         return;
      //       }
      //       updated_records.forEach(function (record) {
      //
      //       });
      //     });
      //   } catch (error) {
      //
      //   }
      // });
      if (product) {
        const updated = await Product.updateOne(query, body);
        return updated;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_products_db: async id => {
    try {
      const product = await Product.findOne({ _id: id });

      if (product) {
        // CurrentProducts.select({ filterByFormula: `id = "${product._id}"` }).firstPage((err, records) => {
        //   if (err) {
        //
        //     return;
        //   }
        //   if (records.length > 0) {
        //     try {
        //       CurrentProducts.destroy([records[0].id], (err, deletedRecords) => {
        //         if (err) {
        //           console.error(err);
        //           return;
        //         }
        //       });
        //     } catch (error) {
        //
        //     }
        //   }
        // });
        return await Product.updateOne({ _id: id }, { deleted: true });
        // return await Product.deleteOne({ _id: id });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_multiple_products_db: async ids => {
    try {
      return await Product.updateMany({ _id: { $in: ids } }, { deleted: true });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_products_db: async filter => {
    try {
      return await Product.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  current_stock_products_db: async () => {
    try {
      const currentStock = await Product.find(
        {
          finite_stock: true,
          deleted: false,
        },
        "name count_in_stock category subcategory product_collection option_products"
      ).exec();

      return currentStock;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  distinct_products_db: async attribute => {
    try {
      if (attribute === "pathname") {
        return await Product.find({ deleted: false, option: false, hidden: false }).distinct(attribute);
      } else {
        return await Product.distinct(attribute);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
