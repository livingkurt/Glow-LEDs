import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_affiliate_modal, set_affiliate, setCreateAffiliateStep } from "../../../slices/affiliateSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { affiliateFormFields } from "./affiliateFormFields";
import { Box, Typography } from "@mui/material";
import GLStepperModal from "../../../shared/GlowLEDsComponents/GLStepperModal/GLStepperModal";
import { Loading } from "../../../shared/SharedComponents";

const EditAffiliateModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let { id } = useParams();
  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { edit_affiliate_modal, affiliate, loading, createAffiliateStep, stripeAccountLink, loadingSaveAffiliate } =
    affiliatePage;

  const userPage = useSelector(state => state.users.userPage);
  const { users, loading: loading_users, current_user } = userPage;

  const productsPage = useSelector(state => state.products.productsPage);
  const { products, loading: loading_products } = productsPage;

  const chipPage = useSelector(state => state.chips.chipPage);
  const { chips, loading: loading_chips } = chipPage;

  const promoPage = useSelector(state => state.promos.promoPage);
  const { promos, loading: loading_promos } = promoPage;

  const [searchParams] = useSearchParams();
  const stripeSuccess = searchParams.get("stripe_success") === "true";

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listUsers({}));
      dispatch(API.listProducts({ option: false, hidden: false }));
      dispatch(API.listPromos({}));
      dispatch(API.listChips({}));
      // Check for stripe_success=true
      if (stripeSuccess) {
        dispatch(set_edit_affiliate_modal(true)); // Open the modal
        dispatch(setCreateAffiliateStep(2)); // Set the step to 3 (zero-indexed)
      }
    }
    return () => (clean = false);
  }, [dispatch, stripeSuccess]);

  const formFields = affiliateFormFields({
    products,
    users,
    chips,
    promos,
  });

  const stepLabels = ["Create Affiliate Account", "Create Stripe Account", "Join our Discord", "Complete"];

  const determineConfirmLabel = () => {
    if (createAffiliateStep === 0) {
      return "Create Affiliate Account";
    } else if (createAffiliateStep === 1) {
      return "Create Stripe Account";
    } else if (createAffiliateStep === 2) {
      return "Join our Discord";
    } else if (createAffiliateStep === 3) {
      return "Complete";
    }
  };
  const determineOnConfirm = () => {
    if (createAffiliateStep === 0) {
      dispatch(
        API.saveAffiliate({
          affiliate: { ...affiliate, user: affiliate?.user?._id || current_user._id },
          profile: location.pathname === "/secure/account/profile",
        })
      );
    } else if (createAffiliateStep === 1) {
      window.open(stripeAccountLink, "_blank"); // Navigate to Stripe
      dispatch(setCreateAffiliateStep(2));
    } else if (createAffiliateStep === 2) {
      window.open("https://discord.gg/dftpMYsart", "_blank"); // Navigate to Discord
      dispatch(setCreateAffiliateStep(3));
      navigate(location.pathname);
    } else if (createAffiliateStep === 3) {
      dispatch(set_edit_affiliate_modal(false));
      dispatch(API.saveStripeAccount(id || current_user._id));
      dispatch(API.detailsUser(id || current_user._id));
    }
  };

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
            dispatch(API.detailsUser(id || current_user._id));
            dispatch(set_edit_affiliate_modal(false));
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
            mode="edit"
            onChange={value => dispatch(set_affiliate(value))}
            loading={loading && loading_users && loading_products && loading_chips && loading_promos}
          />
        </GLActionModal>
      ) : (
        <GLStepperModal
          isOpen={edit_affiliate_modal}
          step={createAffiliateStep}
          stepLabels={stepLabels}
          onConfirm={determineOnConfirm}
          onCancel={() => {
            if (createAffiliateStep === 0) {
              dispatch(set_edit_affiliate_modal(false));
            }
          }}
          title={"Create Affiliate"}
          confirmLabel={determineConfirmLabel()}
          cancelLabel={
            createAffiliateStep === 1 || createAffiliateStep === 2 || createAffiliateStep === 3 ? "" : "Cancel"
          }
          cancelDisabled={stripeSuccess}
          cancelColor="secondary"
          disableEscapeKeyDown
        >
          <Loading loading={loadingSaveAffiliate} />
          {createAffiliateStep === 0 && (
            <GLForm
              formData={formFields}
              state={affiliate}
              mode="create"
              onChange={value => dispatch(set_affiliate(value))}
              loading={loading && loading_users && loading_products && loading_chips && loading_promos}
            />
          )}
          {createAffiliateStep === 1 && (
            <Box sx={{ padding: 3, marginBottom: 2 }}>
              <Typography variant="h6" gutterBottom>
                Create Your Stripe Account
              </Typography>
              <Typography variant="body1" paragraph>
                In order to receive commissions from your affiliate sales, you'll need to create a Stripe account. This
                is a quick and secure process.
              </Typography>
            </Box>
          )}
          {createAffiliateStep === 2 && (
            <Box sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>
                Join our Glow LEDs Discord Community
              </Typography>
              <Typography variant="body1" paragraph>
                Be a part of our vibrant community on Discord! Engage with fellow affiliates, get updates, and share
                your experiences.
              </Typography>
              <Typography variant="body1" paragraph>
                Once completed Navigate back to this page and click the "Complete" button.
              </Typography>
            </Box>
          )}
          {createAffiliateStep === 3 && (
            <Box sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>
                Welcome to the Glow LEDs Affiliate Team!
              </Typography>
              <Typography variant="body1" paragraph>
                You're all set! You can now start earning commissions on your sales.
              </Typography>
              <Typography variant="body1" paragraph>
                If you have any questions, please reach out to us on Discord.
              </Typography>
            </Box>
          )}
        </GLStepperModal>
      )}
    </div>
  );
};

export default EditAffiliateModal;
