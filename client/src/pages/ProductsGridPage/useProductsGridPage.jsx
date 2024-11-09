import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMicrolightsQuery, useProductsGridQuery } from "../../api/allRecordsApi";
import * as API from "../../api";
import { toSnakeCase } from "./productGridPageHelpers";
import {
  setSelectedTags,
  setSelectedMicrolight,
  setCategory,
  setSort,
  setSearch,
  updateFilters,
} from "./productsGridPageSlice";

export const useProductsGridPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedTags, selectedMicrolight, category, sort, search } = useSelector(
    state => state.products.productsGridPage
  );
  const { current_user } = useSelector(state => state.users.userPage);

  const { data: currentContent } = API.useCurrentContentQuery();
  const { data: microlights } = useMicrolightsQuery();

  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useProductsGridQuery({
    tags: selectedTags,
    category,
    microlight: selectedMicrolight,
    sort,
    search, // Add this line
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newSelectedTags = searchParams.getAll("tags[]");
    const newSelectedMicrolight = searchParams.get("microlight") || null;
    const newCategory = searchParams.get("category") || null;
    const newSort = searchParams.get("sort") || null;
    const newSearch = searchParams.get("search") || ""; // Add this line

    dispatch(
      updateFilters({
        tags: newSelectedTags,
        microlight: newSelectedMicrolight,
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
        if (current_user?.isWholesaler || tag.name.toLowerCase() !== "wholesale") {
          tagSet.add(tag.name);
        }
      });
    });
    return Array.from(tagSet);
  }, [products, current_user?.isWholesaler]);

  const handleTagChange = (event, newValue) => {
    const snakeCaseTags = newValue.map(tag => toSnakeCase(tag));
    dispatch(setSelectedTags(snakeCaseTags));
    updateUrl(snakeCaseTags, selectedMicrolight, category, sort, search);
  };

  const handleMicrolightChange = (event, newValue) => {
    const newMicrolight = newValue ? newValue.pathname : null;
    dispatch(setSelectedMicrolight(newMicrolight));
    updateUrl(selectedTags, newMicrolight, category, sort, search);
  };

  const handleCategoryChange = (event, newCategory) => {
    dispatch(setCategory(newCategory));
    updateUrl(selectedTags, selectedMicrolight, newCategory, sort, search);
  };

  const handleSortChange = (event, newValue) => {
    const newSort = newValue ? newValue.value : null;
    dispatch(setSort(newSort));
    updateUrl(selectedTags, selectedMicrolight, category, newSort, search);
  };

  const handleSearchChange = newSearch => {
    dispatch(setSearch(newSearch));
    updateUrl(selectedTags, selectedMicrolight, category, sort, newSearch);
  };

  const updateUrl = (tags, microlight, cat, sortValue, searchValue) => {
    const newSearchParams = new URLSearchParams();
    tags.forEach(tag => newSearchParams.append("tags[]", tag));
    if (microlight) newSearchParams.append("microlight", microlight);
    if (cat) newSearchParams.append("category", cat);
    if (sortValue) newSearchParams.append("sort", sortValue);
    if (searchValue) newSearchParams.append("search", searchValue);
    navigate(`${location.pathname}?${newSearchParams.toString()}`);
  };

  const clearAllFilters = () => {
    dispatch(setSelectedTags([]));
    dispatch(setSelectedMicrolight(null));
    dispatch(setCategory(null));
    dispatch(setSort(null));
    dispatch(setSearch(""));
    updateUrl([], null, null, null, "");
  };

  return {
    selectedTags,
    selectedMicrolight,
    category,
    sort,
    search,
    current_user,
    currentContent,
    microlights,
    products,
    isLoading,
    isError,
    allTags,
    handleTagChange,
    handleMicrolightChange,
    handleCategoryChange,
    handleSortChange,
    handleSearchChange,
    clearAllFilters,
  };
};
