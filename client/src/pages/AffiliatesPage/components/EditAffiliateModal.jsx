import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { set_edit_affiliate_modal, set_affiliate } from "../../../slices/affiliateSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { useLocation } from "react-router-dom";
import { affiliateFormFields } from "./affiliateFormFields";
import { setTabIndex } from "../../DashboardPage/dashboardSlice";
import { AppBar, Tab, Tabs, Typography } from "@mui/material";
import GLTabPanel from "../../../shared/GlowLEDsComponents/GLTabPanel/GLTabPanel";

const EditAffiliateModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0);
  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { edit_affiliate_modal, affiliate, loading } = affiliatePage;

  const userPage = useSelector(state => state.users.userPage);
  const { users, loading: loading_users, current_user } = userPage;

  const productPage = useSelector(state => state.products.productPage);
  const { products, loading: loading_products } = productPage;

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
      <GLModal
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
        <Typography component="h4" variant="h4" sx={{ mb: 2 }}>
          {formFields.sponsorMonthlyCheckins.title}
        </Typography>

        <AppBar position="sticky" color="transparent">
          <Tabs
            value={tabIndex}
            className="jc-b"
            onChange={(e, newValue) => {
              dispatch(setTabIndex(newValue));
            }}
          >
            {affiliate?.sponsorMonthlyCheckins?.map((item, index) => {
              return <Tab label={item.month} value={index} />;
            })}
          </Tabs>
        </AppBar>
        {affiliate?.sponsorMonthlyCheckins?.map((item, index) => {
          return (
            <GLTabPanel value={tabIndex} index={index}>
              <GLForm
                formData={formFields.sponsorMonthlyCheckins.fields}
                state={item}
                onChange={value => {
                  const sponsorMonthlyCheckins = affiliate?.sponsorMonthlyCheckins?.map((item, i) => {
                    if (i === index) {
                      return { ...item, ...value };
                    } else {
                      return item;
                    }
                  });
                  dispatch(set_affiliate({ sponsorMonthlyCheckins }));
                }}
                loading={loading && loading_users}
              />
            </GLTabPanel>
          );
        })}
      </GLModal>
    </div>
  );
};

export default EditAffiliateModal;
