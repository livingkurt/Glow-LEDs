import { product_db } from "../db";
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
      console.log({
        query
      });

      const filter = determine_filter(query, search);
      console.log({
        page,
        limit
      });
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
      console.log({ findAll_products_s_error: error });
      throw new Error(error.message);
    }
  },
  findById_products_s: async (params: any) => {
    console.log({ findById_products_s: params });
    try {
      return await product_db.findById_products_db(params.id);
    } catch (error) {
      console.log({ findById_products_s_error: error });
      throw new Error(error.message);
    }
  },
  findByPathname_products_s: async (params: any) => {
    try {
      return await product_db.findById_products_db(params.pathname);
    } catch (error) {
      console.log({ findById_products_s_error: error });
      throw new Error(error.message);
    }
  },
  create_products_s: async (body: any) => {
    try {
      return await product_db.create_products_db(body);
    } catch (error) {
      console.log({ create_products_s_error: error });
      throw new Error(error.message);
    }
  },

  update_products_s: async (params: any, body: any) => {
    try {
      return await product_db.update_products_db(params.id, body);
    } catch (error) {
      console.log({ update_products_s_error: error });
      throw new Error(error.message);
    }
  },
  remove_products_s: async (params: any) => {
    try {
      return await product_db.remove_products_db(params.id);
    } catch (error) {
      console.log({ remove_surveys_s_error: error });
      throw new Error(error.message);
    }
  },

  get_best_sellers_products_s: async (body: any) => {
    try {
      const occurences = body.occurences;
      console.log({ occurences });
      const names = occurences.map((item: any) => item.name);
      console.log({ names });
      const sort = {};
      const filter = { name: { $in: names }, hidden: false };
      const limit = 0;
      const page = 1;
      return await product_db.findAll_products_db(filter, sort, limit, page);
    } catch (error) {
      console.log({ create_products_s_error: error });
      throw new Error(error.message);
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
      console.log({ names });
      const sort = { _id: -1 };
      const filter = { name: { $in: names }, hidden: false };
      const limit = 0;
      const page = 1;
      return await product_db.findAll_products_db(filter, sort, limit, page);
    } catch (error) {
      console.log({ update_products_s_error: error });
      throw new Error(error.message);
    }
  },
  get_new_releases_products_s: async (params: any, body: any) => {
    try {
      const products = await product_db.aggregateAll_products_db();
      console.log({ products: products[1].data });
      return products.map((product: any) => product.data);
    } catch (error) {
      console.log({ update_products_s_error: error });
      throw new Error(error.message);
    }
  },
  update_stock_products_s: async (params: any, body: any) => {
    const { cartItems } = body;
    // const save_product = async (id: string, qty: number) => {
    //   console.log({
    //     id,
    //     qty
    //   });
    //   const product: any = await product_db.findById_products_db(id);
    //   const new_count = product.count_in_stock - qty;
    //   console.log({ id, new_count });
    //   if (product.finite_stock) {
    // if (new_count <= 0) {
    //   // product.quantity = 30;
    //   product.count_in_stock = 0;
    // } else if (product.count_in_stock <= product.quantity) {
    //   product.quantity = new_count;
    //   product.count_in_stock = new_count;
    // } else {
    //   product.count_in_stock = new_count;
    // }
    //     console.log({ product });
    //     return await product_db.update_products_db(product._id, product);
    //     // const request = await product.save();
    //   }
    // };
    try {
      cartItems.forEach(async (item: any) => {
        const product: any = await product_db.findById_products_db(item.product);
        console.log({ product });
        // console.log({ subcategory: product.subcategory });
        if (product.finite_stock) {
          if (product.subcategory === "singles") {
            const new_product_count = product.count_in_stock - item.qty;
            product.count_in_stock = new_product_count;
            await product_db.update_products_db(product._id, product);
            const option_product: any = await product_db.findById_products_db(item.option_product);
            const new_option_product_count = option_product.count_in_stock - item.qty;
            option_product.count_in_stock = new_option_product_count;
            await product_db.update_products_db(option_product._id, option_product);
          } else if (product.subcategory === "refresh") {
            console.log({ subcategory: product.subcategory });
            const new_product_count = product.count_in_stock - item.qty;
            product.count_in_stock = new_product_count;
            await product_db.update_products_db(product._id, product);
            const option_product: any = await product_db.findById_products_db(item.option_product);
            const new_option_product_count = option_product.count_in_stock - item.qty * 6;
            option_product.count_in_stock = new_option_product_count;
            await product_db.update_products_db(option_product._id, option_product);

            await Promise.all(
              product.secondary_products.map(async (secondary: any) => {
                const new_secondary_count = secondary.count_in_stock - item.qty * 120;
                secondary.count_in_stock = new_secondary_count;
                await product_db.update_products_db(secondary._id, secondary);
                secondary.option_products.map(async (option: any) => {
                  const new_option_product_count = Math.floor(new_secondary_count / option.size);
                  option.count_in_stock = new_option_product_count;
                  await product_db.update_products_db(option._id, option);
                });
              })
            );
          } else if (product.subcategory === "coin") {
            const new_product_count = product.count_in_stock - item.qty * item.size;
            product.count_in_stock = new_product_count;
            await product_db.update_products_db(product._id, product);
            await Promise.all(
              product.option_products.map(async (option: any) => {
                const new_option_product_count = Math.floor(new_product_count / option.size);
                option.count_in_stock = new_option_product_count;
                await product_db.update_products_db(option._id, option);
              })
            );
            // const refresh_pack: any = await product_db.findById_products_db("61a9501f914391295a266c8b");
          }
          // return save_product(item.product, item.qty);
        }
        // else if (item.option_product) {
        //   if (item.name === "Refresh Pack (6 Supreme Pairs + 120 Batteries)") {
        //     return save_product(item.option_product, 6 * item.qty);
        //   } else {
        //     return save_product(item.option_product, item.qty);
        //   }
        // } else if (item.secondary_product) {
        //   return save_product(item.secondary_product, item.qty);
        // } else if (item.color_product) {
        //   return save_product(item.color_product, item.qty);
        // } else if (item.secondary_color_product) {
        //   return save_product(item.secondary_color_product, item.qty);
        // }
      });
      return "Success";
    } catch (error) {
      console.log({ remove_surveys_s_error: error });
      throw new Error(error.message);
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
      console.log({ remove_surveys_s_error: error });
      throw new Error(error.message);
    }
  },
  add_product_options_products_s: async (params: any, body: any) => {
    const { id, ids, type } = body;
    try {
      // const product = await product_db.findById_products_db(id);
      const Kaleidoscope = await product_db.findById_products_db("6198087eac9130002b155ab0");
      // console.log({
      //   ...product,
      //   [type]: ids.split(",")
      // });
      console.log({ Kaleidoscope: Kaleidoscope[type] });
      // return await product_db.update_products_db(id, {
      //   ...product,
      //   [type]: Kaleidoscope[type]
      // });
      return Kaleidoscope[type];
    } catch (error) {
      console.log({ remove_surveys_s_error: error });
      throw new Error(error.message);
    }
  },

  save_item_group_id_products_s: async (params: any, body: any) => {
    try {
      const option = body.option;
      const item_group = body.item_group;
      const product = await product_db.findById_products_db(option._id);
      console.log({ option: option._id, price: item_group.price });
      if (product && option._id && item_group.price) {
        return await product_db.update_products_db(option._id, {
          ...body,
          price: item_group.price
        });
      } else {
        console.log("Error in Updating Product.");

        throw new Error("Error in Updating Product.");
      }
    } catch (error) {
      console.log({ create_products_s_error: error });
      throw new Error(error.message);
    }
  },

  reviews_products_s: async (params: any, body: any) => {
    try {
      console.log(body);
      console.log({ pathname: params.pathname });
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
        console.log({ reviews: product.reviews });
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((a: any, c: { rating: any }) => c.rating + a, 0) / product.reviews.length;
        console.log({ product });
        const updatedProduct = await product.save();
        if (updatedProduct) {
          return updatedProduct.reviews[updatedProduct.reviews.length - 1];
        }
      } else {
        throw new Error("Product Not Found");
      }
    } catch (error) {
      console.log({ remove_surveys_s_error: error });
      throw new Error(error.message);
    }
  }
  // compress_images_products_s: async (body: any) => {
  //   try {
  //     // console.log({ body: body.images });
  //     const { images } = body;

  //     sharp(images[0].data_url)
  //       .jpeg({ progressive: true, force: false })
  //       .toFile(
  //         __dirname + "/Desktop/" + images[0].file.name + "-optimized.jpg"
  //       );

  //     return "Success";
  //   } catch (error) {
  //     console.log({ remove_surveys_s_error: error });
  //     throw new Error(error.message);
  //   }
  // },
};
