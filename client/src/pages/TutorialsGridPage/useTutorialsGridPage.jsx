import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTutorialsGridQuery } from "../../api/allRecordsApi";
import { setSelectedTags, setSelectedLevel, setSort, updateFilters } from "./tutorialsGridPageSlice";
import { useCurrentContentQuery } from "../../api";
import { toSnakeCase } from "../ProductsGridPage/productGridPageHelpers";

const useTutorialsGridPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedTags, selectedLevel, sort } = useSelector(state => state.tutorials.tutorialsGridPage);

  const { data: currentContent } = useCurrentContentQuery();

  const {
    data: tutorials,
    isLoading,
    isError,
    refetch,
  } = useTutorialsGridQuery({
    tags: selectedTags,
    level: selectedLevel,
    sort,
  });

  const handleOpen = tutorial => {
    setSelectedTutorial(tutorial);
    setIsOpen(true);
  };

  const handleClose = () => {
    setSelectedTutorial(null);
    setIsOpen(false);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newSelectedTags = searchParams.getAll("tags[]");
    const newSelectedLevel = searchParams.get("level") || "";
    const newSort = searchParams.get("sort") || "";

    dispatch(
      updateFilters({
        tags: newSelectedTags,
        level: newSelectedLevel,
        sort: newSort,
      })
    );

    refetch();
  }, [location, dispatch, refetch]);
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
    updateUrl(snakeCaseTags, selectedLevel, sort);
  };

  const handleLevelChange = (event, newLevel) => {
    dispatch(setSelectedLevel(newLevel));
    updateUrl(selectedTags, newLevel, sort);
  };

  const handleSortChange = (event, newValue) => {
    const newSort = newValue ? newValue.value : null;
    dispatch(setSort(newSort));
    updateUrl(selectedTags || [], selectedLevel, newSort);
  };
  const updateUrl = (tags, level, sortValue) => {
    const newSearchParams = new URLSearchParams();
    tags.forEach(tag => newSearchParams.append("tags[]", tag));
    if (level) newSearchParams.append("level", level);
    if (sortValue) newSearchParams.append("sort", sortValue);
    navigate(`${location.pathname}?${newSearchParams.toString()}`);
  };
  const clearAllFilters = () => {
    dispatch(setSelectedTags([]));
    dispatch(setSelectedLevel(null));
    dispatch(setSort(null));
    updateUrl([], null, null);
  };

  return {
    selectedTags,
    selectedLevel,
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
    handleOpen,
    handleClose,
    isOpen,
    selectedTutorial,
  };
};

export default useTutorialsGridPage;
