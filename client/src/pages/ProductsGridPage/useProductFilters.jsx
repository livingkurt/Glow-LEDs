import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useProductFilters = (params, location) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: params.category || "",
    subcategory: params.subcategory || "",
    collection: params.collection || "",
    search: "",
    sort: "",
    filter: "",
    page: 1,
    limit: 20,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setFilters(prevFilters => ({
      ...prevFilters,
      search: searchParams.get("search") || "",
      sort: searchParams.get("sort") || "",
      filter: searchParams.get("filter") || "",
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "20"),
    }));
  }, [location.search]);

  const updateFilters = newFilters => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters, ...newFilters };
      const searchParams = new URLSearchParams();

      Object.entries(updatedFilters).forEach(([key, value]) => {
        if (value && !["category", "subcategory", "collection"].includes(key)) {
          searchParams.set(key, value.toString());
        }
      });

      navigate({
        pathname: `/collections/${updatedFilters.category || "all"}/products`,
        search: searchParams.toString(),
      });

      return updatedFilters;
    });
  };

  const resetFilters = () => {
    setFilters(prevFilters => ({
      ...prevFilters,
      search: "",
      sort: "",
      filter: "",
      page: 1,
    }));
    navigate(`/collections/${filters.category || "all"}/products`);
  };

  return {
    ...filters,
    updateFilters,
    resetFilters,
  };
};
