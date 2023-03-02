import { Team } from "../teams";

export default {
  findAll_teams_db: async (filter: any, sort: unknown, limit: string, page: string) => {
    try {
      return await Team.find(filter)
        .populate("affiliates")
        .populate("public_code")
        .populate("private_code")
        .populate("captain")
        .sort(sort)
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_teams_db: async (pathname: string) => {
    try {
      return await Team.findOne({ pathname }).populate("affiliates").populate("public_code").populate("private_code").populate("captain");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByAffiliate_teams_db: async (affiliate_id: string) => {
    try {
      return await Team.find({ affiliates: { $in: [affiliate_id] } })
        .populate("affiliates")
        .populate("public_code")
        .populate("private_code")
        .populate("captain");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_teams_db: async (body: any) => {
    try {
      return await Team.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_teams_db: async (id: string, body: any) => {
    try {
      const team: any = await Team.findOne({ _id: id });
      if (team) {
        return await Team.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_teams_db: async (id: string) => {
    try {
      const team: any = await Team.findOne({ _id: id });
      if (team) {
        return await Team.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_teams_db: async (filter: any) => {
    try {
      return await Team.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
