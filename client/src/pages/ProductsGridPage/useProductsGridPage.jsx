import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useChipsQuery, useProductsGridQuery } from "../../api/allRecordsApi";
import * as API from "../../api";
import { toSnakeCase } from "./productGridPageHelpers";

export const useProductsGridPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [selectedTags, setSelectedTags] = useState(searchParams.getAll("tags[]"));
  const [selectedChip, setSelectedChip] = useState(searchParams.get("chip") || null);
  const [category, setCategory] = useState(searchParams.get("category") || null);
  const [sort, setSort] = useState(searchParams.get("sort") || null);

  const { current_user } = useSelector(state => state.users.userPage);
  const { data: currentContent } = API.useCurrentContentQuery();
  const { data: chips } = useChipsQuery();

  const {
    data: products,
    isLoading,
    isError,
  } = useProductsGridQuery({
    tags: selectedTags,
    category,
    chip: selectedChip,
    sort,
  });

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
    setSelectedTags(snakeCaseTags);
    updateUrl(snakeCaseTags, selectedChip, category, sort);
  };

  const handleChipChange = (event, newValue) => {
    setSelectedChip(newValue ? newValue.pathname : null);
    updateUrl(selectedTags, newValue ? newValue.pathname : null, category, sort);
  };

  const handleCategoryChange = (event, newCategory) => {
    setCategory(newCategory);
    updateUrl(selectedTags, selectedChip, newCategory, sort);
  };

  const handleSortChange = (event, newValue) => {
    setSort(newValue ? newValue.value : null);
    updateUrl(selectedTags, selectedChip, category, newValue ? newValue.value : null);
  };

  const updateUrl = (tags, chip, cat, sortValue) => {
    const newSearchParams = new URLSearchParams();
    tags.forEach(tag => newSearchParams.append("tags[]", tag));
    if (chip) newSearchParams.append("chip", chip);
    if (cat) newSearchParams.append("category", cat);
    if (sortValue) newSearchParams.append("sort", sortValue);
    navigate(`${location.pathname}?${newSearchParams.toString()}`);
  };

  return {
    selectedTags,
    selectedChip,
    category,
    sort,
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
  };
};
