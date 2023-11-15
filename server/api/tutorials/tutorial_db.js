import Tutorial from "./tutorial";

export default {
  findAll_tutorials_db: async (filter, sort, limit, page) => {
    try {
      return await Tutorial.find(filter)
        .sort(sort)
        .populate("affiliate")
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findBy_tutorials_db: async params => {
    try {
      return await Tutorial.findOne(params).populate("affiliate");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_tutorials_db: async pathname => {
    try {
      return await Tutorial.findOne({ pathname: pathname, deleted: false }).populate("affiliate");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_tutorials_db: async id => {
    try {
      return await Tutorial.findOne({ _id: id, deleted: false }).populate("affiliate");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_tutorials_db: async body => {
    try {
      return await Tutorial.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_tutorials_db: async (params, body) => {
    const { id } = params;
    try {
      const tutorial = await Tutorial.findOne({ _id: id, deleted: false });
      if (tutorial) {
        return await Tutorial.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_tutorials_db: async params => {
    try {
      const tutorial = await Tutorial.findOne({ pathname: params.pathname, deleted: false });
      if (tutorial) {
        return await Tutorial.updateOne({ pathname: params.pathname }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_tutorials_db: async filter => {
    try {
      return await Tutorial.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
