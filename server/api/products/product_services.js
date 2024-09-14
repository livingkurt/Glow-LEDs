import { Product, product_db } from "../products";
import {
  diminish_sampler_stock,
  diminish_batteries_stock,
  diminish_refresh_pack_stock,
  diminish_single_glove_stock,
  normalizeProductFilters,
  normalizeProductSearch,
  transformProducts,
  generateProductOptionsProducts,
  handleTagFiltering,
  handleCategoryFiltering,
  getBestSellers,
  getOurPicks,
  sortProducts,
  handleChipFiltering,
} from "./product_helpers";
import { categories, determine_filter, snake_case, subcategories } from "../../utils/util";
import { getFilteredData } from "../api_helpers";
import { Ticket } from "../tickets";

const fs = require("fs");
const Papa = require("papaparse");

// const sharp = require("sharp");

export default {
  findAll_products_s: async query => {
    try {
      const page = query.page ? query.page : "1";
      const limit = query.limit ? query.limit : "0";

      let search = {};
      if (categories.includes(snake_case(query.search))) {
        search = query.search
          ? {
              category: {
                $regex: snake_case(query.search),
                $options: "i",
              },
            }
          : {};
      } else if (subcategories.includes(snake_case(query.search))) {
        search = query.search
          ? {
              subcategory: {
                $regex: snake_case(query.search),
                $options: "i",
              },
            }
          : {};
      } else {
        search = query.search
          ? {
              name: {
                $regex: query.search.toLowerCase(),
                $options: "i",
              },
            }
          : {};
      }

      const filter = determine_filter(query, search);

      const sort_query = query.sort && query.sort.toLowerCase();
      let sort = { order: 1, _id: -1 };
      if (sort_query === "lowest") {
        sort = { price: 1 };
      } else if (sort_query === "highest") {
        sort = { price: -1 };
      } else if (sort_query === "category") {
        sort = { category: 1 };
      } else if (sort_query === "hidden") {
        sort = { hidden: -1 };
      } else if (sort_query === "newest") {
        sort = { _id: -1 };
      }
      const products = await product_db.findAll_products_db(filter, sort, limit, page);
      return products;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  table_products_s: async query => {
    try {
      const sort_options = ["name", "hidden", "category", "order", "price"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        search_name: "name",
        normalizeFilters: normalizeProductFilters,
        normalizeSearch: normalizeProductSearch,
      });

      const products = await product_db.table_products_db(filter, sort, limit, page);
      const count = await product_db.count_products_db(filter);
      return {
        data: products,
        total_count: count,
        currentPage: parseInt(page),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_filters_products_s: async query => {
    try {
      const availableFilters = {
        category: [
          "gloves",
          "batteries",
          "decals",
          "diffuser_caps",
          "diffusers",
          "exo_diffusers",
          "glowstringz",
          "glowskinz",
        ],
        subcategory: [
          "singles",
          "refresh",
          "battery_storage",
          "batteries",
          "stickers",
          "clips",
          "universal",
          "batman",
          "outline",
          "opyn",
          "clozd",
          "patterns",
          "abstract",
          "shapes",
          "diffuser_adapters",
          "geometric",
          "starter_kit",
          "sacred_geometry",
          "imperfect",
          "domes",
          "closed_hole",
          "fisheye",
          "open_hole",
          "polygons",
          "cylinders",
          "polyhedrons",
          "gift_card",
          "nova",
          "classics",
          "novaskinz",
          "alt_novaskinz",
          "symbols",
          "emoji",
          "custom",
          "colors",
          "sizes",
          "secondary_colors",
        ],
        hidden: ["only_hidden"],
        options: ["only_options"],
      };
      const booleanFilters = {
        hidden: {
          label: "Show Hidden",
        },
        options: {
          label: "Show Options",
        },
      };
      return { availableFilters, booleanFilters };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAllGrid_products_s: async query => {
    try {
      let filter = { deleted: false, hidden: false };
      let bestSellers, ourPicks;
      let limit = 0;

      const tagFilter = await handleTagFiltering(query.tags);
      filter = { ...filter, ...tagFilter };

      if (query.chip && query.chip !== null) {
        const chipFilter = await handleChipFiltering(query.chip);
        filter = { ...filter, ...chipFilter };
      }

      if (query.category) {
        const categoryFilter = await handleCategoryFiltering(query.category);
        if (categoryFilter === null) return []; // For "our_picks" when none are found
        filter = { ...filter, ...categoryFilter };
        if (query.category === "best_sellers") bestSellers = await getBestSellers();
        if (query.category === "our_picks") ourPicks = await getOurPicks();
      }

      // Add search functionality
      if (query.search) {
        const searchRegex = new RegExp(query.search, "i");
        filter.$or = [{ name: searchRegex }, { "tags.pathname": searchRegex }];
      }

      let sortOption = { order: 1 };
      if (query.sort) {
        switch (query.sort) {
          case "-price":
            sortOption = { price: -1 };
            break;
          case "price":
            sortOption = { price: 1 };
            break;
          case "-createdAt":
            sortOption = { createdAt: -1 };
            break;
          case "createdAt":
            sortOption = { createdAt: 1 };
            break;
        }
      }

      if (query.category === "new_releases") {
        sortOption = { createdAt: -1 }; // Sort by createdAt in descending order
        limit = 5;
      }

      let products = await product_db.findAllGrid_products_db(filter, sortOption, limit);

      if (query.category === "best_sellers" || query.category === "our_picks") {
        products = sortProducts(products, query.category, bestSellers, ourPicks);
      }

      return products;
    } catch (error) {
      console.error("Error in findAllGrid_products_s:", error);
      throw new Error(error.message || "An error occurred while fetching products");
    }
  },

  findById_products_s: async params => {
    try {
      return await product_db.findById_products_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  check_stock_products_s: async body => {
    const { cartItems } = body;
    const outOfStockItems = []; // Store details of out-of-stock items
    try {
      for (const item of cartItems) {
        if (item.itemType === "product") {
          const product = await Product.findOne({ _id: item.product, deleted: false }).populate("option_products");
          if (!product) {
            // If the main product doesn't exist
            outOfStockItems.push({ id: item.product, name: "Unknown Product", itemType: "product" });
            continue;
          }

          let isOutOfStock = product.finite_stock && product.count_in_stock < item.quantity;
          let optionProductOutOfStock = false;
          let optionProductId = null; // Placeholder for the option product ID

          // Check if the product is an option product and has other option products related
          if (!isOutOfStock && product.option_products && product.option_products.length > 0) {
            // Assuming `size` in cartItems corresponds to a property in option products to find the specific option
            const optionProduct = product.option_products.find(op => op.size === item.size && op.deleted === false);
            if (optionProduct && optionProduct.finite_stock && optionProduct.count_in_stock < item.quantity) {
              isOutOfStock = true;
              optionProductOutOfStock = true;
              optionProductId = optionProduct._id; // Capture the option product's unique ID
            }
          }

          if (isOutOfStock) {
            // Include product name along with the ID, and now also include the option product ID if applicable
            outOfStockItems.push({
              id: item.product,
              optionId: optionProductId, // Include this in the response
              name: product.name,
              option: optionProductOutOfStock ? `Size: ${item.size}` : "",
              itemType: "product",
            });
          }
        } else if (item.itemType === "ticket") {
          const ticket = await Ticket.findOne({ _id: item.ticket, deleted: false });
          if (!ticket) {
            outOfStockItems.push({ id: item.ticket, name: "Unknown Ticket", itemType: "ticket" });
            continue;
          }
          // Add ticket availability check logic here
          // For example, if tickets have a limited quantity:
          if (ticket.count_in_stock < item.quantity) {
            outOfStockItems.push({
              id: item.ticket,
              name: ticket.title,
              itemType: "ticket",
              count_in_stock: ticket.count_in_stock,
            });
          }
        }
      }
      return outOfStockItems; // Return the details of out of stock items
    } catch (error) {
      throw error;
    }
  },

  create_products_s: async body => {
    try {
      return await product_db.create_products_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  update_products_s: async (params, body) => {
    try {
      return await product_db.update_products_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  generate_product_options_products_s: async body => {
    try {
      return generateProductOptionsProducts(body);
    } catch (error) {
      console.error("Error in generate_product_options_products_s:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_option_products_s: async (params, body) => {
    const { id, option_product_id } = params;
    const { newOptionProductData } = body;
    try {
      const product = await product_db.findById_products_db(id);
      let optionProduct;
      if (option_product_id) {
        optionProduct = await product_db.findById_products_db(option_product_id);
        optionProduct = {
          ...optionProduct,
          _id: null,
          name: `${optionProduct.name} Copy`,
          pathname: `${optionProduct.pathname}_copy`,
        };
      } else if (newOptionProductData) {
        optionProduct = newOptionProductData;
      }
      const newOptionProduct = await product_db.create_products_db(optionProduct);
      if (product && optionProduct) {
        const optionIndex = product.options.findIndex(option =>
          option.values.some(value => value.product.toString() === option_product_id)
        );
        if (optionIndex !== -1) {
          product.options[optionIndex].values.push(newOptionProduct);
          return await product_db.update_products_db(id, product);
        } else {
          throw new Error("Option not found for the option product.");
        }
      } else {
        throw new Error("Error in Creating Option Product.");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  reorder_products_s: async body => {
    try {
      const { reorderedItems } = body;

      // Update each product's order using the reorderedItems array
      const updatePromises = reorderedItems.map(async item => {
        await product_db.update_products_db(item._id, { ...item, order: item.order });
      });

      // Wait for all update operations to complete
      await Promise.all(updatePromises);

      // Send success response
      return "Productss reordered successfully.";
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_products_s: async params => {
    try {
      return await product_db.remove_products_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  get_best_sellers_products_s: async body => {
    try {
      const occurences = body.occurences;

      const names = occurences.map(item => item.name);

      const sort = {};
      const filter = { name: { $in: names }, deleted: false, hidden: false };
      const limit = "0";
      const page = "1";
      const products = await product_db.findAllGrid_products_db(filter, sort, limit, page);
      const compareFn = (a, b) => {
        const aIndex = occurences.findIndex(x => x.name === a.name);
        const bIndex = occurences.findIndex(x => x.name === b.name);
        return aIndex - bIndex;
      };
      const sortedProducts = products.sort(compareFn);
      return sortedProducts;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_our_picks_products_s: async (params, body) => {
    try {
      const names = [
        "Refresh Pack V2 (6 Pairs Supreme Gloves V2 + 120 Batteries)",
        "Supreme Gloves V2 Sizing Sampler Pack",
        "Supreme Gloves V2",
        "Bulk CR1225 Batteries",
        "Bulk CR1616 Batteries",
        "Bulk CR1620 Batteries",
        "Universal Battery Dispenser",
        "Glowstringz V2",
        "Platonic Solids EXO Diffusers",
        "Diffuser Caps + Adapters Starter Kit V4",
        "Kaleidoscope Diffuser Caps V4",
        "Dome Diffusers",
        "Mini Dome Diffusers",
        "Mega Dome Diffusers",
        "Cube Diffusers",
        "Visor Diffusers",
        "Coinskinz V2",
        "Nanoskinz",
        "Hybridskinz (Coin/Coffin Chips)",
        "Alt Novaskinz w Nano Sleds",
        "Batman Decals",
        "X Decals",
        "CLOZD Omniskinz",
      ];

      const sort = { _id: -1 };
      const filter = { name: { $in: names }, deleted: false, hidden: false };
      const limit = "0";
      const page = "1";
      return await product_db.findAllGrid_products_db(filter, sort, limit, page);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_new_releases_products_s: async (params, body) => {
    try {
      return await product_db.aggregateAll_products_db();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_stock_products_s: async (params, body) => {
    const { cartItems } = body;
    try {
      for (const item of cartItems) {
        if (item.itemType === "product") {
          const product = await Product.findOne({ _id: item.product });
          if (product?.finite_stock) {
            if (product.subcategory === "singles") {
              await diminish_single_glove_stock(product, item);
            } else if (product.subcategory === "sampler") {
              await diminish_sampler_stock(product, item);
            } else if (product.subcategory === "refresh") {
              await diminish_refresh_pack_stock(product, item);
            } else if (product.subcategory === "coin") {
              await diminish_batteries_stock(product, item);
            }
          }
        } else if (item.itemType === "ticket") {
          const ticket = await Ticket.findOne({ _id: item.ticket });
          if (ticket?.finite_stock) {
            const newStockCount = Math.max(0, ticket.count_in_stock - item.quantity);
            const newMaxDisplayQuantity = Math.min(ticket.max_display_quantity, newStockCount);
            const newMaxQuantity = Math.min(ticket.max_quantity || Infinity, newStockCount);

            await ticket.updateOne({
              count_in_stock: newStockCount,
              max_display_quantity: newMaxDisplayQuantity,
              max_quantity: newMaxQuantity,
            });
          }
        }
      }
      return "Success";
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_product_order_products_s: async (params, body) => {
    const { state } = body;
    try {
      return state.entities.columnOrder.map(columnId => {
        const column = state.entities.columns[columnId];
        const products = [];
        state.entities.products.forEach(function (product) {
          products[column.product_ids.indexOf(product._id)] = product;
        });
        products.forEach(async (item, index) => {
          return await product_db.update_products_db(item._id, {
            ...item,
            order: index + 1,
          });
        });
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  add_product_options_products_s: async (params, body) => {
    const { id, ids, type } = body;
    try {
      // const product = await product_db.findById_products_db(id);
      const Kaleidoscope = await product_db.findById_products_db("6198087eac9130002b155ab0");
      //
      //   ...product,
      //   [type]: ids.split(",")
      // });

      // return await product_db.update_products_db(id, {
      //   ...product,
      //   [type]: Kaleidoscope[type]
      // });
      return Kaleidoscope[type];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  save_item_group_id_products_s: async (params, body) => {
    try {
      const option = body.option;
      const item_group = body.item_group;
      const product = await product_db.findById_products_db(option._id);

      if (product && option._id && item_group.price) {
        return await product_db.update_products_db(option._id, {
          ...body,
          price: item_group.price,
        });
      } else {
        throw new Error("Error in Updating Product.");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  reviews_products_s: async (params, body, user) => {
    try {
      // const product = await Product.findOne({ pathname: params.pathname, deleted: false });
      const product = await product_db.findById_products_db(params.pathname);
      if (product) {
        product.reviews = [
          ...product.reviews,
          {
            user: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            rating: Number(body.review.rating),
            comment: body.review.comment,
          },
        ];

        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;

        const updatedProduct = await product.save();
        if (updatedProduct) {
          return updatedProduct.reviews[updatedProduct.reviews.length - 1];
        }
      } else {
        throw new Error("Product Not Found");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  image_upload_products_s: async req => {
    // or you can use
    const formData = new FormData(req);
    // const { images, album_title } = body;
    // try {
    //   const options = {
    //     auth_cookie: config.IMGBOX_AUTH_COOKIE,
    //     album_title: album_title,
    //     content_type: "safe",
    //     thumbnail_size: "800r",
    //     comments_enabled: false,
    //     logger: true
    //   };

    //   const send = await imgbox(images, options);
    // } catch (error) {
    //   if (error instanceof Error) {
    //     throw new Error(error.message);
    //   }
    // }
    return "Success";
  },
  // compress_images_products_s: async (body) => {
  //   try {
  //     //
  //     const { images } = body;

  //     sharp(images[0].data_url)
  //       .jpeg({ progressive: true, force: false })
  //       .toFile(
  //         __dirname + "/Desktop/" + images[0].file.name + "-optimized.jpg"
  //       );

  //     return "Success";
  //   } catch (error) {
  //
  // //     if (error instanceof Error) {
  //             throw new Error(error.message);
  //           }
  //   }
  // },
  remove_multiple_products_s: async body => {
    try {
      return await product_db.remove_multiple_products_db(body.ids);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  current_stock_products_s: async () => {
    try {
      return await product_db.current_stock_products_db();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  distinct_products_s: async params => {
    const { attribute } = params;
    try {
      return await product_db.distinct_products_db(attribute);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  facebook_catelog_products_s: async params => {
    try {
      const products = await Product.find({ hidden: false, deleted: false, option: false })
        .sort({ order: 1 })
        .populate("images")
        .populate("color_images")
        .populate("secondary_color_images")
        .populate("option_images")
        .populate("secondary_images")
        .populate("chips")
        .populate("products")
        .populate({
          path: "color_products",
          populate: [
            {
              path: "filament",
            },
            {
              path: "images",
            },
            {
              path: "categorys",
            },
            {
              path: "subcategorys",
            },
            // {
            //   path: "collections",
            // },
          ],
        })
        .populate({
          path: "secondary_color_products",
          populate: [
            {
              path: "filament",
            },
            {
              path: "images",
            },
            {
              path: "categorys",
            },
            {
              path: "subcategorys",
            },
            // {
            //   path: "collections",
            // },
          ],
        })
        .populate({
          path: "option_products",
          populate: [
            {
              path: "filament",
            },
            {
              path: "images",
            },
            {
              path: "categorys",
            },
            {
              path: "subcategorys",
            },
            // {
            //   path: "collections",
            // },
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
              path: "images",
            },
            {
              path: "categorys",
            },
            {
              path: "subcategorys",
            },
            // {
            //   path: "collections",
            // },

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
        // .populate("collections")
        .populate("contributors");

      const transformedProducts = transformProducts(products);

      const csv = Papa.unparse(transformedProducts);

      const csvFileName = "./client/public/facebook_product_catalog.csv";
      fs.writeFile(csvFileName, csv, err => {
        if (err) throw err;
        console.log("CSV file has been saved.");
      });
      return transformedProducts;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
