import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_article_modal, set_article } from "../../../slices/articleSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { snake_case } from "../../../utils/helper_functions";
import { articleFormFields } from "./articleFormFields";
import { useCategorysQuery, useUsersQuery } from "../../../api/allRecordsApi";

const EditArticleModal = () => {
  const dispatch = useDispatch();
  const articlePage = useSelector(state => state.articles.articlePage);
  const { edit_article_modal, article, loading } = articlePage;
  const { affiliate, title } = article;

  const generate_pathname = () => {
    return affiliate ? snake_case(`${title} by ${affiliate.artist_name}`) : "";
  };

  const tagsQuery = useCategorysQuery();
  const usersQuery = useUsersQuery();

  const formFields = articleFormFields({ tagsQuery, usersQuery });

  return (
    <div>
      <GLActionModal
        isOpen={edit_article_modal}
        onConfirm={() => {
          dispatch(API.saveArticle({ ...article, affiliate: affiliate._id, pathname: generate_pathname() }));
          dispatch(API.listAffiliates({ active: true }));
        }}
        onCancel={() => {
          dispatch(set_edit_article_modal(false));
        }}
        title={"Edit Article"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={article}
          onChange={value => dispatch(set_article(value))}
          loading={loading}
        />
      </GLActionModal>
    </div>
  );
};

export default EditArticleModal;
