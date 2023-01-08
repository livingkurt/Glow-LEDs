import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { saveAffiliate, detailsAffiliate } from "../../../actions/affiliateActions";
import { useHistory } from "react-router-dom";
import { DropdownDisplay, Loading, Notification } from "../../components/UtilityComponents";
import { Helmet } from "react-helmet";
import { Prompt } from "react-router";
import { listUsers } from "../../actions/userActions";
import { listProducts } from "../../actions/productActions";
import { listChips } from "../../actions/chipActions";
import { humanize, snake_case } from "../../utils/helper_functions";
import { listPromos } from "../../actions/promoActions";
import { option_list } from "../../utils/react_helper_functions";
import { GLAutocomplete, GLButton, GLCheckboxV2, GLText, GLTextField } from "../../components/GlowLEDsComponents";
import { set_affiliate, set_loading_checkboxes, set_private_code, set_public_code } from "../../slices/affiliateSlice";
import * as API from "../../api/affiliateApi";
import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from "@mui/styles";
import { Container, Paper, Stack, TextField } from "@mui/material";
import GLButtonV2 from "../../components/GlowLEDsComponents/GLButtonV2/GLButton";

// const useStyles = makeStyles({
//   root: {
//     "& .MuiInputBase-root": {
//       backgroundColor: "white !important"
//     }
//   }
// });

const useStyles = makeStyles(() => ({
  textField: {
    marginTop: 15,
    marginBottom: 15
  },
  skeleton: {
    marginTop: -10,
    marginBottom: -10
  },
  inputRoot: {
    backgroundColor: "white !important"
  }
}));

