const { Category } = require("../categorys");
const { Product } = require("../products");
const mongoose = require("mongoose");

function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

function snake_case(str) {
  return str.replace(/\W+/g, "_").toLowerCase();
}

module.exports = {
  async up(db, client) {
    const products = await Product.find({});

    for (const product of products) {
      const categoryIds = [];
      const subCategoryIds = [];
      const collectionIds = [];

      let existingCategory = null;
      let existingSubCategory = null;
      let existingCollection = null;

      if (product.category) {
        const categoryName = toTitleCase(product.category);
        existingCategory = await Category.findOne({ name: categoryName, type: "category", deleted: false });

        if (!existingCategory) {
          existingCategory = new Category({
            name: categoryName,
            pathname: snake_case(product.category),
            type: "category",
          });

          await existingCategory.save();
        }

        categoryIds.push(existingCategory._id);
      }

      if (product.subcategory) {
        const subCategoryName = toTitleCase(product.subcategory);
        existingSubCategory = await Category.findOne({ name: subCategoryName, type: "subcategory", deleted: false });

        if (!existingSubCategory) {
          existingSubCategory = new Category({
            name: subCategoryName,
            pathname: snake_case(product.subcategory),
            type: "subcategory",
          });

          await existingSubCategory.save();
        }

        subCategoryIds.push(existingSubCategory._id);

        if (existingCategory) {
          await Category.updateOne(
            { _id: existingCategory._id },
            { $addToSet: { subcategorys: existingSubCategory._id } }
          );
        }
      }

      if (product.product_collection) {
        const collectionName = toTitleCase(product.product_collection);
        existingCollection = await Category.findOne({ name: collectionName, type: "collection", deleted: false });

        if (!existingCollection) {
          existingCollection = new Category({
            name: collectionName,
            pathname: snake_case(product.product_collection),
            type: "collection",
          });

          await existingCollection.save();
        }

        collectionIds.push(existingCollection._id);

        if (existingSubCategory) {
          await Category.updateOne(
            { _id: existingSubCategory._id },
            { $addToSet: { collections: existingCollection._id } }
          );
        }
      }

      await Product.updateOne(
        { _id: product._id },
        {
          categorys: categoryIds,
          subcategorys: subCategoryIds,
          collections: collectionIds,
        }
      );
    }

    mongoose.connection.close();
  },

  async down(db, client) {
    // Rollback logic if required
    // Example: await db.collection('mycollection').updateMany({}, { $unset: { newField: '' } });
    await db.collection("categories").deleteMany({});
  },
};
