import Product from "./product";
import Airtable from "airtable";
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base("app9vDOYXFhhQr529");
const CurrentProducts = base("Current Products");
import mongoose from "mongoose";

export default {
  findAll_products_db: async (filter: any, sort: unknown, limit: string, page: string) => {
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
          populate: {
            path: "filament"
          }
        })
        .populate({
          path: "secondary_color_products",
          populate: {
            path: "filament"
          }
        })
        .populate({
          path: "option_products",
          populate: {
            path: "filament"
          }
        })
        .populate("filament")
        .populate({
          path: "secondary_products",
          populate: [
            {
              path: "filament"
            },
            {
              path: "color_products",
              populate: {
                path: "filament"
              }
            },
            {
              path: "secondary_color_products",
              populate: {
                path: "filament"
              }
            },
            {
              path: "option_products",
              populate: {
                path: "filament"
              }
            },
            {
              path: "secondary_color_products",
              populate: {
                path: "filament"
              }
            }
          ]
        })
        .populate("categorys")
        .populate("subcategorys")
        .populate("contributers")
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAllGrid_products_db: async (filter: any, sort: unknown, limit: string, page: string) => {
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
          populate: {
            path: "filament"
          }
        })
        .populate({
          path: "secondary_color_products",
          populate: {
            path: "filament"
          }
        })
        .populate({
          path: "option_products",
          populate: {
            path: "filament"
          }
        })
        .populate("filament")
        .populate({
          path: "secondary_products",
          populate: [
            {
              path: "filament"
            },
            {
              path: "color_products",
              populate: {
                path: "filament"
              }
            },
            {
              path: "secondary_color_products",
              populate: {
                path: "filament"
              }
            },
            {
              path: "option_products",
              populate: {
                path: "filament"
              }
            },
            {
              path: "secondary_color_products",
              populate: {
                path: "filament"
              }
            }
          ]
        })
        .populate("categorys")
        .populate("subcategorys")
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
          $match: { deleted: false, hidden: false }
        },
        {
          $group: {
            _id: "$category",
            data: {
              $push: "$$ROOT"
            }
          }
        },
        {
          $project: {
            data: {
              $slice: ["$data", -4]
            }
          }
        },
        {
          $unwind: "$data"
        },
        {
          $replaceRoot: {
            newRoot: "$data"
          }
        }
      ]).sort({ _id: 1 });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_products_db: async (id: string) => {
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
          populate: {
            path: "filament"
          }
        })
        .populate({
          path: "secondary_color_products",
          populate: {
            path: "filament"
          }
        })
        .populate({
          path: "option_products",
          populate: {
            path: "filament"
          }
        })
        .populate("filament")
        .populate({
          path: "secondary_products",
          populate: [
            {
              path: "filament"
            },
            {
              path: "color_products",
              populate: {
                path: "filament"
              }
            },
            {
              path: "secondary_color_products",
              populate: {
                path: "filament"
              }
            },
            {
              path: "option_products",
              populate: {
                path: "filament"
              }
            },
            {
              path: "secondary_color_products",
              populate: {
                path: "filament"
              }
            }
          ]
        })
        .populate("categorys")
        .populate("subcategorys")
        .populate("contributers");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  create_products_db: async (body: any) => {
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
      // CurrentProducts.create(fields, async (err: any, updated_records: any) => {
      //   if (err) {
      //
      //     return;
      //   }
      //   updated_records.forEach(function (record: any) {
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

  update_products_db: async (id: string, body: any) => {
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
      const product: any = await Product.findOne(query);
      // CurrentProducts.select({ filterByFormula: `id = "${product._id}"` }).firstPage((err: any, records: any) => {
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
      //     CurrentProducts.create(fields, async (err: any, updated_records: any) => {
      //       if (err) {
      //
      //         return;
      //       }
      //       updated_records.forEach(function (record: any) {
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
      //     CurrentProducts.update(fields, async (err: any, updated_records: any) => {
      //       if (err) {
      //
      //         return;
      //       }
      //       updated_records.forEach(function (record: any) {
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
  remove_products_db: async (id: string) => {
    try {
      const product: any = await Product.findOne({ _id: id });

      if (product) {
        // CurrentProducts.select({ filterByFormula: `id = "${product._id}"` }).firstPage((err: any, records: any) => {
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
  count_products_db: async (filter: any) => {
    try {
      return await Product.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
