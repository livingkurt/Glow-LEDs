import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_promo_modal, set_promo } from "../../../slices/promoSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { promoFormFields } from "./promoFormFields";

const EditPromoModal = () => {
  const dispatch = useDispatch();
  const promoPage = useSelector(state => state.promos.promoPage);
  const { edit_promo_modal, promo, loading } = promoPage;
  const { affiliate, user, promo_code } = promo;

  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { affiliates, loading: loading_affiliates } = affiliatePage;

  const userPage = useSelector(state => state.users.userPage);
  const { users, loading: loading_users } = userPage;

  const categoryPage = useSelector(state => state.categorys.categoryPage);
  const { categorys, loading: loading_categorys } = categoryPage;

  const productsPage = useSelector(state => state.products.productsPage);
  const { products, loading: loading_products } = productsPage;
  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listAffiliates({ active: true }));
      dispatch(API.listUsers({}));
      dispatch(API.listProducts({}));
      dispatch(API.listCategorys({}));
    }
    return () => {
      clean = false;
    };
  }, [dispatch, promo._id]);

  const formFields = promoFormFields({
    affiliates,
    users,
    categorys,
    products,
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
        <GLForm
          formData={formFields}
          state={promo}
          onChange={value => dispatch(set_promo(value))}
          loading={loading && loading_affiliates && loading_users && loading_categorys && loading_products}
        />
      </GLActionModal>
    </div>
  );
};

export default EditPromoModal;
