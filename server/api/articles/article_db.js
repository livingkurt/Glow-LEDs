import Article from "./article";

export default {
  findAll_article_db: async (filter, sort, limit, page) => {
    try {
      return await Article.find(filter)
        .sort(sort)
        .populate("affiliate")
        .populate("tags")
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAllGrid_article_db: async (filter, sort, limit, page) => {
    const articleFields = {
      title: 1,
      pathname: 1,
      video: 1,
      level: 1,
      tags: 1,
      affiliate: 1,
      views: 1,
      createdAt: 1,
    };
    try {
      const query = Article.find(filter, articleFields)
        .sort(sort)
        .populate({
          path: "affiliate",
          select: "artist_name pathname",
        })
        .populate({
          path: "tags",
          match: { deleted: { $ne: true } },
          select: "name type pathname",
        });

      if (limit > 0) {
        query.limit(limit);
      }

      if (page > 0) {
        query.skip((page - 1) * limit);
      }

      return await query.exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findBy_article_db: async params => {
    try {
      return await Article.findOne(params).populate("affiliate").populate("tags");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_article_db: async pathname => {
    try {
      return await Article.findOne({ pathname: pathname, deleted: false }).populate("affiliate").populate("tags");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_article_db: async id => {
    try {
      return await Article.findOne({ _id: id, deleted: false }).populate("affiliate").populate("tags");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_article_db: async body => {
    try {
      return await Article.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_article_db: async (params, body) => {
    const { id } = params;
    try {
      const article = await Article.findOne({ _id: id, deleted: false });
      if (article) {
        return await Article.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_article_db: async params => {
    try {
      const article = await Article.findOne({ pathname: params.pathname, deleted: false });
      if (article) {
        return await Article.updateOne({ pathname: params.pathname }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_article_db: async filter => {
    try {
      return await Article.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
