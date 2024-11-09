import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_promo_modal, set_promo } from "../../../slices/promoSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { promoFormFields } from "./promoFormFields";
import { useAffiliatesQuery, useTagsQuery, useProductsQuery, useUsersQuery } from "../../../api/allRecordsApi";

const EditPromoModal = () => {
  const dispatch = useDispatch();
  const promoPage = useSelector(state => state.promos.promoPage);
  const { edit_promo_modal, promo, loading } = promoPage;

  const { data: affiliates, isLoading: loadingAffiliates } = useAffiliatesQuery({ active: true });
  const { data: users, isLoading: loadingUsers } = useUsersQuery({});
  const { data: tags, isLoading: loadingTags } = useTagsQuery({});
  const { data: products, isLoading: loadingProducts } = useProductsQuery({});

  const formFields = promoFormFields({
    affiliates: loadingAffiliates ? [] : affiliates || [],
    users: loadingUsers ? [] : users || [],
    tags: loadingTags ? [] : tags || [],
    products: loadingProducts ? [] : products || [],
  });
  return (
    <div>
      <GLActionModal
        isOpen={edit_promo_modal}
        onConfirm={() => {
          dispatch(API.savePromo(promo));
        }}
        onCancel={() => {
          dispatch(set_edit_promo_modal(false));
        }}
        title="Edit Promo"
        confirmLabel="Save"
        confirmColor="primary"
        cancelLabel="Cancel"
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm formData={formFields} state={promo} onChange={value => dispatch(set_promo(value))} loading={loading} />
      </GLActionModal>
    </div>
  );
};

export default EditPromoModal;
