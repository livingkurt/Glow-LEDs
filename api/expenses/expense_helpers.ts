import axios from "axios";
import fs from "fs";
import config from "../../config";
import path from "path";

export const normalizeExpenseFilters = (input: any) => {
  const output: any = {};
  Object.keys(input).forEach(key => {
    switch (key) {
      case "category":
        for (const category of input.category) {
          output["category"] = category;
        }
        break;
      case "card":
        for (const card of input.card) {
          output["card"] = card;
        }
        break;
      case "place_of_purchase":
        for (const place_of_purchase of input.place_of_purchase) {
          output["place_of_purchase"] = place_of_purchase;
        }
        break;

      default:
        break;
    }
  });
  return output;
};

export const normalizeExpenseSearch = (query: any) => {
  const search = query.search
    ? {
        expense_name: {
          $regex: query.search.toLowerCase(),
          $options: "i",
        },
      }
    : {};

  return search;
};

export const sanitizeExpenseName = (expenseName: string) => {
  return expenseName.trim().replace(/[:/\s]/g, "_");
};

export const downloadFile = async (url: any, filePath: any, expenseName: string) => {
  try {
    const dir = path.dirname(filePath);

    // If the directory does not exist, create it
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Get the response stream from axios request
    const response = await axios.get(url, { responseType: "stream" });

    // Check if the status is OK
    if (response.status === 200) {
      // Determine the file extension from the content-type header
      let extension = "";
      const contentType = response.headers["content-type"];
      if (contentType === "application/pdf") {
        extension = ".pdf";
      } else if (contentType === "image/jpeg") {
        extension = ".jpg";
      } else if (contentType === "image/png") {
        extension = ".png";
      } else if (contentType === "image/heic") {
        extension = ".heic";
      } else {
        // throw new Error(`Unsupported content type: ${contentType}`);
      }

      // Append the correct file extension to the file path
      const outputPath = filePath.endsWith(extension) ? filePath : filePath + extension;

      const writer = fs.createWriteStream(outputPath);
      response.data.pipe(writer);

      // return new Promise<void>((resolve, reject) => {
      //   writer.on("finish", async () => {
      //     if (extension === ".pdf") {
      //       const options = {
      //         density: 100,
      //         saveFilename: expenseName,
      //         savePath: dir,
      //         format: "png",
      //         width: 600,
      //         height: 600
      //       };

      //       const storeAsImage: any = fromPath(outputPath, options);

      //       try {
      //         await storeAsImage.bulk(-1);
      //         resolve();
      //       } catch (error) {
      //         console.error(`Failed to convert pdf to png: ${error}`);
      //         reject(error);
      //       }
      //     } else {
      //       resolve();
      //     }
      //   });
      //   writer.on("error", reject);
      // });
    } else {
      throw new Error(`Failed to download file with status code: ${response.status}`);
    }
  } catch (error) {
    console.error(`Failed to download file from url: ${url} with error: ${error}`);
    throw error;
  }
};

export const uploadToImgur = async (albumName: any, filePath: any) => {
  try {
    const albumResponse = await axios.post(
      "https://api.imgur.com/3/album",
      { title: albumName, privacy: "hidden" },
      {
        headers: { Authorization: `Client-ID ${config.IMGUR_ClIENT_ID}` },
      }
    );
    const album = albumResponse.data.data;
    const imgResponse = await axios.post("https://api.imgur.com/3/image", fs.createReadStream(filePath), {
      headers: {
        Authorization: `Client-ID ${config.IMGUR_ClIENT_ID}`,
        "Content-Type": "multipart/form-data",
      },
      params: { album: album.deletehash },
    });

    return imgResponse.data.data.link;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const deleteTempFile = (path: any) => {
  try {
    fs.unlink(path, err => {
      if (err) throw err;
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
