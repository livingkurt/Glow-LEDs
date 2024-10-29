import multer from "multer";
import path from "path";
import config from "../../config.js";
import axios from "axios";
import image_db from "./image_db.js";
import Jimp from "jimp";
import FormData from "form-data";

export const convertDriveLinkToDirectLink = shareLink => {
  // Check if the link is already a direct Google Drive link
  if (shareLink.includes("drive.google.com/uc?export=view&id=")) {
    return shareLink;
  }
  if (shareLink.includes("thumbs2.imgbox")) {
    return shareLink;
  }

  // Check if the link is a Google Drive share link
  if (shareLink.includes("drive.google.com")) {
    const fileIdPattern = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match = shareLink.match(fileIdPattern);

    if (match && match[1]) {
      const fileId = match[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  }

  // Check if the link is an imgbox link
  if (shareLink.includes("imgbox.com")) {
    const imgboxPattern = /imgbox\.com\/([a-zA-Z0-9_-]+)/;
    const match = shareLink.match(imgboxPattern);

    if (match && match[1]) {
      const imgId = match[1];
      return `https://thumbs2.imgbox.com/9d/61/${imgId}_t.jpg`;
    }
  }

  // Return the original link if it's not a Google Drive link or if the match failed
  return shareLink;
};

export const compressImage = async imageBuffer => {
  console.log("Starting image compression...");
  const jimpImage = await Jimp.read(imageBuffer);
  await jimpImage.resize(Jimp.AUTO, 800).quality(90);
  console.log("Image compression completed");
  return await jimpImage.getBufferAsync(Jimp.MIME_JPEG);
};

export const uploadImageToImgur = async (imageBuffer, albumDeletehash) => {
  console.log("Preparing image upload to Imgur...");
  const data = new FormData();
  data.append("image", imageBuffer, { filename: "image.jpg" });
  data.append("type", "image");
  data.append("title", "Simple upload");
  data.append("description", "This is a simple image upload in Imgur");

  const uploadImageToImgurConfig = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.imgur.com/3/image",
    headers: {
      Authorization: `Client-ID ${config.IMGUR_ClIENT_ID}`,
      ...data.getHeaders(),
    },
    params: { album: albumDeletehash },
    data: data,
  };

  try {
    console.log("Sending request to Imgur API...");
    const imgResponse = await axios(uploadImageToImgurConfig);
    console.log("Image uploaded successfully to Imgur");
    return imgResponse.data.data.link;
  } catch (error) {
    console.error("Error uploading image to Imgur:", error);
    throw new Error("Failed to upload image to Imgur");
  }
};

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 * 10 }, // 10 MB file size limit
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb(new Error("Error: Images only!"));
    }
  },
});

export const createImgurAlbum = async (albumName, imageHash) => {
  console.log(`Creating Imgur album: ${albumName}`);

  const data = new FormData();
  data.append("title", albumName);
  data.append("description", "This album contains images uploaded from the application.");

  if (imageHash) {
    data.append("cover", imageHash);
  }

  const createImgurAlbumConfig = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.imgur.com/3/album",
    headers: {
      Authorization: `Client-ID ${config.IMGUR_ClIENT_ID}`,
      ...data.getHeaders(),
    },
    data: data,
  };

  try {
    console.log("Sending request to create Imgur album...");
    const albumResponse = await axios(createImgurAlbumConfig);
    console.log("Imgur album created successfully");
    return albumResponse.data.data;
  } catch (error) {
    console.error("Error creating Imgur album:", error);
    throw new Error("Failed to create Imgur album");
  }
};

export const createImageRecords = async (uploadedImageLinks, albumName) => {
  console.log(`Creating ${uploadedImageLinks.length} image records in database...`);
  const createdRecords = await Promise.all(
    uploadedImageLinks.map(link => image_db.create_images_db({ link, album: albumName }))
  );
  console.log("Image records created successfully");
  return createdRecords;
};
