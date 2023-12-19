import multer from "multer";
import path from "path";
import config from "../../config";
const axios = require("axios");
import image_db from "./image_db";
const Jimp = require("jimp");

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
  const jimpImage = await Jimp.read(imageBuffer);
  await jimpImage.resize(Jimp.AUTO, 800).quality(90);
  return await jimpImage.getBufferAsync(Jimp.MIME_JPEG);
};

export const uploadImageToImgur = async (imageBuffer, albumDeletehash) => {
  const imgResponse = await axios.post("https://api.imgur.com/3/image", imageBuffer, {
    headers: {
      Authorization: `Client-ID ${config.IMGUR_ClIENT_ID}`,
      "Content-Type": "multipart/form-data",
    },
    params: { album: albumDeletehash },
  });
  return imgResponse.data.data.link;
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

export const createImgurAlbum = async albumName => {
  const albumResponse = await axios.post(
    "https://api.imgur.com/3/album",
    { title: albumName, privacy: "hidden" },
    {
      headers: { Authorization: `Client-ID ${config.IMGUR_ClIENT_ID}` },
    }
  );
  return albumResponse.data.data;
};

export const createImageRecords = async (uploadedImageLinks, albumName) => {
  return await Promise.all(uploadedImageLinks.map(link => image_db.create_images_db({ link, album: albumName })));
};
