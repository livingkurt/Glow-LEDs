import Product from "./product";
import mongoose from "mongoose";

export default {
  findAll_products_db: async (filter, sort, limit, page) => {
    try {
      return await Product.find(filter)
        .sort(sort)
        .populate({
          path: "options",
          populate: {
            path: "values",
            populate: [
              {
                path: "product",
                populate: [
                  { path: "images" },
                  { path: "color_object.filament" },
                  { path: "filament" },
                  { path: "tags" },
                  { path: "chips" },
                  {
                    path: "options",
                    populate: {
                      path: "values",
                      populate: [
                        {
                          path: "product",
                          populate: [
                            { path: "images" },
                            { path: "color_object.filament" },
                            { path: "filament" },
                            { path: "tags" },
                            { path: "chips" },
                          ],
                        },
                        { path: "filament" }, // Added filament population for nested options
                      ],
                    },
                  },
                ],
              },
              { path: "filament" }, // Added filament population for top-level options
            ],
          },
        })
        .populate("images")
        .populate("color_images")
        .populate("secondary_color_images")
        .populate("option_images")
        .populate("secondary_images")
        .populate("chips")
        .populate("products")
        // .populate("collections")
        .populate("contributors")
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  table_products_db: async (filter, sort, limit, page) => {
    try {
      return await Product.find(filter)
        .sort(sort)
        .populate("color_products")
        .populate("secondary_color_products")
        .populate("option_products")
        .populate("secondary_products")
        .populate({
          path: "options",
          populate: {
            path: "values",
            populate: [
              {
                path: "product",
                populate: [
                  { path: "images" },
                  { path: "color_object.filament" },
                  { path: "filament" },
                  { path: "tags" },
                  { path: "chips" },
                  {
                    path: "options",
                    populate: {
                      path: "values",
                      populate: [
                        {
                          path: "product",
                          populate: [
                            { path: "images" },
                            { path: "color_object.filament" },
                            { path: "filament" },
                            { path: "tags" },
                            { path: "chips" },
                          ],
                        },
                        { path: "filament" }, // Added filament population for nested options
                      ],
                    },
                  },
                ],
              },
              { path: "filament" }, // Added filament population for top-level options
            ],
          },
        })
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAllGrid_products_db: async (filter, sort, limit) => {
    const productFields = {
      name: 1,
      pathname: 1,
      images: { $slice: 1 },
      price: 1,
      wholesale_price: 1,
      sale_price: 1,
      sale_start_date: 1,
      sale_end_date: 1,
      previous_price: 1,
      rating: 1,
      numReviews: 1,
      category: 1,
      subcategory: 1,
      product_collection: 1,
      hidden: 1,
      order: 1,
      tags: 1,
      createdAt: 1,
    };
    try {
      const query = Product.find(filter, productFields).sort(sort).populate("images").populate({
        path: "tags",
        select: "name type pathname",
      });

      if (limit > 0) {
        query.limit(limit);
      }

      return await query.exec();
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
            localField: "images", // this is your field in the product collection which corresponds to _id in Image collection
            foreignField: "_id", // this is usually _id in the related collection
            as: "images", // output alias
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
      if (id && mongoose.isValidObjectId(id)) {
        query = { _id: id };
      } else {
        query = { pathname: id };
      }
      return await Product.findOne(query)
        .populate("images")
        .populate({
          path: "options",
          populate: [
            { path: "image" },
            {
              path: "values",
              populate: [
                { path: "image" },
                { path: "filament" },
                {
                  path: "product",
                  populate: [
                    { path: "images" },
                    { path: "color_object.filament" },
                    { path: "filament" },
                    { path: "tags" },
                    { path: "chips" },
                    {
                      path: "options",
                      populate: [
                        { path: "image" },
                        {
                          path: "values",
                          populate: [
                            { path: "image" },
                            { path: "filament" },
                            {
                              path: "product",
                              populate: [
                                { path: "images" },
                                { path: "color_object.filament" },
                                { path: "filament" },
                                { path: "tags" },
                                { path: "chips" },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        })
        .populate({
          path: "features",
          populate: [
            { path: "image_grid_1.image" },
            { path: "hero_image_1" },
            { path: "image_grid_2.image" },
            { path: "hero_image_2" },
            { path: "lifestyle_images" },
          ],
        })
        .populate({
          path: "in_the_box.items.image",
        })
        .populate({
          path: "elevate_your_experience.products",
          populate: [
            { path: "images" },
            { path: "color_object.filament" },
            { path: "filament" },
            { path: "tags" },
            { path: "chips" },
          ],
        })
        .populate("tags")
        .populate("contributors")
        .populate({
          path: "reviews.user",
          select: "first_name last_name",
        })
        .populate("color_object.filament")
        .populate("chips")
        .lean()
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  create_products_db: async body => {
    try {
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
      return await Product.findOneAndUpdate(query, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_products_db: async id => {
    try {
      const product = await Product.findOne({ _id: id, deleted: false });

      if (product) {
        return await Product.updateOne({ _id: id }, { deleted: true });
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
