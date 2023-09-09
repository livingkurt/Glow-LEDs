import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActiionModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { set_edit_affiliate_modal, set_affiliate } from "../../../slices/affiliateSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { useLocation } from "react-router-dom";
import { affiliateFormFields } from "./affiliateFormFields";

const EditAffiliateModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { edit_affiliate_modal, affiliate, loading } = affiliatePage;

  const userPage = useSelector(state => state.users.userPage);
  const { users, loading: loading_users, current_user } = userPage;

  const productsPage = useSelector(state => state.products.productsPage);
  const { products, loading: loading_products } = productsPage;

  const chipPage = useSelector(state => state.chips);
  const { chips, loading: loading_chips } = chipPage;

  const promoPage = useSelector(state => state.promos.promoPage);
  const { promos, loading: loading_promos } = promoPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listUsers({}));
      dispatch(API.listProducts({ option: false, hidden: false }));
      dispatch(API.listPromos({}));
      dispatch(API.listChips({}));
    }
    return () => (clean = false);
  }, [dispatch]);

  const formFields = affiliateFormFields({
    products,
    users,
    chips,
    promos,
  });

  return (
    <div>
      <GLActiionModal
        isOpen={edit_affiliate_modal}
        onConfirm={() => {
          dispatch(
            API.saveAffiliate({
              affiliate: { ...affiliate, user: affiliate?.user?._id || current_user._id },
              profile: location.pathname === "/secure/account/profile",
            })
          );
          dispatch(API.listUsers());
        }}
        onCancel={() => {
          dispatch(set_edit_affiliate_modal(false));
        }}
        title={"Edit Affiliate"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        {/* <Grid container spacing={2}>
          <Grid item xs={12}> */}
        <GLForm
          formData={formFields}
          state={affiliate}
          onChange={value => dispatch(set_affiliate(value))}
          loading={loading && loading_users && loading_products && loading_chips && loading_promos}
        />
      </GLActiionModal>
    </div>
  );
};

export default EditAffiliateModal;
