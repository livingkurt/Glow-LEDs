import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_article_modal, open_edit_article_modal } from "../../slices/articleSlice";
import * as API from "../../api";

import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import EditArticleModal from "./components/EditArticleModal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ContentCopy from "@mui/icons-material/ContentCopy";

const ArticlesPage = () => {
  const articlePage = useSelector(state => state.articles.articlePage);
  const { loading, remoteVersionRequirement } = articlePage;

  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      {
        title: "Active",
        display: article => (
          <GLIconButton
            onClick={() => {
              dispatch(
                API.saveArticle({
                  ...article,
                  active: article.active ? false : true,
                })
              );
            }}
            tooltip={article.active ? "deactivate" : "activate"}
          >
            <GLBoolean boolean={article.active} />
          </GLIconButton>
        ),
      },
      { title: "Title", display: "title" },
      {
        title: "Author",
        display: article => (article?.author ? `${article?.author?.first_name} ${article?.author?.last_name}` : ""),
      },
      {
        title: "Order",
        display: row => Number(row.order),
        sortBy: row => Number(row.order),
        width: 100,
      },
      {
        title: "",
        nonSelectable: true,
        display: article => (
          <Box display="flex" justifyContent="flex-end">
            <GLIconButton
              tooltip="Edit"
              onClick={() => {
                dispatch(open_edit_article_modal(article));
              }}
            >
              <Edit color="white" />
            </GLIconButton>
            <GLIconButton
              tooltip="Duplicate"
              onClick={() =>
                dispatch(
                  API.saveArticle({
                    ...article,
                    _id: null,
                    title: article.title + " Copy",
                    pathname: article.pathname + "_copy",
                    createdAt: null,
                    updatedAt: null,
                  })
                )
              }
            >
              <ContentCopy color="white" />
            </GLIconButton>
            <GLIconButton onClick={() => dispatch(API.deleteArticle(article.pathname))} tooltip="Delete">
              <Delete color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],

    [dispatch]
  );

  const remoteApi = useCallback(options => API.getArticles(options), []);
  const remoteReorderApi = useCallback(options => API.reorderArticles(options), []);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>{"Admin Articles | Glow LEDs"}</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteReorderApi={remoteReorderApi}
        remoteVersionRequirement={remoteVersionRequirement}
        remoteVersionRequirementType="articles/setRemoteVersionRequirement"
        tableName="Articles"
        namespaceScope="articles"
        namespace="articleTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect
        enableDragDrop
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_article_modal())}>
            {"Create Article"}
          </Button>
        }
      />

      <EditArticleModal />
    </Container>
  );
};
export default ArticlesPage;
