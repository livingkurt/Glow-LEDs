import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_content_modal, set_content } from "../../../slices/contentSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { contentFormFields } from "./contentFormFields";
import { useCategorysQuery, useProductsQuery } from "../../../api/allRecordsApi";
import { useEffect } from "react";

const EditContentModal = () => {
  const dispatch = useDispatch();
  const contentPage = useSelector(state => state.contents.contentPage);
  const { edit_content_modal, content, loading, contentType } = contentPage;
  const { data: products } = useProductsQuery({ option: false, hidden: false });
  const { data: categorys } = useCategorysQuery();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listCategorys());
    }
    return () => {
      clean = false;
    };
  }, [dispatch]);

  const formFields = contentFormFields({
    content,
    products,
    categorys,
  });

  const getFormData = () => {
    if (contentType === "") {
      return formFields;
    } else if (Array.isArray(content[contentType])) {
      return {
        [contentType]: {
          type: "array",
          title: contentType,
          itemSchema: {
            type: "object",
            fields: formFields[contentType].itemSchema.fields,
          },
        },
      };
    } else {
      return { [contentType]: formFields[contentType] };
    }
  };

  const getFormState = () => {
    return contentType !== "" ? { [contentType]: content[contentType] } : content;
  };

  return (
    <div>
      <GLActionModal
        isOpen={edit_content_modal}
        onConfirm={() => {
          dispatch(API.saveContent(content));
        }}
        onCancel={() => {
          dispatch(set_edit_content_modal(false));
        }}
        title={"Edit Content"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={getFormData()}
          state={getFormState()}
          onChange={value => {
            dispatch(set_content(value));
          }}
          loading={loading}
        />
      </GLActionModal>
    </div>
  );
};

export default EditContentModal;
