import mongoose from "mongoose";
import Affiliate from "../../affiliates/affiliate.js";
import Cart from "../../carts/cart.js";

export async function up() {
  const affiliates = await Affiliate.find({ product_bundles: { $exists: true, $ne: [] } });
  const affiliatesWithBundles = affiliates.filter(affiliate => affiliate?.product_bundles?.length > 0);

  for (const affiliate of affiliatesWithBundles) {
    // Convert each product bundle to a cart
    const cartPromises = affiliate.product_bundles.map(async bundle => {
      // Create new cart if it doesn't exist
      const cart = await Cart.findOneAndUpdate(
        { _id: bundle.cart || new mongoose.Types.ObjectId() },
        {
          title: bundle.title,
          subtitle: bundle.subtitle,
          short_description: bundle.short_description,
          image: bundle.image,
          pathname: bundle.title?.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
          affiliate: affiliate._id,
          user: affiliate.user,
        },
        { upsert: true, new: true }
      );
      return cart._id;
    });

    const cartIds = await Promise.all(cartPromises);
    affiliate.bundles = cartIds;
    affiliate.product_bundles = [];
    await affiliate.save();
  }
}

export async function down() {
  const affiliates = await Affiliate.find({ bundles: { $exists: true, $ne: [] } }).populate("bundles"); // Populate to get the full Cart documents

  for (const affiliate of affiliates) {
    // Convert Carts back to embedded product bundles
    const bundles = affiliate.bundles.map(cart => ({
      title: cart.title,
      subtitle: cart.subtitle,
      short_description: cart.short_description,
      image: cart.image,
      cart: cart._id, // Keep reference to cart
    }));

    // Update affiliate with embedded bundles
    affiliate.product_bundles = bundles;
    affiliate.bundles = []; // Clear bundles array
    await affiliate.save();

    // Note: We're not deleting the Cart documents in down migration
    // because they might be needed for other features
  }
}
