import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { set_edit_affiliate_modal, set_affiliate } from "../../../slices/affiliateSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { snake_case } from "../../../utils/helper_functions";

const EditAffiliateModal = () => {
  const dispatch = useDispatch();
  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { edit_affiliate_modal, affiliate, loading } = affiliatePage;

  const userPage = useSelector(state => state.users.userPage);
  const { users, loading: loading_affiliates } = userPage;

  const productPage = useSelector(state => state.products.productPage);
  const { products, loading: loading_products } = productPage;

  const chipPage = useSelector(state => state.chips);
  const { chips, loading: loading_chips } = chipPage;

  const promoPage = useSelector(state => state.promos);
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

  const formFields = {
    user: {
      type: "autocomplete_single",
      label: "Users",
      options: users,
      labelProp: "user",
      getOptionLabel: option => `${option.first_name} ${option.last_name}`,
      permissions: ["admin"]
    },
    artist_name: {
      type: "text",
      label: "Artist Name"
    },
    location: {
      type: "text",
      label: "Location"
    },
    style: {
      type: "text",
      label: "Style"
    },
    inspiration: {
      type: "text",
      label: "Inspiration"
    },
    years: {
      type: "text",
      label: "Years"
    },
    bio: {
      type: "text_multiline",
      label: "Bio"
    },
    instagram_handle: {
      type: "text",
      label: "Instagram Handle"
    },
    facebook_name: {
      type: "text",
      label: "Facebook Name"
    },
    youtube_link: {
      type: "text",
      label: "YouTube Link"
    },
    facebook_link: {
      type: "text",
      label: "Facebook Link"
    },
    instagram_link: {
      type: "text",
      label: "Instagram Link"
    },
    tiktok_link: {
      type: "text",
      label: "TikTok Link"
    },

    chips: {
      type: "autocomplete_multiple",
      label: "Chips",
      options: chips,
      labelProp: "name"
    },
    products: {
      type: "autocomplete_multiple",
      label: "Glow LEDs Gear",
      options: products,
      labelProp: "name"
    },
    public_code: {
      type: "autocomplete_single",
      label: "Public Code",
      options: promos,
      labelProp: "promo_code",
      permissions: ["admin"]
    },
    private_code: {
      type: "autocomplete_single",
      label: "Private Code",
      options: promos,
      labelProp: "promo_code",
      permissions: ["admin"]
    },

    percentage_off: {
      type: "number",
      label: "Percentage Off",
      permissions: ["admin"]
    },
    picture: {
      type: "text",
      label: "Picture",
      permissions: ["admin"]
    },
    video: {
      type: "text",
      label: "Video",
      permissions: ["admin"]
    },

    link: {
      type: "text",
      label: "Link",
      permissions: ["admin"]
    },
    pathname: {
      type: "text",
      label: "Pathname",
      permissions: ["admin"]
    },
    answers: {
      type: "array",
      label: "Answers",
      permissions: ["admin"]
    },
    promoter: {
      type: "checkbox",
      label: "Promoter",
      permissions: ["admin"]
    },
    rave_mob: {
      type: "checkbox",
      label: "Rave Mob",
      permissions: ["admin"]
    },
    team: {
      type: "checkbox",
      label: "Team",
      permissions: ["admin"]
    },
    sponsor: {
      type: "checkbox",
      label: "Sponsor",
      permissions: ["admin"]
    },
    active: {
      type: "checkbox",
      label: "Active",
      permissions: ["admin"]
    }
  };

  return (
    <div>
      <GLModal
        isOpen={edit_affiliate_modal}
        onConfirm={() => {
          dispatch(API.saveAffiliate(affiliate));
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
        <GLForm formData={formFields} state={affiliate} onChange={value => dispatch(set_affiliate(value))} loading={loading} />
      </GLModal>
    </div>
  );
};

export default EditAffiliateModal;
