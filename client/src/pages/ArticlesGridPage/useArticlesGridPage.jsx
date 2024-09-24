import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useArticlesGridQuery } from "../../api/allRecordsApi";
import {
  setSelectedTags,
  setSort,
  updateFilters,
  setSelectedAuthor,
  setSelectedArticle,
} from "./articlesGridPageSlice";
import { useCurrentContentQuery } from "../../api";
import { toSnakeCase } from "../ProductsGridPage/productGridPageHelpers";

const useArticlesGridPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedTags, sort, selectedAuthor, selectedArticle } = useSelector(state => state.articles.articlesGridPage);

  const { data: currentContent } = useCurrentContentQuery();

  const {
    data: articles,
    isLoading,
    isError,
    refetch,
  } = useArticlesGridQuery({
    tags: selectedTags,
    sort,
    author: selectedAuthor?.id,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newSelectedTags = searchParams.getAll("tags[]");
    const newSort = searchParams.get("sort") || "";
    const authorId = searchParams.get("author");

    dispatch(
      updateFilters({
        tags: newSelectedTags,
        sort: newSort,
        author: authorId,
      })
    );

    // Update selectedAuthor based on the URL parameter
    if (articles && authorId) {
      const matchingAuthor = articles.find(article => article.author._id === authorId)?.author;
      if (matchingAuthor) {
        dispatch(setSelectedAuthor(matchingAuthor));
      }
    }
    refetch();
  }, [location, dispatch, articles, refetch]);

  const handleOpen = article => {
    dispatch(setSelectedArticle(article));
    setIsOpen(true);
  };

  const handleClose = () => {
    dispatch(setSelectedArticle(null));
    setIsOpen(false);
  };

  const allTags = useMemo(() => {
    if (!articles) return [];
    const tagSet = new Set();
    articles.forEach(article => {
      article.tags.forEach(tag => {
        tagSet.add(tag.name);
      });
    });
    return Array.from(tagSet);
  }, [articles]);

  const allAuthors = useMemo(() => {
    if (!articles) return [];
    const authorSet = new Set();
    articles.forEach(article => {
      if (article.author) {
        authorSet.add(JSON.stringify(article.author));
      }
    });
    return Array.from(authorSet).map(authorString => JSON.parse(authorString));
  }, [articles]);

  const handleTagChange = (event, newValue) => {
    const snakeCaseTags = newValue.map(tag => toSnakeCase(tag));
    dispatch(setSelectedTags(snakeCaseTags));
    updateUrl(snakeCaseTags, sort, selectedAuthor?.id);
  };

  const handleSortChange = (event, newValue) => {
    const newSort = newValue ? newValue.value : null;
    dispatch(setSort(newSort));
    updateUrl(selectedTags || [], newSort, selectedAuthor?.id);
  };

  const handleAuthorChange = useCallback(
    (event, newValue) => {
      dispatch(setSelectedAuthor(newValue));
      updateUrl(selectedTags || [], sort, newValue?.id);
    },
    [dispatch, selectedTags, sort]
  );

  const updateUrl = useCallback(
    (tags, sortValue, authorId) => {
      const newSearchParams = new URLSearchParams();
      tags.forEach(tag => newSearchParams.append("tags[]", tag));
      if (sortValue) newSearchParams.append("sort", sortValue);
      if (authorId) newSearchParams.append("author", authorId);
      navigate(`${location.pathname}?${newSearchParams.toString()}`);
    },
    [location.pathname, navigate]
  );

  const clearAllFilters = () => {
    dispatch(setSelectedTags([]));
    dispatch(setSort(null));
    dispatch(setSelectedAuthor(null));
    updateUrl([], null, null);
  };

  return {
    selectedTags,
    selectedAuthor,
    sort,
    currentContent,
    articles,
    isLoading,
    isError,
    allTags,
    allAuthors,
    handleTagChange,
    handleSortChange,
    handleAuthorChange,
    clearAllFilters,
    handleOpen,
    handleClose,
    isOpen,
    selectedArticle,
  };
};

export default useArticlesGridPage;
