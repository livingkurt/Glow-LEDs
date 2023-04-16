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
      type: "autocomplete",
      label: "Users",
      options: users,
      labelProp: "user",
      getOptionLabel: option => `${option.first_name} ${option.last_name}`
    },
    artist_name: {
      type: "text",
      label: "Artist Name"
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
    tiktok: {
      type: "text",
      label: "TikTok"
    },
    percentage_off: {
      type: "number",
      label: "Percentage Off"
    },
    chips: {
      type: "autocomplete",
      label: "Chips",
      options: chips,
      labelProp: "name",
      getOptionLabel: option => option.name
    },
    glow_gear: {
      type: "autocomplete",
      label: "Products",
      options: products,
      labelProp: "name"
    },
    public_code: {
      type: "autocomplete",
      label: "Public Code",
      options: promos,
      labelProp: "promo_code"
    },
    private_code: {
      type: "autocomplete",
      label: "Private Code",
      options: promos,
      labelProp: "promo_code"
    },
    location: {
      type: "text",
      label: "Location"
    },
    years: {
      type: "text",
      label: "Years"
    },
    bio: {
      type: "textarea",
      label: "Bio"
    },
    picture: {
      type: "text",
      label: "Picture"
    },
    video: {
      type: "text",
      label: "Video"
    },
    style: {
      type: "text",
      label: "Style"
    },
    inspiration: {
      type: "text",
      label: "Inspiration"
    },
    link: {
      type: "text",
      label: "Link"
    },
    venmo: {
      type: "text",
      label: "Venmo"
    },
    pathname: {
      type: "text",
      label: "Pathname"
    },
    answers: {
      type: "array",
      label: "Answers"
    },
    promoter: {
      type: "checkbox",
      label: "Promoter"
    },
    rave_mob: {
      type: "checkbox",
      label: "Rave Mob"
    },
    team: {
      type: "checkbox",
      label: "Team"
    },
    sponsor: {
      type: "checkbox",
      label: "Sponsor"
    },
    active: {
      type: "checkbox",
      label: "Active"
    }
  };

  return (
    <div>
      <GLModal
        isOpen={edit_affiliate_modal}
        onConfirm={() => {
          dispatch(API.saveAffiliate({ ...affiliate, user: affiliate.user._id }));
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

// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { Helmet } from "react-helmet";
// import { GLAutocomplete, GLCheckboxV2, GLTextField } from "../../../shared/GlowLEDsComponents";
// import { clear_affiliate, set_affiliate, set_success } from "../../../slices/affiliateSlice";
// import * as API from "../../../api";
// import { makeStyles } from "@mui/styles";
// import { Container, Paper, Stack } from "@mui/material";
// import GLButtonV2 from "../../../shared/GlowLEDsComponents/GLButtonV2/GLButton";
// import { snake_case } from "../../../utils/helper_functions";

// const useStyles = makeStyles(() => ({
//   textField: {
//     marginTop: 15,
//     marginBottom: 15
//   },
//   skeleton: {
//     marginTop: -10,
//     marginBottom: -10
//   }
// }));

// const EditAffiliateModal = props => {
//   const userPage = useSelector(state => state.users.userPage);
//   const { users, loading: loading_users } = userPage;

//   const history = useHistory();

//   const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
//   const affiliate = useSelector(state => state.affiliates.affiliate);
//   const { loading, success } = affiliatePage;
//   const {
//     user,
//     artist_name,
//     instagram_handle,
//     facebook_name,
//     percentage_off,
//     sponsor,
//     promoter,
//     rave_mob,
//     active,
//     style,
//     inspiration,
//     bio,
//     link,
//     picture,
//     location,
//     years,
//     team,
//     video,
//     venmo,
//     products,
//     chips,
//     pathname,
//     public_code,
//     private_code
//   } = affiliate;

// const productPage = useSelector(state => state.products.productPage);
// const { products: products_list, loading: loading_products } = productPage;

// const chipPage = useSelector(state => state.chips);
// const { chips: chips_list, loading: loading_chips } = chipPage;

// const promoPage = useSelector(state => state.promos);
// const { promos: promos_list, loading: loading_promos } = promoPage;

//   const dispatch = useDispatch();

// useEffect(() => {
//   let clean = true;
//   if (clean) {
//     if (props.match.params.pathname) {
//       dispatch(API.detailsAffiliate({ pathname: props.match.params.pathname }));
//     }
//     dispatch(API.listUsers({}));
//     dispatch(API.listProducts({ option: false, hidden: false }));
//     dispatch(API.listPromos({}));
//     dispatch(API.listChips({}));
//   }
//   return () => (clean = false);
// }, [dispatch, props.match.params.pathname]);

//   useEffect(() => {
//     if (success) {
//       history.push(props.location.previous_path || "/secure/glow/affiliates");
//       dispatch(set_success(false));
//     }
//   }, [dispatch, history, props.location.previous_path, success]);

//   const classes = useStyles();
//   return (
//     <div className="main_container p-20px">
//       <Helmet>
//         <title>Edit Affiliate | Glow LEDs</title>
//       </Helmet>
//       <h1 style={{ textAlign: "center" }}>{props.match.params.pathname ? "Edit Affiliate" : "Create Affiliate"}</h1>
//       <form
//         onSubmit={e => {
//           e.preventDefault();
//           dispatch(API.saveAffiliate(affiliate));
//         }}
//         style={{ width: "100%" }}
//       >
//         {affiliate && (
//           <Container maxWidth="md">
//             <Paper elevation={3} style={{ backgroundColor: "#5a5a5a", borderRadius: "20px", padding: "20px" }}>
//               <GLAutocomplete
//                 loading={!loading_users}
//                 margin="normal"
//                 value={user}
//                 options={users}
//                 optionDisplay={option => (option.first_name ? `${option.first_name} ${option.last_name}` : "")}
//                 getOptionLabel={option => `${option.first_name} ${option.last_name}`}
//                 getOptionSelected={(option, value) => option._id === value._id}
//                 name="user"
//                 label="User"
//                 onChange={(e, value) => dispatch(set_affiliate({ user: value }))}
//                 classes={classes}
//               />
//               <GLTextField
//                 size="small"
//                 loading={!loading}
//                 value={artist_name}
//                 fullWidth
//                 type="text"
//                 margin="normal"
//                 name="artist_name"
//                 label="Artist Name"
//                 variant="outlined"
//                 onChange={e => dispatch(set_affiliate({ artist_name: e.target.value }))}
//               />
//               <GLTextField
//                 size="small"
//                 loading={!loading}
//                 value={facebook_name}
//                 fullWidth
//                 type="text"
//                 margin="normal"
//                 name="facebook_name"
//                 label="Facebook Name"
//                 variant="outlined"
//                 onChange={e => dispatch(set_affiliate({ facebook_name: e.target.value }))}
//               />
//               <GLTextField
//                 size="small"
//                 loading={!loading}
//                 value={instagram_handle}
//                 fullWidth
//                 type="text"
//                 margin="normal"
//                 name="instagram_handle"
//                 label="Instagram Handle"
//                 variant="outlined"
//                 onChange={e => dispatch(set_affiliate({ instagram_handle: e.target.value }))}
//               />
//               <GLTextField
//                 size="small"
//                 loading={!loading}
//                 value={location}
//                 fullWidth
//                 type="text"
//                 margin="normal"
//                 name="location"
//                 label="Location"
//                 variant="outlined"
//                 onChange={e => dispatch(set_affiliate({ location: e.target.value }))}
//               />
//               <GLTextField
//                 size="small"
//                 loading={!loading}
//                 value={years}
//                 fullWidth
//                 type="text"
//                 margin="normal"
//                 name="years"
//                 label="Years"
//                 variant="outlined"
//                 onChange={e => dispatch(set_affiliate({ years: e.target.value }))}
//               />
//               <GLTextField
//                 size="small"
//                 loading={!loading}
//                 value={picture}
//                 fullWidth
//                 type="text"
//                 margin="normal"
//                 name="picture"
//                 label="Picture"
//                 variant="outlined"
//                 onChange={e => dispatch(set_affiliate({ picture: e.target.value }))}
//               />
//               <GLTextField
//                 size="small"
//                 loading={!loading}
//                 value={video}
//                 fullWidth
//                 type="text"
//                 margin="normal"
//                 name="video"
//                 label="Video"
//                 variant="outlined"
//                 onChange={e => dispatch(set_affiliate({ video: e.target.value }))}
//               />
//               <GLTextField
//                 size="small"
//                 loading={!loading}
//                 value={style}
//                 fullWidth
//                 type="text"
//                 margin="normal"
//                 placeholder="Wave Tuts, Clusters, Whips..."
//                 name="style"
//                 label="Style"
//                 variant="outlined"
//                 onChange={e => dispatch(set_affiliate({ style: e.target.value }))}
//               />
//               <GLTextField
//                 size="small"
//                 loading={!loading}
//                 value={inspiration}
//                 placeholder="Flow, Megasloth, Jest..."
//                 fullWidth
//                 type="text"
//                 margin="normal"
//                 name="inspiration"
//                 label="Inspiration"
//                 variant="outlined"
//                 onChange={e => dispatch(set_affiliate({ inspiration: e.target.value }))}
//               />
//               <GLTextField
//                 size="small"
//                 loading={!loading}
//                 value={bio}
//                 placeholder="Write a little something to introduce yourself..."
//                 fullWidth
//                 type="text"
//                 multiline
//                 rows={4}
//                 margin="normal"
//                 name="bio"
//                 label="Bio"
//                 variant="outlined"
//                 onChange={e => dispatch(set_affiliate({ bio: e.target.value }))}
//               />
//               <GLTextField
//                 size="small"
//                 loading={!loading}
//                 value={link}
//                 placeholder="https://www..."
//                 fullWidth
//                 type="text"
//                 margin="normal"
//                 name="link"
//                 label="Link"
//                 variant="outlined"
//                 onChange={e => dispatch(set_affiliate({ link: e.target.value }))}
//               />
//               <GLTextField
//                 size="small"
//                 loading={!loading}
//                 value={percentage_off}
//                 placeholder="https://www..."
//                 fullWidth
//                 type="text"
//                 margin="normal"
//                 name="percentage_off"
//                 label="Percentage Off"
//                 variant="outlined"
//                 onChange={e => dispatch(set_affiliate({ percentage_off: e.target.value }))}
//               />
//               <GLAutocomplete
//                 loading={!loading_promos}
//                 margin="normal"
//                 value={public_code}
//                 options={promos_list}
//                 optionDisplay="promo_code"
//                 getOptionLabel={option => option.promo_code}
//                 getOptionSelected={(option, value) => option.promo_code === value.promo_code}
//                 name="public_code"
//                 label="Public Code"
//                 onChange={(e, value) => dispatch(set_affiliate({ public_code: value }))}
//                 classes={classes}
//               />
//               <GLAutocomplete
//                 loading={!loading_promos}
//                 margin="normal"
//                 value={private_code}
//                 options={promos_list}
//                 optionDisplay="promo_code"
//                 getOptionLabel={option => option.promo_code}
//                 getOptionSelected={(option, value) => option.promo_code === value.promo_code}
//                 name="private_code"
//                 label="Private Code"
//                 onChange={(e, value) => dispatch(set_affiliate({ private_code: value }))}
//                 classes={classes}
//               />

//               <GLTextField
//                 size="small"
//                 loading={!loading}
//                 value={pathname ? pathname : artist_name && snake_case(artist_name)}
//                 fullWidth
//                 type="text"
//                 margin="normal"
//                 name="pathname"
//                 label="Pathname"
//                 variant="outlined"
//                 onChange={e => dispatch(set_affiliate({ pathname: e.target.value }))}
//               />
//               <GLTextField
//                 size="small"
//                 loading={!loading}
//                 value={venmo}
//                 placeholder="https://www..."
//                 fullWidth
//                 type="text"
//                 margin="normal"
//                 name="venmo"
//                 label="Venmo"
//                 variant="outlined"
//                 onChange={e => dispatch(set_affiliate({ venmo: e.target.value }))}
//               />
//               <GLAutocomplete
//                 loading={!loading_products}
//                 margin="normal"
//                 value={products}
//                 options={products_list}
//                 getOptionLabel={option => option.name}
//                 getOptionSelected={(option, value) => option.name === value.name}
//                 name="products"
//                 label="Products"
//                 chipColor={"primary"}
//                 onChange={(e, value) => dispatch(set_affiliate({ products: value }))}
//                 classes={classes}
//                 disableCloseOnSelect
//                 multiple
//                 showCheckbox
//               />
//               <GLAutocomplete
//                 loading={!loading_chips}
//                 margin="normal"
//                 value={chips}
//                 options={chips_list}
//                 getOptionLabel={option => option.name}
//                 getOptionSelected={(option, value) => option.name === value.name}
//                 name="chips"
//                 label="Chips"
//                 chipColor={"primary"}
//                 onChange={(e, value) => dispatch(set_affiliate({ chips: value }))}
//                 classes={classes}
//                 disableCloseOnSelect
//                 multiple
//                 showCheckbox
//               />
//               <div className="jc-b wrap">
//                 <GLCheckboxV2 onChecked={e => dispatch(set_affiliate({ team: e.target.checked }))} checked={team} label="Team" />
//                 <GLCheckboxV2 onChecked={e => dispatch(set_affiliate({ sponsor: e.target.checked }))} checked={sponsor} label="Sponsor" />
//                 <GLCheckboxV2
//                   onChecked={e => dispatch(set_affiliate({ promoter: e.target.checked }))}
//                   checked={promoter}
//                   label="Promoter"
//                 />
//                 <GLCheckboxV2
//                   onChecked={e => dispatch(set_affiliate({ rave_mob: e.target.checked }))}
//                   checked={rave_mob}
//                   label="Rave Mob"
//                 />
//                 <GLCheckboxV2 onChecked={e => dispatch(set_affiliate({ active: e.target.checked }))} checked={active} label="Active" />
//               </div>
//               <Stack spacing={2} direction="column">
//                 <GLButtonV2 type="submit" variant="primary">
//                   {pathname ? "Update" : "Create"}
//                 </GLButtonV2>
//                 <GLButtonV2 variant="secondary" onClick={() => history.goBack()}>
//                   Back to Affiliates
//                 </GLButtonV2>
//               </Stack>
//             </Paper>
//           </Container>
//         )}
//       </form>
//     </div>
//   );
// };
// export default EditAffiliateModal;
