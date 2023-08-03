import { Promo } from "../promos";
import { Affiliate } from "../affiliates";

export default {
  findAll_affiliates_db: async (filter: any, sort: unknown, limit: string, page: string) => {
    try {
      return await Affiliate.find(filter)
        .sort(sort)
        .populate("user")
        .populate("products")
        .populate("public_code")
        .populate("private_code")
        .populate("chips")
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findBy_affiliates_db: async (params: any) => {
    try {
      return await Affiliate.findOne(params)
        .populate("user")
        .populate("chips")
        .populate("products")
        .populate("public_code")
        .populate("private_code");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_affiliates_db: async (pathname: string) => {
    try {
      return await Affiliate.findOne({ pathname: pathname })
        .populate("user")
        .populate("chips")
        .populate("products")
        .populate("public_code")
        .populate("private_code");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_affiliates_db: async (id: string) => {
    try {
      return await Affiliate.findOne({ _id: id })
        .populate("user")
        .populate("chips")
        .populate("products")
        .populate("public_code")
        .populate("private_code");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_affiliates_db: async (body: any, public_code: any, private_code: any) => {
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
  checkin_status_affiliates_db: async (start_date: string, end_date: string) => {
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

  // checkin_status_affiliates_db: async (start_date: string, end_date: string) => {
  //   try {
  //     const sponsorCheckins = await Affiliate.aggregate([
  //       {
  //         $match: {
  //           active: true,
  //           sponsor: true
  //         }
  //       },
  //       {
  //         $unwind: {
  //           path: "$sponsorMonthlyCheckins",
  //           preserveNullAndEmptyArrays: true
  //         }
  //       },
  //       {
  //         $group: {
  //           _id: "$_id",
  //           artist_name: { $first: "$artist_name" },
  //           hasCheckedIn: {
  //             $first: {
  //               $cond: [
  //                 {
  //                   $and: [
  //                     { $ne: ["$sponsorMonthlyCheckins", null] },
  //                     { $gte: ["$sponsorMonthlyCheckins.createdAt", start_date] },
  //                     { $lte: ["$sponsorMonthlyCheckins.createdAt", end_date] }
  //                   ]
  //                 },
  //                 true,
  //                 false
  //               ]
  //             }
  //           },
  //           numberOfContent: { $first: "$sponsorMonthlyCheckins.numberOfContent" }
  //         }
  //       }
  //     ]);
  //     return sponsorCheckins;
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw new Error(error.message);
  //     }
  //   }
  // },

  update_affiliates_db: async (id: any, body: any) => {
    try {
      const affiliate: any = await Affiliate.findOne({ _id: id });
      if (affiliate) {
        return await Affiliate.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_affiliates_db: async (id: string) => {
    console.log({ id });
    try {
      const affiliate: any = await Affiliate.findOne({ _id: id });
      if (affiliate) {
        return await Affiliate.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_affiliates_db: async (filter: any) => {
    try {
      return await Affiliate.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