const EditAffiliatePage = props => {
  // const [id, set_id] = useState("");
  // const [user, set_user] = useState("");
  // const [artist_name, set_artist_name] = useState("");
  // const [instagram_handle, set_instagram_handle] = useState("");
  // const [facebook_name, set_facebook_name] = useState("");
  // const [percentage_off, set_percentage_off] = useState("");

  // const [funds_generated, set_funds_generated] = useState("");
  // const [sponsor, set_sponsor] = useState("");
  // const [promoter, set_promoter] = useState("");
  // const [rave_mob, set_rave_mob] = useState("");
  // const [active, set_active] = useState("");
  // const [style, set_style] = useState("");
  // const [inspiration, set_inspiration] = useState("");
  // const [bio, set_bio] = useState("");
  // const [link, set_link] = useState("");
  // const [picture, set_picture] = useState("");
  // const [location, set_location] = useState("");
  // const [years, set_years] = useState("");
  // const [team, set_team] = useState("");
  // const [video, set_video] = useState("");
  // const [venmo, set_venmo] = useState("");
  // const [product, set_product] = useState("");
  // const [products, set_products] = useState([]);
  // const [chips, set_chips] = useState([]);
  // const [pathname, set_pathname] = useState("");
  // const [public_code, set_public_code] = useState("");
  // const [private_code, set_private_code] = useState("");
  // const [chip, set_chip] = useState("");

  // const [loading_checkboxes, set_loading_checkboxes] = useState(true);

  const userList = useSelector(state => state.userList);
  const { users, loading: loading_users } = userList;

  const history = useHistory();

  const affiliateSlice = useSelector(state => state.affiliateSlice);
  const { loading, affiliate } = affiliateSlice;
  const {
    message,
    error,
    id,
    user,
    artist_name,
    instagram_handle,
    facebook_name,
    percentage_off,
    sponsor,
    promoter,
    rave_mob,
    active,
    style,
    inspiration,
    bio,
    link,
    picture,
    location,
    years,
    team,
    video,
    venmo,
    products,
    chips,
    pathname,
    public_code,
    private_code,
    loading_checkboxes
  } = affiliate;

  const productList = useSelector(state => state.productList);
  const { products: products_list, loading: loading_products } = productList;

  const chipList = useSelector(state => state.chipList);
  const { chips: chips_list, loading: loading_chips } = chipList;

  const promoList = useSelector(state => state.promoList);
  const { promos: promos_list, loading: loading_promos } = promoList;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (props.match.params.pathname) {
        dispatch(API.detailsAffiliate({ pathname: props.match.params.pathname }));
        dispatch(API.detailsAffiliate({ pathname: props.match.params.pathname }));
      } else {
        dispatch(API.detailsAffiliate({}));
      }
      dispatch(listUsers({}));
      dispatch(listProducts({ option: false, hidden: false }));
      dispatch(listPromos({}));
      dispatch(listPromos({}));
      dispatch(listChips({}));
    }
    return () => (clean = false);
  }, [dispatch, props.match.params.pathname]);

  setTimeout(() => {
    dispatch(set_loading_checkboxes(false));
  }, 500);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      API.saveAffiliate({
        _id: id,
        user,
        artist_name,
        instagram_handle,
        facebook_name,
        percentage_off,
        sponsor,
        promoter,
        rave_mob,
        active,
        bio,
        link,
        picture,
        team,
        style,
        inspiration,
        location,
        years,
        video,
        venmo,
        public_code: public_code && public_code._id,
        private_code: private_code && private_code._id,
        pathname: pathname ? pathname : snake_case(artist_name),
        products,
        chips: chips && chips.map(chip => chip._id)
      })
    );
    e.target.reset();
    dispatch(set_affiliate({}));
    history.push("/secure/glow/affiliates");
  };

  const add_promo = (e, code_type) => {
    e.preventDefault();
    const promo_object = JSON.parse(e.target.value);

    //
    // if (promo.indexOf(' ') >= 0) {
    //
    // 	promo.split(' ').map((promo) => {
    // 		set_promos((promos) => [ ...promos, promo ]);
    // 	});
    // } else
    if (code_type === "public") {
      dispatch(set_public_code(promo_object));
    } else if (code_type === "private") {
      dispatch(set_private_code(promo_object));
    }
  };

  const remove_promo = (e, code_type) => {
    e.preventDefault();
    if (code_type === "public") {
      dispatch(set_public_code(""));
    } else if (code_type === "private") {
      dispatch(set_private_code(""));
    }
  };
  const promo_display = (promo, code_type) => {
    if (promo) {
      return (
        <div>
          <div className="jc-b">
            <div>
              <div className="promo_code mv-1rem row jc-b  w-100per">
                <div>
                  <GLButton variant="icon" onClick={e => remove_promo(e, code_type)} aria-label="Delete">
                    <i className="fas fa-times mr-5px" />
                  </GLButton>
                  {promo && promo.promo_code}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  const classes = useStyles();

  // const fields = [
  //   // {
  //   //   name: "user",
  //   //   option_name: option => {return `${option.first_name} ${option.last_name}`},
  //   //   display: option => `${option.first_name} ${option.last_name}`,
  //   //   type: "autocomplete",
  //   //   single: true
  //   // },
  //   // { name: "products", option_name: "name", display: "", type: "autocomplete", single: false },
  //   // { name: "chips", option_name: "name", display: "", type: "autocomplete", single: false },
  //   { name: "artist_name", option_name: "", display: "", type: "input" },
  //   { name: "instagram_handle", option_name: "", display: "", type: "input" },
  //   { name: "facebook_name", option_name: "", display: "", type: "input" },
  //   { name: "tiktok", option_name: "", display: "", type: "input" },
  //   { name: "percentage_off", option_name: "", display: "", type: "input" },
  //   {
  //     name: "public_code",
  //     loading: loading_promos,
  //     option_name: "promo_code",
  //     options: promos_list,
  //     display: "",
  //     type: "autocomplete",
  //     single: true
  //   },
  //   {
  //     name: "private_code",
  //     loading: loading_promos,
  //     option_name: "promo_code",
  //     options: promos_list,
  //     display: "",
  //     type: "autocomplete",
  //     single: true
  //   },
  //   { name: "location", option_name: "", display: "", type: "input" },
  //   { name: "years", option_name: "", display: "", type: "input" },
  //   { name: "bio", option_name: "", display: "", type: "input" },
  //   { name: "picture", option_name: "", display: "", type: "input" },
  //   { name: "video", option_name: "", display: "", type: "input" },
  //   { name: "style", option_name: "", display: "", type: "input" },
  //   { name: "inspiration", option_name: "", display: "", type: "input" },
  //   { name: "link", option_name: "", display: "", type: "input" },
  //   { name: "venmo", option_name: "", display: "", type: "input" },
  //   { name: "pathname", option_name: "", display: "", type: "input" },
  //   { name: "promoter", option_name: "", display: "", type: "checkbox" },
  //   { name: "rave_mob", option_name: "", display: "", type: "checkbox" },
  //   { name: "team", option_name: "", display: "", type: "checkbox" },
  //   { name: "sponsor", option_name: "", display: "", type: "checkbox" },
  //   { name: "active", option_name: "", display: "", type: "checkbox" },
  //   { name: "deleted", option_name: "", display: "", type: "checkbox" }
  // ];

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Edit Affiliate | Glow LEDs</title>
      </Helmet>
      <h1 style={{ textAlign: "center" }}>{props.match.params.id ? "Edit Affiliate" : "Create Affiliate"}</h1>

      <div>
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          <Notification message={message} />
          <Loading loading={loading} error={error}>
            {affiliate && (
              // <ul className="edit-form-container" style={{ width: "100%", maxWidth: "100rem", marginBottom: "20px" }}>
              <Container maxWidth="md">
                <Paper elevation={3} style={{ backgroundColor: "#5a5a5a", borderRadius: "20px", padding: "20px" }}>
                  <GLAutocomplete
                    loading={!loading_users}
                    margin="normal"
                    value={user}
                    options={users}
                    option_name={option => `${option.first_name} ${option.last_name}`}
                    getOptionLabel={option => `${option.first_name} ${option.last_name}`}
                    getOptionSelected={(option, value) => option._id === value._id}
                    name="user"
                    label="User"
                    onChange={(e, value) => dispatch(set_affiliate({ user: value }))}
                    classes={classes}
                  />
                  <GLTextField
                    size="small"
                    loading={!loading}
                    value={artist_name}
                    fullWidth
                    type="text"
                    margin="normal"
                    name="artist_name"
                    label="Artist Name"
                    variant="outlined"
                    onChange={e => dispatch(set_affiliate({ artist_name: e.target.value }))}
                  />
                  <GLTextField
                    size="small"
                    loading={!loading}
                    value={facebook_name}
                    fullWidth
                    type="text"
                    margin="normal"
                    name="facebook_name"
                    label="Facebook Name"
                    variant="outlined"
                    onChange={e => dispatch(set_affiliate({ facebook_name: e.target.value }))}
                  />
                  <GLTextField
                    size="small"
                    loading={!loading}
                    value={instagram_handle}
                    fullWidth
                    type="text"
                    margin="normal"
                    name="instagram_handle"
                    label="Instagram Handle"
                    variant="outlined"
                    onChange={e => dispatch(set_affiliate({ instagram_handle: e.target.value }))}
                  />
                  <GLTextField
                    size="small"
                    loading={!loading}
                    value={location}
                    fullWidth
                    type="text"
                    margin="normal"
                    name="location"
                    label="Location"
                    variant="outlined"
                    onChange={e => dispatch(set_affiliate({ location: e.target.value }))}
                  />
                  <GLTextField
                    size="small"
                    loading={!loading}
                    value={years}
                    fullWidth
                    type="text"
                    margin="normal"
                    name="years"
                    label="Years"
                    variant="outlined"
                    onChange={e => dispatch(set_affiliate({ years: e.target.value }))}
                  />
                  <GLTextField
                    size="small"
                    loading={!loading}
                    value={picture}
                    fullWidth
                    type="text"
                    margin="normal"
                    name="picture"
                    label="Picture"
                    variant="outlined"
                    onChange={e => dispatch(set_affiliate({ picture: e.target.value }))}
                  />
                  <GLTextField
                    size="small"
                    loading={!loading}
                    value={video}
                    fullWidth
                    type="text"
                    margin="normal"
                    name="video"
                    label="Video"
                    variant="outlined"
                    onChange={e => dispatch(set_affiliate({ video: e.target.value }))}
                  />
                  <GLTextField
                    size="small"
                    loading={!loading}
                    value={style}
                    fullWidth
                    type="text"
                    margin="normal"
                    placeholder="Wave Tuts, Clusters, Whips..."
                    name="style"
                    label="Style"
                    variant="outlined"
                    onChange={e => dispatch(set_affiliate({ style: e.target.value }))}
                  />
                  <GLTextField
                    size="small"
                    loading={!loading}
                    value={inspiration}
                    placeholder="Flow, Megasloth, Jest..."
                    fullWidth
                    type="text"
                    margin="normal"
                    name="inspiration"
                    label="Inspiration"
                    variant="outlined"
                    onChange={e => dispatch(set_affiliate({ inspiration: e.target.value }))}
                  />
                  <GLTextField
                    size="small"
                    loading={!loading}
                    value={bio}
                    placeholder="Write a little something to introduce yourself..."
                    fullWidth
                    type="text"
                    multiline
                    rows={4}
                    margin="normal"
                    name="bio"
                    label="Bio"
                    variant="outlined"
                    onChange={e => dispatch(set_affiliate({ bio: e.target.value }))}
                  />
                  <GLTextField
                    size="small"
                    loading={!loading}
                    value={link}
                    placeholder="https://www..."
                    fullWidth
                    type="text"
                    margin="normal"
                    name="link"
                    label="Link"
                    variant="outlined"
                    onChange={e => dispatch(set_affiliate({ link: e.target.value }))}
                  />
                  <GLTextField
                    size="small"
                    loading={!loading}
                    value={percentage_off}
                    placeholder="https://www..."
                    fullWidth
                    type="text"
                    margin="normal"
                    name="percentage_off"
                    label="Percentage Off"
                    variant="outlined"
                    onChange={e => dispatch(set_affiliate({ percentage_off: e.target.value }))}
                  />
                  <GLAutocomplete
                    loading={!loading_promos}
                    margin="normal"
                    value={public_code}
                    options={promos_list}
                    option_name="promo_code"
                    getOptionLabel={option => option.promo_code}
                    getOptionSelected={(option, value) => option.promo_code === value.promo_code}
                    name="public_code"
                    label="Public Code"
                    onChange={(e, value) => dispatch(set_affiliate({ public_code: value }))}
                    classes={classes}
                  />
                  <GLAutocomplete
                    loading={!loading_promos}
                    margin="normal"
                    value={private_code}
                    options={promos_list}
                    option_name="promo_code"
                    getOptionLabel={option => option.promo_code}
                    getOptionSelected={(option, value) => option.promo_code === value.promo_code}
                    name="private_code"
                    label="Private Code"
                    onChange={(e, value) => dispatch(set_affiliate({ private_code: value }))}
                    classes={classes}
                  />

                  <GLTextField
                    size="small"
                    loading={!loading}
                    value={pathname ? pathname : artist_name && snake_case(artist_name)}
                    fullWidth
                    type="text"
                    margin="normal"
                    name="pathname"
                    label="Pathname"
                    variant="outlined"
                    onChange={e => dispatch(set_affiliate({ pathname: e.target.value }))}
                  />
                  <GLTextField
                    size="small"
                    loading={!loading}
                    value={venmo}
                    placeholder="https://www..."
                    fullWidth
                    type="text"
                    margin="normal"
                    name="venmo"
                    label="Venmo"
                    variant="outlined"
                    onChange={e => dispatch(set_affiliate({ venmo: e.target.value }))}
                  />
                  <GLAutocomplete
                    loading={!loading_products}
                    margin="normal"
                    value={products}
                    options={products_list}
                    getOptionLabel={option => option.name}
                    getOptionSelected={(option, value) => option.name === value.name}
                    name="products"
                    label="Products"
                    chipColor={"primary"}
                    onChange={(e, value) => dispatch(set_affiliate({ products: value }))}
                    classes={classes}
                    disableCloseOnSelect
                    multiple
                    showCheckbox
                  />
                  <GLAutocomplete
                    loading={!loading_chips}
                    margin="normal"
                    value={chips}
                    options={chips_list}
                    getOptionLabel={option => option.name}
                    getOptionSelected={(option, value) => option.name === value.name}
                    name="products"
                    label="Chips"
                    chipColor={"primary"}
                    onChange={(e, value) => dispatch(set_affiliate({ products: value }))}
                    classes={classes}
                    disableCloseOnSelect
                    multiple
                    showCheckbox
                  />
                  <div className="jc-b wrap">
                    <GLCheckboxV2 onChecked={e => dispatch(set_affiliate({ team: e.target.checked }))} checked={team} label="Team" />
                    <GLCheckboxV2
                      onChecked={e => dispatch(set_affiliate({ sponsor: e.target.checked }))}
                      checked={sponsor}
                      label="Sponsor"
                    />
                    <GLCheckboxV2
                      onChecked={e => dispatch(set_affiliate({ promoter: e.target.checked }))}
                      checked={promoter}
                      label="Promoter"
                    />
                    <GLCheckboxV2
                      onChecked={e => dispatch(set_affiliate({ rave_mob: e.target.checked }))}
                      checked={rave_mob}
                      label="Rave Mob"
                    />
                    <GLCheckboxV2 onChecked={e => dispatch(set_affiliate({ active: e.target.checked }))} checked={active} label="Active" />
                  </div>
                  <Stack spacing={2} direction="column">
                    <GLButtonV2 type="submit" variant="primary">
                      {id ? "Update" : "Create"}
                    </GLButtonV2>
                    <GLButtonV2 variant="secondary" onClick={() => history.goBack()}>
                      Back to Affiliates
                    </GLButtonV2>
                  </Stack>
                </Paper>
              </Container>
            )}
          </Loading>
        </form>
      </div>
    </div>
  );
};
export default EditAffiliatePage;
