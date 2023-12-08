import { Image, image_db } from "../images";
import { getFilteredData } from "../api_helpers";

import path from "path";
import appRoot from "app-root-path";
import {
  compressImage,
  convertDriveLinkToDirectLink,
  createImageRecords,
  createImgurAlbum,
  deleteImages,
  findImages,
  uploadImageToImgur,
} from "./image_helper";

// const client = new ImgurClient({ clientId: config.IMGUR_ClIENT_ID });

export default {
  findAll_images_s: async query => {
    try {
      const sort_options = ["createdAt", "album", "image", "link"];
      const { filter, sort, limit, page } = getFilteredData({ query, sort_options, search_name: "album" });
      const images = await image_db.findAll_images_db(filter, sort, limit, page);
      const count = await image_db.count_images_db(filter);
      return {
        data: images,
        total_count: count,
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_images_s: async params => {
    try {
      return await image_db.findById_images_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByLink_images_s: async body => {
    const { link, album } = body;
    const convertedLink = convertDriveLinkToDirectLink(link);
    try {
      const image = await Image.findOne({ link: convertedLink, deleted: false });
      if (image) {
        return image;
      } else if (!image) {
        // Create new image
        const newImage = await image_db.create_images_db({
          link: convertedLink,
          album: album,
        });
        console.log({ newImage });

        return newImage;
      }
    } catch (error) {
      console.log("Error:", error); // Log the error for debugging
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  upload_images_s: async (body, files) => {
    const { albumName } = body;
    const uploadedImageLinks = [];
    const uploadsDir = path.join(appRoot.path, "tmp");
    console.log({ uploadsDir });
    try {
      const album = await createImgurAlbum(albumName);

      for (const image of files) {
        const compressedImagePath = await compressImage(image.path, uploadsDir);
        const imageLink = await uploadImageToImgur(compressedImagePath, album.deletehash);
        uploadedImageLinks.push(imageLink);
      }

      const images = await createImageRecords(uploadedImageLinks, albumName);

      const uploadedFiles = await findImages(uploadsDir);
      await deleteImages(uploadedFiles, uploadsDir);

      return images;
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_images_s: async body => {
    try {
      return await image_db.create_images_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_images_s: async (params, body) => {
    try {
      return await image_db.update_images_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_images_s: async params => {
    try {
      return await image_db.remove_images_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_multiple_images_s: async body => {
    try {
      return await image_db.remove_multiple_images_db(body.ids);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
