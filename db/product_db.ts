import Product from "../models/product";
import mongoose from "mongoose";

export default {
  findAll_products_db: async (
    filter: any,
    sort: any,
    limit: any,
    page: any
  ) => {
    console.log({
      filter,
      sort,
      limit,
      page,
    });
    try {
      return await Product.find(filter)
        .sort(sort)
        .populate("chips")
        .populate("products")
        .populate({
          path: "color_products",
          populate: {
            path: "filament",
          },
        })
        .populate({
          path: "secondary_color_products",
          populate: {
            path: "filament",
          },
        })
        .populate({
          path: "option_products",
          populate: {
            path: "filament",
          },
        })
        .populate("filament")
        .populate({
          path: "secondary_products",
          populate: [
            {
              path: "filament",
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
          $match: { deleted: false, hidden: false },
        },

        {
          $group: {
            _id: "$category",
            data: {
              $last: "$$ROOT",
            },
          },
        },
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
            path: "filament",
          },
        })
        .populate({
          path: "secondary_color_products",
          populate: {
            path: "filament",
          },
        })
        .populate({
          path: "option_products",
          populate: {
            path: "filament",
          },
        })
        .populate("filament")
        .populate({
          path: "secondary_products",
          populate: [
            {
              path: "filament",
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
        .populate("contributers");
    } catch (error) {
      console.log({ findById_products_db_error: error });
      throw new Error(error.message);
    }
  },

  create_products_db: async (body: any) => {
    try {
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
        // return await Product.updateOne({ _id: id }, { deleted: true });
        return await Product.deleteOne({ _id: id });
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
  },
};
