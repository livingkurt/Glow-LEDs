import { image_db } from "../images";
import { getFilteredData } from "./image_helper";
import { ImgurClient } from "imgur";
const fs = require("fs");
const client = new ImgurClient({ clientId: process.env.IMGUR_ClIENT_ID });

export default {
  findAll_images_s: async (query: { page: string; search: string; sort: any; limit: string; filters: any }) => {
    try {
      const sort_options = ["createdAt", "paid_at", "paid", "amount"];
      const { filter, sort, limit, page } = getFilteredData({ query, sort_options, search_name: "affiliate" });
      const images = await image_db.findAll_images_db(filter, sort, limit, page);
      const count = await image_db.count_images_db(filter);
      return {
        data: images,
        total_count: count,
        currentPage: page
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_images_s: async (params: any) => {
    try {
      return await image_db.findById_images_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  upload_images_s: async (body: any, files: any) => {
    const { albumName } = body;

    console.log({ albumName, files });
    try {
      const uploadedImageLinks = [];
      const album: any = await client.createAlbum(albumName);
      console.log({ album });
      for (const image of files) {
        try {
          const upload: any = await client.upload({
            image: fs.createReadStream(image.path),
            album: album.deletehash // optional
          });
          console.log({ upload });
          uploadedImageLinks.push(upload.data.link);
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }
      }
      console.log({ uploadedImageLinks });
      // Create a image record in an array
      await Promise.all(
        uploadedImageLinks.map(async (link: any) => {
          return await image_db.create_images_db({ link, album: albumName });
        })
      );
      return uploadedImageLinks;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_images_s: async (body: any) => {
    try {
      return await image_db.create_images_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_images_s: async (params: any, body: any) => {
    try {
      return await image_db.update_images_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_images_s: async (params: any) => {
    try {
      return await image_db.remove_images_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_multiple_images_s: async (body: any) => {
    try {
      return await image_db.remove_multiple_images_db(body.ids);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
