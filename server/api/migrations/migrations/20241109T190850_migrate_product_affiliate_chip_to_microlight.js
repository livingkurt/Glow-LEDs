import Product from "../../products/product.js";
import Affiliate from "../../affiliates/affiliate.js";

export async function up() {
  // Migrate Products
  await Product.updateMany({ chips: { $exists: true } }, [
    {
      $set: {
        microlights: "$chips", // Copy chips array to microlights
        // chips: [], // Clear chips array
      },
    },
  ]);

  // Migrate Affiliates
  await Affiliate.updateMany({ chips: { $exists: true } }, [
    {
      $set: {
        microlights: "$chips", // Copy chips array to microlights
        // chips: [], // Clear chips array
      },
    },
  ]);
}

export async function down() {
  // Rollback Products
  await Product.updateMany({ microlights: { $exists: true } }, [
    {
      $set: {
        chips: "$microlights", // Copy microlights array back to chips
        // microlights: [], // Clear microlights array
      },
    },
  ]);

  // Rollback Affiliates
  await Affiliate.updateMany({ microlights: { $exists: true } }, [
    {
      $set: {
        chips: "$microlights", // Copy microlights array back to chips
        // microlights: [], // Clear microlights array
      },
    },
  ]);
}
