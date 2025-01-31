import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useProductBundlesQuery } from "../../api/allRecordsApi";
import { setSelectedTags, setSelectedAffiliate, setSort, updateFilters } from "./productBundlesGridPageSlice";

export const useProductBundlesGridPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedTags, selectedAffiliate, sort } = useSelector(state => state.carts.productBundlesGridPage);

  const {
    data: bundles,
    isLoading,
    isError,
    refetch,
  } = useProductBundlesQuery({
    tags: selectedTags,
    affiliate: selectedAffiliate,
    sort,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newSelectedTags = searchParams.getAll("tags[]");
    const newSelectedAffiliate = searchParams.get("affiliate") || null;
    const newSort = searchParams.get("sort") || null;

    dispatch(
      updateFilters({
        tags: newSelectedTags,
        affiliate: newSelectedAffiliate,
        sort: newSort,
      })
    );

    refetch();
  }, [location, dispatch, refetch]);

  const allTags = useMemo(() => {
    if (!bundles) return [];
    const tagSet = new Set();
    bundles.forEach(bundle => {
      bundle.tags.forEach(tag => {
        tagSet.add(tag.name);
      });
    });
    return Array.from(tagSet);
  }, [bundles]);

  const allAffiliates = useMemo(() => {
    if (!bundles) return [];
    const affiliateSet = new Set();
    bundles.forEach(bundle => {
      if (bundle.affiliate) {
        affiliateSet.add(bundle.affiliate.pathname);
      }
    });
    return Array.from(affiliateSet)
      .map(pathname => {
        return bundles.find(bundle => bundle.affiliate?.pathname === pathname)?.affiliate;
      })
      .filter(Boolean);
  }, [bundles]);

  const handleTagChange = (event, newValue) => {
    dispatch(setSelectedTags(newValue));
    updateUrl(newValue, selectedAffiliate, sort);
  };

  const handleAffiliateChange = (event, newValue) => {
    const affiliateName = newValue ? newValue.pathname : null;
    dispatch(setSelectedAffiliate(affiliateName));
    updateUrl(selectedTags, affiliateName, sort);
  };

  const handleSortChange = (event, newValue) => {
    const newSort = newValue ? newValue.value : null;
    dispatch(setSort(newSort));
    updateUrl(selectedTags, selectedAffiliate, newSort);
  };

  const updateUrl = (tags, affiliate, sortValue) => {
    const newSearchParams = new URLSearchParams();
    tags.forEach(tag => newSearchParams.append("tags[]", tag));
    if (affiliate) newSearchParams.append("affiliate", affiliate);
    if (sortValue) newSearchParams.append("sort", sortValue);
    navigate(`${location.pathname}?${newSearchParams.toString()}`);
  };

  const clearAllFilters = () => {
    dispatch(setSelectedTags([]));
    dispatch(setSelectedAffiliate(null));
    dispatch(setSort(null));
    updateUrl([], null, null);
  };

  return {
    selectedTags,
    selectedAffiliate,
    sort,
    bundles,
    isLoading,
    isError,
    allTags,
    handleTagChange,
    handleAffiliateChange,
    handleSortChange,
    clearAllFilters,
    allAffiliates,
  };
};
