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
        .populate("chips")
        .populate({
          path: "product_bundles",
          populate: {
            path: "cart",
            populate: {
              path: "cartItems",
              populate: [{ path: "tags" }, { path: "display_image_object" }],
            },
          },
        })
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
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
        .populate("chips")
        .populate("public_code")
        .populate("private_code")
        .populate({
          path: "product_bundles",
          populate: {
            path: "cart",
            populate: {
              path: "cartItems",
              populate: [{ path: "tags" }, { path: "display_image_object" }],
            },
          },
        });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_affiliates_db: async pathname => {
    try {
      return await Affiliate.findOne({ pathname: pathname, deleted: false })
        .populate("user")
        .populate("chips")

        .populate("public_code")
        .populate("private_code")
        .populate({
          path: "product_bundles",
          populate: {
            path: "cart",
            populate: {
              path: "cartItems",
              populate: [{ path: "tags" }, { path: "display_image_object" }],
            },
          },
        });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_affiliates_db: async id => {
    try {
      return await Affiliate.findOne({ _id: id, deleted: false })
        .populate("user")
        .populate("chips")

        .populate("public_code")
        .populate("private_code")
        .populate({
          path: "product_bundles",
          populate: {
            path: "cart",
            populate: {
              path: "cartItems",
              populate: [{ path: "tags" }, { path: "display_image_object" }],
            },
          },
        });
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
  checkin_status_affiliates_db: async (start_date, end_date) => {
    try {
      const startYear = parseInt(start_date.slice(0, 4));
      const startMonth = parseInt(start_date.slice(5, 7));
      const endYear = parseInt(end_date.slice(0, 4));
      const endMonth = parseInt(end_date.slice(5, 7));

      const sponsorCheckins = await Affiliate.aggregate([
        {
          $match: {
            active: true,
            sponsor: true,
          },
        },
        {
          $unwind: {
            path: "$sponsorMonthlyCheckins",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            "sponsorMonthlyCheckins.monthNumber": {
              $switch: {
                branches: [
                  { case: { $eq: ["$sponsorMonthlyCheckins.month", "January"] }, then: 1 },
                  { case: { $eq: ["$sponsorMonthlyCheckins.month", "February"] }, then: 2 },
                  { case: { $eq: ["$sponsorMonthlyCheckins.month", "March"] }, then: 3 },
                  { case: { $eq: ["$sponsorMonthlyCheckins.month", "April"] }, then: 4 },
                  { case: { $eq: ["$sponsorMonthlyCheckins.month", "May"] }, then: 5 },
                  { case: { $eq: ["$sponsorMonthlyCheckins.month", "June"] }, then: 6 },
                  { case: { $eq: ["$sponsorMonthlyCheckins.month", "July"] }, then: 7 },
                  { case: { $eq: ["$sponsorMonthlyCheckins.month", "August"] }, then: 8 },
                  { case: { $eq: ["$sponsorMonthlyCheckins.month", "September"] }, then: 9 },
                  { case: { $eq: ["$sponsorMonthlyCheckins.month", "October"] }, then: 10 },
                  { case: { $eq: ["$sponsorMonthlyCheckins.month", "November"] }, then: 11 },
                  { case: { $eq: ["$sponsorMonthlyCheckins.month", "December"] }, then: 12 },
                ],
                default: 0,
              },
            },
          },
        },
        {
          $group: {
            _id: "$_id",
            artist_name: { $first: "$artist_name" },
            hasCheckedIn: {
              $first: {
                $cond: [
                  {
                    $and: [
                      { $ne: ["$sponsorMonthlyCheckins", null] },
                      { $gte: ["$sponsorMonthlyCheckins.year", startYear] },
                      { $lte: ["$sponsorMonthlyCheckins.year", endYear] },
                      { $gte: ["$sponsorMonthlyCheckins.monthNumber", startMonth] },
                      { $lte: ["$sponsorMonthlyCheckins.monthNumber", endMonth] },
                    ],
                  },
                  true,
                  false,
                ],
              },
            },
            numberOfContent: {
              $max: {
                $cond: [
                  {
                    $and: [
                      { $ne: ["$sponsorMonthlyCheckins", null] },
                      { $gte: ["$sponsorMonthlyCheckins.year", startYear] },
                      { $lte: ["$sponsorMonthlyCheckins.year", endYear] },
                      { $gte: ["$sponsorMonthlyCheckins.monthNumber", startMonth] },
                      { $lte: ["$sponsorMonthlyCheckins.monthNumber", endMonth] },
                    ],
                  },
                  "$sponsorMonthlyCheckins.numberOfContent",
                  0,
                ],
              },
            },
            totalNumberOfContent: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $ne: ["$sponsorMonthlyCheckins", null] },
                      { $eq: ["$sponsorMonthlyCheckins.year", startYear] },
                    ],
                  },
                  "$sponsorMonthlyCheckins.numberOfContent",
                  0,
                ],
              },
            },
          },
        },
      ]);
      return sponsorCheckins;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  question_concerns_affiliates_db: async (start_date, end_date) => {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    const result = await Affiliate.aggregate([
      {
        $unwind: "$sponsorMonthlyCheckins",
      },
      {
        $addFields: {
          checkinDate: {
            $dateFromString: {
              dateString: {
                $concat: [
                  { $toString: "$sponsorMonthlyCheckins.year" },
                  "-",
                  { $toString: "$sponsorMonthlyCheckins.month" },
                  "-01",
                ],
              },
            },
          },
        },
      },
      {
        $match: {
          checkinDate: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $project: {
          artist_name: 1,
          year: 1,
          month: 1,
          questionsConcerns: "$sponsorMonthlyCheckins.questionsConcerns",
        },
      },
    ]);
    return result;
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
