import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { detailsArticle } from "../../../api";
import GLButtonV2 from "../../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import { useDispatch, useSelector } from "react-redux";
import EditArticleModal from "../../ArticlesPage/components/EditArticleModal";
import { open_edit_article_modal } from "../../../slices/articleSlice";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";
import ArticlePageSkeleton from "./components/ArticlePageSkeletons";

const ArticlePage = () => {
  const dispatch = useDispatch();
  const { pathname } = useParams();

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const articlePage = useSelector(state => state.articles.articlePage);
  const { article, loading } = articlePage;

  useEffect(() => {
    dispatch(detailsArticle(pathname));
  }, [dispatch, pathname]);

  if (loading) {
    return <ArticlePageSkeleton />;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Link to="/learn">
          <GLButtonV2>Back to Articles</GLButtonV2>
        </Link>
        {current_user.isAdmin && (
          <GLButtonV2 onClick={() => dispatch(open_edit_article_modal(article))}>Edit Article</GLButtonV2>
        )}
      </Box>
      <Typography variant="h4" gutterBottom>
        {article.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {article.subtitle}
      </Typography>
      {article.image && (
        <Box sx={{ my: 2 }}>
          <GLLazyImage
            src={article.image.link}
            alt={article.title}
            style={{ maxWidth: "100%", height: "auto", borderRadius: "20px" }}
          />
        </Box>
      )}
      <Box sx={{ mt: 4 }}>
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </Box>
      <EditArticleModal />
    </Container>
  );
};

export default ArticlePage;
