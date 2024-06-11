import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_content_modal, set_content } from "../../../slices/contentSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { contentFormFields } from "./contentFormFields";
import { useProductsQuery } from "../../../api/allRecordsApi";

const EditContentModal = () => {
  const dispatch = useDispatch();
  const contentPage = useSelector(state => state.contents.contentPage);
  const { edit_content_modal, content, loading } = contentPage;
  const { data: products, isLoading, isError } = useProductsQuery({ option: false });
  // const productPage = useSelector(state => state.products.productPage);
  // const { products } = productPage;

  const formFields = contentFormFields({
    content,
    products,
  });

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
          formData={formFields}
          state={content}
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
