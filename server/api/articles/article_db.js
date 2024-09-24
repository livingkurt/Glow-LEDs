import { determineIDPathname } from "../api_helpers";
import Article from "./article";

export default {
  findAll_articles_db: async (filter, sort, limit, page) => {
    try {
      return await Article.find(filter)
        .sort(sort)
        .populate("author")
        .populate("tags")
        .populate("image")
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAllGrid_articles_db: async (filter, sort, limit, page) => {
    const articleFields = {
      title: 1,
      pathname: 1,
      short_description: 1,
      image: 1,
      tags: 1,
      author: 1,
      views: 1,
      createdAt: 1,
    };
    try {
      const query = Article.find(filter, articleFields)
        .sort(sort)
        .populate({
          path: "author",
          select: "first_name last_name pathname",
        })
        .populate({
          path: "tags",
          match: { deleted: { $ne: true } },
          select: "name type pathname",
        })
        .populate("image");

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

  findBy_articles_db: async params => {
    try {
      return await Article.findOne(params).populate("author").populate("tags").populate("image");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_articles_db: async pathname => {
    try {
      return await Article.findOne({ pathname: pathname, deleted: false })
        .populate("author")
        .populate("tags")
        .populate("image");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_articles_db: async id => {
    const query = determineIDPathname(id);
    try {
      return await Article.findOne(query).populate("author").populate("tags").populate("image");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_articles_db: async body => {
    try {
      return await Article.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_articles_db: async (params, body) => {
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
  remove_articles_db: async params => {
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
  count_articles_db: async filter => {
    try {
      return await Article.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
