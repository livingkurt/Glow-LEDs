import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { useCurrentContentQuery } from "../../../api";
import GLButtonV2 from "../../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import { EditContentModal } from "../../ContentsPage/components";
import { useDispatch, useSelector } from "react-redux";
import { open_edit_content_modal } from "../../../slices/contentSlice";

const ArticlePage = () => {
  const dispatch = useDispatch();
  const { pathname } = useParams();
  const [article, setArticle] = useState(null);

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const { data: content } = useCurrentContentQuery();

  useEffect(() => {
    if (content && content.learn && content.learn.articles) {
      const foundArticle = content.learn.articles.find(a => a.pathname === pathname);
      setArticle(foundArticle);
    }
  }, [content, pathname]);

  if (!article) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2" gutterBottom>
          {article.title}
        </Typography>
        {current_user.isAdmin && (
          <GLButtonV2 onClick={() => dispatch(open_edit_content_modal({ content, contentType: "learn" }))}>
            Edit Article
          </GLButtonV2>
        )}
      </Box>
      <Typography variant="subtitle1" gutterBottom>
        {article.subtitle}
      </Typography>
      {article.image && (
        <Box sx={{ my: 2 }}>
          <img src={article.image.url} alt={article.title} style={{ maxWidth: "100%", height: "auto" }} />
        </Box>
      )}
      <Box sx={{ mt: 4 }}>
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </Box>
      <EditContentModal />
    </Container>
  );
};

export default ArticlePage;
