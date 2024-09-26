import { Promo } from "../promos";
import { Team } from "../teams";

export default {
  findAll_teams_db: async (filter, sort, limit, page) => {
    try {
      return await Team.find(filter)
        .populate({ path: "affiliates", populate: { path: "user" } })
        .populate("public_code")
        .populate("private_code")
        .populate("captain")
        .sort(sort)
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_teams_db: async id => {
    try {
      return await Team.findOne({ _id: id, deleted: false })
        .populate({ path: "affiliates", populate: { path: "user" } })
        .populate("public_code")
        .populate("private_code")
        .populate("captain");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_teams_db: async pathname => {
    try {
      return await Team.findOne({ pathname, deleted: false })
        .populate({ path: "affiliates", populate: { path: "user" } })
        .populate("public_code")
        .populate("private_code")
        .populate("captain");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findBy_teams_db: async query => {
    try {
      return await Team.findOne(query)
        .populate({ path: "affiliates", populate: { path: "user" } })
        .populate("public_code")
        .populate("private_code")
        .populate("captain");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByAffiliate_teams_db: async affiliate_id => {
    try {
      return await Team.findOne({ affiliates: { $in: [affiliate_id] }, deleted: false })
        .populate({ path: "affiliates", populate: { path: "user" } })
        .populate("public_code")
        .populate("private_code")
        .populate("captain");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_teams_db: async (body, public_code, private_code) => {
    try {
      const pub_code = await Promo.create(public_code);
      const priv_code = await Promo.create(private_code);
      if (pub_code && priv_code) {
        return await Team.create({
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
  update_teams_db: async (id, body) => {
    console.log({ id, body });
    try {
      const team = await Team.findOne({ _id: id, deleted: false });
      if (team) {
        return await Team.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_teams_db: async id => {
    try {
      const team = await Team.findOne({ _id: id, deleted: false });
      if (team) {
        return await Team.updateOne({ _id: team._id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_teams_db: async filter => {
    try {
      return await Team.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
