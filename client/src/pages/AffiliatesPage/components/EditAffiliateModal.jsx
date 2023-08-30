import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { set_edit_affiliate_modal, set_affiliate } from "../../../slices/affiliateSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { useLocation } from "react-router-dom";
import { affiliateFormFields } from "./affiliateFormFields";
import { AppBar, Button, Grid, Tab, Tabs, Typography } from "@mui/material";
import GLTabPanel from "../../../shared/GlowLEDsComponents/GLTabPanel/GLTabPanel";

const EditAffiliateModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0);
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
  const today = new Date();

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
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
                  setTabIndex(newValue);
                }}
              >
                {affiliate?.sponsorMonthlyCheckins?.map((item, index) => {
                  return <Tab label={`${item.year} ${item.month}`} value={index} />;
                })}
              </Tabs>
            </AppBar>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                // Append a new sponsorMonthlyCheckin to the array
                const newSponsorMonthlyCheckins = affiliate?.sponsorMonthlyCheckins?.concat({
                  month: "Fake Month",
                  year: today.getFullYear(),
                  questionsConcerns: "",
                  numberOfCheckins: 0,
                });
                dispatch(set_affiliate({ sponsorMonthlyCheckins: newSponsorMonthlyCheckins }));
              }}
            >
              Add Checkin
            </Button>
          </Grid>
          <Grid item xs={12}>
            {affiliate?.sponsorMonthlyCheckins?.map((item, index) => {
              return (
                <GLTabPanel value={tabIndex} index={index}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {affiliate?.sponsorMonthlyCheckins?.map((item, index) => {
                        return (
                          <GLTabPanel value={tabIndex} index={index}>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
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
                              </Grid>
                              <Grid item xs={12}>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  fullWidth
                                  onClick={() => {
                                    const newSponsorMonthlyCheckins = affiliate?.sponsorMonthlyCheckins?.filter(
                                      (_, i) => i !== index
                                    );
                                    dispatch(set_affiliate({ sponsorMonthlyCheckins: newSponsorMonthlyCheckins }));
                                  }}
                                >
                                  Delete Checkin
                                </Button>
                              </Grid>
                              <Grid item xs={6}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  fullWidth
                                  onClick={() => {
                                    if (index > 0) {
                                      // if it's not the first element
                                      const newSponsorMonthlyCheckins = [...affiliate.sponsorMonthlyCheckins];
                                      [newSponsorMonthlyCheckins[index - 1], newSponsorMonthlyCheckins[index]] = [
                                        newSponsorMonthlyCheckins[index],
                                        newSponsorMonthlyCheckins[index - 1],
                                      ];
                                      dispatch(set_affiliate({ sponsorMonthlyCheckins: newSponsorMonthlyCheckins }));
                                      setTabIndex(index - 1);
                                    }
                                  }}
                                >
                                  Move Up
                                </Button>
                              </Grid>
                              <Grid item xs={6}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  fullWidth
                                  onClick={() => {
                                    if (index < affiliate.sponsorMonthlyCheckins.length - 1) {
                                      // if it's not the last element
                                      const newSponsorMonthlyCheckins = [...affiliate.sponsorMonthlyCheckins];
                                      [newSponsorMonthlyCheckins[index + 1], newSponsorMonthlyCheckins[index]] = [
                                        newSponsorMonthlyCheckins[index],
                                        newSponsorMonthlyCheckins[index + 1],
                                      ];
                                      dispatch(set_affiliate({ sponsorMonthlyCheckins: newSponsorMonthlyCheckins }));
                                      setTabIndex(index + 1);
                                    }
                                  }}
                                >
                                  Move Down
                                </Button>
                              </Grid>
                            </Grid>
                          </GLTabPanel>
                        );
                      })}
                    </Grid>
                  </Grid>
                </GLTabPanel>
              );
            })}
          </Grid>
        </Grid>
      </GLModal>
    </div>
  );
};

export default EditAffiliateModal;
