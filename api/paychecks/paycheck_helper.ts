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
