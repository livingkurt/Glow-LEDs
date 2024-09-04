import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useChipsQuery, useProductsGridQuery } from "../../api/allRecordsApi";
import * as API from "../../api";
import { toSnakeCase } from "./productGridPageHelpers";
import {
  setSelectedTags,
  setSelectedChip,
  setCategory,
  setSort,
  setSearch,
  updateFilters,
} from "./productsGridPageSlice";

export const useProductsGridPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedTags, selectedChip, category, sort, search } = useSelector(state => state.products.productsGridPage);
  const { current_user } = useSelector(state => state.users.userPage);

  const { data: currentContent } = API.useCurrentContentQuery();
  const { data: chips } = useChipsQuery();

  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useProductsGridQuery({
    tags: selectedTags,
    category,
    chip: selectedChip,
    sort,
    search, // Add this line
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newSelectedTags = searchParams.getAll("tags[]");
    const newSelectedChip = searchParams.get("chip") || null;
    const newCategory = searchParams.get("category") || null;
    const newSort = searchParams.get("sort") || null;
    const newSearch = searchParams.get("search") || ""; // Add this line

    dispatch(
      updateFilters({
        tags: newSelectedTags,
        chip: newSelectedChip,
        category: newCategory,
        sort: newSort,
        search: newSearch, // Add this line
      })
    );

    refetch();
  }, [location, dispatch, refetch]);

  const allTags = useMemo(() => {
    if (!products) return [];
    const tagSet = new Set();
    products.forEach(product => {
      product.tags.forEach(tag => {
        if (current_user?.isWholesaler || tag.name.toLowerCase() !== "wholesale" || !tag.deleted) {
          tagSet.add(tag.name);
        }
      });
    });
    return Array.from(tagSet);
  }, [products, current_user?.isWholesaler]);

  const handleTagChange = (event, newValue) => {
    const snakeCaseTags = newValue.map(tag => toSnakeCase(tag));
    dispatch(setSelectedTags(snakeCaseTags));
    updateUrl(snakeCaseTags, selectedChip, category, sort, search);
  };

  const handleChipChange = (event, newValue) => {
    const newChip = newValue ? newValue.pathname : null;
    dispatch(setSelectedChip(newChip));
    updateUrl(selectedTags, newChip, category, sort, search);
  };

  const handleCategoryChange = (event, newCategory) => {
    dispatch(setCategory(newCategory));
    updateUrl(selectedTags, selectedChip, newCategory, sort, search);
  };

  const handleSortChange = (event, newValue) => {
    const newSort = newValue ? newValue.value : null;
    dispatch(setSort(newSort));
    updateUrl(selectedTags, selectedChip, category, newSort, search);
  };

  const handleSearchChange = newSearch => {
    dispatch(setSearch(newSearch));
    updateUrl(selectedTags, selectedChip, category, sort, newSearch);
  };

  const updateUrl = (tags, chip, cat, sortValue, searchValue) => {
    const newSearchParams = new URLSearchParams();
    tags.forEach(tag => newSearchParams.append("tags[]", tag));
    if (chip) newSearchParams.append("chip", chip);
    if (cat) newSearchParams.append("category", cat);
    if (sortValue) newSearchParams.append("sort", sortValue);
    if (searchValue) newSearchParams.append("search", searchValue);
    navigate(`${location.pathname}?${newSearchParams.toString()}`);
  };

  const clearAllFilters = () => {
    dispatch(setSelectedTags([]));
    dispatch(setSelectedChip(null));
    dispatch(setCategory(null));
    dispatch(setSort(null));
    dispatch(setSearch(""));
    updateUrl([], null, null, null, "");
  };

  return {
    selectedTags,
    selectedChip,
    category,
    sort,
    search,
    current_user,
    currentContent,
    chips,
    products,
    isLoading,
    isError,
    allTags,
    handleTagChange,
    handleChipChange,
    handleCategoryChange,
    handleSortChange,
    handleSearchChange,
    clearAllFilters,
  };
};
