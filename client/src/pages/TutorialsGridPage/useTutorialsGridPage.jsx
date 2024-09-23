import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTutorialsGridQuery, useAffiliatesQuery } from "../../api/allRecordsApi";
import {
  setSelectedTags,
  setSelectedLevel,
  setSort,
  updateFilters,
  setSelectedGlover,
  setSelectedTutorial,
} from "./tutorialsGridPageSlice";
import { useCurrentContentQuery } from "../../api";
import { toSnakeCase } from "../ProductsGridPage/productGridPageHelpers";

const useTutorialsGridPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedTags, selectedLevel, sort, selectedGlover, selectedTutorial } = useSelector(
    state => state.tutorials.tutorialsGridPage
  );

  const { data: currentContent } = useCurrentContentQuery();

  const { data: affiliates, isLoading: isLoadingAffiliates } = useAffiliatesQuery({ sponsor: true });

  // Get the glover pathname directly from the URL
  const searchParams = new URLSearchParams(location.search);
  const gloverPathname = searchParams.get("glover") || "";

  const {
    data: tutorials,
    isLoading,
    isError,
    refetch,
  } = useTutorialsGridQuery({
    tags: selectedTags,
    level: selectedLevel,
    sort,
    glover: gloverPathname || selectedGlover?.pathname,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newSelectedTags = searchParams.getAll("tags[]");
    const newSelectedLevel = searchParams.get("level") || "";
    const newSort = searchParams.get("sort") || "";
    const gloverPathname = searchParams.get("glover") || "";

    dispatch(
      updateFilters({
        tags: newSelectedTags,
        level: newSelectedLevel,
        sort: newSort,
        glover: gloverPathname,
      })
    );

    // Update selectedGlover based on the URL parameter
    if (affiliates && gloverPathname) {
      const matchingAffiliate = affiliates.find(affiliate => affiliate.pathname === gloverPathname);
      if (matchingAffiliate) {
        dispatch(setSelectedGlover(matchingAffiliate));
      }
    }
    refetch();
  }, [location, dispatch, affiliates, refetch]);

  const handleOpen = tutorial => {
    dispatch(setSelectedTutorial(tutorial));
    setIsOpen(true);
  };

  const handleClose = () => {
    dispatch(setSelectedTutorial(null));
    setIsOpen(false);
  };

  const allTags = useMemo(() => {
    if (!tutorials) return [];
    const tagSet = new Set();
    tutorials.forEach(tutorial => {
      tutorial.tags.forEach(tag => {
        tagSet.add(tag.name);
      });
    });
    return Array.from(tagSet);
  }, [tutorials]);

  const handleTagChange = (event, newValue) => {
    const snakeCaseTags = newValue.map(tag => toSnakeCase(tag));
    dispatch(setSelectedTags(snakeCaseTags));
    updateUrl(snakeCaseTags, selectedLevel, sort, selectedGlover);
  };

  const handleLevelChange = (event, newLevel) => {
    dispatch(setSelectedLevel(newLevel));
    updateUrl(selectedTags, newLevel, sort, selectedGlover);
  };

  const handleSortChange = (event, newValue) => {
    const newSort = newValue ? newValue.value : null;
    dispatch(setSort(newSort));
    updateUrl(selectedTags || [], selectedLevel, newSort, selectedGlover);
  };
  const updateUrl = useCallback(
    (tags, level, sortValue, glover) => {
      const newSearchParams = new URLSearchParams();
      tags.forEach(tag => newSearchParams.append("tags[]", tag));
      if (level) newSearchParams.append("level", level);
      if (glover) newSearchParams.append("glover", glover);
      if (sortValue) newSearchParams.append("sort", sortValue);
      navigate(`${location.pathname}?${newSearchParams.toString()}`);
    },
    [location.pathname, navigate]
  );

  const handleGloverChange = useCallback(
    (event, newValue) => {
      dispatch(setSelectedGlover(newValue));
      updateUrl(selectedTags || [], selectedLevel, sort, newValue?.pathname);
    },
    [dispatch, selectedTags, selectedLevel, sort, updateUrl]
  );
  const clearAllFilters = () => {
    dispatch(setSelectedTags([]));
    dispatch(setSelectedLevel(null));
    dispatch(setSort(null));
    dispatch(setSelectedGlover(null));
    updateUrl([], null, null, null);
  };

  useEffect(() => {
    if (affiliates && !isLoadingAffiliates) {
      const searchParams = new URLSearchParams(location.search);
      const gloverPathname = searchParams.get("glover");

      if (gloverPathname && !selectedGlover) {
        const matchingAffiliate = affiliates.find(affiliate => affiliate.pathname === gloverPathname);
        if (matchingAffiliate) {
          dispatch(setSelectedGlover(matchingAffiliate));
        }
      }
    }
  }, [affiliates, isLoadingAffiliates, location, dispatch, selectedGlover]);

  return {
    selectedTags,
    selectedLevel,
    selectedGlover,
    sort,
    currentContent,
    tutorials,
    isLoading,
    isError,
    allTags,
    handleTagChange,
    handleLevelChange,
    handleSortChange,
    clearAllFilters,
    handleGloverChange,
    handleOpen,
    handleClose,
    isOpen,
    selectedTutorial,
  };
};

export default useTutorialsGridPage;
