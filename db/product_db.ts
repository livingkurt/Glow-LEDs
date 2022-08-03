import Product from "../models/product";
import Airtable from "airtable";
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base("app9vDOYXFhhQr529");
const CurrentProducts = base("Current Products");

export default {
  findAll_products_db: async (filter: any, sort: any, limit: any, page: any) => {
    try {
      return await Product.find(filter)
        .sort(sort)
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
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    } catch (error) {
      console.log({ findAll_products_db_error: error });
      throw new Error(error.message);
    }
  },
  aggregateAll_products_db: async () => {
    try {
      return await Product.aggregate([
        {
          $match: { deleted: false, hidden: false }
        },

        {
          $group: {
            _id: "$category",
            data: {
              $last: "$$ROOT"
            }
          }
        }
      ]).sort({ _id: 1 });
    } catch (error) {
      console.log({ findAll_products_db_error: error });
      throw new Error(error.message);
    }
  },
  findById_products_db: async (id: string) => {
    let query = {};
    console.log({ id });
    try {
      if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
        query = { _id: id };
      } else {
        query = { pathname: id };
      }
      return await Product.findOne(query)
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
      console.log({ findById_products_db_error: error });
      throw new Error(error.message);
    }
  },

  create_products_db: async (body: any) => {
    try {
      const fields = [
        {
          fields: {
            title: body.name,
            description: body.description,
            availability: "In Stock",
            condition: "New",
            price: `${body.price} USD`,
            link: `https://www.glow-leds.com/collections/all/products/${body.pathname}`,
            image_link: body.images[0],
            additional_image_link: body.images[1],
            brand: "Glow LEDs",
            inventory: body.count_in_stock,
            fb_product_category: "toys & games > electronic toys",
            google_product_category: "Toys & Games > Toys > Visual Toys",
            sale_price: `${body.sale_price && body.sale_price.toFixed(2)} USD`,
            sale_price_effective_date: "",
            product_type: body.category,
            color: body.color,
            size: body.size,
            id: body._id
          }
        }
      ];
      CurrentProducts.create(fields, async (err: any, updated_records: any) => {
        if (err) {
          console.log({ update_error: err });
          return;
        }
        updated_records.forEach(function (record: any) {
          console.log(record.get("title"));
        });
      });
      return await Product.create(body);
    } catch (error) {
      console.log({ create_products_db_error: error });
      throw new Error(error.message);
    }
  },

  update_products_db: async (id: string, body: any) => {
    let query = {};
    if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
      query = { _id: id };
    } else {
      query = { pathname: id };
    }
    try {
      const product: any = await Product.findOne(query);
      CurrentProducts.select({ filterByFormula: `id = "${product._id}"` }).firstPage((err: any, records: any) => {
        if (err) {
          console.log(err);
          return;
        }
        const fields = [
          {
            id: records[0].id,
            fields: {
              title: body.name,
              description: body.description,
              price: `${body.price} USD`,
              link: `https://www.glow-leds.com/collections/all/products/${body.pathname}`,
              image_link: body.images[0],
              additional_image_link: body.images[1],
              category: body.category,
              id: body._id
            }
          }
        ];
        try {
          CurrentProducts.update(fields, async (err: any, updated_records: any) => {
            if (err) {
              console.log({ update_error: err });
              return;
            }
            updated_records.forEach(function (record: any) {
              console.log(record.get("title"));
            });
          });
        } catch (error) {
          console.log({ error });
        }
      });
      if (product) {
        return await Product.updateOne({ _id: id }, body);
      }
    } catch (error) {
      console.log({ update_products_db_error: error });
      throw new Error(error.message);
    }
  },
  remove_products_db: async (id: string) => {
    try {
      const product: any = await Product.findOne({ _id: id });
      console.log({ remove_products_db: product });
      if (product) {
        CurrentProducts.select({ filterByFormula: `id = "${product._id}"` }).firstPage((err: any, records: any) => {
          if (err) {
            console.log(err);
            return;
          }
          if (records.length > 0) {
            try {
              CurrentProducts.destroy([records[0].id], (err, deletedRecords) => {
                if (err) {
                  console.error(err);
                  return;
                }
              });
            } catch (error) {
              console.log({ error });
            }
          }
        });
        return await Product.updateOne({ _id: id }, { deleted: true });
        // return await Product.deleteOne({ _id: id });
      }
    } catch (error) {
      console.log({ remove_products_db_error: error });
      throw new Error(error.message);
    }
  },
  count_products_db: async (filter: any) => {
    try {
      return await Product.countDocuments(filter);
    } catch (error) {
      console.log({ remove_products_db_error: error });
      throw new Error(error.message);
    }
  }
};
