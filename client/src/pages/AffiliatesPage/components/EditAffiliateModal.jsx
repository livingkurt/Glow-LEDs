import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_affiliate_modal, set_affiliate, setCreateAffiliateStep } from "../../../slices/affiliateSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { useLocation } from "react-router-dom";
import { affiliateFormFields } from "./affiliateFormFields";
import GLStepperModal from "src/shared/GlowLEDsComponents/GLStepperModal/GLStepperModal";

const EditAffiliateModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { edit_affiliate_modal, affiliate, loading, createAffiliateStep } = affiliatePage;

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

  const stepLabels = ["Create Affiliate Account", "Create Stripe Account", "Join our Discord"];

  return (
    <div>
      {affiliate._id ? (
        <GLActionModal
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
          <GLForm
            formData={formFields}
            state={affiliate}
            onChange={value => dispatch(set_affiliate(value))}
            loading={loading && loading_users && loading_products && loading_chips && loading_promos}
          />
        </GLActionModal>
      ) : (
        <GLStepperModal
          isOpen={edit_affiliate_modal}
          step={createAffiliateStep}
          stepLabels={stepLabels}
          onConfirm={() => {
            if (createAffiliateStep === 2) {
              dispatch(set_edit_affiliate_modal(false));
              dispatch(API.listUsers());
            } else if (createAffiliateStep === 1) {
              dispatch(setCreateAffiliateStep(2));
            } else if (createAffiliateStep === 0) {
              dispatch(
                API.saveAffiliate({
                  affiliate: { ...affiliate, user: affiliate?.user?._id || current_user._id },
                  profile: location.pathname === "/secure/account/profile",
                })
              );
              dispatch(setCreateAffiliateStep(1));
            }
          }}
          onCancel={() => {
            if (createAffiliateStep === 2) {
              dispatch(setCreateAffiliateStep(1));
            } else if (createAffiliateStep === 1) {
              dispatch(setCreateAffiliateStep(0));
            } else if (createAffiliateStep === 0) {
              dispatch(set_edit_affiliate_modal(false));
            }
          }}
          title={"Edit Affiliate"}
          confirmLabel={createAffiliateStep === 0 || createAffiliateStep === 1 ? "Next" : "Complete"}
          cancelLabel={createAffiliateStep === 1 || createAffiliateStep === 2 ? "Back" : "Cancel"}
          // cancelLabel={"Cancel"}
          cancelColor="secondary"
          disableEscapeKeyDown
        >
          {createAffiliateStep === 0 && (
            <GLForm
              formData={formFields}
              state={affiliate}
              onChange={value => dispatch(set_affiliate(value))}
              loading={loading && loading_users && loading_products && loading_chips && loading_promos}
            />
          )}
        </GLStepperModal>
      )}
    </div>
  );
};

export default EditAffiliateModal;
