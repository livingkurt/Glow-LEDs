import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export const getSort = (sort_options: string[], querySort: string[]): any => {
  const sortIndex = querySort ? parseInt(querySort[0]) : 1;
  const direction = querySort ? (querySort[1] === "asc" ? -1 : 1) : 1;
  const sort = sort_options[sortIndex] ? { [sort_options[sortIndex]]: direction } : { _id: -1 };
  return sort;
};

export const getFilteredData = ({ query, sort_options, search_name }: { query: any; sort_options: string[]; search_name: string }) => {
  const page = query.page || "1";
  const limit = query.limit || "0";
  const search = query.search
    ? {
        [search_name]: {
          $regex: query.search,
          $options: "i"
        }
      }
    : {};
  const filter = query?.filters ? { ...JSON.parse(query?.filters), ...search } : search;
  const sort = getSort(sort_options, query?.sort);
  return { filter, sort, limit, page };
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const fileName = uuidv4() + fileExtension;
    cb(null, fileName);
  }
});

// Set up multer middleware for handling file uploads
export const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // 10 MB file size limit
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (mimeType && extName) {
      return cb(null, true);
    }
    //  else {
    //   cb("Error: Images only!");
    // }
  }
});
