import Product from "./product.js";
import product_db from "./product_db.js";

import {
  diminish_sampler_stock,
  diminish_batteries_stock,
  diminish_refresh_pack_stock,
  diminish_single_glove_stock,
  diminish_helios_glove_set_stock,
  normalizeProductFilters,
  normalizeProductSearch,
  generateProductOptionsProducts,
  handleTagFiltering,
  handleCategoryFiltering,
  getBestSellers,
  getOurPicks,
  sortProducts,
  handleMicrolightFiltering,
  applyProductSales,
  clearProductSales,
  updateProductStock,
} from "./product_helpers.js";
import { categories, determine_filter, snake_case, subcategories } from "../../utils/util.js";
import { getFilteredData } from "../api_helpers.js";
import Ticket from "../tickets/ticket.js";

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
        currentPage: parseInt(page, 10),
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
      };
      const booleanFilters = {
        hidden: {
          label: "Show Hidden",
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
      let bestSellers;
      let ourPicks;
      let limit = 0;

      const tagFilter = await handleTagFiltering(query.tags);
      filter = { ...filter, ...tagFilter };

      if (query.microlight && query.microlight !== null) {
        const microlightFilter = await handleMicrolightFiltering(query.microlight);
        filter = { ...filter, ...microlightFilter };
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
            sortOption = { release_date: -1 };
            break;
          case "createdAt":
            sortOption = { release_date: 1 };
            break;
          default:
            sortOption = { order: 1 };
        }
      }

      if (query.category === "new_releases") {
        sortOption = { release_date: -1 }; // Sort by release_date in descending order
        limit = 20;
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
  page_products_s: async params => {
    try {
      return await product_db.page_products_db(params.pathname);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  check_stock_products_s: async body => {
    const { cartItems } = body;
    const outOfStockItems = [];

    await Promise.all(
      cartItems.map(async item => {
        if (item.itemType === "product") {
          const product = await Product.findOne({ _id: item.product, deleted: false });
          if (!product) {
            outOfStockItems.push({ id: item.product, name: "Unknown Product", itemType: "product" });
            return;
          }

          let isOutOfStock = product.finite_stock && product.count_in_stock < item.quantity;

          // Check selected options for stock/availability
          if (!isOutOfStock && item.selectedOptions?.length > 0) {
            await Promise.all(
              item.selectedOptions.map(async selectedOption => {
                if (!selectedOption?._id) return;

                const option = product.options.find(opt =>
                  opt.values.some(val => val?._id && val._id.toString() === selectedOption._id.toString())
                );

                if (option) {
                  const optionValue = option.values.find(
                    val => val?._id && val._id.toString() === selectedOption._id.toString()
                  );

                  // If this option value links to another product, check its stock
                  if (optionValue?.product) {
                    const linkedProduct = await Product.findOne({ _id: optionValue.product, deleted: false });
                    if (linkedProduct?.finite_stock && linkedProduct.count_in_stock < item.quantity) {
                      isOutOfStock = true;
                      outOfStockItems.push({
                        id: item.product,
                        optionId: optionValue.product,
                        name: product.name,
                        option: `${option.name}: ${optionValue.name}`,
                        itemType: "product",
                      });
                    }
                  }
                }
              })
            );
          }

          if (isOutOfStock && !outOfStockItems.find(i => i.id === item.product)) {
            outOfStockItems.push({
              id: item.product,
              name: product.name,
              itemType: "product",
            });
          }
        } else if (item.itemType === "ticket") {
          const ticket = await Ticket.findOne({ _id: item.ticket, deleted: false });
          if (!ticket) {
            outOfStockItems.push({ id: item.ticket, name: "Unknown Ticket", itemType: "ticket" });
            return;
          }
          if (ticket.count_in_stock < item.quantity) {
            outOfStockItems.push({
              id: item.ticket,
              name: ticket.title,
              itemType: "ticket",
              count_in_stock: ticket.count_in_stock,
            });
          }
        }
      })
    );

    return outOfStockItems;
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
  check_password_products_s: async (params, body) => {
    try {
      const product = await Product.findById(params.id);
      if (!product) {
        return { success: false, message: "Product not found" };
      }

      if (!product.isPasswordProtected) {
        return { success: false, message: "This product is not password protected" };
      }

      const { password } = body;
      const isPasswordCorrect = product.passwordProtection.password === password;
      const isExpired = new Date() > product.passwordProtection.expirationDate;

      if (isPasswordCorrect && !isExpired) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      return { success: false, message: "Server error", error: error.message };
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
        "Hybridskinz (Coin/Coffin Microlights)",
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
  update_stock_products_s: async body => {
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
            } else if (product.category === "glove_sets") {
              await diminish_helios_glove_set_stock(product, item);
            } else {
              await updateProductStock(product, item.quantity);
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
  remove_multiple_products_s: async body => {
    try {
      return await product_db.remove_multiple_products_db(body.ids);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  apply_sale_products_s: async body => {
    try {
      const {
        discountType: discountTypeObj, // Rename to clarify it's an object
        discountValue,
        startDate,
        endDate,
        applyToOptions,
        selectedTags,
        applyToAll,
        exactTags,
        clear,
      } = body;

      // Extract the value from the discountType object
      const discountType = discountTypeObj?.value || discountTypeObj;

      let query = {};

      if (clear) {
        query = { sale: { $exists: true } };
        const products = await Product.find(query);
        const count = await clearProductSales(products, applyToOptions);
        return { success: true, count };
      }

      if (!discountType || !discountValue || isNaN(discountValue) || discountValue <= 0) {
        throw new Error("Invalid discount value");
      }

      if (!applyToAll && selectedTags?.length > 0 && !exactTags) {
        query.tags = { $in: selectedTags };
      }

      if (!applyToAll && selectedTags?.length > 0 && exactTags) {
        query.tags = { $all: selectedTags };
      }

      // Add query to exclude option products from main query
      query.isVariation = { $ne: true };

      const products = await Product.find(query);
      console.log(`Found ${products.length} main products to update`);

      const count = await applyProductSales(products, {
        discountType,
        discountValue,
        startDate,
        endDate,
        applyToOptions,
        exactTags,
      });
      return { success: true, count };
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
};
