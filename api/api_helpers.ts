export const getSort = (sort_options: string[], querySort: string[]): any => {
  console.log({ querySort });
  const sortIndex = querySort ? parseInt(querySort[0]) : 1;
  const direction = querySort ? (querySort[1] === "asc" ? -1 : 1) : 1;
  const sort = sort_options[sortIndex] ? { [sort_options[sortIndex]]: direction } : { _id: -1 };
  return sort;
};

interface QueryObj {
  [key: string]: string[];
}

const normalizeFilters = (queryObj: QueryObj): Record<string, boolean> => {
  const convertedQuery: Record<string, boolean> = {};
  for (const key in queryObj) {
    if (Object.prototype.hasOwnProperty.call(queryObj, key)) {
      queryObj[key].forEach((value: string) => {
        const newKey = value.includes(".") ? value.replace(".", "_") : value;
        const finalKey = key !== "shipping" ? newKey : `${key}.${newKey}`;
        convertedQuery[finalKey] = true;
      });
    }
  }
  return convertedQuery;
};

export const getFilteredData = ({ query, sort_options, search_name, normalizeFilters }: any) => {
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

  const filter = query?.filters ? { ...normalizeFilters(JSON.parse(query.filters)), ...search, deleted: false } : search;
  console.log({ filter });
  const sort = getSort(sort_options, query?.sort);
  console.log({ sort });
  return { filter, sort, limit, page };
};
