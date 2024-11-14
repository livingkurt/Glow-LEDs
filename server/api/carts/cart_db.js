import { determineIDPathname } from "../api_helpers.js";
import Cart from "./cart.js";

export default {
  findAll_carts_db: async (filter, sort, limit, page) => {
    try {
      return await Cart.find(filter)
        .sort(sort)
        .populate("user")
        .populate("cartItems.display_image_object")
        .populate("cartItems.product")
        .populate("cartItems.event")
        .populate("cartItems.ticket")
        .populate("cartItems.tags")
        .populate("cartItems.selectedOptions.filament")
        .populate({
          path: "affiliate",
          populate: {
            path: "public_code", // Ensure this is the correct path to the public_code field
            model: "Promo", // Ensure the model is correctly referenced
          },
        })
        .populate({
          path: "cartItems",
          populate: [
            {
              path: "product",
              populate: [
                { path: "images" },
                { path: "tags" },
                { path: "color_object.filament" },
                { path: "microlights" },
              ],
            },
            {
              path: "currentOptions",
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
                      { path: "microlights" },
                    ],
                  },
                  { path: "filament" },
                ],
              },
            },
            { path: "tags" },
            { path: "display_image_object" },
          ],
        })
        .populate("tags")
        .populate("images")
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_carts_db: async id => {
    const query = determineIDPathname(id);
    try {
      return await Cart.findOne({ ...query, active: true, deleted: false })
        .populate("user")
        .populate("cartItems.display_image_object")
        .populate("cartItems.event")
        .populate("cartItems.ticket")
        .populate("cartItems.selectedOptions.filament")
        .populate("cartItems.tags")
        .populate({
          path: "cartItems",
          populate: [
            {
              path: "product",
              populate: [
                { path: "images" },
                { path: "tags" },
                { path: "color_object.filament" },
                { path: "microlights" },
              ],
            },
            {
              path: "currentOptions",
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
                      { path: "microlights" },
                    ],
                  },
                  { path: "filament" },
                ],
              },
            },
            { path: "tags" },
            { path: "display_image_object" },
          ],
        })
        .populate({
          path: "affiliate",
          populate: {
            path: "public_code", // Ensure this is the correct path to the public_code field
            model: "Promo", // Ensure the model is correctly referenced
          },
        })
        .populate("images")
        .populate("tags");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByUser_carts_db: async user_id => {
    try {
      return await Cart.findOne({ user: user_id, active: true, deleted: false })
        .populate("user")
        .populate("cartItems.display_image_object")
        .populate({
          path: "cartItems",
          populate: [
            {
              path: "product",
              populate: [
                { path: "images" },
                { path: "tags" },
                { path: "color_object.filament" },
                { path: "microlights" },
              ],
            },
            {
              path: "currentOptions",
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
                      { path: "microlights" },
                    ],
                  },
                  { path: "filament" },
                ],
              },
            },
            { path: "tags" },
            { path: "display_image_object" },
          ],
        })
        .populate("cartItems.event")
        .populate("cartItems.ticket")
        .populate("cartItems.selectedOptions.filament")
        .populate("cartItems.tags")
        .populate({
          path: "affiliate",
          populate: {
            path: "public_code", // Ensure this is the correct path to the public_code field
            model: "Promo", // Ensure the model is correctly referenced
          },
        })
        .populate("tags")
        .populate("images");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_carts_db: async body => {
    try {
      const newCart = new Cart(body);
      await newCart.save();
      return await Cart.findById(newCart._id)
        .populate("user")
        .populate("cartItems.display_image_object")
        .populate({
          path: "cartItems",
          populate: [
            {
              path: "product",
              populate: [
                { path: "images" },
                { path: "tags" },
                { path: "color_object.filament" },
                { path: "microlights" },
              ],
            },
            {
              path: "currentOptions",
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
                      { path: "microlights" },
                    ],
                  },
                  { path: "filament" },
                ],
              },
            },
            { path: "tags" },
            { path: "display_image_object" },
          ],
        })
        .populate("cartItems.event")
        .populate("cartItems.ticket")
        .populate("cartItems.selectedOptions.filament")
        .populate("cartItems.tags")
        .populate({
          path: "affiliate",
          populate: {
            path: "public_code", // Ensure this is the correct path to the public_code field
            model: "Promo", // Ensure the model is correctly referenced
          },
        })
        .populate("tags")
        .populate("images");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  update_carts_db: async (id, body) => {
    try {
      return await Cart.findByIdAndUpdate(id, body, { new: true })
        .populate("user")
        .populate("cartItems.display_image_object")
        .populate("cartItems.product")
        .populate("cartItems.event")
        .populate("cartItems.ticket")
        .populate("cartItems.selectedOptions.filament")
        .populate("cartItems.tags")
        .populate({
          path: "affiliate",
          populate: {
            path: "public_code", // Ensure this is the correct path to the public_code field
            model: "Promo", // Ensure the model is correctly referenced
          },
        })
        .populate("tags")
        .populate("images");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  update_user_carts_db: async (id, body) => {
    try {
      const cart = await Cart.findOne({ user: id, active: true });
      if (cart) {
        cart.cartItems = body.cartItems;
        return await cart.save();
      } else {
        return await Cart.create({ ...body, user: id });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  remove_carts_db: async id => {
    try {
      const cart = await Cart.findOne({ _id: id, deleted: false });
      if (cart) {
        return await Cart.deleteOne({ _id: id });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_carts_db: async filter => {
    try {
      return await Cart.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  aggregate_carts_db: async pipeline => {
    try {
      return await Cart.aggregate(pipeline)
        .lookup({
          from: "affiliates",
          localField: "affiliate",
          foreignField: "_id",
          as: "affiliate",
        })
        .unwind({
          path: "$affiliate",
          preserveNullAndEmptyArrays: true,
        })
        .lookup({
          from: "categories",
          localField: "tags",
          foreignField: "_id",
          as: "tags",
        })
        .lookup({
          from: "images",
          localField: "images",
          foreignField: "_id",
          as: "images",
        });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
