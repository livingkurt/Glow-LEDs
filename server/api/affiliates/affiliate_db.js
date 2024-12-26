import { determineIDPathname } from "../api_helpers.js";
import Promo from "../promos/promo.js";
import Affiliate from "./affiliate.js";

export default {
  findAll_affiliates_db: async (filter, sort, limit, page) => {
    try {
      return await Affiliate.find(filter)
        .sort(sort)
        .populate("user")
        .populate("public_code")
        .populate("private_code")
        .populate("microlights")
        .populate("modes")
        .populate({
          path: "bundles",
          populate: [
            { path: "images" },
            { path: "cartItems", populate: [{ path: "tags" }, { path: "display_image_object" }] },
          ],
        })
        .populate("sponsorTasks.verifiedBy")
        .limit(parseInt(limit, 10))
        .skip(Math.max(parseInt(page, 10), 0) * parseInt(limit, 10))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findBy_affiliates_db: async params => {
    try {
      return await Affiliate.findOne(params)
        .populate("user")
        .populate("microlights")
        .populate("modes")
        .populate("public_code")
        .populate("private_code")
        .populate({
          path: "bundles",
          populate: [
            { path: "images" },
            { path: "cartItems", populate: [{ path: "tags" }, { path: "display_image_object" }] },
          ],
        })
        .populate("sponsorTasks.verifiedBy");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_affiliates_db: async id => {
    const query = determineIDPathname(id);
    try {
      return await Affiliate.findOne({ ...query, deleted: false })
        .populate("user")
        .populate("microlights")
        .populate("modes")
        .populate("public_code")
        .populate("private_code")

        .populate({
          path: "bundles",
          populate: [
            { path: "images" },
            { path: "cartItems", populate: [{ path: "tags" }, { path: "display_image_object" }] },
          ],
        })
        .populate("sponsorTasks.verifiedBy");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_affiliates_db: async (body, public_code, private_code) => {
    try {
      const pub_code = await Promo.create(public_code);
      const priv_code = await Promo.create(private_code);
      if (pub_code && priv_code) {
        return await Affiliate.create({
          ...body,
          public_code: pub_code._id,
          private_code: priv_code._id,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  update_affiliates_db: async (id, body) => {
    try {
      const affiliate = await Affiliate.findOne({ _id: id, deleted: false });
      if (affiliate) {
        return await Affiliate.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_affiliates_db: async id => {
    try {
      const affiliate = await Affiliate.findOne({ _id: id, deleted: false });
      if (affiliate) {
        return await Affiliate.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_affiliates_db: async filter => {
    try {
      return await Affiliate.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
