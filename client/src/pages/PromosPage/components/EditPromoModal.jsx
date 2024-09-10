import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_promo_modal, set_promo } from "../../../slices/promoSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { promoFormFields } from "./promoFormFields";
import { useAffiliatesQuery, useUsersQuery, useCategorysQuery, useProductsQuery } from "../../../api/allRecordsApi";

const EditPromoModal = () => {
  const dispatch = useDispatch();
  const promoPage = useSelector(state => state.promos.promoPage);
  const { edit_promo_modal, promo } = promoPage;

  const affiliatesQuery = useAffiliatesQuery({ active: true });
  const usersQuery = useUsersQuery({});
  const categorysQuery = useCategorysQuery({});
  const productsQuery = useProductsQuery({ isVariation: false, hidden: false });

  const formFields = promoFormFields({
    affiliatesQuery,
    usersQuery,
    categorysQuery,
    productsQuery,
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
        title={"Edit Promo"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm formData={formFields} state={promo} onChange={value => dispatch(set_promo(value))} />
      </GLActionModal>
    </div>
  );
};

export default EditPromoModal;
