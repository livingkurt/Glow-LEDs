import { product_db } from "../products";

export const dimminish_supremes_stock = async (product: any, item: any) => {
  const new_product_count = product.count_in_stock - item.qty;
  product.count_in_stock = new_product_count;
  if (new_product_count <= product.quantity) {
    product.quantity = new_product_count;
  }
  await product_db.update_products_db(product._id, product);
  const option_product: any = await product_db.findById_products_db(item.option_product);
  const new_option_product_count = option_product.count_in_stock - item.qty;
  option_product.count_in_stock = new_option_product_count;
  await product_db.update_products_db(option_product._id, option_product);
};

export const dimminish_refresh_stock = async (product: any, item: any) => {
  // const new_product_count = product.count_in_stock - item.qty;
  // product.count_in_stock = new_product_count;
  // if (new_product_count <= product.quantity) {
  //   product.quantity = new_product_count;
  // }
  // await product_db.update_products_db(product._id, product);
  const option_product: any = await product_db.findById_products_db(item.option_product);
  const new_option_product_count = option_product.count_in_stock - item.qty * 6;
  option_product.count_in_stock = new_option_product_count;
  if (new_option_product_count <= option_product.quantity) {
    option_product.quantity = new_option_product_count;
  }
  await product_db.update_products_db(option_product._id, option_product);

  await Promise.all(
    product.secondary_products.map(async (secondary: any) => {
      const new_secondary_count = secondary.count_in_stock - item.qty * 120;
      secondary.count_in_stock = new_secondary_count;
      if (new_secondary_count <= secondary.quantity) {
        secondary.qiuantty = new_secondary_count;
      }
      await product_db.update_products_db(secondary._id, secondary);
      secondary.option_products.map(async (option: any) => {
        const new_option_product_count = Math.floor(new_secondary_count / option.size);
        option.count_in_stock = new_option_product_count;
        await product_db.update_products_db(option._id, option);
      });
    })
  );
};

export const dimminish_batteries_stock = async (product: any, item: any) => {
  const new_product_count = product.count_in_stock - item.qty * item.size;
  product.count_in_stock = new_product_count;
  if (new_product_count <= product.quantity) {
    product.quantity = new_product_count;
  }
  await product_db.update_products_db(product._id, product);
  await Promise.all(
    product.option_products.map(async (option: any) => {
      const new_option_product_count = Math.floor(new_product_count / option.size);
      option.count_in_stock = new_option_product_count;
      await product_db.update_products_db(option._id, option);
    })
  );
};

// export const calculate_refresh_pack_stock = async (product: any, item: any) => {
//   const refresh_pack: any = await product_db.findById_products_db("61a9501f914391295a266c8b");
//   const supremes: any = await product_db.findById_products_db("61a93b4c914391295a264f8d");
//   const batts_1225: any = await product_db.findById_products_db("60e158d4e615fa002a6c2de4");
//   const batts_1620: any = await product_db.findById_products_db("60e158d4e615fa002a6c2de4");
//   const batts_1616: any = await product_db.findById_products_db("60e1581fe615fa002a6c2d98");
//   const supremes_small = supremes.option_products[0];
//   const supremes_medium = supremes.option_products[1];
//   const supremes_large = supremes.option_products[2];
//   const supremes_xlarge = supremes.option_products[3];
//   const supremes_xxlarge = supremes.option_products[4];
//   const refresh_pack_count = refresh_pack.count_in_stock;
//   const supremes_count = supremes.count_in_stock;
//   const supremes_small_count = supremes_small.count_in_stock;
//   const supremes_medium_count = supremes_medium.count_in_stock;
//   const supremes_large_count = supremes_large.count_in_stock;
//   const supremes_xlarge_count = supremes_xlarge.count_in_stock;
//   const supremes_xxlarge_count = supremes_xxlarge.count_in_stock;
//   const batts_1225_count = batts_1225.count_in_stock;
//   const batts_1620_count = batts_1620.count_in_stock;
//   const batts_1616_count = batts_1616.count_in_stock;
//   const refresh_pack_supremes_small_count = supremes_small_count / 6;
//   const refresh_pack_supremes_medium_count = supremes_medium_count / 6;
//   const refresh_pack_supremes_large_count = supremes_large_count / 6;
//   const refresh_pack_supremes_xlarge_count = supremes_xlarge_count / 6;
//   const refresh_pack_supremes_xxlarge_count = supremes_xxlarge_count / 6;
//   const refresh_pack_batts_1225_count = batts_1225_count / 120;
//   const refresh_pack_batts_1620_count = batts_1620_count / 120;
//   const refresh_pack_batts_1616_count = batts_1616_count / 120;
//   const new_product_count = product.count_in_stock - item.qty * item.size;
//   product.count_in_stock = new_product_count;
//   if (new_product_count <= product.quantity) {
//     product.quantity = new_product_count;
//   }
//   await product_db.update_products_db(product._id, product);
//   await Promise.all(
//     product.option_products.map(async (option: any) => {
//       const new_option_product_count = Math.floor(new_product_count / option.size);
//       option.count_in_stock = new_option_product_count;
//       await product_db.update_products_db(option._id, option);
//     })
//   );
// };

export const normalizeProductFilters = (input: any) => {
  console.log({ input });
  const output: any = {};
  Object.keys(input).forEach(key => {
    switch (key) {
      case "category":
        for (const category of input.category) {
          output["category"] = category;
        }
        break;
      case "subcategory":
        for (const subcategory of input.subcategory) {
          output["subcategory"] = subcategory;
        }
        break;
      case "hidden":
        if (!input.hidden.includes(1)) {
          output["hidden"] = false;
        }
        break;
      case "options":
        if (!input.options.includes(1)) {
          output["option"] = false;
        }
        break;

      default:
        break;
    }
  });
  if (input.hidden.includes("only_hidden")) {
    output.hidden = true;
  }
  if (input.options.includes("only_options")) {
    output.option = true;
  }
  console.log({ output });
  return output;
};

// export const normalizeProductFilters = (input: any) => {
//   console.log({ input });
//   const output: any = {};
//   Object.keys(input).forEach(key => {
//     switch (key) {
//       case "category":
//         for (const category of input.category) {
//           output["category"] = category;
//         }
//         break;
//       case "subcategory":
//         for (const subcategory of input.subcategory) {
//           output["subcategory"] = subcategory;
//         }
//         break;
//       case "hidden":
//         if (input.hidden.includes("only_hidden")) {
//           output["hidden"] = true;
//         }
//         if (!input.hidden.includes(1)) {
//           output["hidden"] = false;
//         }
//         break;
//       case "options":
//         if (input.option.includes("only_option")) {
//           output["option"] = true;
//         }
//         if (!input.options.includes(1)) {
//           output["option"] = false;
//         }
//         break;

//       default:
//         break;
//     }
//   });
//   console.log({ output });
//   return output;
// };

// for (const options of input.options) {
//   if (options === "show") {
//     output["option"] = true;
//   } else {
//     output["option"] = false;
//   }
// }
