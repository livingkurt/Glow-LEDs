import { promisify } from "util";
import { image_db } from "../images";
import { getFilteredData } from "../api_helpers";
import { ImgurClient } from "imgur";
import path from "path";
import appRoot from "app-root-path";
import config from "../../config";
const fs = require("fs");
const axios = require("axios");
const util = require("util");

const deleteFile = util.promisify(fs.unlink);
const readdir = util.promisify(fs.readdir);
// const client = new ImgurClient({ clientId: config.IMGUR_ClIENT_ID });

export default {
  findAll_images_s: async (query: { page: string; search: string; sort: any; limit: string; filters: any }) => {
    try {
      const sort_options = ["createdAt", "album", "image", "link"];
      const { filter, sort, limit, page } = getFilteredData({ query, sort_options, search_name: "album" });
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
  findByLink_images_s: async (body: any) => {
    try {
      return await image_db.findByLink_images_db(body.link);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  upload_images_s: async (body: any, files: any) => {
    const { albumName } = body;
    const uploadedImageLinks = [];
    try {
      const albumResponse = await axios.post(
        "https://api.imgur.com/3/album",
        { title: albumName, privacy: "hidden" },
        {
          headers: { Authorization: `Client-ID ${config.IMGUR_ClIENT_ID}` }
        }
      );
      const album = albumResponse.data.data;

      for (const image of files) {
        const imageData = fs.createReadStream(image.path);
        const imgResponse = await axios.post("https://api.imgur.com/3/image", imageData, {
          headers: {
            Authorization: `Client-ID ${config.IMGUR_ClIENT_ID}`,
            "Content-Type": "multipart/form-data"
          },
          params: { album: album.deletehash }
        });
        uploadedImageLinks.push(imgResponse.data.data.link);
      }

      const images = await Promise.all(
        uploadedImageLinks.map(async (link: any) => {
          return await image_db.create_images_db({ link, album: albumName });
        })
      );

      const uploadsDir = path.join(appRoot.path, "uploads");
      const uploadedFiles = await readdir(uploadsDir);
      await Promise.all(uploadedFiles.map((file: string) => deleteFile(path.join(uploadsDir, file))));

      return images;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  // upload_images_s: async (body: any, files: any) => {
  //   const { albumName } = body;
  //   const deleteFile = promisify(fs.unlink);

  //   try {
  //     const uploadedImageLinks = [];
  //     const album: any = await client.createAlbum(albumName);
  //     for (const image of files) {
  //       try {
  //         const upload: any = await client.upload({
  //           image: fs.createReadStream(image.path),
  //           album: album.deletehash // optional
  //         });
  //         uploadedImageLinks.push(upload.data.link);
  //       } catch (error) {
  //         if (error instanceof Error) {
  //           throw new Error(error.message);
  //         }
  //       }
  //     }
  //     // Create a image record in an array
  //     const images = await Promise.all(
  //       uploadedImageLinks.map(async (link: any) => {
  //         return await image_db.create_images_db({ link, album: albumName });
  //       })
  //     );
  //     // Delete all files in uploads directory
  //     const uploadsDir = path.join(appRoot.path, "uploads");
  //     const uploadedFiles = await promisify(fs.readdir)(uploadsDir);
  //     await Promise.all(uploadedFiles.map((file: string) => deleteFile(path.join(uploadsDir, file))));
  //     return images;
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw new Error(error.message);
  //     }
  //   }
  // },
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
