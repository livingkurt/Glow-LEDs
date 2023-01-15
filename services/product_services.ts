import { product_db } from "../db";
import { dimminish_batteries_stock, dimminish_refresh_stock, dimminish_supremes_stock } from "../helpers/product_helpers";
import { categories, determine_filter, snake_case, subcategories } from "../util";

// const sharp = require("sharp");

export default {
  findAll_products_s: async (query: any) => {
    try {
      const page: any = query.page ? query.page : 1;
      const limit: any = query.limit ? query.limit : 0;

      let search = {};
      if (categories.includes(snake_case(query.search))) {
        search = query.search
          ? {
              category: {
                $regex: snake_case(query.search),
                $options: "i"
              }
            }
          : {};
      } else if (subcategories.includes(snake_case(query.search))) {
        search = query.search
          ? {
              subcategory: {
                $regex: snake_case(query.search),
                $options: "i"
              }
            }
          : {};
      } else {
        search = query.search
          ? {
              name: {
                $regex: query.search.toLowerCase(),
                $options: "i"
              }
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
      const products = await product_db.findAll_products_db(filter, sort, limit, page);
      const count = await product_db.count_products_db(filter);
      return {
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page)
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_products_s: async (params: any) => {
    try {
      return await product_db.findById_products_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_products_s: async (params: any) => {
    try {
      return await product_db.findById_products_db(params.pathname);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_products_s: async (body: any) => {
    try {
      return await product_db.create_products_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  update_products_s: async (params: any, body: any) => {
    try {
      return await product_db.update_products_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_products_s: async (params: any) => {
    try {
      return await product_db.remove_products_db(params.id);
    } catch (error) {
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
      const filter = { name: { $in: names }, hidden: false };
      const limit = 0;
      const page = 1;
      return await product_db.findAll_products_db(filter, sort, limit, page);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_our_picks_products_s: async (params: any, body: any) => {
    try {
      const names = [
        "Refresh Pack (6 Supreme Pairs + 120 Batteries)",
        "Supreme Sizing Sampler Pack",
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
        "CLOZD Omniskinz"
      ];

      const sort = { _id: -1 };
      const filter = { name: { $in: names }, hidden: false };
      const limit = 0;
      const page = 1;
      return await product_db.findAll_products_db(filter, sort, limit, page);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_new_releases_products_s: async (params: any, body: any) => {
    try {
      const products = await product_db.aggregateAll_products_db();

      return products.map((product: any) => product.data);
    } catch (error) {
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
    } catch (error) {
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
            order: index + 1
          });
        });
      });
    } catch (error) {
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
    } catch (error) {
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
          price: item_group.price
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

  reviews_products_s: async (params: any, body: any) => {
    try {
      // const product = await Product.findOne({ pathname: params.pathname });
      const product = await product_db.findById_products_db(params.pathname);
      if (product) {
        product.reviews = [
          ...product.reviews,
          {
            user: body.userInfo._id,
            first_name: body.userInfo.first_name,
            last_name: body.userInfo.last_name,
            rating: Number(body.review.rating),
            comment: body.review.comment
          }
        ];

        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((a: any, c: { rating: any }) => c.rating + a, 0) / product.reviews.length;

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
  image_upload_products_s: async (req: any) => {
    // or you can use
    const formData = new FormData(req);
    console.log({ req: req.body, formData });
    // const { images, album_title } = body;
    // try {
    //   const options = {
    //     auth_cookie: process.env.IMGBOX_AUTH_COOKIE,
    //     album_title: album_title,
    //     content_type: "safe",
    //     thumbnail_size: "800r",
    //     comments_enabled: false,
    //     logger: true
    //   };

    //   const send = await imgbox(images, options);
    //   console.log(send);
    // } catch (error) {
    //   if (error instanceof Error) {
    //     throw new Error(error.message);
    //   }
    // }
    return "Success";
  }
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
  //   } catch (error) {
  //
  // //     if (error instanceof Error) {
  //             throw new Error(error.message);
  //           }
  //   }
  // },
};
