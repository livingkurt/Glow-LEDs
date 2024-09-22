import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTutorialsGridQuery } from "../../api/allRecordsApi";
import { setSelectedCategorys, setSelectedLevel, setSort, updateFilters } from "./tutorialsGridPageSlice";
import { useCurrentContentQuery } from "../../api";

const useTutorialsGridPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedCategorys, selectedLevel, sort } = useSelector(state => state.tutorials.tutorialsGridPage);

  const { data: currentContent } = useCurrentContentQuery();

  const {
    data: tutorials,
    isLoading,
    isError,
    refetch,
  } = useTutorialsGridQuery({
    categorys: selectedCategorys,
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
    const newSelectedCategorys = searchParams.getAll("categorys[]");
    const newSelectedLevel = searchParams.get("level") || "";
    const newSort = searchParams.get("sort") || "";

    dispatch(
      updateFilters({
        categorys: newSelectedCategorys,
        level: newSelectedLevel,
        sort: newSort,
      })
    );

    refetch();
  }, [location, dispatch, refetch]);
  const allCategorys = useMemo(() => {
    if (!tutorials) return [];
    const categorySet = new Set();
    tutorials.forEach(tutorial => {
      tutorial.categorys.forEach(category => {
        categorySet.add(category.name);
      });
    });
    return Array.from(categorySet);
  }, [tutorials]);

  const handleCategoryChange = (event, newValue) => {
    dispatch(setSelectedCategorys(newValue));
    updateUrl(newValue, selectedLevel, sort);
  };

  const handleLevelChange = (event, newLevel) => {
    dispatch(setSelectedLevel(newLevel));
    updateUrl(selectedCategorys, newLevel, sort);
  };

  const handleSortChange = (event, newValue) => {
    const newSort = newValue ? newValue.value : null;
    dispatch(setSort(newSort));
    updateUrl(selectedCategorys || [], selectedLevel, newSort);
  };
  const updateUrl = (categorys, level, sortValue) => {
    const newSearchParams = new URLSearchParams();
    if (Array.isArray(categorys)) {
      categorys.forEach(category => newSearchParams.append("categorys[]", category));
    }
    if (level) newSearchParams.append("level", level);
    if (sortValue) newSearchParams.append("sort", sortValue);
    navigate(`${location.pathname}?${newSearchParams.toString()}`);
  };
  const clearAllFilters = () => {
    dispatch(setSelectedCategorys([]));
    dispatch(setSelectedLevel(null));
    dispatch(setSort(null));
    updateUrl([], null, null);
  };

  return {
    selectedCategorys,
    selectedLevel,
    sort,
    currentContent,
    tutorials,
    isLoading,
    isError,
    allCategorys,
    handleCategoryChange,
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
