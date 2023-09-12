import { product_db } from "../products";
import {
  dimminish_batteries_stock,
  dimminish_refresh_stock,
  dimminish_supremes_stock,
  normalizeProductFilters,
  normalizeProductSearch,
} from "./product_helpers";
import { categories, determine_filter, snake_case, subcategories } from "../../util";
import { getFilteredData } from "../api_helpers";

// const sharp = require("sharp");

export default {
  findAll_products_s: async (query: { search: string; sort: string; page: string; limit: string }) => {
    try {
      const sort_options = ["name", "hidden", "category", "order", "price"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        search_name: "name",
        normalizeFilters: normalizeProductFilters,
        normalizeSearch: normalizeProductSearch,
      });

      const products = await product_db.findAll_products_db(filter, sort, limit, page);
      const count = await product_db.count_products_db(filter);
      return {
        data: products,
        total_count: count,
        currentPage: parseInt(page),
      };
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_filters_products_s: async (query: { search: string; sort: string; page: string; limit: string }) => {
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
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAllGrid_products_s: async (query: { page: string; search: string; sort: string; limit: string }) => {
    try {
      const page: string = query.page ? query.page : "1";
      const limit: string = query.limit ? query.limit : "0";

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
      let sort: any = { order: 1, _id: -1 };
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
      const products = await product_db.findAllGrid_products_db(filter, sort, limit, page);
      const count = await product_db.count_products_db(filter);
      return {
        products,
        totalPages: Math.ceil(count / parseInt(limit)),
        currentPage: page,
      };
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_products_s: async (params: any) => {
    try {
      return await product_db.findById_products_db(params.id);
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_products_s: async (body: any) => {
    try {
      return await product_db.create_products_db(body);
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  update_products_s: async (params: any, body: any) => {
    try {
      return await product_db.update_products_db(params.id, body);
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  reorder_products_s: async (body: any) => {
    try {
      const { reorderedItems } = body;

      // Update each product's order using the reorderedItems array
      const updatePromises = reorderedItems.map(async (item: any) => {
        await product_db.update_products_db(item._id, { ...item, order: item.order });
      });

      // Wait for all update operations to complete
      await Promise.all(updatePromises);

      // Send success response
      return "Productss reordered successfully.";
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_products_s: async (params: any) => {
    try {
      return await product_db.remove_products_db(params.id);
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  get_best_sellers_products_s: async (body: any) => {
    try {
      const occurences = body.occurences;

      const names = occurences.map((item: any) => item.name);

      const sort = {};
      const filter = { name: { $in: names }, deleted: false, hidden: false };
      const limit = "0";
      const page = "1";
      const products = await product_db.findAllGrid_products_db(filter, sort, limit, page);
      const compareFn = (a: any, b: any) => {
        const aIndex = occurences.findIndex((x: any) => x.name === a.name);
        const bIndex = occurences.findIndex((x: any) => x.name === b.name);
        return aIndex - bIndex;
      };
      const sortedProducts = products.sort(compareFn);
      return sortedProducts;
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_our_picks_products_s: async (params: any, body: any) => {
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
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_new_releases_products_s: async (params: any, body: any) => {
    try {
      return await product_db.aggregateAll_products_db();
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_stock_products_s: async (params: any, body: any) => {
    const { cartItems } = body;
    try {
      cartItems.forEach(async (item: any) => {
        const product: any = await product_db.findById_products_db(item.product);
        if (product.finite_stock) {
          if (product.subcategory === "singles") {
            dimminish_supremes_stock(product, item);
          } else if (product.subcategory === "refresh") {
            dimminish_refresh_stock(product, item);
          } else if (product.subcategory === "coin") {
            dimminish_batteries_stock(product, item);
          }
        }
      });
      return "Success";
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_product_order_products_s: async (params: any, body: any) => {
    const { state } = body;
    try {
      return state.entities.columnOrder.map((columnId: any) => {
        const column = state.entities.columns[columnId];
        const products: any = [];
        state.entities.products.forEach(function (product: any) {
          products[column.product_ids.indexOf(product._id)] = product;
        });
        products.forEach(async (item: any, index: any) => {
          return await product_db.update_products_db(item._id, {
            ...item,
            order: index + 1,
          });
        });
      });
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  add_product_options_products_s: async (params: any, body: any) => {
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
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  save_item_group_id_products_s: async (params: any, body: any) => {
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
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  reviews_products_s: async (params: any, body: any, user: any) => {
    try {
      // const product = await Product.findOne({ pathname: params.pathname });
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
        product.rating =
          product.reviews.reduce((a: any, c: { rating: any }) => c.rating + a, 0) / product.reviews.length;

        const updatedProduct = await product.save();
        if (updatedProduct) {
          return updatedProduct.reviews[updatedProduct.reviews.length - 1];
        }
      } else {
        throw new Error("Product Not Found");
      }
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  image_upload_products_s: async (req: any) => {
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
    // } catch (error: any) {
    //   if (error instanceof Error) {
    //     throw new Error(error.message);
    //   }
    // }
    return "Success";
  },
  // compress_images_products_s: async (body: any) => {
  //   try {
  //     //
  //     const { images } = body;

  //     sharp(images[0].data_url)
  //       .jpeg({ progressive: true, force: false })
  //       .toFile(
  //         __dirname + "/Desktop/" + images[0].file.name + "-optimized.jpg"
  //       );

  //     return "Success";
  //   } catch (error: any) {
  //
  // //     if (error instanceof Error) {
  //             throw new Error(error.message);
  //           }
  //   }
  // },
  remove_multiple_products_s: async (body: any) => {
    try {
      return await product_db.remove_multiple_products_db(body.ids);
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  current_stock_products_s: async () => {
    try {
      return await product_db.current_stock_products_db();
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  distinct_products_s: async (params: any) => {
    const { attribute } = params;
    try {
      return await product_db.distinct_products_db(attribute);
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
