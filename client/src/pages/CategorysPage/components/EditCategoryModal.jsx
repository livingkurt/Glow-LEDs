import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_category_modal, set_category } from "../../../slices/categorySlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { categoryFormFields } from "../categoryHelpers";

const EditCategoryModal = () => {
  const dispatch = useDispatch();
  const categoryPage = useSelector(state => state.categorys.categoryPage);
  const { edit_category_modal, category, loading, categorys } = categoryPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listAffiliates({ active: true }));
      dispatch(API.listCategorys());
    }
    return () => {
      clean = false;
    };
  }, [dispatch, category._id]);

  const formFields = categoryFormFields({ categorys });

  return (
    <div>
      <GLActionModal
        isOpen={edit_category_modal}
        onConfirm={() => {
          dispatch(API.saveCategory({ ...category }));
        }}
        onCancel={() => {
          dispatch(set_edit_category_modal(false));
        }}
        title="Edit Category"
        confirmLabel="Save"
        confirmColor="primary"
        cancelLabel="Cancel"
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={category}
          onChange={value => dispatch(set_category(value))}
          loading={loading}
        />
      </GLActionModal>
    </div>
  );
};

export default EditCategoryModal;
