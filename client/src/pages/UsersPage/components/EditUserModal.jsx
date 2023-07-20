import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { set_edit_user_modal, set_user } from "../../../slices/userSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { toCapitalize } from "../../../utils/helper_functions";

const EditUserModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const userPage = useSelector(state => state.users.userPage);
  const { edit_user_modal, user, loading } = userPage;

  const { affiliate } = user;
  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { affiliates, loading: loading_affiliates } = affiliatePage;

  const wholesalerPage = useSelector(state => state.wholesalers.wholesalerPage);
  const { wholesalers, loading: loading_wholesalers } = wholesalerPage;

  const promoPage = useSelector(state => state.promos.promoPage);
  const { promos, loading: loading_promos } = promoPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listAffiliates({ active: true, limit: 0, page: 0 }));
      dispatch(API.listWholesalers());
      dispatch(API.listPromos({}));
    }
    return () => {
      clean = false;
    };
  }, [dispatch]);

  const formFields = {
    first_name: {
      type: "text",
      label: "First Name",
      required: true
    },
    last_name: {
      type: "text",
      label: "Last Name",
      required: true
    },
    email: {
      type: "email",
      label: "Email",
      required: true
    },
    stripe_connect_id: {
      type: "text",
      label: "Stripe Connect ID",
      permissions: ["admin"]
    },
    isAdmin: {
      type: "checkbox",
      label: "Is Admin",
      permissions: ["admin"]
    },
    isVerified: {
      type: "checkbox",
      label: "Is Verified",
      permissions: ["admin"]
    },
    is_affiliated: {
      type: "checkbox",
      label: "Is Affiliated",
      permissions: ["admin"]
    },
    is_employee: {
      type: "checkbox",
      label: "Is Employee",
      permissions: ["admin"]
    },
    weekly_wage: {
      type: "number",
      label: "Weekly Wage",
      permissions: ["admin"]
    },
    affiliate: {
      type: "autocomplete_single",
      label: "Affiliates",
      options: affiliates,
      labelProp: "affiliate",
      getOptionLabel: option => option.artist_name,
      permissions: ["admin"]
    },
    t_shirt_size: {
      type: "autocomplete_single",
      label: "T-Shirt Size",
      getOptionLabel: option => {
        if (typeof option === "string") {
          return toCapitalize(option);
        }
      },
      options: ["Small", "Medium", "Large", "X-Large", "XX-Large"]
    },
    glove_size: {
      type: "autocomplete_single",
      label: "Glove Size",
      getOptionLabel: option => {
        if (typeof option === "string") {
          return toCapitalize(option);
        }
      },
      options: ["Small", "Medium", "Large", "X-Large", "XX-Large"]
    },
    employee_code: {
      type: "autocomplete_single",
      label: "Employee Code",
      options: promos,
      labelProp: "promo_code",
      permissions: ["admin"]
    },
    email_subscription: {
      type: "checkbox",
      label: "Email Subscription"
    },
    guest: {
      type: "checkbox",
      label: "Guest",
      permissions: ["admin"]
    },
    wholesaler: {
      type: "autocomplete_single",
      label: "Wholesalers",
      options: wholesalers,
      labelProp: "wholesaler",
      getOptionLabel: option => option.company,
      permissions: ["admin"]
    },
    isWholesaler: {
      type: "checkbox",
      label: "Is Wholesaler",
      permissions: ["admin"]
    },
    shipping: {
      type: "object",
      title: "Shipping Information",
      fields: {
        first_name: {
          type: "text",
          label: "First Name"
        },
        last_name: {
          type: "text",
          label: "Last Name"
        },
        address_1: {
          type: "text",
          label: "Address Line 1"
        },
        address_2: {
          type: "text",
          label: "Address Line 2"
        },
        city: {
          type: "text",
          label: "City"
        },
        state: {
          type: "text",
          label: "State"
        },
        postalCode: {
          type: "text",
          label: "Postal Code"
        },
        international: {
          type: "checkbox",
          label: "International"
        },
        country: {
          type: "text",
          label: "Country"
        }
      }
    }
  };

  return (
    <div>
      <GLModal
        isOpen={edit_user_modal}
        onConfirm={() => {
          dispatch(
            API.saveUser({
              user: { ...user, affiliate: affiliate?._id ? affiliate?._id : null },
              profile: location.pathname === "/secure/account/profile"
            })
          );
        }}
        onCancel={() => {
          dispatch(set_edit_user_modal(false));
        }}
        title={"Edit User"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm formData={formFields} state={user} onChange={value => dispatch(set_user(value))} loading={loading && loading_affiliates} />
        <Typography component="h5" variant="h5" sx={{ mb: 2 }} className="ta-c">
          {formFields.shipping.title}
        </Typography>
        <GLForm
          formData={formFields.shipping.fields}
          state={user.shipping}
          onChange={value => dispatch(set_user({ shipping: { ...user.shipping, ...value } }))}
          loading={loading && loading_affiliates}
        />
      </GLModal>
    </div>
  );
};

export default EditUserModal;
